class CommentRelayJob < ApplicationJob
  def perform(comment)
    ActionCable.server.broadcast "CommentsChannel", comment: comment.slice(:id, :author, :text)
  end
end
