#!/bin/bash

# Script to delete a Control Plane application
# Required environment variables:
# - APP_NAME: Name of the application to delete
# - CPLN_ORG: Organization name

set -e

# Validate required environment variables
: "${APP_NAME:?APP_NAME environment variable is required}"
: "${CPLN_ORG:?CPLN_ORG environment variable is required}"

# Safety check: prevent deletion of production or staging apps
if echo "$APP_NAME" | grep -iqE '(production|staging)'; then
    echo "❌ ERROR: Cannot delete apps containing 'production' or 'staging' in their name" >&2
    echo "🛑 This is a safety measure to prevent accidental deletion of production or staging environments" >&2
    echo "   App name: $APP_NAME" >&2
    exit 1
fi

# Check if app exists before attempting to delete
echo "🔍 Checking if application exists: $APP_NAME"
if ! cpflow exists -a "$APP_NAME"; then
    echo "⚠️ Application does not exist: $APP_NAME"
    exit 0
fi

# Delete the application
echo "🗑️ Deleting application: $APP_NAME"
if ! cpflow delete -a "$APP_NAME" --force; then
    echo "❌ Failed to delete application: $APP_NAME" >&2
    exit 1
fi

echo "✅ Successfully deleted application: $APP_NAME"
