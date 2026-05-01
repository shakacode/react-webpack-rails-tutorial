#!/bin/bash

set -euo pipefail

: "${APP_NAME:?APP_NAME environment variable is required}"
: "${CPLN_ORG:?CPLN_ORG environment variable is required}"
: "${REVIEW_APP_PREFIX:?REVIEW_APP_PREFIX environment variable is required}"

expected_prefix="${REVIEW_APP_PREFIX}-"
if [[ "$APP_NAME" != "${expected_prefix}"* ]]; then
  echo "❌ ERROR: refusing to delete an app outside the review app prefix" >&2
  echo "App name: $APP_NAME" >&2
  echo "Expected prefix: ${expected_prefix}" >&2
  exit 1
fi

echo "🔍 Checking if application exists: $APP_NAME"
# Contract this relies on from `cpflow exists`:
#   - Exit status 0              → app exists (stdout may contain an informational banner).
#   - Exit status non-zero, no
#     recognizable error tokens  → app does not exist; treat as a no-op success.
#   - Exit status non-zero with
#     tokens like "Double check
#     your org", "Unknown API
#     token format", "ERROR",
#     "Error:", "Traceback", or
#     "Net::"                    → a real failure; surface and exit 1.
# TODO: replace this string-matching with a structured signal once `cpflow exists` exposes one
# (e.g. a distinct exit code for "not found" vs. API/auth errors, or `cpflow exists --json`).
# Until then, keep this list in sync if `cpflow exists` starts emitting new error patterns —
# any unmatched error string would otherwise be silently treated as "app not found".
exists_output=""
if ! exists_output="$(cpflow exists -a "$APP_NAME" --org "$CPLN_ORG" 2>&1)"; then
  case "$exists_output" in
    *"Double check your org"*|*"Unknown API token format"*|*"ERROR"*|*"Error:"*|*"Traceback"*|*"Net::"*)
      echo "❌ ERROR: failed to determine whether application exists: $APP_NAME" >&2
      printf '%s\n' "$exists_output" >&2
      exit 1
      ;;
  esac

  if [[ -n "$exists_output" ]]; then
    echo "⚠️ cpflow exists returned non-zero output that did not match known error patterns:" >&2
    printf '%s\n' "$exists_output" >&2
  fi

  echo "⚠️ Application does not exist: $APP_NAME"
  exit 0
fi

if [[ -n "$exists_output" ]]; then
  printf '%s\n' "$exists_output"
fi

echo "🗑️ Deleting application: $APP_NAME"
cpflow delete -a "$APP_NAME" --org "$CPLN_ORG" --yes

echo "✅ Successfully deleted application: $APP_NAME"
