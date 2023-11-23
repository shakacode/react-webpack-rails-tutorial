# frozen_string_literal: true

task daily: :environment do
  t = 1.day.ago
  older_comments = Comment.where("created_at < ?", t)
  newer_comments = Comment.where("created_at >= ?", t)
  puts "Deleting #{older_comments.count} comments older than #{t}"
  puts "Keeping #{newer_comments.count} comments newer than #{t}"
  older_comments.delete_all
end
