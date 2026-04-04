# frozen_string_literal: true

ReactOnRailsPro.configure do |config|
  # Enable React Server Components support
  config.enable_rsc_support = true

  # RSC bundle file name (built by rscWebpackConfig.js)
  config.rsc_bundle_js_file = "rsc-bundle.js"
end
