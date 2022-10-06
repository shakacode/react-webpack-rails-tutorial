#!/bin/sh

DISABLE_DATABASE_ENVIRONMENT_CHECK=1 RAILS_ENV=production NODE_ENV=production rake db:setup
RAILS_ENV=production NODE_ENV=production rails s