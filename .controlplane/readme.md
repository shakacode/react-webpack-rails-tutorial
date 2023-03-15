# Deploying tutorial app on Control Plane

## Overview
This simple example shows how to deploy a simple app on Control Plane using the `cpl` gem.

To maximize simplicity, this example creates Postgres and Redis as workloads in the same GVC as the app.
In a real app, you would likely use persistent, external resources, such as AWS RDS and AWS ElastiCache.

You can see the definition of Postgres and Redis in the `.controlplane/templates` directory.

## Prerequisites

1. Ensure your [Control Plane](https://controlplane.com) account is set up.

2. Set up an `organization` for testing in that account and modify `aliases.common.cpln_org` in `.controlplane/controlplane.yml` .

3. Install Control Plane CLI (and configure access) [docs here](https://docs.controlplane.com/quickstart/quick-start-3-cli#getting-started-with-the-cli). You can update the `cpln` command line with the same command as installation, `npm install -g @controlplane/cli`. Then run `cpln login` to ensure access.

4. Install [Heroku to Control Plane](https://github.com/shakacode/heroku-to-control-plane) playbook CLI [`cpl` gem](https://rubygems.org/gems/cpl) on your project's Gemfile or globally.

5. This project has a `Dockerfile` for Control Plane in this directory. You can use it as an example for your project. Ensure that you have Docker running.

## Tips
Do not confuse the `cpl` CLI with the `cpln` CLI. The `cpl` CLI is the Heroku to Control Plane playbook CLI. The `cpln` CLI is the Control Plane CLI.

## Project Configuration
See the filese in the `./controlplane` directory.

1. `/templates`: defines the objects created with the `cpl setup` command.
2. `/controlplane.yml`: defines the organization, location, and app name.
3. `Dockerfile`: defines the Docker image used to run the app on Control Plane.
4. `entrypoint.sh`: defines the entrypoint script used to run the app on Control Plane.

## Setup and run

Check if the Control Plane organization and location are correct in `.controlplane/controlplane.yml`. You should be able to see this information in the Control Plane UI.

```sh
# Note, below commands use `cpl` which is the Heroku to Control Plane playbook script.

# Provision all infrastructure on Control Plane.
# app tutorial-app will be created per definition in .controlplane/controlplane.yml
cpl setup gvc postgres redis rails -a tutorial-app

# Build and push docker image to Control Plane repository
# Note, may take many minutes. Be patient.
cpl build-image -a tutorial-app

# Promote image to app after running `cpl build-image command`
cpl deploy-image -a tutorial-app

# See how app is starting up
cpl logs -a tutorial-app

# Open app in browser (once it has started up)
cpl open -a tutorial-app
```

## Promoting code upgrades

```sh
# Build and push new image with sequential image tagging, e.g. 'ror-tutorial_123'
cpl build-image -a tutorial-app

# OR
# Build and push with sequential image tagging and commit SHA, e.g. 'ror-tutorial_123_ABCD'
cpl build-image -a tutorial-app --commit ABCD

# Run database migrations (or other release tasks) with latest image,
# while app is still running on previous image.
# This is analogous to the release phase.
cpl runner rails db:migrate -a tutorial-app --image latest

# Pomote latest image to app
cpl deploy-image -a tutorial-app
```

## Other notes

### `entrypoint.sh`
- waits for Postgres and Redis to be available
- runs `rails db:prepare` to create/seed or migrate the database
