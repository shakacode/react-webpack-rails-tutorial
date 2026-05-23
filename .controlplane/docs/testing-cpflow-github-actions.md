# Testing cpflow GitHub Actions Changes

Use this guide when changing generated `cpflow-*` GitHub Actions, updating the
`cpflow` generator version, or debugging review-app automation.

## What To Test

Test the flow in three layers:

1. Local generated-file checks catch YAML, metadata, and lint problems before a PR.
2. GitHub workflow checks prove GitHub can load the workflow and run CI.
3. A real review-app deploy proves the default-branch trusted actions, GitHub
   secrets, Docker build, and Control Plane deploy all work together.

The third layer matters because the review-app workflow intentionally checks out
trusted workflow sources from the repository default branch before passing
Control Plane secrets to local composite actions. A PR branch can contain fixed
`.github/actions/*` files, but the deploy job still loads those local actions
from `master` until the fix is merged there.

## How Upstream Code Is Pinned

Generated `cpflow-*` workflows are thin wrappers around reusable workflows in
`shakacode/control-plane-flow`. GitHub reusable workflows cannot be loaded from
a Ruby gem; GitHub resolves them from a repository ref. Each wrapper therefore
has two upstream pins that must stay in sync:

```yaml
uses: shakacode/control-plane-flow/.github/workflows/cpflow-deploy-review-app.yml@<ref>
with:
  control_plane_flow_ref: <ref>
```

`uses: ...@<ref>` chooses the reusable workflow file. `control_plane_flow_ref`
chooses the same upstream checkout for shared composite actions and, when
`CPFLOW_VERSION` is unset, the source used to build and install the `cpflow` gem
inside the workflow.

The stable release path is still gem-driven:

1. Install or update to a released `cpflow` gem.
2. Run `cpflow generate-github-actions --staging-branch master`.
3. The generated wrappers use `v<cpflow gem version>` as the upstream ref.

That tag should point to the same source that produced the RubyGems release, so
the workflow code is locked to a release tag rather than a moving branch. Do not
pin production workflows to `main` or a feature branch. For unreleased testing,
pin to an immutable commit SHA, not a branch name, then regenerate or repin to
the release tag after the upstream release is published.

`CPFLOW_VERSION` is separate from the GitHub workflow ref. If the repository
variable is set, the setup action runs `gem install cpflow -v <version>`. If it
is unset, the setup action builds `cpflow` from the checked-out upstream ref.
For normal releases, either leave `CPFLOW_VERSION` unset while using the matching
`v<version>` upstream tag, or set `CPFLOW_VERSION` to the same released gem
version without the leading `v`.

This repo is currently pinned to an upstream commit SHA because the reusable
workflow change was tested before a new `cpflow` gem release existed. That is
safer than pinning a branch, but it should be treated as a temporary test pin
until the next upstream release tag is available.

## Local Checks

After regenerating the flow, run these checks from the repository root. If
`cpflow` is installed as a gem, use `cpflow` directly:

```sh
bin/conductor-exec cpflow generate-github-actions --staging-branch master
bin/test-cpflow-github-flow
```

When testing an unreleased upstream `control-plane-flow` checkout, replace
`cpflow` with that checkout's `bin/cpflow`:

```sh
bin/conductor-exec ruby /path/to/control-plane-flow/bin/cpflow generate-github-actions --staging-branch master
bin/test-cpflow-github-flow ruby /path/to/control-plane-flow/bin/cpflow
```

Why the explicit description check exists: GitHub parses expression-like snippets
inside composite action metadata, including `description:` fields. Literal
examples such as `${{ vars.SOME_VALUE }}` can fail action loading before any
shell step starts. The wrapper runs `cpflow github-flow-readiness`, parses the
generated YAML, checks action input descriptions for literal GitHub expressions,
and runs `actionlint -ignore 'SC2129' .github/workflows/cpflow-*.yml`.

## PR Checks

Open a normal PR for the generated-file diff and wait for CI. The workflow PR
itself is useful for syntax and CI validation, but it does not fully prove
review-app deployment changes that live under `.github/actions/`.

For top-level workflow edits, you can manually dispatch the PR branch workflow:

```sh
gh workflow run cpflow-deploy-review-app.yml --ref <branch> -f pr_number=<pr-number>
```

This loads the workflow file from `<branch>`, but the deploy workflow's
`Checkout trusted workflow sources` step still checks out `master` before using
local composite actions with secrets. Treat this as a partial smoke test, not as
proof that PR-branch composite action changes work.

## Post-Merge Review-App Test

After the workflow PR merges to `master`, test a real review-app deployment:

1. Pick a same-repository PR to use as the canary.
2. If the review app does not exist yet, comment exactly `+review-app-deploy` on
   that PR.
3. If a previous deploy run failed, rerun the failed deploy run after the
   workflow PR is merged.
4. Confirm the deploy run checks out `master` at the merge commit in
   `Checkout trusted workflow sources`.
5. Confirm `Setup environment` succeeds and prints the expected `cpflow` version.
6. Confirm `Check if review app exists`, `Build Docker image`, and
   `Deploy to Control Plane` all run as expected.
7. Open the review-app URL from the PR comment or deployment status and verify
   it returns HTTP 200.

Use the generated app name from the workflow log:

```text
APP_NAME: ${REVIEW_APP_PREFIX}-${PR_NUMBER}
```

This is a template from the workflow output, not a literal command to evaluate
unless those environment variables are already set. For this repo, verify the
actual `REVIEW_APP_PREFIX` repository variable before assuming the final app
name.

## Troubleshooting Signals

### Composite action metadata fails before setup

Error shape:

```text
Unrecognized named-value: 'vars'
Failed to load ./.github/actions/cpflow-setup-environment/action.yml
```

Cause: GitHub parsed a literal expression inside composite action metadata,
usually an input description. Because trusted local actions come from `master`,
fix and merge the generated action metadata on `master`, then rerun the deploy.

### Setup succeeds, then `cpflow exists` reports token format

Error shape:

```text
ERROR: Unknown API token format. Please re-run 'cpln profile login' or set the correct CPLN_TOKEN env variable.
```

Cause: the workflow can read `CPLN_TOKEN_STAGING`, but the value is not a valid
Control Plane service-account token for the installed Control Plane CLI. Rotate
the GitHub secret, then rerun the failed deploy job.

### PR pushes do not create a new review app

This is expected. Pushes redeploy only after the review app already exists.
Create the first review app by commenting exactly:

```text
+review-app-deploy
```

## Ways To Make This Easier

- Add a no-secret GitHub Actions smoke workflow that loads generated local
  composite actions from the PR branch and fails fast on action metadata parsing.
- Extend `bin/test-cpflow-github-flow` as more local cpflow GitHub Actions
  checks become worth standardizing.
- Add an early token sanity step after `Setup environment` so invalid
  `CPLN_TOKEN_STAGING` and `CPLN_TOKEN_PRODUCTION` values fail with a named
  "validate Control Plane token" step instead of surfacing later during
  `cpflow exists`.
- Keep a tiny canary PR open for review-app workflow testing so post-merge
  deploy verification does not depend on whichever feature PR happens to exist.
- Upstream the metadata-description check to `cpflow github-flow-readiness` so
  downstream repos get the guard automatically.
