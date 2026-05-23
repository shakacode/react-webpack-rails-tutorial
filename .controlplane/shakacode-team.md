# Internal Notes to the Shakacode Team

## Deployment

Deployments are handled by Control Plane configuration in this repo and GitHub Actions.

### Review Apps
- Add a comment `+review-app-deploy` to any PR to deploy a review app
- The generated app name is `${REVIEW_APP_PREFIX}-${PR_NUMBER}`. Keep
  `REVIEW_APP_PREFIX` set to `qa-react-webpack-rails-tutorial-pr` so review
  apps use names like `qa-react-webpack-rails-tutorial-pr-1234`, matching the
  prefix-backed config in `.controlplane/controlplane.yml`.
- New pushes to a PR redeploy only after the review app already exists.
- Add `+review-app-delete` to delete a review app manually; closing the PR also
  deletes it automatically. Use `+review-app-help` for the command reference.

### Staging Environment
- **Automatic**: Any merge to the `master` branch automatically deploys to staging
- **URLs**:
  - [Control Plane Console - Staging](https://console.cpln.io/console/org/shakacode-open-source-examples-staging/gvc/react-webpack-rails-tutorial-staging/workload/rails/-info)
  - [Staging App](https://staging.reactrails.com/)

### Production Environment
- **Manual**: Run the [cpflow-promote-staging-to-production workflow](https://github.com/shakacode/react-webpack-rails-tutorial/actions/workflows/cpflow-promote-staging-to-production.yml) on GitHub
- Rollback restores workload images only; database migrations and other
  `--run-release-phase` side effects are not reversed automatically.
- **URLs**:
  - [Control Plane Console - Production](https://console.cpln.io/console/org/shakacode-open-source-examples-production/gvc/react-webpack-rails-tutorial-production/workload/rails/-info)
  - [Production App](https://reactrails.com/)

### GitHub Repository Settings

Required repository secrets:

- `CPLN_TOKEN_STAGING`
- `CPLN_TOKEN_PRODUCTION`

Required repository variables:

- `CPLN_ORG_STAGING=shakacode-open-source-examples-staging`
- `CPLN_ORG_PRODUCTION=shakacode-open-source-examples-production`
- `STAGING_APP_NAME=react-webpack-rails-tutorial-staging`
- `PRODUCTION_APP_NAME=react-webpack-rails-tutorial-production`
- `REVIEW_APP_PREFIX=qa-react-webpack-rails-tutorial-pr`
- `STAGING_APP_BRANCH=master`
- `PRIMARY_WORKLOAD=rails`

Optional repository settings:

- `DOCKER_BUILD_SSH_KEY`: secret for private SSH dependencies during Docker builds.
- `DOCKER_BUILD_EXTRA_ARGS`: newline-delimited Docker build tokens, such as `--build-arg=FOO=bar`.
- `DOCKER_BUILD_SSH_KNOWN_HOSTS`: custom `known_hosts` entries when SSH build hosts are not GitHub.com.
- `CPLN_CLI_VERSION`: pin a specific `@controlplane/cli` version; defaults to the generated action pin.
- `CPFLOW_VERSION`: optional runtime gem-install override. When unset, workflows build
  `cpflow` from the checked-out upstream workflow ref. When set, use the RubyGems
  version number without a leading `v`.
- `HEALTH_CHECK_ACCEPTED_STATUSES`: production promotion health statuses; defaults to `200 301 302`.
- `HEALTH_CHECK_RETRIES` / `HEALTH_CHECK_INTERVAL`: production health polling controls; defaults to `24` retries and `15` seconds.
- `ROLLBACK_READINESS_RETRIES` / `ROLLBACK_READINESS_INTERVAL`: post-rollback health polling controls; defaults to `24` retries and `15` seconds.

If staging moves off `master`, update both `STAGING_APP_BRANCH` and the branch
filter in `.github/workflows/cpflow-deploy-staging.yml`.

### Keeping cpflow Automation Current

When the upstream `control-plane-flow` repo changes the generated GitHub Actions
flow, regenerate the `cpflow-*` actions/workflows in this repo from the target
`cpflow` version or branch using `--staging-branch master`, review the diff, and
keep the repository variables above aligned with `.controlplane/controlplane.yml`. Validate with
`cpflow github-flow-readiness`, `actionlint .github/workflows/cpflow-*.yml`, and
the normal CI checks before merging. For review-app workflow changes, remember
that the deploy workflow checks out trusted local actions from `master` before
passing Control Plane secrets; PR-branch composite action changes are not fully
tested until they land on `master` and a real review-app deploy is rerun.

Generated workflow wrappers point to upstream reusable workflows with
`uses: shakacode/control-plane-flow/...@<ref>` and pass the same
`control_plane_flow_ref`. For stable releases, `<ref>` should be the
`v<cpflow gem version>` tag produced by the released gem. Do not use `main` or a
feature branch for production automation. A commit SHA is acceptable for
unreleased testing, but regenerate or repin to the release tag once the upstream
release exists.

See [readme.md](readme.md) and
[Testing cpflow GitHub Actions Changes](docs/testing-cpflow-github-actions.md)
for more details.

## Links

- [Control Plane Org for Staging and Review Apps](https://console.cpln.io/console/org/shakacode-open-source-examples-staging/-info)
- [Control Plane Org for Production App](https://console.cpln.io/console/org/shakacode-open-source-examples-production/-info)
