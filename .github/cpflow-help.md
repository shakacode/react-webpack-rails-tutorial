# Control Plane GitHub Flow

## PR commands

`/deploy-review-app`
- Creates the review app if it does not exist
- Builds the PR commit image
- Deploys the image and comments with the review URL
- The comment must contain exactly `/deploy-review-app` and no other text

`/delete-review-app`
- Deletes the review app when the PR is done
- This also runs automatically when the PR closes
- The comment must contain exactly `/delete-review-app` and no other text

## Repository secrets

| Name | Required | Notes |
| --- | --- | --- |
| `CPLN_TOKEN_STAGING` | yes | Service-account token scoped to the staging org. |
| `CPLN_TOKEN_PRODUCTION` | yes (for promote) | Service-account token scoped to the production org. |
| `DOCKER_BUILD_SSH_KEY` | optional | Private SSH key used when Docker builds fetch private deps via `RUN --mount=type=ssh`. |

## Repository variables

| Name | Required | Notes |
| --- | --- | --- |
| `CPLN_ORG_STAGING` | yes | Control Plane org for staging and review apps. |
| `CPLN_ORG_PRODUCTION` | yes (for promote) | Control Plane org for production. |
| `STAGING_APP_NAME` | yes | App name in `controlplane.yml` used as the staging deploy target. |
| `PRODUCTION_APP_NAME` | yes (for promote) | App name in `controlplane.yml` used as the production deploy target. |
| `REVIEW_APP_PREFIX` | yes | Prefix for per-PR review app names (e.g. `review-app`). |
| `STAGING_APP_BRANCH` | optional | Custom staging branch. Custom branches must also appear in `cpflow-deploy-staging.yml`'s push filter. |
| `PRIMARY_WORKLOAD` | optional | Workload polled for health and rollback (defaults to `rails`). |
| `DOCKER_BUILD_EXTRA_ARGS` | optional | Newline-delimited extra docker build tokens (e.g. `--build-arg=FOO=bar`). |
| `DOCKER_BUILD_SSH_KNOWN_HOSTS` | optional | SSH known_hosts entries when SSH build hosts are not GitHub.com. |
| `HEALTH_CHECK_ACCEPTED_STATUSES` | optional | Space-separated HTTP statuses considered healthy on promote (default `200 301 302`). |
| `HEALTH_CHECK_RETRIES` / `HEALTH_CHECK_INTERVAL` | optional | Production health polling controls; defaults to `24` retries and `15` seconds. |
| `ROLLBACK_READINESS_RETRIES` / `ROLLBACK_READINESS_INTERVAL` | optional | Post-rollback health polling controls; defaults to `24` retries and `15` seconds. |
| `CPLN_CLI_VERSION` | optional | Pin a specific `@controlplane/cli` version; falls back to the action default when unset. |
| `CPFLOW_VERSION` | optional | Pin a specific cpflow gem version; falls back to the generated default when unset. |

## Workflow behavior

- Review apps are opt-in and created with `/deploy-review-app`
- New commits redeploy existing review apps automatically
- Slash command workflows run from the default branch until merged. Test PR-branch edits with `gh workflow run cpflow-deploy-review-app.yml --ref <branch> -f pr_number=<pr-number>`.
- Pushes to the staging branch deploy staging automatically
- Promotion to production is manual via the Actions tab
- A nightly workflow removes stale review apps
