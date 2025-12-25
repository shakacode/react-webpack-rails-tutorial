#!/bin/bash -e


log() {
    echo "[`date +%Y-%m-%d:%H:%M:%S`]: $1"
}

error_exit() {
    log "$1" 1>&2
    exit 1
}

log 'Running release_script.sh per controlplane.yml'

if [ -x ./bin/rails ]; then
    log 'Run DB migrations'
    # SECRET_KEY_BASE is required for Rails 8.1+ initialization but not used for migrations
    # The actual secret key will be provided at runtime by the environment
    SECRET_KEY_BASE="${SECRET_KEY_BASE:-precompile_placeholder}" ./bin/rails db:prepare || error_exit "Failed to run DB migrations"
else
    error_exit "./bin/rails does not exist or is not executable"
fi

log 'Completed release_script.sh per controlplane.yml'
