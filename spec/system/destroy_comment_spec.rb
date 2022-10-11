# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Destroy a comment", existing_comment: true do
  context "when from classic page" do
    let(:comment) { FactoryBot.build(:comment) }

    xit "clicking destroy link destroys comment" do
      visit comments_path

      click_link "New Comment"
      submit_form(name: comment.author, text: comment.text)

      click_link "Back"
      click_link "Destroy"

      expect(page).not_to have_css(".comment", text: comment.author)
      expect(page).not_to have_css(".comment", text: comment.text)
    end
  end
end
