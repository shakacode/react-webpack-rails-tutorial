# Deploying RoR tutorial app on Controlplane

## Prerequisites

1. Should have [Controlplane (CPLN)](https://controlplane.com) account set up

2. Set up `organization` for testing in that account

3. Install CPLN cli (and configure access)

4. Install Heroku to Controlplane kit from https://github.com/shakacode/heroku-to-control-plane

## Setup and run

Check if organization and location are correct in `.controlplane/controlplane.yml`

```sh
# Provision all infrastructure on CPLN. It will use templates from .controlplane/templates folder
cpl setup gvc postgres redis rails -a ror-tutorial

# Build and push docker image to CPLN repository
cpl build -a ror-tutorial

# Promote image to app
cpl promote -a ror-tutorial

# See how app is starting up
cpl logs -a ror-tutorial

# Open app in browser (once it has started up)
cpl open -a ror-tutorial
```

## Other notes

### `entrypoint.sh`
- waits for postgres and redis to be available
- runs `rails db:prepare` to create&seed/migrate database

## TODO
- add healthchecks

