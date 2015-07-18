desc "Run Karma tests"
task :js_tests do
  puts "Running Karma Tests"
  sh "cd client && karma start assets/javascripts/spec/karma/config/unit.js"
end
