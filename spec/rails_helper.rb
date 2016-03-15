# This file is copied to spec/ when you run "rails generate rspec:install"
ENV["RAILS_ENV"] ||= "test"
require "coveralls"
Coveralls.wear!("rails") # must occur before any of your application code is required
require "spec_helper"
require File.expand_path("../../config/environment", __FILE__)
require "rspec/rails"
require "capybara/rspec"
require "capybara-screenshot/rspec"

# Add additional requires below this line. Rails is not loaded until this point!

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
Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

RSpec.configure do |config|
  # Next line will ensure that assets are built if webpack -w is not running
  ReactOnRails::TestHelper.configure_rspec_to_compile_assets(config)

  # Maybe selenium_firefox webdriver only works for Travis-CI builds.
  # 2016-03-06: Phantomjs, all options fails on MacOs
  # Same for webkit
  default_driver = :selenium_chrome

  supported_drivers = %i( poltergeist poltergeist_errors_ok
                          poltergeist_no_animations webkit
                          selenium_chrome selenium_firefox selenium)
  driver = ENV["DRIVER"].try(:to_sym) || default_driver

  unless supported_drivers.include?(driver)
    raise "Unsupported driver: #{driver} (supported = #{supported_drivers})"
  end

  case driver
  when :poltergeist, :poltergeist_errors_ok, :poltergeist_no_animations
    require "capybara/poltergeist"
    opts = {
      extensions: ["#{Rails.root}/spec/support/phantomjs-disable-animations.js"]
    }

    Capybara.register_driver :poltergeist_no_animations do |app|
      Capybara::Poltergeist::Driver.new(app, opts)
    end

    Capybara.register_driver :poltergeist_errors_ok do |app|
      Capybara::Poltergeist::Driver.new(app, opts.merge(js_errors: false))
    end
  when :selenium_chrome
    DriverRegistration.register_selenium_chrome
  when :selenium_firefox, :selenium
    DriverRegistration.register_selenium_firefox
    driver = :selenium_firefox
  end

  Capybara.javascript_driver = driver

  Capybara.server do |app, port|
    require "rack/handler/puma"
    Rack::Handler::Puma.run(app, Port: port)
  end

  # Capybara.default_max_wait_time = 15
  puts "Capybara using driver: #{Capybara.javascript_driver}"

  Capybara::Screenshot.prune_strategy = { keep: 10 }

  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  # config.fixture_path = "#{::Rails.root}/spec/fixtures"

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

  # This will insert a <base> tag with the asset host into the pages created by
  # save_and_open_page, meaning that relative links will be loaded from the
  # development server if it is running.
  Capybara.asset_host = "http://localhost:3000"

  # config taken directly from RSpec example in the DatabaseCleaner README
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with :truncation
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

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
