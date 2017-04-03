Codeship CI Configuration

```bash
#!/bin/bash
# Install a custom version of PhantomJS, http://phantomjs.org/
export PHANTOMJS_HOST="https://s3.amazonaws.com/codeship-packages"
export PHANTOMJS_VERSION=2.1.1

\curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/packages/phantomjs.sh | bash -s
# We support all major ruby versions: 1.9.3, 2.0.0, 2.1.x, 2.2.x and JRuby
rvm use 2.3.1
gem update --system
gem install bundler
bundle config build.nokogiri --use-system-libraries
bundle config build.json --use-system-libraries
bundle install
chromedriver-update
nvm install stable && nvm alias default stable
npm install npm@latest -g
npm install
bundle exec rake react_on_rails:locale
cd client && npm run build:test
cd ..
export RAILS_ENV=test
bundle exec rake db:schema:load
```
