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

TEMP_OUTPUT=$(mktemp)

# Build the Docker image
echo "🏗️ Building Docker image..."
if ! cpflow build-image -a "$APP_NAME" --commit="$GITHUB_SHA" --org="$CPLN_ORG"; then
    echo "❌ Docker image build failed"
    exit 1
fi

# Deploy the application
echo "🚀 Deploying to Control Plane..."
if cpflow deploy-image -a "$APP_NAME" --run-release-phase --org "$CPLN_ORG" --verbose | tee "$TEMP_OUTPUT"; then
    # Extract Rails URL from deployment output
    RAILS_URL=$(grep -o 'https://rails-[^[:space:]]*\.cpln\.app' "$TEMP_OUTPUT")
    if [ -n "$RAILS_URL" ]; then
        echo "rails_url=$RAILS_URL" >> $GITHUB_OUTPUT
        echo "✅ Deployment successful"
        echo "🚀 Rails URL: $RAILS_URL"
    else
        echo "❌ Failed to extract Rails URL from deployment output"
        exit 1
    fi
else
    echo "❌ Deployment to Control Plane failed"
    exit 1
fi

# Clean up temporary file
rm -f "$TEMP_OUTPUT"
