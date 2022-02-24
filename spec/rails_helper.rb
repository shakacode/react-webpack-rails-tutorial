# frozen_string_literal: true

# This file is copied to spec/ when you run "rails generate rspec:install"
ENV["RAILS_ENV"] ||= "test"
ENV["NODE_ENV"] ||= "test"
require "coveralls"
Coveralls.wear!("rails") # must occur before any of your application code is required
require "spec_helper"
require File.expand_path("../config/environment", __dir__)

require "rspec/rails"
require "capybara/rspec"
require "capybara-screenshot/rspec"
require "webdrivers"

## Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
# Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# Requires supporting files with custom matchers and macros, etc,
# in ./support/ and its subdirectories.
Dir[Rails.root.join("spec", "support", "**", "*.rb")].sort.each { |f| require f }

RSpec.configure do |config|
  # Ensure that if we are running js tests, we are using latest webpack assets
  # This will use the defaults of :js and :server_rendering meta tags
  ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # Capybara config
  #
  # selenium_firefox webdriver only works for Travis-CI builds.
  default_driver = :selenium_chrome_headless

  supported_drivers = %i[selenium_chrome_headless selenium_chrome selenium_firefox selenium]
  driver = ENV["DRIVER"].try(:to_sym) || default_driver
  Capybara.default_driver = driver

  raise "Unsupported driver: #{driver} (supported = #{supported_drivers})" unless supported_drivers.include?(driver)

  case driver
  when :selenium_chrome
    DriverRegistration.register_selenium_chrome

  when :selenium_chrome_headless
    DriverRegistration.register_selenium_chrome_headless

  when :selenium_firefox, :selenium
    DriverRegistration.register_selenium_firefox
    driver = :selenium_firefox
  end

  Capybara.javascript_driver = driver
  Capybara.default_driver = driver

  Capybara.register_server(Capybara.javascript_driver) do |app, port|
    require "rack/handler/puma"
    Rack::Handler::Puma.run(app, Port: port)
  end
  Capybara.server = :puma

  config.before(:each, type: :system, js: true) do
    driven_by driver
    driven_by :selenium, using: :chrome,
                         options: { args: %w[headless disable-gpu no-sandbox disable-dev-shm-usage] }
  end

  # Capybara.default_max_wait_time = 15
  puts "=" * 80
  puts "Capybara using driver: #{Capybara.javascript_driver}"
  puts "=" * 80

  Capybara.save_path = Rails.root.join("tmp", "capybara")
  Capybara::Screenshot.prune_strategy = { keep: 10 }

  config.append_after do
    Capybara.reset_sessions!
  end

  # RSpec Rails can automatically mix in different behaviours to your tests
  # based on their file location, for example enabling you to call `get` and
  # `post` in specs under `spec/controllers`.
  #
  # You can disable this behaviour by removing the line below, and instead
  # explicitly tag your specs with their type, e.g.:
  #
  #     RSpec.describe UsersController, :type => :controller do
  #       # ...
  #     end
  #
  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!

  # This will insert a <base> tag with the asset host into the pages created by
  # save_and_open_page, meaning that relative links will be loaded from the
  # development server if it is running.
  Capybara.asset_host = "http://localhost:3000"
end
