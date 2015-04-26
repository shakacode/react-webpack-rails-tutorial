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
