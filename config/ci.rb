# frozen_string_literal: true

# Run using bin/ci

CI.run do
  step "Setup", "bin/setup --skip-server"

  step "Style: Ruby", "bin/rubocop"
  step "Style: JavaScript", "yarn lint:eslint"

  step "Tests: RSpec", "bin/rspec"
  step "Tests: Jest", "yarn test:client"

  # Optional: Run system tests
  # step "Tests: System", "bin/rails test:system"

  # Optional: set a green GitHub commit status to unblock PR merge.
  # Requires the `gh` CLI and `gh extension install basecamp/gh-signoff`.
  # if success?
  #   step "Signoff: All systems go. Ready for merge and deploy.", "gh signoff"
  # else
  #   failure "Signoff: CI failed. Do not merge or deploy.", "Fix the issues and try again."
  # end
end
