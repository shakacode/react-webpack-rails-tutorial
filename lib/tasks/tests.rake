desc "Run Karma tests"
task :test do
  puts "Running Karma Tests"
  sh "cd client && karma start assets/javascripts/spec/karma/config/unit.js"
end
