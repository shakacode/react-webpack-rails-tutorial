#!/bin/bash -e
# Runs before the main command
# This script is unique to this demo project as it ensures the database and Redis are ready
# before running the rails server or other services.
# You can ignore this sort of "wait" if using external services, like AWS RDS or AWS Aurora.

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

echo " -- Finishing entrypoint.sh, executing '$@'"

# Run the main command
exec "$@"
