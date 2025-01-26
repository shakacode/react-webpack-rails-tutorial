#!/bin/bash

# This script retrieves the commit SHA for deployment
# It handles both PR and direct branch deployments
# 
# Required environment variables:
# - PR_NUMBER: Pull request number (optional)
# - GITHUB_TOKEN: GitHub token for API access
#
# Outputs:
# - sha: Full commit SHA
# - sha_short: Short (7 char) commit SHA

set -e

if [ -n "$PR_NUMBER" ]; then
    # If PR_NUMBER is set, get the PR's head SHA
    if ! PR_SHA=$(gh pr view $PR_NUMBER --json headRefOid --jq '.headRefOid'); then
        echo "Failed to get PR head SHA" >&2
        exit 1
    fi
    echo "sha=$PR_SHA" >> "$GITHUB_OUTPUT"
    echo "sha_short=${PR_SHA:0:7}" >> "$GITHUB_OUTPUT"
    echo "Using PR head commit SHA: ${PR_SHA:0:7}"
else
    # For direct branch deployments, use the current commit SHA
    if ! CURRENT_SHA=$(git rev-parse HEAD); then
        echo "Failed to get current SHA" >&2
        exit 1
    fi
    echo "sha=$CURRENT_SHA" >> "$GITHUB_OUTPUT"
    echo "sha_short=${CURRENT_SHA:0:7}" >> "$GITHUB_OUTPUT"
    echo "Using branch commit SHA: ${CURRENT_SHA:0:7}"
fi
