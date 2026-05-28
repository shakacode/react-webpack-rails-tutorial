# Testing cpflow GitHub Actions Changes

Generic reusable-workflow behavior belongs upstream in the
[`control-plane-flow` CI automation guide](https://github.com/shakacode/control-plane-flow/blob/main/docs/ci-automation.md).
Use this repo note only as the canary checklist for
`react-webpack-rails-tutorial`.

## Local Checks

After regenerating the generated `cpflow-*` wrappers, run:

```sh
bin/conductor-exec bin/test-cpflow-github-flow
```

When testing an unreleased upstream `control-plane-flow` checkout, pass that
checkout's `bin/cpflow`:

```sh
bin/conductor-exec bin/test-cpflow-github-flow ruby /path/to/control-plane-flow/bin/cpflow
```

## Testing An Upstream PR Downstream

Use an immutable upstream commit SHA, not a branch:

```sh
bin/pin-cpflow-github-ref <40-character-control-plane-flow-commit-sha>
bin/conductor-exec bin/test-cpflow-github-flow ruby /path/to/control-plane-flow/bin/cpflow
```

Leave `CPFLOW_VERSION` unset while testing a commit SHA. After the upstream gem
and tag ship, repin wrappers to the release tag, such as `v5.0.4`.

## Review App Canary

1. Open or reuse a same-repository PR.
2. Comment exactly `+review-app-deploy`.
3. Confirm the deploy job checks out the expected upstream Control Plane Flow
   source selected by the generated wrapper's `uses:` ref.
4. Confirm `Setup environment`, `Check if review app exists`,
   `Build Docker image`, and `Deploy to Control Plane` all pass.
5. Open the review-app URL from the PR comment and verify it returns HTTP 200.

Comment-triggered workflows run from the repository default branch. If you are
testing edits to a workflow file before merging, manually dispatch the PR branch
workflow:

```sh
gh workflow run cpflow-deploy-review-app.yml --ref <branch> -f pr_number=<pr-number>
```

## Troubleshooting Signals

### Token Format Error

```text
ERROR: Unknown API token format. Please re-run 'cpln profile login' or set the correct CPLN_TOKEN env variable.
```

The workflow can read `CPLN_TOKEN_STAGING`, but the secret value is not a valid
Control Plane service-account token. Rotate the GitHub secret and rerun the
deploy.

### No Deploy After Push

Pushes redeploy only after the review app already exists. Create the first one
with an exact `+review-app-deploy` PR comment.

### No Visible Workflow Changes

Comment-triggered runs use workflow files from `master`. For PR-branch workflow
edits, use `workflow_dispatch` as shown above or merge first and test with a
real review-app deploy.
