class Comment < ActiveRecord::Base
  validates_presence_of :author
  validates_presence_of :text

  after_create :broadcast

  private
    def broadcast
      ActionCable.server.broadcast(
        "comments_notifications", {
          event_name: "CommentCreated",
          eventable_type: 'comment', eventable_id: id,
          data: JSON.load(ApplicationController.new.render_to_string(partial: 'comments/comment', locals: { comment: self }))
      })
    end
end
