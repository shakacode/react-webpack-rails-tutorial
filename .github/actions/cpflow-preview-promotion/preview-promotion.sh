#!/usr/bin/env bash
set -euo pipefail

# This job has only the staging token. Production provenance comes from the
# successful production-* release record and is checked against the live image
# by the protected deployment job after approval.
export GH_HOST="${GITHUB_SERVER_URL#https://}"
export GH_ENTERPRISE_TOKEN="${GH_TOKEN:-}"
workload_json="$(cpln workload get "$PRIMARY_WORKLOAD" --gvc "$STAGING_APP_NAME" --org "$CPLN_ORG_STAGING" -o json)"
staging_image="$(jq -r '.spec.containers[0].image // empty' <<< "$workload_json")"
if [[ "$staging_image" == /org/*/image/* ]]; then
  staging_image="${staging_image##*/image/}"
elif [[ "$staging_image" == *.registry.cpln.io/* ]]; then
  staging_image="${staging_image#*.registry.cpln.io/}"
fi
staging_tag="${staging_image%%@*}"
staging_commit="${staging_tag##*_}"
if [[ "$staging_image" == *$'\n'* || "$staging_image" == *$'\r'* ]] || ! [[ "$staging_commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo "::error::The deployed staging image must include a full lowercase commit SHA suffix."
  exit 1
fi
echo "staging_image=$staging_image" >> "$GITHUB_OUTPUT"
{
  echo "## Commits ready for production"
  echo
  echo "Preview captured before production approval. Baseline: the last recorded successful production release; live production is verified after approval."
  echo
} >> "$GITHUB_STEP_SUMMARY"

# Limit release discovery to the latest 100 entries. Missing provenance is
# explicit rather than falling back to a moving branch or an unrelated release.
if ! releases="$(timeout 30s gh api "repos/${GH_REPO}/releases?per_page=100")"; then
  echo "Comparison unavailable: GitHub could not read the production release history." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
production_release="$(jq -r '[.[] | select(.draft == false and .prerelease == false) | select(.tag_name | test("^production-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{6}-[0-9]+$"))] | sort_by(.published_at // "") | reverse | .[0].tag_name // empty' <<< "$releases")"
if [[ -z "$production_release" ]]; then
  echo "Comparison unavailable: no successful production release was found in the latest 100 releases." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
# Resolve the tag itself: target_commitish can be a branch name on older releases.
if ! production_json="$(timeout 30s gh api "repos/${GH_REPO}/commits/${production_release}")"; then
  echo "Comparison unavailable: GitHub could not resolve the recorded production release." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
production_commit="$(jq -r '.sha // empty' <<< "$production_json")"
if ! [[ "$production_commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Comparison unavailable: the recorded production release has no full commit SHA." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
echo "production_commit=$production_commit" >> "$GITHUB_OUTPUT"

repository_url="${GITHUB_SERVER_URL}/${GH_REPO}"
echo "[Recorded production release](${repository_url}/releases/tag/${production_release})" >> "$GITHUB_STEP_SUMMARY"
{
  echo "Recorded production release: [\`${production_commit:0:7}\`](${repository_url}/commit/${production_commit})"
  echo "Staging: [\`${staging_commit:0:7}\`](${repository_url}/commit/${staging_commit})"
  echo
  echo "[Compare production to staging](${repository_url}/compare/${production_commit}...${staging_commit})"
  echo
} >> "$GITHUB_STEP_SUMMARY"
if [[ "${production_commit}" == "${staging_commit}" ]]; then
  echo "Production and staging use the same commit; there are no commits to promote." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi

comparison="$(mktemp)"
trap 'rm -f "$comparison" "${comparison}.summary"' EXIT
# One bounded page; the compare link provides the complete diff and history.
if ! timeout 30s gh api "repos/${GH_REPO}/compare/${production_commit}...${staging_commit}?per_page=100&page=1" > "$comparison"; then
  echo "Commit list unavailable: GitHub could not compare these deployed commits. Use the compare link above." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi

if ! jq -r --arg repository_url "$repository_url" '
  "\(.ahead_by) commit(s) on staging that are not in the recorded production release.", "",
  (if .status == "diverged" or .status == "behind" then
    "Warning: staging is \(.status); production has \(.behind_by) commit(s) that are not on staging. Review the comparison before treating this as a forward promotion."
  else empty end), "",
  "<ul>",
  (.commits[:100][] |
    "<li><a href=\"\($repository_url)/commit/\(.sha)\">\(.sha[:7])</a> " +
    (.commit.message | split("\n")[0] | @html) + "</li>"),
  "</ul>", "",
  (if .ahead_by > 100 then "Showing the first 100 commits; use the compare link for the complete list." else empty end)
' "$comparison" > "${comparison}.summary"; then
  echo "Commit list unavailable: GitHub returned incomplete comparison data." >> "$GITHUB_STEP_SUMMARY"
  exit 0
fi
cat "${comparison}.summary" >> "$GITHUB_STEP_SUMMARY"
