class Comment < ActiveRecord::Base

  validates :author, :text, presence: true

  after_commit { CommentRelayJob.perform_now(self)  }

end
