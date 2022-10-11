# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Edit a comment", existing_comment: true do
  let(:comment) { FactoryBot.build(:comment) }

  context "when from classic page" do
    it "comment is updated when edit is submitted" do
      visit comments_path
      click_link "New Comment"
      submit_form

      click_link "Edit", match: :first
      let(:edited_name) { "Abraham Lincoln" }

      subit_form(name: :edited_name)
      expect(page).to have_css(".comment", text: :edited_name)
      expect(page).to have_css("#notice", text: "Comment was successfully updated.")
    end

    it "comment is not updated when edit is submitted with blank fields", blank_form_submitted: true do
      visit comments_path
      click_link "New Comment"
      submit_form

      click_link "Edit", match: :first
      submit_form(name: "", text: "")

      expect(page).not_to have_success_message
      expect(page).to have_failure_message
      expect(page).not_to have_css(".comment", text: "")
    end
  end
end

private

def have_success_message
  have_css("#notice", text: "Comment was successfully created.")
end

def have_failure_message
  have_css("#error_explanation")
end
