class Comment < ActiveRecord::Base

  validates :author, :text, presence: true

end
