source "https://rubygems.org"
ruby "2.5.1"

gem "react_on_rails", "11.0.7"
gem "webpacker"

# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "listen"
gem "rails", "~> 5"

# Note: We're using sqllite3 for development and testing
# gem "sqlite3", group: [:development, :test]

gem "pg"

gem "puma"

# Use SCSS for stylesheets
gem "sass-rails"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier"
# Use CoffeeScript for .js.coffee assets and views
gem "coffee-rails"

# Turbolinks makes following links in your web application faster.
# Read more: https://github.com/turbolinks/turbolinks
# Get turbolinks from npm!
# gem 'turbolinks', '>= 5.0.0.beta2'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder"
gem "redis", "3.3.3"

# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# mini_racer is probably faster than therubyracer
gem "mini_racer"

gem "autoprefixer-rails"

gem "awesome_print"

# jquery as the JavaScript library has been moved under /client and managed by npm.
# It is critical to not include any of the jquery gems when following this pattern or
# else you might have multiple jQuery versions.

group :development do
  # Access an IRB console on exceptions page and /console in development
  gem "web-console"
end

group :development, :test do
  ################################################################################
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-commands-rspec"

  ################################################################################
  # Manage application processes
  gem "factory_bot_rails"
  gem "foreman"

  ################################################################################
  # Linters and Security
  gem "rubocop", require: false
  gem "ruby-lint", require: false
  # Critical that require: false be set! https://github.com/brigade/scss-lint/issues/278
  gem "brakeman", require: false
  gem "bundler-audit", require: false
  gem "scss_lint", require: false

  ################################################################################
  # Favorite debugging gems
  gem "pry"
  gem "pry-byebug"
  gem "pry-doc"
  gem "pry-rails"
  gem "pry-rescue"
  gem "pry-stack_explorer"

  ################################################################################
  # Color console output
  gem "rainbow"
end

group :test do
  gem "capybara", "2.18.0"
  gem "capybara-screenshot"
  gem "capybara-webkit"
  gem "chromedriver-helper"
  gem "coveralls", require: false
  gem "database_cleaner"
  gem "generator_spec"
  gem "launchy"
  gem "poltergeist"
  gem "rails_best_practices"
  gem "rspec-rails", "3.7.2"
  gem "selenium-webdriver"
end
