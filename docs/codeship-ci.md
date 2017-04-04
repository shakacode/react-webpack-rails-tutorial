Codeship CI Configuration

## Overview
Pick "I want to create my own custom commands" on the Project Settings, Test tab.

## Setup Commands
```bash
#!/bin/bash
# Install a custom version of PhantomJS, http://phantomjs.org/
export PHANTOMJS_HOST="https://s3.amazonaws.com/codeship-packages"
export PHANTOMJS_VERSION=2.1.1
\curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/packages/phantomjs.sh | bash -s
rvm use 2.3.1
gem update --system
gem install bundler
bundle config build.nokogiri --use-system-libraries
bundle config build.json --use-system-libraries
bundle install
chromedriver-update
nvm install stable && nvm alias default stable
npm install npm@latest -g
npm install --global yarn
yarn install
bundle exec rake react_on_rails:locale
# cd client && npm run build:test
# cd ..
export RAILS_ENV=test
bundle exec rake db:schema:load
```

## Test Pipeline

```bash
COVERALLS_REPO_TOKEN=YynC bundle exec rake
bundle exec rake lint
```
