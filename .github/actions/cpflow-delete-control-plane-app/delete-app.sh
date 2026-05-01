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
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if bash "${script_dir}/check-app-exists.sh"; then
  :
else
  exists_status=$?
  if [[ "$exists_status" -ne 1 ]]; then
    exit "$exists_status"
  fi
  echo "⚠️ Application does not exist: $APP_NAME"
  exit 0
fi

echo "🗑️ Deleting application: $APP_NAME"
cpflow delete -a "$APP_NAME" --org "$CPLN_ORG" --yes

echo "✅ Successfully deleted application: $APP_NAME"
