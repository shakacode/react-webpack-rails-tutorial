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

## Architecture: Three Bundle System

This project builds **three separate Rspack bundles** via Shakapacker:

| Bundle | Config | Output | Runtime |
|--------|--------|--------|---------|
| **Client** | `clientWebpackConfig.js` | `public/packs/` | Browser |
| **Server (SSR)** | `serverWebpackConfig.js` | `ssr-generated/` | Node renderer VM sandbox |
| **RSC** | `rscWebpackConfig.js` | RSC output dir | Node renderer (full Node.js) |

### Key constraints

- The **server bundle runs in a VM sandbox** (`vm.createContext()`), NOT full Node.js. It lacks `require`, `MessageChannel`, `TextEncoder`, and other Node/browser globals.
- Use `resolve.fallback: false` (NOT `externals`) for Node builtins in the server bundle — the VM has no `require()`, so externalized `require('path')` calls will crash.
- The **RSC bundle** targets Node.js directly with the `react-server` condition, so Node builtins work normally there.
- A `BannerPlugin` injects a `MessageChannel` polyfill into the server bundle because `react-dom/server.browser` needs it at module load time.

### Build commands

```bash
# Build only the server bundle
SERVER_BUNDLE_ONLY=yes bin/shakapacker

# Build only the RSC bundle
RSC_BUNDLE_ONLY=true bin/shakapacker

# Watch modes (used by Procfile.dev)
SERVER_BUNDLE_ONLY=yes bin/shakapacker --watch
RSC_BUNDLE_ONLY=true bin/shakapacker --watch
```

## Node Renderer

React on Rails Pro's NodeRenderer must be running for SSR and RSC payload generation.

- **Port**: 3800 (configured in `config/initializers/react_on_rails_pro.rb`)
- **Launcher**: `node react-on-rails-pro-node-renderer.js`
- **Auth**: Requires `RENDERER_PASSWORD` env var (defaults to `local-dev-renderer-password` in dev/test, required with no fallback in production)
- **Started automatically** by `bin/dev` / `Procfile.dev`

### Testing requirement

**The Node renderer must be running before `bundle exec rspec`.** Tests will fail with `Net::ReadTimeout` if it is not running. CI starts it as a background process and waits up to 30 seconds for TCP readiness on port 3800.

### Enabled environments

The renderer is enabled when `Rails.env.local?` (development + test) or `REACT_USE_NODE_RENDERER=true`. Production requires explicit env var configuration.

## RSC Component Classification

React on Rails Pro auto-classifies components based on the `'use client'` directive:

- **With `'use client'`** → registered via `ReactOnRails.register()` (traditional SSR/client component)
- **Without `'use client'`** → registered via `registerServerComponent()` (React Server Component)

### Common gotcha: `.server.jsx` files

In this codebase, `.server.jsx` does NOT mean "React Server Component" — it means traditional **server-side rendering** (e.g., `StaticRouter`). If a `.server.jsx` file uses client APIs like `ReactOnRails.getStore()` or React hooks, it **needs** the `'use client'` directive to prevent RSC misclassification. The naming predates RSC and refers to the Rails SSR render path.

### Key files

| File | Purpose |
|------|---------|
| `config/webpack/rscWebpackConfig.js` | RSC bundle configuration |
| `config/webpack/rspackRscPlugin.js` | Detects `'use client'` directives, emits React Flight manifests |
| `client/app/packs/rsc-bundle.js` | RSC entry point |
| `client/app/packs/rsc-client-components.js` | Client component registration for RSC |
| `config/initializers/react_on_rails_pro.rb` | Node renderer + RSC configuration |
| `react-on-rails-pro-node-renderer.js` | Node renderer launcher |

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
