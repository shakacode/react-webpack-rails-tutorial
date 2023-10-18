# Deploying tutorial app on Control Plane

## Overview
This simple example shows how to deploy a simple app on Control Plane using the `cpl` gem.

To maximize simplicity, this example creates Postgres and Redis as workloads in the same GVC as the app.
In a real app, you would likely use persistent, external resources, such as AWS RDS and AWS ElastiCache.

You can see the definition of Postgres and Redis in the `.controlplane/templates` directory.

## Prerequisites

1. Ensure your [Control Plane](https://controlplane.com) account is set up.
You should have an `organization` <your-org> for testing in that account. You will modify value for `aliases.common.cpln_org` in `.controlplane/controlplane.yml`. If you need an organization, please [contact Shakcode](mailto:controlplane@shkacode.com).

2. Run `cpln image docker-login --org <your-org>` to ensure that you have access to the Control Plane Docker registry.

3. Install Control Plane CLI (and configure access) [docs here](https://docs.controlplane.com/quickstart/quick-start-3-cli#getting-started-with-the-cli), `npm install -g @controlplane/cli`. You can update the `cpln` command line with `npm update -g @controlplane/cli`, . Then run `cpln login` to ensure access.

4. Install [Heroku to Control Plane](https://github.com/shakacode/heroku-to-control-plane) playbook CLI [`cpl` gem](https://rubygems.org/gems/cpl) on your project's Gemfile or globally. Use the current version.

5. This project has a `Dockerfile` for Control Plane in this directory. You can use it as an example for your project. Ensure that you have Docker running.

## Tips
Do not confuse the `cpl` CLI with the `cpln` CLI. The `cpl` CLI is the Heroku to Control Plane playbook CLI. The `cpln` CLI is the Control Plane CLI.

## Project Configuration
See the filese in the `./controlplane` directory.

1. `/templates`: defines the objects created with the `cpl setup` command. These YAML files are the same as used by the `cpln apply` command.
2. `/controlplane.yml`: defines your application, including the organization, location, and app name.
3. `Dockerfile`: defines the Docker image used to run the app on Control Plane.
4. `entrypoint.sh`: defines the entrypoint script used to run the app on Control Plane.

## Setup and run

Check if the Control Plane organization and location are correct in `.controlplane/controlplane.yml`. You should be able to see this information in the Control Plane UI.

Note, below commands use `cpl` which is the Heroku to Control Plane playbook gem, and
not `cpln` which is the Control Plane CLI.

```sh
# Provision all infrastructure on Control Plane.
# app tutorial-app will be created per definition in .controlplane/controlplane.yml
cpl apply-template gvc postgres redis rails -a tutorial-app

# Build and push docker image to Control Plane repository
# Note, may take many minutes. Be patient. Check for error messages, such as forgetting to run `cpln image docker-login --org <your-org>`
cpl build-image -a tutorial-app

# Promote image to app after running `cpl build-image command`
# Note, the UX of images may not show the image for up to 5 minutes. However, it's ready.
cpl deploy-image -a tutorial-app

# See how app is starting up
cpl logs -a tutorial-app

# Open app in browser (once it has started up)
cpl open -a tutorial-app
```

Notice that in the first attempt to build the image, you may get it interrupted with a message like this:

```
89c3244a87b2: Waiting
80231db1194c: Waiting
f1c1f2298584: Waiting
ccba29d69370: Waiting
unsupported:
***  You are trying to push/pull to your org's private registry in Control Plane.  ***
***  First, grant docker access the registry using the 'cpln' command:             ***

       cpln image docker-login --org tutorial-app
```

Run the given command as instructed and repeat the `build-image` command.

### Promoting code updates

After committing code, you will update your deployment of `tutorial-app` with the following commands:

```sh
# Build and push new image with sequential image tagging, e.g. 'tutorial-app:1', then 'tutorial-app:2', etc.
cpl build-image -a tutorial-app

# Run database migrations (or other release tasks) with latest image,
# while app is still running on previous image.
# This is analogous to the release phase.
cpl runner rails db:migrate -a tutorial-app --image latest

# Pomote latest image to app after migrations run
cpl deploy-image -a tutorial-app
```

If you needed to push a new image with a specific commit SHA, you can run the following command:

```sh
# Build and push with sequential image tagging and commit SHA, e.g. 'tutorial-app:123_ABCD'
cpl build-image -a tutorial-app --commit ABCD
```

## Other notes

### `entrypoint.sh`
- waits for Postgres and Redis to be available
- runs `rails db:prepare` to create/seed or migrate the database
