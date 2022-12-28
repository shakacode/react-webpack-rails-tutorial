# Deploying tutorial app on Control Plane

## Prerequisites

1. Should have [Control Plane](https://controlplane.com) account set up.

2. Set up `organization` for testing in that account and modify org `.controlplane/controlplane.yml` .

3. Install Control Plane CLI (and configure access) [docs here](https://docs.controlplane.com/quickstart/quick-start-3-cli#getting-started-with-the-cli).

4. Install Heroku to Control Plane playbook from https://github.com/shakacode/heroku-to-control-plane.

## Setup and run

Check if the organization and location are correct in `.controlplane/controlplane.yml`.

```sh
# Note, below commands use `cpl` which is the Heroku to Control Plane playbook script.

# Provision all infrastructure on Control Plane. It will use templates from .controlplane/templates folder.
cpl setup gvc postgres redis rails -a ror-tutorial

# Build and push docker image to Control Plane repository
cpl build -a ror-tutorial

# Promote image to app after running `cpl build command`
cpl promote -a ror-tutorial

# See how app is starting up
cpl logs -a ror-tutorial

# Open app in browser (once it has started up)
cpl open -a ror-tutorial
```

## Other notes

### `entrypoint.sh`
- waits for Postgres and Redis to be available
- runs `rails db:prepare` to create/seed or migrate the database
