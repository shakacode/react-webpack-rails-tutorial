class CommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "CommentsChannel"
  end

  def send(comment)
    puts "here"
    Comment.create!(comment)
  end

  def receive(comment)
    ActionCable.server.broadcast "CommentsChannel", comment.slice("author", "text")
  end

end
