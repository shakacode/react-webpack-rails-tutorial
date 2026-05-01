#!/bin/bash

set -euo pipefail

: "${APP_NAME:?APP_NAME environment variable is required}"
: "${CPLN_ORG:?CPLN_ORG environment variable is required}"

# Contract this relies on from `cpflow exists`:
#   - Exit status 0              -> app exists (stdout may contain an informational banner).
#   - Exit status non-zero, no
#     recognizable error tokens  -> app does not exist.
#   - Exit status non-zero with
#     tokens like "Double check
#     your org", "Unknown API
#     token format", "ERROR",
#     "Error:", "Traceback", or
#     "Net::"                    -> a real failure; surface and exit 2.
# TODO: replace this string-matching with a structured signal once `cpflow exists` exposes one
# (e.g. a distinct exit code for "not found" vs. API/auth errors, or `cpflow exists --json`).
exists_output=""
if exists_output="$(cpflow exists -a "$APP_NAME" --org "$CPLN_ORG" 2>&1)"; then
  if [[ -n "$exists_output" ]]; then
    printf '%s\n' "$exists_output"
  fi
  exit 0
fi

case "$exists_output" in
  *"Double check your org"*|*"Unknown API token format"*|*"ERROR"*|*"Error:"*|*"Traceback"*|*"Net::"*)
    echo "Failed to determine whether application exists: $APP_NAME" >&2
    printf '%s\n' "$exists_output" >&2
    exit 2
    ;;
esac

if [[ -n "$exists_output" ]]; then
  echo "cpflow exists returned non-zero output that did not match known error patterns:" >&2
  printf '%s\n' "$exists_output" >&2
fi

exit 1
