class CommentRelayJob < ApplicationJob
  def perform(comment)
    ActionCable.server.broadcast "comments", comment.slice(:id, :author, :text)
  end
end
