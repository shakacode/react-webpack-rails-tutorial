class CommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "comments"
  end
end
