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

  def driver_caps(app)
    caps = Selenium::WebDriver::Remote::Capabilities.firefox
    caps["platform"] = "OS X 10.11"
    caps["version"] = "49.0"
    caps["tunnel-identifier"] = ENV["TRAVIS_JOB_NUMBER"] if ENV["TRAVIS_JOB_NUMBER"]

    Capybara::Selenium::Driver.new(
      app,
      browser: :remote,
      url: ENV["SAUCE_LABS_URL"],
      desired_capabilities: caps
    )
  end

  def self.register_selenium_firefox
    return if @selenium_firefox_registered
    Capybara.register_driver :selenium_firefox do |app|
      driver_caps(app)
    end
    Capybara::Screenshot.register_driver(:selenium_firefox) do |js_driver, path|
      js_driver.browser.save_screenshot(path)
    end
    @selenium_firefox_registered = true
  end
end
