# Deploying tutorial app on Control Plane

## Overview
This simple example shows how to deploy a simple app on Control Plane using the `cpl` gem.

To maximize simplicity, this example creates Postgres and Redis as workloads in the same GVC as the app.
In a real app, you would likely use persistent, external resources, such as AWS RDS and AWS ElastiCache.

You can see the definition of Postgres and Redis in the `.controlplane/templates` directory.

## Prerequisites

1. Ensure your [Control Plane](https://controlplane.com) account is set up.
You should have an `organization` `<your-org>` for testing in that account.
You will modify value for `aliases.common.cpln_org` in `.controlplane/controlplane.yml`.
If you need an organization, please [contact Shakacode](mailto:controlplane@shakacode.com).

2. Run `cpln image docker-login --org <your-org>` to ensure that you have access to the Control Plane Docker registry.

3. Install Control Plane CLI (and configure access) using `npm install -g @controlplane/cli`.
You can update the `cpln` command line with `npm update -g @controlplane/cli`.
Then run `cpln login` to ensure access.
For more informatation check out the
[docs here](https://docs.controlplane.com/quickstart/quick-start-3-cli#getting-started-with-the-cli).

4. Install the latest version of
[`cpl` gem](https://rubygems.org/gems/cpl)
on your project's Gemfile or globally.
For more information check out
[Heroku to Control Plane](https://github.com/shakacode/heroku-to-control-plane).

5. This project has a `Dockerfile` for Control Plane in `.controlplane` directory.
You can use it as an example for your project.
Ensure that you have Docker running.

### Tips
Do not confuse the `cpl` CLI with the `cpln` CLI.
The `cpl` CLI is the Heroku to Control Plane playbook CLI.
The `cpln` CLI is the Control Plane CLI.

## Project Configuration
See the filese in the `./controlplane` directory.

1. `/templates`: defines the objects created with the `cpl setup` command.
These YAML files are the same as used by the `cpln apply` command.
2. `/controlplane.yml`: defines your application, including the organization, location, and app name.
3. `Dockerfile`: defines the Docker image used to run the app on Control Plane.
4. `entrypoint.sh`: defines the entrypoint script used to run the app on Control Plane.

## Setup and run

Check if the Control Plane organization and location are correct in `.controlplane/controlplane.yml`.
Alternatively, you can use `CPLN_ORG` environment variable to set the organization name.
You should be able to see this information in the Control Plane UI.

**Note:** The below commands use `cpl` which is the Heroku to Control Plane playbook gem,
and not `cpln` which is the Control Plane CLI.

```sh
# Use environment variable to prevent repetition
export APP_NAME=tutorial-app

# Provision all infrastructure on Control Plane.
# app tutorial-app will be created per definition in .controlplane/controlplane.yml
cpl apply-template gvc postgres redis rails daily-task -a $APP_NAME

# Build and push docker image to Control Plane repository
# Note, may take many minutes. Be patient.
# Check for error messages, such as forgetting to run `cpln image docker-login --org <your-org>`
cpl build-image -a $APP_NAME

# Promote image to app after running `cpl build-image command`
# Note, the UX of images may not show the image for up to 5 minutes.
# However, it's ready.
cpl deploy-image -a $APP_NAME

# See how app is starting up
cpl logs -a $APP_NAME

# Open app in browser (once it has started up)
cpl open -a $APP_NAME
```

### Promoting code updates

After committing code, you will update your deployment of `tutorial-app` with the following commands:

```sh
# Assuming you have already set APP_NAME env variable to tutorial-app
# Build and push new image with sequential image tagging, e.g. 'tutorial-app:1', then 'tutorial-app:2', etc.
cpl build-image -a $APP_NAME

# Run database migrations (or other release tasks) with latest image,
# while app is still running on previous image.
# This is analogous to the release phase.
cpl runner rails db:migrate -a $APP_NAME --image latest

# Pomote latest image to app after migrations run
cpl deploy-image -a $APP_NAME
```

If you needed to push a new image with a specific commit SHA, you can run the following command:

```sh
# Build and push with sequential image tagging and commit SHA, e.g. 'tutorial-app:123_ABCD'
cpl build-image -a $APP_NAME --commit ABCD
```

## Other notes

### `entrypoint.sh`
- waits for Postgres and Redis to be available
- runs `rails db:prepare` to create/seed or migrate the database
