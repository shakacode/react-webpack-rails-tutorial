require 'selenium-webdriver'

# At this time Capybara-Webkit and Poltergeist do not work as headless drivers with Capybara
# and ReactJS without custom javascript implementation and modified css.
# https://github.com/thoughtbot/capybara-webkit/issues/494
# https://github.com/teampoltergeist/poltergeist/issues/292

Capybara.register_driver :selenium_chrome do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end




