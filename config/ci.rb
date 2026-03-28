# frozen_string_literal: true

module TutorialCI
  STEPS = [
    ["Setup", "bin/conductor-exec bin/setup --skip-server"],
    ["Style: Ruby", "bin/conductor-exec bin/rubocop"],
    ["Style: JavaScript", "bin/conductor-exec yarn lint:eslint"],
    [
      "Build: Test assets",
      "RAILS_ENV=test bin/conductor-exec bin/rails react_on_rails:generate_packs && " \
      "bin/conductor-exec yarn res:build && " \
      "bin/conductor-exec yarn build:test"
    ],
    ["Tests: RSpec", "bin/conductor-exec bin/rspec"],
    ["Tests: Jest", "bin/conductor-exec yarn test:client"]
  ].freeze
end
