# Testing cpflow GitHub Actions Changes

Generic reusable-workflow behavior belongs upstream in the
[`control-plane-flow` CI automation guide](https://github.com/shakacode/control-plane-flow/blob/v5.2.0/docs/ci-automation.md).
Use this repo note only as the canary checklist for
`react-webpack-rails-tutorial`.

## Local Checks

Install the pinned dependencies, then validate the released review-app pair and
all existing generated-workflow checks without network access:

```sh
bin/conductor-exec bundle check
bin/conductor-exec ruby bin/check-cpflow-review-app-contract
bin/conductor-exec bundle exec rspec spec/cpflow_review_app_contract_spec.rb
bin/conductor-exec bin/test-cpflow-github-flow --offline
```

`--offline` explicitly skips public package-registry readiness checks. It still
checks the release contract, renderer resources/probes, YAML, existing wrapper
consistency, and actionlint. It does not contact the deployment platform, prove
an image builds, or prove deployment readiness. For registry readiness as well:

```sh
bin/conductor-exec bin/test-cpflow-github-flow bundle exec cpflow
```

The full helper requires `actionlint` on `PATH` in addition to the installed
Ruby bundle. Ordinary RSpec contract tests need only Ruby and the bundle; they
exercise the pure-Ruby validator, not the external lint executable. Run the full
helper separately when validating workflow changes.

## Released Review-App Pair

The deploy/delete callers and local CLI use cpflow **5.3.0**. Both callers pin
`b1e5ff4a04adfccfd8b59996e8abdbb5defb3fd6` with a readable `v5.3.0`
comment. Other generated callers intentionally remain on their existing
**5.2.0** cohort; their migration is separate scope.

The pair is inseparable: both need the generated authenticated redispatch
input, exact run/job names, and matching permissions. A pin-only upgrade or a
single divergent canary is rejected. The offline validator reads the installed
5.3.0 gem's caller templates as its source of truth, without loading cpflow code.

Leave `CPFLOW_VERSION` unset for these SHA-pinned callers: upstream builds the
CLI from the same pinned source. The variable-based RubyGems override requires
a release-tag ref and cannot be combined with a commit SHA.

Do not run the all-wrapper pin helper or blindly regenerate over the customized
validation script for this split migration. A future upgrade must update both
callers, the local dependency/lockfile, validator release constants, and fixture
tests together. Preserve the renderer assertions and separately review any
changes to other caller cohorts.

## Review App Canary

Deployment requires explicit authorization. A push is not unconditionally safe:
the released workflow deploys existing apps, and its intent reconciliation can
honor a newer accepted manual request even if the app was previously absent.
Before any publication under a no-deployment constraint, verify fresh app
absence and the absence of competing accepted intents or queued/running work;
otherwise hold publication. PR body edits alone are not a deploy trigger.

An absent app with a reconciled `pull_request` intent skips creation/build/deploy
and reports `image_built=false`; this is a skip, not a successful canary. The
cross-operation handoff targets default-branch wrappers, so validating a branch
alone does not prove end-to-end deploy/delete reconciliation before merge.

The 5.3.0 integration repair does not establish the cause of the previously
observed active runner with no replica. The existing resource/deadline settings
are preserved; that platform failure remains unresolved until separately
authorized evidence establishes its cause.

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
