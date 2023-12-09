#!/bin/bash -e
# Runs before the main command

wait_for_service()
{
  until curl -I -sS $1 2>&1 | grep -q "Empty reply from server"; do
    echo " -- $1 is unavailable, sleeping..."
    sleep 1
  done
  echo " -- $1 is available"
}

echo " -- Starting entrypoint.sh"

echo " -- Waiting for services"

# Strip out the host and the port for curl and to keep full resource URL secret
wait_for_service $(echo $DATABASE_URL | sed -e 's|^.*@||' -e 's|/.*$||')
wait_for_service $(echo $REDIS_URL | sed -e 's|redis://||' -e 's|/.*$||')

# If running the rails server then create or migrate existing database
if [ "${1}" == "./bin/rails" ] && [ "${2}" == "server" ]; then
  echo " -- Preparing database"
  ./bin/rails db:prepare
fi

echo " -- Finishing entrypoint.sh, executing '$@'"
exec "$@"
