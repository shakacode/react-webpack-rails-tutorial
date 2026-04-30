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
    printf '%s\n' "$exists_output"
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
