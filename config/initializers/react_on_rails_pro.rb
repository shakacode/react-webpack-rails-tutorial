# frozen_string_literal: true

# See https://reactonrails.com/docs/configuration/configuration-pro
# Production license: set REACT_ON_RAILS_PRO_LICENSE to the JWT token from
# https://pro.reactonrails.com/. Development and test environments don't
# require a license — the Pro engine logs an info-level notice only.
ReactOnRailsPro.configure do |config|
  # Route all server rendering through the Pro Node renderer (port 3800).
  # Falling back to ExecJS is disabled so any renderer issue surfaces loudly
  # instead of silently degrading.
  config.server_renderer = "NodeRenderer"
  config.renderer_use_fallback_exec_js = false

  # Renderer HTTP endpoint. The Node renderer listens on localhost:3800 in
  # development; override REACT_RENDERER_URL in production to point at the
  # deployed renderer host.
  config.renderer_url = ENV.fetch("REACT_RENDERER_URL", "http://localhost:3800")

  # Shared secret for renderer authentication. Must match renderer/node-renderer.js.
  # In production-like envs, Pro's configuration.rb raises at boot if this is
  # blank and RENDERER_PASSWORD isn't in the environment — so the dev fallback
  # below never reaches prod as long as RENDERER_PASSWORD is set there.
  config.renderer_password = ENV.fetch("RENDERER_PASSWORD", "local-dev-renderer-password")
end
