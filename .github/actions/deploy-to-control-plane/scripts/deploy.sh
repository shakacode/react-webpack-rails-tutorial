#!/bin/bash

# This script handles the deployment to Control Plane and extracts the Rails URL
#
# Required environment variables:
# - APP_NAME: Name of the application to deploy
# - CPLN_ORG: Control Plane organization
#
# Optional environment variables:
# - WAIT_TIMEOUT: Timeout in seconds for deployment (default: 900)
#                 Must be a positive integer
#
# Outputs:
# - ENV APP_URL: URL of the deployed application

set -e

# Validate required environment variables
: "${APP_NAME:?APP_NAME environment variable is required}"
: "${CPLN_ORG:?CPLN_ORG environment variable is required}"

# Set and validate deployment timeout
WAIT_TIMEOUT=${WAIT_TIMEOUT:-900}
if ! [[ "${WAIT_TIMEOUT}" =~ ^[0-9]+$ ]]; then
  echo "❌ Invalid timeout value: ${WAIT_TIMEOUT}"
  exit 1
fi

TEMP_OUTPUT=$(mktemp)
trap 'rm -f "$TEMP_OUTPUT"' EXIT

# Deploy the application
echo "🚀 Deploying to Control Plane (timeout: ${WAIT_TIMEOUT}s)"
if ! timeout "${WAIT_TIMEOUT}" cpflow deploy-image -a "$APP_NAME" --run-release-phase --org "$CPLN_ORG" --verbose 2>&1 | tee "$TEMP_OUTPUT"; then
  echo "❌ Deployment failed"
  echo "Full output:"
  cat "$TEMP_OUTPUT"
  exit 1
fi

# Wait for all workloads to be ready
echo "⏳ Waiting for all workloads to be ready (timeout: ${WAIT_TIMEOUT}s)"
if ! timeout "${WAIT_TIMEOUT}" bash -c "cpflow ps:wait -a \"$APP_NAME\"" 2>&1 | tee -a "$TEMP_OUTPUT"; then
  TIMEOUT_EXIT=$?
  if [ ${TIMEOUT_EXIT} -eq 124 ]; then
    echo "❌ Timed out waiting for workloads after ${WAIT_TIMEOUT} seconds"
  else
    echo "❌ Workloads did not become ready"
  fi
  echo "Full output:"
  cat "$TEMP_OUTPUT"
  exit 1
fi

# Extract app URL from deployment output
APP_URL=$(grep -oP 'https://[^[:space:]]*\.cpln\.app(?=\s|$)' "$TEMP_OUTPUT" | head -n1)
if [ -z "$APP_URL" ]; then
  echo "❌ Error: Could not find app URL in deployment output"
  echo "Full output:"
  cat "$TEMP_OUTPUT"
  exit 1
fi

echo "✅ Deployment successful"
echo "🌐 App URL: $APP_URL"
echo "APP_URL=$APP_URL" >> "$GITHUB_OUTPUT"
