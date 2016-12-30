class CommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "CommentsChannel"
  end
end
