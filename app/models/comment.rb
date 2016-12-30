class Comment < ActiveRecord::Base

  validates :author, :text, presence: true

  after_commit { CommentRelayJob.perform_later(self) }

end
