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

  # Must match the password in renderer/node-renderer.js. The JS side
  # guards against unset in production but accepts the literal dev
  # default; the prod branch here closes that gap.
  config.renderer_password =
    if Rails.env.local?
      ENV["RENDERER_PASSWORD"].presence || "local-dev-renderer-password"
    else
      pw = ENV["RENDERER_PASSWORD"]
      if pw.blank? || pw == "local-dev-renderer-password"
        raise "RENDERER_PASSWORD must be set to a non-empty, non-default value in production"
      end
      pw
    end
end
