# frozen_string_literal: true

ReactOnRailsPro.configure do |config|
  # Node renderer for server-side rendering and RSC payload generation
  use_node_renderer = Rails.env.local? || ENV["REACT_USE_NODE_RENDERER"] == "true"

  if use_node_renderer
    renderer_host = ENV.fetch("RENDERER_HOST", "localhost")
    renderer_port = ENV.fetch("RENDERER_PORT", "3800")

    config.server_renderer = "NodeRenderer"
    config.renderer_url = ENV.fetch("REACT_RENDERER_URL", "http://#{renderer_host}:#{renderer_port}")
    config.renderer_password = if Rails.env.local?
                                 ENV.fetch("RENDERER_PASSWORD", "local-dev-renderer-password")
                               else
                                 ENV.fetch("RENDERER_PASSWORD")
                               end
  end

  # Enable React Server Components support
  config.enable_rsc_support = true

  # RSC bundle file name (built by rscWebpackConfig.js)
  config.rsc_bundle_js_file = "rsc-bundle.js"
end
