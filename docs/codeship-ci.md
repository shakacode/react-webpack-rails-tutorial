Codeship CI Configuration

## Overview
Pick "I want to create my own custom commands" on the Project Settings, Test tab.

## Setup Commands
```bash
#!/bin/bash
rvm use 2.5.3
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
export RAILS_ENV=test
bundle exec rake db:schema:load
```

## Test Pipeline

```bash
COVERALLS_REPO_TOKEN=YynC bundle exec rake
```
