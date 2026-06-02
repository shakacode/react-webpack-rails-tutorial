# Internal Notes to the Shakacode Team

## Deployment

Deployments are handled by Control Plane configuration in this repo and GitHub Actions.

### Review Apps
- Add a comment `+review-app-deploy` to any PR to deploy a review app
- Leave `REVIEW_APP_PREFIX` unset for the standard path. The workflow infers
  `qa-react-webpack-rails-tutorial` from `.controlplane/controlplane.yml`, so
  generated review apps use names like
  `qa-react-webpack-rails-tutorial-1234`.
- New pushes to a PR redeploy only after the review app already exists.
- Add `+review-app-delete` to delete a review app manually; closing the PR also
  deletes it automatically. Use `+review-app-help` for the command reference.
- Public fork PRs can receive help comments, but deploys are limited to branches
  in this repository because Docker builds use repository secrets. If a forked
  change needs a review app, first move the reviewed change to a trusted branch
  in this repository.
- Review apps run pull request code. Keep `CPLN_TOKEN_STAGING`,
  `qa-react-webpack-rails-tutorial-secrets`, database credentials, renderer
  credentials, and license values limited to review/staging use. Never mount
  production secrets into review apps.

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

Required repository secret for review apps and staging:

- `CPLN_TOKEN_STAGING`

Use a staging/review service-account token that cannot access the production
Control Plane org or production secret dictionaries.

Required repository variables for staging deploys:

- `CPLN_ORG_STAGING=shakacode-open-source-examples-staging`
- `STAGING_APP_NAME=react-webpack-rails-tutorial-staging`
- `STAGING_APP_BRANCH=master`

Review apps infer `CPLN_ORG_STAGING`, `REVIEW_APP_PREFIX`, and
`PRIMARY_WORKLOAD` from `.controlplane/controlplane.yml` and workflow defaults,
so those values do not need to be set just to test review apps. Set them only
when testing a fork or clone against a different Control Plane org, review-app
prefix, or public workload.

Production promotion uses a protected GitHub Environment named `production`:

- Environment secret `CPLN_TOKEN_PRODUCTION`
- Environment variable `CPLN_ORG_PRODUCTION=shakacode-open-source-examples-production`
- Environment variable `PRODUCTION_APP_NAME=react-webpack-rails-tutorial-production`

Protect the `production` environment with required reviewers, enable prevent
self-review, and consider disabling administrator bypass. Do not store
`CPLN_TOKEN_PRODUCTION` as a repository or organization secret. The production
promotion workflow is intentionally a normal caller-repo job with
`environment: production`; it checks out the pinned `control-plane-flow` release
for shared actions after GitHub makes the environment secret available.
Keep `CPLN_TOKEN_PRODUCTION` absent from repository and organization secrets so
a broader secret cannot mask a missing environment secret.

If promotion fails with
`CPLN_TOKEN_PRODUCTION is not set. Add it as a secret on the 'production' GitHub Environment.`,
the token is missing from the environment scope or the workflow job is no longer
declaring `environment: production`. Create or verify the environment secret
and confirm there is no same-named repository or organization secret:
You need permission to manage repository environments and secrets to run these
commands.

```sh
gh secret set CPLN_TOKEN_PRODUCTION --repo shakacode/react-webpack-rails-tutorial --env production
gh secret list --repo shakacode/react-webpack-rails-tutorial --env production
gh secret list --repo shakacode/react-webpack-rails-tutorial
gh secret list --org shakacode | grep '^CPLN_TOKEN_PRODUCTION[[:space:]]' || true
```

Generated reusable-workflow callers pass only the named secrets each upstream
workflow needs. They do not use `secrets: inherit`. Production promotion is the
exception: it stays as a caller-owned job so `CPLN_TOKEN_PRODUCTION` is supplied
only by the protected `production` Environment after approval.

Persistent staging and production apps must be bootstrapped once before the
first deploy or promotion:

```sh
cpflow setup-app -a react-webpack-rails-tutorial-staging --org shakacode-open-source-examples-staging --skip-post-creation-hook
cpflow setup-app -a react-webpack-rails-tutorial-production --org shakacode-open-source-examples-production --skip-post-creation-hook
```

Use `setup-app` for first-time bootstrap because it creates the app secret
policy and identity binding. Use `cpflow apply-template` for later template
updates to existing persistent apps.

Advanced optional settings are documented upstream in the
[`control-plane-flow` CI automation guide](https://github.com/shakacode/control-plane-flow/blob/main/docs/ci-automation.md).

Current workflow wrappers are pinned to the upstream `control-plane-flow`
release tag `v5.0.4`. Keep release tags as the steady-state configuration; use
a full commit SHA only for short-lived upstream PR testing.

If staging moves off `master`, update both `STAGING_APP_BRANCH` and the branch
filter in `.github/workflows/cpflow-deploy-staging.yml`.

### Keeping cpflow Automation Current

When the upstream `control-plane-flow` repo changes the generated GitHub Actions
flow, regenerate from the target `cpflow` version with `--staging-branch master`,
review the diff, and validate with `bin/test-cpflow-github-flow` plus the normal
CI checks. Stable automation should use release tags such as `v5.0.4`, not
`main` or a feature branch.

See [readme.md](readme.md) and
[Testing cpflow GitHub Actions Changes](docs/testing-cpflow-github-actions.md)
for more details.

## Links

- [Control Plane Org for Staging and Review Apps](https://console.cpln.io/console/org/shakacode-open-source-examples-staging/-info)
- [Control Plane Org for Production App](https://console.cpln.io/console/org/shakacode-open-source-examples-production/-info)
