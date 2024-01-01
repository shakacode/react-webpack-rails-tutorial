# frozen_string_literal: true

if Rails.env.development? || Rails.env.test?
  # See tasks/linters.rake

  task js_tests: :environment do
    puts Rainbow("Running JavaScript tests").green
    sh "yarn run test:client"
  end

  task rspec_tests: :environment do
    puts Rainbow("Running RSpec tests").green
    sh "rspec"
  end

  task build_rescript: :environment do
    puts Rainbow("Building ReScript files").green
    sh "yarn res:build"
  end

  namespace :ci do
    desc "Run all audits and tests"
    # rspec_tests must be before lint and js_tests to build the locale files
    task all: %i[environment build_rescript rspec_tests lint js_tests] do
      puts "All CI tasks"
      puts Rainbow("PASSED").green
      puts ""
    rescue StandardError => e
      puts e.to_s
      puts Rainbow("FAILED").red
      puts ""
      raise(e)
    end

    desc "Run CI rspec tests"
    task rspec: %i[environment build_rescript rspec_tests] do
      puts "CI rspec tests"
      puts Rainbow("PASSED").green
      puts ""
    rescue StandardError => e
      puts e.to_s
      puts Rainbow("FAILED").red
      puts ""
      raise(e)
    end

    desc "Run CI js_tests"
    task js: %i[environment build_rescript js_tests] do
      puts "CI js_tests"
      puts Rainbow("PASSED").green
      puts ""
    rescue StandardError => e
      puts e.to_s
      puts Rainbow("FAILED").red
      puts ""
      raise(e)
    end
  end

  task ci: "ci:all"

  task(:default).clear.enhance([:ci])
end
