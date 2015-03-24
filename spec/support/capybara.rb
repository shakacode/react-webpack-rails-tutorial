require 'selenium-webdriver'

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

# Saves page to place specfied at
# NOTE: you must pass js: true for the feature definition (or else you'll see that render doesn't exist!)
# call force = true, or set ENV[RENDER_SCREENSHOTS] == 'YES'
def render_page(name, force = false)
  if force || (ENV['RENDER_SCREENSHOTS'] == 'YES')
    path = File.join Rails.application.config.integration_test_render_dir, "#{name}.png"
    page.driver.render(path)
  end
end
