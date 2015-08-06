desc "Remove all comments older than one day"
task :rm_comments => :environment do
  puts "Removing comments older than one day"
  #Comment.delete_all(created_at: Time.now.midnight - 1.year..Time.now.midnight - 1.day)
  #sql = "DELETE FROM comments WHERE created_at <= date('now','-1 day')"
  #sql = "DELETE FROM comments WHERE created_at < now()-'1 day'"
  sql = "DELETE FROM comments WHERE created_at < now() - interval '1 day'"
  ActiveRecord::Base.connection.execute(sql)
end
