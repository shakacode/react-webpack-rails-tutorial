# frozen_string_literal: true

module DriverRegistration
  def self.register_selenium_chrome
    return if @selenium_chrome_registered

    Capybara.register_driver :selenium_chrome do |app|
      Capybara::Selenium::Driver.new(app, browser: :chrome)
    end
    Capybara::Screenshot.register_driver(:selenium_chrome) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
    @selenium_chrome_registered = true
  end

  def self.register_selenium_firefox
    return if @selenium_firefox_registered

    Capybara.register_driver :selenium_firefox do |app|
      Capybara::Selenium::Driver.new(app, browser: :firefox)
    end
    Capybara::Screenshot.register_driver(:selenium_firefox) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
    @selenium_firefox_registered = true
  end

  def self.register_selenium_chrome_headless
    # Force re-register to ensure our configuration is used
    Capybara.drivers.delete(:selenium_chrome_headless)

    Capybara.register_driver :selenium_chrome_headless do |app|
      browser_options = ::Selenium::WebDriver::Chrome::Options.new
      browser_options.args << "--headless"
      browser_options.args << "--disable-gpu"
      browser_options.args << "--no-sandbox"
      browser_options.args << "--disable-dev-shm-usage"
      browser_options.args << "--window-size=1920,1080"

      Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
    end

    Capybara::Screenshot.register_driver(:selenium_chrome_headless) do |driver, path|
      driver.browser.save_screenshot(path)
    end
  end
end
