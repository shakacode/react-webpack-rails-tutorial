# This file is copied to spec/ when you run "rails generate rspec:install"
ENV["RAILS_ENV"] ||= "test"
require "coveralls"
Coveralls.wear!("rails") # must occur before any of your application code is required
require "spec_helper"
require File.expand_path("../../config/environment", __FILE__)

require "rspec/rails"
require "capybara/rspec"
require "capybara/poltergeist"
require "capybara-screenshot/rspec"
require "database_cleaner"

# Add additional requires below this line. Rails is not loaded until this point!

# Requires supporting ruby files with custom matchers and macros, etc, in
# spec/support/ and its subdirectories. Files matching `spec/**/*_spec.rb` are
# run as spec files by default. This means that files in spec/support that end
# in _spec.rb will both be required and run as specs, causing the specs to be
# run twice. It is recommended that you do not name files matching this glob to
# end with _spec.rb. You can configure this pattern with the --pattern
# option on the command line or in ~/.rspec, .rspec or `.rspec-local`.
#
# Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

# Requires supporting files with custom matchers and macros, etc,
# in ./support/ and its subdirectories.
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods

  # Next line will ensure that assets are built if webpack -w is not running
  ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config, :requires_webpack_assets)

  # Because we're using some CSS Webpack files, we need to ensure the webpack files are generated
  # for all feature specs. https://github.com/shakacode/react_on_rails/issues/792
  config.define_derived_metadata(file_path: %r{spec/(features|requests)}) do |metadata|
    metadata[:requires_webpack_assets] = true
  end

  # For Poltergeist
  # Turning animations off results in about a 10 sec difference:

  # Using errors_ok as there is a timing issue causing crashes without this setting
  # https://github.com/teampoltergeist/poltergeist/issues/830

  default_driver = :selenium_chrome

  supported_drivers = %i[ poltergeist poltergeist_errors_ok
                          poltergeist_no_animations webkit
                          selenium_chrome selenium_firefox selenium]
  driver = ENV["DRIVER"].try(:to_sym) || default_driver
  Capybara.default_driver = driver

  unless supported_drivers.include?(driver)
    raise "Unsupported driver: #{driver} |
      (supported = #{supported_drivers})"
  end

  case driver
  when :poltergeist, :poltergeist_errors_ok, :poltergeist_no_animations
    basic_opts = {
      window_size: [1300, 1800],
      screen_size: [1400, 1900],
      phantomjs_options: ["--load-images=no", "--ignore-ssl-errors=true"],
      timeout: 180
    }

    Capybara.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(app, basic_opts)
    end

    no_animation_opts = basic_opts.merge( # Leaving animations off, as a sleep was still needed.
      extensions: ["#{Rails.root}/spec/support/phantomjs-disable-animations.js"]
    )

    Capybara.register_driver :poltergeist_no_animations do |app|
      Capybara::Poltergeist::Driver.new(app, no_animation_opts)
    end

    Capybara.register_driver :poltergeist_errors_ok do |app|
      Capybara::Poltergeist::Driver.new(app, no_animation_opts.merge(js_errors: false))
    end
    Capybara::Screenshot.register_driver(:poltergeist) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
    Capybara::Screenshot.register_driver(:poltergeist_no_animations) do |js_driver, path|
      js_driver.render(path, full: true)
    end
    Capybara::Screenshot.register_driver(:poltergeist_errors_ok) do |js_driver, path|
      js_driver.render(path, full: true)
    end

  when :selenium_chrome
    DriverRegistration.register_selenium_chrome
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

  # Capybara.default_max_wait_time = 15
  puts "Capybara using driver: #{Capybara.javascript_driver}"

  Capybara.save_path = Rails.root.join("tmp", "capybara")
  Capybara::Screenshot.prune_strategy = { keep: 10 }

  config.use_transactional_fixtures = false

  config.before(:suite) do
    if config.use_transactional_fixtures?
      raise(<<-MSG)
          Delete line `config.use_transactional_fixtures = true` from rails_helper.rb
          (or set it to false) to prevent uncommitted transactions being used in
          JavaScript-dependent specs.

          During testing, the app-under-test that the browser driver connects to
          uses a different database connection to the database connection used by
          the spec. The app's database connection would not be able to access
          uncommitted transaction data setup over the spec's database connection.
      MSG
    end
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    # :rack_test driver's Rack app under test shares database connection
    # with the specs, so continue to use transaction strategy for speed.
    driver_shares_db_connection_with_specs = Capybara.current_driver == :rack_test

    unless driver_shares_db_connection_with_specs
      # Driver is probably for an external browser with an app
      # under test that does *not* share a database connection with the
      # specs, so use truncation strategy.
      DatabaseCleaner.strategy = :truncation
    end
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.append_after(:each) do
    DatabaseCleaner.clean
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

  def js_errors_driver
    Capybara.javascript_driver == :poltergeist ? :poltergeist_errors_ok : Capybara.javascript_driver
  end

  def js_selenium_driver
    driver = Capybara.javascript_driver == :selenium_firefox ? :selenium_firefox : :selenium_chrome
    if driver == :selenium_firefox
      DriverRegistration.register_selenium_firefox
    else
      DriverRegistration.register_selenium_chrome
    end
    driver
  end
end
