#!/bin/bash

# This script handles the deployment to Control Plane and extracts the Rails URL
# 
# Required environment variables:
# - APP_NAME: Name of the application to deploy
# - CPLN_ORG: Control Plane organization
#
# Outputs:
# - rails_url: URL of the deployed Rails application

set -e

# Validate required environment variables
: "${APP_NAME:?APP_NAME environment variable is required}"
: "${CPLN_ORG:?CPLN_ORG environment variable is required}"
: "${GITHUB_SHA:?GITHUB_SHA environment variable is required}"

# Set deployment timeout (15 minutes)
TIMEOUT=900

TEMP_OUTPUT=$(mktemp)
trap 'rm -f "$TEMP_OUTPUT"' EXIT

# Build the Docker image
echo "🏗️ Building Docker image..."
if ! cpflow build-image -a "$APP_NAME" --commit="$GITHUB_SHA" --org="$CPLN_ORG"; then
    echo "❌ Docker image build failed"
    exit 1
fi

# Deploy the application
echo "🚀 Deploying to Control Plane..."
if timeout "$TIMEOUT" cpflow deploy-image -a "$APP_NAME" --run-release-phase --org "$CPLN_ORG" --verbose | tee "$TEMP_OUTPUT"; then
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
    echo "❌ Deployment timed out after $TIMEOUT seconds"
    exit 1
else
    echo "❌ Deployment to Control Plane failed"
    exit 1
fi
