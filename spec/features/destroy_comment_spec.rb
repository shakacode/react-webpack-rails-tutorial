require "rails_helper"
require "features/shared/contexts"

feature "Destroy a comment" do
  include_context "Existing Comment"
  context "from classic page" do
    include_context "Classic Page"
    let(:comment) { Comment.first }

    scenario "clicking destroy link destroys comment" do
      click_link "Destroy", href: comment_path(comment)
      expect(page).to_not have_css(".comment", text: comment.author)
      expect(page).to_not have_css(".comment", text: comment.text)
    end
  end
end
