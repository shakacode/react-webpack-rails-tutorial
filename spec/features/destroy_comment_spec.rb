require "rails_helper"
require "features/shared/contexts"

feature "Destroy a comment", existing_comment: true do
  context "from classic page", page: :classic do
    let(:comment) { Comment.first }

    scenario "clicking destroy link destroys comment" do
      click_link "Destroy", href: comment_path(comment)
      expect(page).to_not have_css(".comment", text: comment.author)
      expect(page).to_not have_css(".comment", text: comment.text)
    end
  end
end
