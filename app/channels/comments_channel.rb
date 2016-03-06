class CommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "comments_notifications"
  end
end
