# Shown below are the defaults for configuration
ReactOnRails.configure do |config|
  # Client bundles are configured in application.js

  config.generated_assets_dir = File.join(%w(app assets webpack))

  # Define the files for we need to check for webpack compilation when running tests
  config.webpack_generated_files = %w( app-bundle.js vendor-bundle.js app-bundle.css
                                       vendor-bundle.css server-bundle.js )

  # Server bundle is a single file for all server rendering of components.
  # If you wish to use render_js in your views without any file, set this to "" to avoid warnings.
  # Note this is under app/assets/webpack/
  config.server_bundle_js_file = "server-bundle.js" # This is the default

  # Below options can be overriden by passing to the helper method.
  config.prerender = true # default is false
  config.trace = Rails.env.development? # default is true for development, off otherwise

  # For server rendering. This can be set to false so that server side messages are discarded.
  config.replay_console = true # Default is true. Be cautious about turning this off.
  config.logging_on_server = true # Default is true. Logs server rendering messags to Rails.logger.info

  # Server rendering:
  config.server_renderer_pool_size  = 1   # increase if you're on JRuby
  config.server_renderer_timeout    = 20  # seconds
end
