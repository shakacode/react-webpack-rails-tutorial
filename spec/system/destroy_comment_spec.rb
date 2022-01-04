# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Destroy a comment", existing_comment: true do
  context "when from classic page", page: :classic do
    let(:comment) { Comment.first }

    it "clicking destroy link destroys comment" do
      accept_confirm do
        click_link "Destroy", href: comment_path(comment)
      end
      expect(page).not_to have_css(".comment", text: comment.author)
      expect(page).not_to have_css(".comment", text: comment.text)
    end
  end
end
