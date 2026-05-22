# react-webpack-rails-tutorial

## Project Overview

React on Rails demo app — a Rails application with React, Redux, Tailwind CSS, and server-side rendering via the react_on_rails gem.

- `prompts/`: shared prompt templates for Codex, GPT, and other non-Claude tools

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
