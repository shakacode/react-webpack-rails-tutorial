# frozen_string_literal: true

class CommentRelayJob < ApplicationJob
  def perform(comment)
    ActionCable.server.broadcast "comments", comment unless comment.destroyed?
  end
end
