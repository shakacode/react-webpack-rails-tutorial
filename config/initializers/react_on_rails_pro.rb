# frozen_string_literal: true

ReactOnRailsPro.configure do |config|
  # Node renderer for server-side rendering and RSC payload generation
  config.server_renderer = "NodeRenderer"
  config.renderer_url = ENV["REACT_RENDERER_URL"] || "http://localhost:3800"
  config.renderer_password = ENV.fetch("RENDERER_PASSWORD", "devPassword")

  # Enable React Server Components support
  config.enable_rsc_support = true

  # RSC bundle file name (built by rscWebpackConfig.js)
  config.rsc_bundle_js_file = "rsc-bundle.js"
end
