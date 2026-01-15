# React Webpack Rails Tutorial - Development Guide

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

## Conductor Compatibility (Version Managers)

### Problem

Conductor runs commands in a non-interactive shell that doesn't source `.zshrc`. This means version manager shell hooks (like mise's PATH reordering based on `.tool-versions`) never run. Commands will use system Ruby/Node instead of project-specified versions.

**Symptoms:**
- `ruby --version` returns system Ruby (e.g., 2.6.10) instead of project Ruby (e.g., 3.4.3)
- Pre-commit hooks fail with wrong tool versions
- `bundle` commands fail due to incompatible Ruby versions
- Node/pnpm commands use wrong Node version

### Solution

Use the `bin/conductor-exec` wrapper to ensure commands run with correct tool versions:

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
bin/conductor-exec git commit -m "message"  # Pre-commit hooks work correctly
```

The wrapper:
- Uses `mise exec` when mise is available
- Falls back to direct execution for non-mise users (asdf, rbenv, nvm, nodenv)

### Reference

See [react_on_rails-demos#105](https://github.com/shakacode/react_on_rails-demos/issues/105) for detailed problem analysis and solution development.
