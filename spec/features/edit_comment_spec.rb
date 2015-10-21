require "rails_helper"
require "features/shared/examples"
require "features/shared/contexts"

feature "Edit a comment" do
  include_context "Existing Comment"
  let(:comment) { Comment.first }

  context "from classic page" do
    include_context "Classic Page"
    background { click_link "Edit", match: :first }

    context "when edit is submitted" do
      let(:edited_name) { "Abraham Lincoln" }
      include_context "Form Submitted", name: :edited_name

      scenario "comment is updated" do
        expect(page).to have_css(".comment", text: :edited_name)
        expect(page).to have_success_message
      end
    end

    context "when edit is submitted with blank fields" do
      include_context "Form Submitted with Blank Fields"

      scenario "comment is not updated" do
        expect(page).not_to have_success_message
        expect(page).not_to have_css(".comment", text: "")
      end
    end
  end
end

private

def have_success_message # rubocop:disable Style/PredicateName
  have_css("#notice", "Comment was successfully created.")
end
