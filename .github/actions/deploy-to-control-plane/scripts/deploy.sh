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

echo "🚀 Deploying to Control Plane..."
TEMP_OUTPUT=$(mktemp)

# Deploy the application and capture output
if cpflow deploy-image -a "$APP_NAME" --run-release-phase --org "$CPLN_ORG" --verbose | tee "$TEMP_OUTPUT"; then
    # Extract Rails URL from deployment output
    RAILS_URL=$(grep -o 'https://rails-[^[:space:]]*\.cpln\.app' "$TEMP_OUTPUT")
    if [ -n "$RAILS_URL" ]; then
        echo "rails_url=$RAILS_URL" >> $GITHUB_OUTPUT
        echo "✅ Deployment successful: $RAILS_URL"
    else
        echo "❌ Failed to extract Rails URL"
        exit 1
    fi
else
    echo "❌ Deployment failed"
    exit 1
fi

# Clean up temporary file
rm -f "$TEMP_OUTPUT"
