# Developing and Testing GitHub Actions

GitHub Actions workflow testing depends on the event type:

- `push` runs workflow files from the pushed branch.
- `pull_request` runs workflow files from the base branch for sensitive cases.
- `issue_comment` runs workflow files from the default branch.
- `workflow_dispatch --ref <branch>` runs the workflow file from that ref.

This matters for review-app automation because comment-triggered commands such
as `+review-app-deploy` use default-branch workflow code. A PR that changes
workflow files or action wiring is not fully proven by commenting on that same
PR until the trusted default-branch code has those changes.

For cpflow review-app, staging, and promotion workflows, use the cpflow-specific
guide:

[Testing cpflow GitHub Actions Changes](../.controlplane/docs/testing-cpflow-github-actions.md)

## Practical Pattern

1. Validate generated files locally with `bin/test-cpflow-github-flow`.
2. Open a PR and let regular CI prove GitHub can parse the workflow YAML.
3. For top-level workflow-file experiments, run `workflow_dispatch --ref`.
4. For comment-triggered review-app commands, test a real `+review-app-deploy`
   after the trusted default-branch wrapper points at the code under test.
5. When testing unreleased upstream `control-plane-flow` changes downstream, pin
   the generated reusable workflow `uses:` refs to the same upstream commit SHA.
   Newer upstream workflows load their matching shared actions automatically; do
   not add a duplicate ref input to downstream wrappers.

Avoid testing production automation against moving branch refs such as `main` or
a feature branch. Use release tags for normal operation and full commit SHAs for
temporary pre-release validation. `bin/pin-cpflow-github-ref` enforces that
default and requires `--allow-moving-ref` for one-off local branch experiments.
