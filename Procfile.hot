# Basic procfile for rails-related part of dev processes
# using a webpack development server to load JavaScript and CSS

# Development rails requires both rails and rails-assets
# (and rails-server-assets if server rendering)
rails: REACT_ON_RAILS_ENV=HOT rails s -b 0.0.0.0

# Run the hot reload server for client development
hot-assets: sh -c 'rm app/assets/webpack/* || true && HOT_RAILS_PORT=3500 npm run hot-assets'

# Keep the JS fresh for server rendering. Remove if not server rendering
rails-server-assets: sh -c 'npm run build:dev:server'
