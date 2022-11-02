# Deploying RoR tutorial app on Controlplane

## Prerequisites

1. Should have [Controlplane (CPLN)](https://controlplane.com) account set up

2. Set up `organization` for testing in that account

3. Install CPLN cli (and configure access)

4. Install Heroku to Controlplane kit from https://github.com/shakacode/heroku-to-control-plane

## Initial steps

1. fill in and review `.controlplane/controlplane.yaml`

2. provision app infrastructure from templates at `.controlplane/templates` with
```sh
# can be done individually
cpl setup gvc -a ror-tutorial
cpl setup postgres -a ror-tutorial
...

# or as one command
cpl setup gvc postgres redis rails -a ror-tutorial
```

3. build and push docker image
```sh
cpl build -a ror-tutorial
```

4. go to CPLN and check app working

## Other notes

### `entrypoint.sh`
- waits for postgres and redis to be available
- runs `rails db:prepare` to create&seed/migrate database

## TODO
- add healthchecks

