# frozen_string_literal: true

# See https://reactonrails.com/docs/configuration/configuration-pro
# Production license: set REACT_ON_RAILS_PRO_LICENSE to the JWT token from
# https://pro.reactonrails.com/. Development and test environments don't
# require a license — the Pro engine logs an info-level notice only.
ReactOnRailsPro.configure do |config|
  config.server_renderer = "NodeRenderer"
  # Raise loudly when the renderer is unavailable instead of silently
  # degrading to ExecJS (default is true).
  config.renderer_use_fallback_exec_js = false

  config.renderer_url = ENV.fetch("RENDERER_URL", "http://localhost:3800")

  # Must match the password in renderer/node-renderer.js.
  config.renderer_password = ENV.fetch("RENDERER_PASSWORD", "local-dev-renderer-password")
end
