# Deploying tutorial app on Control Plane

---

_If you need a free demo account for Control Plane (no CC required), you can contact [Justin Gordon, CEO of ShakaCode](mailto:justin@shakacode.com)._

---

Check [how the `cpflow` gem (this project) is used in the Github actions](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/.github/actions/deploy-to-control-plane/action.yml).
Here is a brief [video overview](https://www.youtube.com/watch?v=llaQoAV_6Iw).

---

## Overview
This simple example shows how to deploy a simple app on Control Plane using the `cpflow` gem.

To maximize simplicity, this example creates Postgres and Redis as workloads in the same GVC as the app.
In a real app, you would likely use persistent, external resources, such as AWS RDS and AWS ElastiCache.

You can see the definition of Postgres and Redis in the `.controlplane/templates` directory.

## Prerequisites

1. Ensure your [Control Plane](https://shakacode.controlplane.com) account is set up.
You should have an `organization` `<your-org>` for testing in that account.
Set ENV variable `CPLN_ORG` to `<your-org>`. Alternatively, you may modify the 
value for `aliases.common.cpln_org` in `.controlplane/controlplane.yml`.
If you need an organization, please [contact Shakacode](mailto:controlplane@shakacode.com).

2. Install Control Plane CLI (and configure access) using `npm install -g @controlplane/cli`.
You can update the `cpln` command line with `npm update -g @controlplane/cli`.
Then run `cpln login` to ensure access.
For more informatation check out the
[docs here](https://shakadocs.controlplane.com/quickstart/quick-start-3-cli#getting-started-with-the-cli).

3. Run `cpln image docker-login --org <your-org>` to ensure that you have access to the Control Plane Docker registry.

4. Install the latest version of
[`cpflow` gem](https://rubygems.org/gems/cpflow)
on your project's Gemfile or globally.
For more information check out
[Heroku to Control Plane](https://github.com/shakacode/heroku-to-control-plane).

5. This project has a `Dockerfile` for Control Plane in `.controlplane` directory.
You can use it as an example for your project.
Ensure that you have Docker running.

### Tips
Do not confuse the `cpflow` CLI with the `cpln` CLI.
The `cpflow` CLI is the Heroku to Control Plane playbook CLI.
The `cpln` CLI is the Control Plane CLI.

## Project Configuration
See the filese in the `./controlplane` directory.

1. `/templates`: defines the objects created with the `cpflow setup` command.
These YAML files are the same as used by the `cpln apply` command.
2. `/controlplane.yml`: defines your application, including the organization, location, and app name.
3. `Dockerfile`: defines the Docker image used to run the app on Control Plane.
4. `entrypoint.sh`: defines the entrypoint script used to run the app on Control Plane.

## Setup and run

Check if the Control Plane organization and location are correct in `.controlplane/controlplane.yml`.
Alternatively, you can use `CPLN_ORG` environment variable to set the organization name.
You should be able to see this information in the Control Plane UI.

**Note:** The below commands use `cpflow` which is the Heroku to Control Plane playbook gem,
and not `cpln` which is the Control Plane CLI.

```sh
# Use environment variable to prevent repetition
export APP_NAME=react-webpack-rails-tutorial

# Provision all infrastructure on Control Plane.
# app react-webpack-rails-tutorial will be created per definition in .controlplane/controlplane.yml
cpflow setup-app -a $APP_NAME

# Build and push docker image to Control Plane repository
# Note, may take many minutes. Be patient.
# Check for error messages, such as forgetting to run `cpln image docker-login --org <your-org>`
cpflow build-image -a $APP_NAME

# Promote image to app after running `cpflow build-image command`
# Note, the UX of images may not show the image for up to 5 minutes.
# However, it's ready.
cpflow deploy-image -a $APP_NAME

# See how app is starting up
cpflow logs -a $APP_NAME

# Open app in browser (once it has started up)
cpflow open -a $APP_NAME
```

### Promoting code updates

After committing code, you will update your deployment of `react-webpack-rails-tutorial` with the following commands:

```sh
# Assuming you have already set APP_NAME env variable to react-webpack-rails-tutorial
# Build and push new image with sequential image tagging, e.g. 'react-webpack-rails-tutorial:1', then 'react-webpack-rails-tutorial:2', etc.
cpflow build-image -a $APP_NAME

# Run database migrations (or other release tasks) with latest image,
# while app is still running on previous image.
# This is analogous to the release phase.
cpflow run -a $APP_NAME --image latest -- rails db:migrate

# Pomote latest image to app after migrations run
cpflow deploy-image -a $APP_NAME
```

If you needed to push a new image with a specific commit SHA, you can run the following command:

```sh
# Build and push with sequential image tagging and commit SHA, e.g. 'react-webpack-rails-tutorial:123_ABCD'
cpflow build-image -a $APP_NAME --commit ABCD
```

## HTTP/2 and Thruster Configuration

This application uses [Thruster](https://github.com/basecamp/thruster), a zero-config HTTP/2 proxy from Basecamp, for optimized performance on Control Plane.

### What is Thruster?

Thruster is a small, fast HTTP/2 proxy designed for Ruby web applications. It provides:
- **HTTP/2 Support**: Automatic HTTP/2 with multiplexing for faster asset loading
- **Asset Caching**: Intelligent caching of static assets
- **Compression**: Automatic gzip/Brotli compression
- **TLS Termination**: Built-in Let's Encrypt support (not needed on Control Plane)

### Control Plane Configuration for Thruster

To enable Thruster with HTTP/2 on Control Plane, two configuration changes are required:

#### 1. Dockerfile CMD (`.controlplane/Dockerfile`)

The Dockerfile must use Thruster to start the Rails server:

```dockerfile
# Use Thruster HTTP/2 proxy for optimized performance
CMD ["bundle", "exec", "thrust", "bin/rails", "server"]
```

**Note:** Do NOT use `--early-hints` flag as Thruster handles this automatically.

#### 2. Workload Port Protocol (`.controlplane/templates/rails.yml`)

The workload port must be configured for HTTP/2:

```yaml
ports:
  - number: 3000
    protocol: http2  # Must be http2, not http
```

### Important: Dockerfile vs Procfile

**On Heroku:** The `Procfile` defines how dynos start:
```
web: bundle exec thrust bin/rails server
```

**On Control Plane/Kubernetes:** The `Dockerfile CMD` defines how containers start. The Procfile is ignored.

This is a common source of confusion when migrating from Heroku. Always ensure your Dockerfile CMD matches your intended startup command.

### Verifying HTTP/2 is Enabled

After deployment, verify HTTP/2 is working:

1. **Check workload logs:**
   ```bash
   cpflow logs -a react-webpack-rails-tutorial-staging
   ```

   You should see Thruster startup messages:
   ```
   [thrust] Starting Thruster HTTP/2 proxy
   [thrust] Proxying to http://localhost:3000
   [thrust] Serving from ./public
   ```

2. **Test HTTP/2 in browser:**
   - Open DevTools → Network tab
   - Load the site
   - Check the Protocol column (should show "h2" for HTTP/2)

3. **Check response headers:**
   ```bash
   curl -I https://your-app.cpln.app
   ```
   Look for HTTP/2 indicators in the response.

### Troubleshooting

#### Workload fails to start

**Symptom:** Workload shows as unhealthy or crashing

**Solution:** Check logs with `cpflow logs -a <app-name>`. Common issues:
- Missing `thruster` gem in Gemfile
- Incorrect CMD syntax in Dockerfile
- Port mismatch (ensure Rails listens on 3000)

#### HTTP/2 not working (showing HTTP/1.1)

**Symptom:** Browser shows protocol as "http/1.1" instead of "h2"

**Solution:**
1. Verify `protocol: http2` in `.controlplane/templates/rails.yml`
2. Apply the template: `cpflow apply-template rails -a <app-name>`
3. Redeploy: `cpflow deploy-image -a <app-name>`

#### Assets not loading or CORS errors

**Symptom:** Static assets return 404 or fail to load

**Solution:**
- Ensure `bin/rails assets:precompile` runs in Dockerfile
- Verify `public/packs/` directory exists in container
- Check Thruster is serving from correct directory

### Performance Benefits

With Thruster and HTTP/2 enabled on Control Plane, you should see:
- **20-30% faster** initial page loads due to HTTP/2 multiplexing
- **40-60% reduction** in transfer size with Brotli compression
- **Improved caching** of static assets
- **Lower server load** due to efficient asset serving

For detailed Thruster documentation, see [docs/thruster.md](../docs/thruster.md).

## Other notes

### `entrypoint.sh`
- waits for Postgres and Redis to be available
- runs `rails db:prepare` to create/seed or migrate the database

## CI Automation, Review Apps and Staging

_Note, some of the URL references are internal for the ShakaCode team._

 Review Apps (deployment of apps based on a PR) are done via Github Actions.

The review apps work by creating isolated deployments for each branch through this automated process. When a branch is pushed, the action:

1. Sets up the necessary environment and tools
2. Creates a unique deployment for that branch if it doesn't exist
3. Builds a Docker image tagged with the branch's commit SHA
4. Deploys this image to Control Plane with its own isolated environment

This allows teams to:
- Preview changes in a production-like environment
- Test features independently
- Share working versions with stakeholders
- Validate changes before merging to main branches

The system uses Control Plane's infrastructure to manage these deployments, with each branch getting its own resources as defined in the controlplane.yml configuration.


### Workflow for Developing Github Actions for Review Apps

1. Create a PR with changes to the Github Actions workflow
2. Make edits to file such as `.github/actions/deploy-to-control-plane/action.yml`
3. Run a script like `ga .github && gc -m fixes && gp` to commit and push changes (ga = git add, gc = git commit, gp = git push)
4. Check the Github Actions tab in the PR to see the status of the workflow
