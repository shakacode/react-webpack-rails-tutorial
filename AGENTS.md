# react-webpack-rails-tutorial

## Project Overview

React on Rails demo app — a Rails application with React, Redux, Tailwind CSS, and server-side rendering via the react_on_rails gem.

- `prompts/`: shared prompt templates for Codex, GPT, and other non-Claude tools

## Agent Workflow Configuration

Shared workflow skills from
[`shakacode/agent-workflows`](https://github.com/shakacode/agent-workflows) are
repo-agnostic: they carry the workflow logic but defer every repo-specific
command, branch, label, path, and policy to this section. When a shared skill
says "run the repo's local validation" or "use the hosted-CI trigger," the
concrete value is here. This is a small tutorial app, so many advanced
process concepts (hosted-CI gating, benchmarks, merge ledgers, coordination
backends) genuinely do not apply and are marked `n/a` with a pointer to the
real file or workflow. Validate this seam with
`agent-workflow-seam-doctor --root . --shared <agent-workflows-root>`. Where a
value is already documented elsewhere in this file, this section references that
section instead of duplicating it.

- **Base branch**: `master` (fetch and compare via `origin/master`; all CI
  workflows in `.github/workflows/` trigger on `push`/`pull_request` to `master`).
- **Pre-push local validation**: `bin/ci` — runs setup, RuboCop, ESLint, the test
  asset build, RSpec, and Jest in order (steps defined in `config/ci.rb`). The
  equivalent Rake entrypoint is `bundle exec rake ci:all`. Run tool-version-sensitive
  commands through `bin/conductor-exec` (see the **Conductor Compatibility** section).
- **CI change detector**: n/a — there is no suite-routing detector; every PR runs
  all three workflows (`.github/workflows/rspec_test.yml`, `lint_test.yml`,
  `js_test.yml`) in full.
- **Hosted-CI trigger**: n/a — no `+ci-*` PR-comment commands or hosted-CI labels.
  CI runs automatically on push and pull_request to `master`. The separate
  `@claude` PR/issue mention triggers the Claude Code agent via
  `.github/workflows/claude.yml`.
- **CI parity environment**: n/a — no `act` or local-runner image is documented.
  Reproduce CI-only failures from the exact GitHub Actions jobs in
  `.github/workflows/*.yml`: `runs-on: ubuntu-latest`, Ruby `3.4.6`, Node `22.x`,
  `services.postgres: postgres:11-alpine` (`rspec_test.yml`), and the listed env
  vars (`RAILS_ENV=test`, `NODE_ENV=test`, `DATABASE_URL`, `DRIVER=selenium_chrome`,
  `RENDERER_PASSWORD`). Record any unverified runner/service gap as `UNKNOWN`.
- **Secret redaction patterns**: redact values for environment variables or log
  fields whose names contain `SECRET`, `TOKEN`, `KEY`, `PASSWORD`, `CREDENTIAL`,
  `PASSPHRASE`, or `PRIVATE`, plus the repo-specific names `CLAUDE_CODE_OAUTH_TOKEN`,
  `RENDERER_PASSWORD`, `GITHUB_TOKEN`, `GH_TOKEN`, and `DATABASE_URL` (contains
  credentials). These patterns favor conservative over-redaction of logs, prompts,
  and issue comments. The repo-specific entries are public identifier names, not
  values; list them so agents redact exact aliases even when generic patterns match.
- **Benchmark labels**: n/a — no performance-benchmark workflow or labels in this repo.
- **Follow-up issue prefix**: n/a — no follow-up-issue convention is documented;
  default to not opening new issues.
- **Changelog**: `/CHANGELOG.md`, user-visible changes only. There is no changelog
  automation (no Rake task or script); edit the file by hand following its existing
  reverse-chronological dated-section format.
- **Lint / format**: `bundle exec rake lint` (full suite: RuboCop, ESLint, scss_lint);
  `bin/rubocop` or `bundle exec rake "lint:rubocop[fix]"` (Ruby, with autofix);
  `bundle exec rubocop -a` (Ruby autofix); `yarn lint:eslint` (JS check),
  `yarn lint` (ESLint autofix + Prettier write); `yarn lint:prettier` (Prettier
  check, `.js`/`.jsx`). See the **Build and Test Commands** section.
- **Merge ledger**: n/a — no machine-checkable per-PR merge-readiness script exists.
- **Docs checks**: n/a — no markdown link checker or docs-sidebar verifier in this repo.
- **Tests**: RSpec via `bin/rspec` or `bundle exec rake ci:rspec`; Jest (client JS)
  via `yarn test:client` or `bundle exec rake ci:js`. The full local gate is
  `bin/ci` / `bundle exec rake ci:all`. No separate e2e suite is configured.
- **Build / type checks**: build test assets with `yarn build:test` (and
  `yarn res:build` for ReScript). Type checks: n/a — TypeScript is a dependency but
  there is no `tsc`/type-check script; ReScript is compiled by `yarn res:build`.
- **Review gate**: `claude-review` — the automated Claude Code review in
  `.github/workflows/claude-code-review.yml` runs on every PR (opened, synchronize,
  ready_for_review, reopened) and posts inline/PR comments.
- **Approval-exempt change categories**: n/a — no standing approval-exemption policy
  is documented; treat all changes as requiring normal review.
- **Coordination backend**: n/a — this repo uses no shared agent-coordination backend;
  rely on GitHub PR/issue state and assignment for coordination.

## Build and Test Commands

```bash
# Run development server
bin/dev

# Run tests
bundle exec rspec

# Run linting
bundle exec rubocop

# Auto-fix linting issues
bundle exec rubocop -a
```

## Working Rules

- When the user asks to address PR review comments, follow `prompts/address-review.md`.
- Run Ruby, Bundler, Node, pnpm, and git hook-sensitive commands through `bin/conductor-exec` so non-interactive shells use the project tool versions.

## Conductor Compatibility

Conductor runs commands in a non-interactive shell that does not source `.zshrc`.
That means version manager shell hooks, such as mise PATH reordering from `.tool-versions`,
may not run. Commands can accidentally use system Ruby or Node instead of the project versions.

Symptoms include:

- `ruby --version` returns system Ruby instead of the project Ruby.
- Pre-commit hooks fail with the wrong tool versions.
- `bundle` commands fail due to incompatible Ruby versions.
- Node or pnpm commands use the wrong Node version.

Use the wrapper for commands that depend on project tool versions:

```bash
# Instead of:
ruby --version
bundle exec rubocop
pnpm install
git commit -m "message"

# Use:
bin/conductor-exec ruby --version
bin/conductor-exec bundle exec rubocop
bin/conductor-exec pnpm install
bin/conductor-exec git commit -m "message"
```

The wrapper uses `mise exec` when mise is available and falls back to direct execution
for non-mise users.
