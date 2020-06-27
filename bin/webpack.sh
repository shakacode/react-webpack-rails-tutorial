#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

__root="$(dirname $(dirname $(realpath $0)))"
cd $__root

# echo BEFORE
# echo RAILS_ENV is ${RAILS_ENV:-UNDEFINED}
# echo NODE_ENV is ${NODE_ENV:-UNDEFINED}

# From default for bin/webpack from @rails/webpacker
# ENV["RAILS_ENV"] ||= ENV["RACK_ENV"] || "development"
# ENV["NODE_ENV"]  ||= "development"

RAILS_ENV=${RAILS_ENV:-${RACK_ENV:-development}}
NODE_ENV=${NODE_ENV:-development}

echo Running $0
echo RAILS_ENV is $RAILS_ENV, NODE_ENV is $NODE_ENV


#if [[ $RAILS_ENV = "production" ]] ; then
#  yarn run build:production
#fi

#if [[ $RAILS_ENV = "test" ]] ; then
#  yarn run build:test
#fi

bundle exec rake react_on_rails:locale

# In case you have your build scripts in the /client subdirectory
cd client

case $NODE_ENV in
  test)
#    rm -rf public/webpack/development || true
    yarn run build:test "$@"
    ;;
  production)
    yarn run build:production "$@"
    ;;
  *)
    yarn run build:dev "$@"
esac
