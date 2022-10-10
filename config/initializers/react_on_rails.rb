# frozen_string_literal: true

# Shown below are the defaults for configuration
ReactOnRails.configure do |config|
  # Define the files for we need to check for webpack compilation when running tests
  config.webpack_generated_files = %w[ client-bundle.js server-bundle.js ]

  config.build_test_command = "RAILS_ENV=test bin/webpacker"

  # This is the file used for server rendering of React when using `(prerender: true)`
  # If you are never using server rendering, you may set this to "".
  # If you are using the same file for client and server rendering, having this set probably does
  # not affect performance.
  config.server_bundle_js_file = "server-bundle.js"

  ################################################################################
  # CLIENT RENDERING OPTIONS
  # Below options can be overriden by passing options to the react_on_rails
  # `render_component` view helper method.
  ################################################################################

  # Default is false. Can be overriden at the component level.
  # Set to false for debugging issues before turning on to true.
  config.prerender = true

  # default is true for development, off otherwise
  config.trace = Rails.env.development?

  ################################################################################
  # SERVER RENDERING OPTIONS
  # Applicable options can be overriden by passing options to the react_on_rails
  # `render_component` view helper method.
  ################################################################################

  # If set to true, this forces Rails to reload the server bundle if it is modified
  config.development_mode = Rails.env.development?

  # For server rendering. This can be set to false so that server side messages are discarded.
  # Default is true. Be cautious about turning this off.
  config.replay_console = true

  # Default is true. Logs server rendering messages to Rails.logger.info
  config.logging_on_server = true

  # Change to true to raise exception on server if the JS code throws. Let's do this only if not
  # in production, as the JS code might still work on the client and we don't want to blow up the
  # whole Rails page.
  config.raise_on_prerender_error = !Rails.env.production?

  # Server rendering only (not for render_component helper)
  # You can configure your pool of JS virtual machines and specify where it should load code:
  # On MRI, use `therubyracer` for the best performance
  # (see [discussion](https://github.com/reactjs/react-rails/pull/290))
  # On MRI, you'll get a deadlock with `pool_size` > 1
  # If you're using JRuby, you can increase `pool_size` to have real multi-threaded rendering.
  config.server_renderer_pool_size = 1 # increase if you're on JRuby
  config.server_renderer_timeout = 20 # seconds

  ################################################################################
  # I18N OPTIONS
  ################################################################################
  # Replace the following line to the location where you keep translation.js & default.js.
  config.i18n_dir = Rails.root.join("client", "app", "libs", "i18n")

  ################################################################################
  # MISCELLANEOUS OPTIONS
  ################################################################################

  # This allows you to add additional values to the Rails Context. Implement one static method
  # called `custom_context(view_context)` and return a Hash.
  config.rendering_extension = nil
  config.i18n_output_format = "js"
end
