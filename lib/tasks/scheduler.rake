desc "Remove all comments older than one day"
task :rm_comments => :environment do
  puts "Removing comments older than one day"
  Comment.delete_all(:created_at => Time.now.midnight - 1.year..Time.now.midnight - 1.day)
end
