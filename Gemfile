source "https://rubygems.org"
ruby "2.2.2"

#
# Bundle edge Rails instead: gem "rails", github: "rails/rails"
gem "rails", "~>4.2"
# Use sqlite3 as the database for Active Record
gem "sqlite3", group: :development
gem "pg", group: :production

# Use SCSS for stylesheets
gem "sass-rails"
gem "bootstrap-sass", "~> 3.3.1"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier"
# Use CoffeeScript for .js.coffee assets and views
gem "coffee-rails"
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem "therubyracer", platforms: :ruby

# Use jquery as the JavaScript library
gem "jquery-rails"
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem "turbolinks"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder"
# bundle exec rake doc:rails generates the API under doc/api.
gem "sdoc", group: :doc
gem "es5-shim-rails"

# Use ActiveModel has_secure_password
# gem "bcrypt", "~> 3.1.7"

# Use Rails Html Sanitizer for HTML sanitization
gem "rails-html-sanitizer"

# Use Unicorn as the app server
gem "unicorn"

gem "autoprefixer-rails"

# Use Capistrano for deployment
# gem "capistrano-rails", group: :development
group :production do
  gem "rails_12factor"
end

group :development, :test do
  # Call "debugger" anywhere in the code to stop execution and get a debugger console
  gem "byebug"

  # Access an IRB console on exceptions page and /console in development
  gem "web-console"

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem "spring"

  gem "spring-commands-rspec"

  # Manage application processes
  gem "foreman"

  gem "factory_girl_rails"

  gem "rubocop", require: false

  gem "ruby-lint", require: false

  gem "scss_lint", require: false

  gem "brakeman", require: false

  gem "bundler-audit", require: false

  gem "rainbow"
end

group :test  do
  gem "rspec-rails"
  gem "capybara"
  gem "capybara-screenshot"
  gem "poltergeist"
  gem "database_cleaner"
  gem "launchy"
end
