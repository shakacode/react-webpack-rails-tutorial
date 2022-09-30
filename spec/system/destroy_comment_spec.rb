# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Destroy a comment", existing_comment: true do
  context "when from classic page" do
    let(:comment) { Comment.first }

    it "clicking destroy link destroys comment" do
      click_link "New Comment"
      submit_form(name: comment.author, text: comment.text)

      accept_confirm do
        click_link "Destroy", href: comment_path(comment)
      end

      expect(page).not_to have_css(".comment", text: comment.author)
      expect(page).not_to have_css(".comment", text: comment.text)
    end
  end
end
