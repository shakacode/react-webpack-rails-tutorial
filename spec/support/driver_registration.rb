# frozen_string_literal: true

module DriverRegistration
  def self.register_selenium_chrome
    # Force re-register to ensure our configuration is used
    Capybara.drivers.delete(:selenium_chrome)

    Capybara.register_driver :selenium_chrome do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
    end

    Capybara::Screenshot.register_driver(:selenium_chrome) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
  end

  def self.register_selenium_firefox
    # Force re-register to ensure our configuration is used
    Capybara.drivers.delete(:selenium_firefox)

    Capybara.register_driver :selenium_firefox do |app|
      Capybara::Selenium::Driver.new(app, browser: :firefox)
    end

    Capybara::Screenshot.register_driver(:selenium_firefox) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
  end

  def self.register_selenium_chrome_headless
    # Use a custom driver name to avoid conflicts with Capybara's built-in
    # :selenium_chrome_headless which uses the old --headless flag.
    # Chrome 109+ requires --headless=new for proper headless operation.
    Capybara.register_driver :headless_chrome do |app|
      browser_options = ::Selenium::WebDriver::Chrome::Options.new
      browser_options.args << "--headless=new"
      browser_options.args << "--disable-gpu"
      browser_options.args << "--no-sandbox"
      browser_options.args << "--disable-dev-shm-usage"
      browser_options.args << "--window-size=1920,1080"

      Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
    end

    Capybara::Screenshot.register_driver(:headless_chrome) do |driver, path|
      driver.browser.save_screenshot(path)
    end
  end
end
