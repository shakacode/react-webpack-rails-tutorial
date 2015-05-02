if %w(development test).include? Rails.env
  require "rubocop/rake_task"
  RuboCop::RakeTask.new

  task(:default).clear

  desc "JS Linting"
  task :js_lint do
    sh "cd client && bin/lint"
  end

  task default: [:spec, :rubocop]
end

if %w(development test).include? Rails.env
  # require "rubocop/rake_task"
  # require "slim_lint/rake_task"
  require "scss_lint/rake_task"

  # This fails: https://github.com/bbatsov/rubocop/issues/1840
  # RuboCop::RakeTask.new

  desc "Run Rubocop lint as shell"
  task :rubocop_lint do
    puts "Running Rubocop Linters"
    sh "rubocop ."
  end

  # SlimLint::RakeTask.new

  SCSSLint::RakeTask.new do |t|
    t.files = ["app/assets/stylesheets/", "client/assets/stylesheets/"]
  end

  desc "eslint"
  task :eslint_lint do
    puts "Running eslint"
    sh "cd client && npm run eslint . -- --ext .jsx,.js"
  end

  desc "jscs"
  task :jscs_lint do
    puts "Running jscs"
    sh "cd client && npm run jscs ."
  end

  desc "JS Linting"
  task js_lint: [:eslint_lint, :jscs_lint] do
    puts "Running JavaScript Linters"
  end

  # could add :slim_lint here
  task lint: [:rubocop_lint, :js_lint, :scss_lint] do
    puts "Completed All Linting"
  end
end
