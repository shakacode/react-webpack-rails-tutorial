# frozen_string_literal: true

require "rails_helper"
require "system/shared/examples"
require "system/shared/contexts"

describe "Edit a comment", existing_comment: true do
  let(:comment) { Comment.first }

  context "when from classic page", page: :classic do
    before { click_link "Edit", match: :first }

    context "when edit is submitted" do
      let(:edited_name) { "Abraham Lincoln" }

      include_context "Form Submitted", name: :edited_name

      it "comment is updated" do
        expect(page).to have_css(".comment", text: :edited_name)
        expect(page).to have_success_message
      end
    end

    context "when edit is submitted with blank fields", blank_form_submitted: true do
      it "comment is not updated" do
        expect(page).not_to have_success_message
        expect(page).to have_failure_message
        expect(page).not_to have_css(".comment", text: "")
      end
    end
  end
end

private

def have_success_message
  have_css("#notice", "Comment was successfully created.")
end

def have_failure_message
  have_css("#error_explanation")
end
