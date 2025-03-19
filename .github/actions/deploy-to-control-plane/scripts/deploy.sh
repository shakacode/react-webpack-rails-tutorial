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
# - rails_url: URL of the deployed Rails application

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

last_output=$(cpln workload get 2>&1)
echo "$last_output"

# Deploy the application
echo "🚀 Deploying to Control Plane (timeout: ${WAIT_TIMEOUT}s)"
if timeout "$WAIT_TIMEOUT" cpflow deploy-image -a "$APP_NAME" --run-release-phase --org "$CPLN_ORG" --verbose | tee "$TEMP_OUTPUT"; then
    # Extract Rails URL from deployment output
    RAILS_URL=$(grep -oP 'https://rails-[^[:space:]]*\.cpln\.app(?=\s|$)' "$TEMP_OUTPUT" | head -n1)
    if [ -n "$RAILS_URL" ]; then
        echo "rails_url=$RAILS_URL" >> "$GITHUB_OUTPUT"
        echo "✅ Deployment successful"
        echo "🚀 Rails URL: $RAILS_URL"
    else
        echo "❌ Failed to extract Rails URL from deployment output"
        exit 1
    fi
elif [ $? -eq 124 ]; then
    echo "❌ Deployment timed out after $WAIT_TIMEOUT seconds"
    exit 1
else
    echo "❌ Deployment to Control Plane failed"
    exit 1
fi
