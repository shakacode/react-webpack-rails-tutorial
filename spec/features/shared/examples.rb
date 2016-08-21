require "rails_helper"
require "features/shared/contexts"

shared_examples "New Comment Submission" do |expect_comment_count|
  context "when the new comment is submitted" do
    let(:name) { "John Smith" }
    let(:text) { "Hello there!" }
    include_context "Form Submitted", name: :name, text: :text

    scenario "comment is added" do
      expect(page).to have_css(".js-comment-author", text: name)
      expect(page).to have_css(".js-comment-text", text: text)
      expect(page).to have_no_content("Your comment was not saved!")
      if expect_comment_count
        expect(page).to have_css("#js-comment-count",
                                 text: "Comments: #{Comment.count}")
      end
    end
  end

  context "when the new comment is submitted with blank fields", blank_form_submitted: true do
    let!(:comments_count) { all(".comment").size }

    scenario "comment is not added" do
      expect(page).to have_selector(".comment", count: comments_count)
      if expect_comment_count
        expect(page).to have_css("#js-comment-count",
                                 text: "Comments: #{Comment.count}")
      end
    end
  end

  context "with iframe text" do
    let(:iframe_text) { "<iframe src=\"http://www.w3schools.com\"></iframe>" }
    include_context "Form Submitted", text: :iframe_text

    scenario "doesn't add an iframe" do
      expect(page).not_to have_css("iframe")
    end
  end
end

shared_examples "Validation errors displaying" do
  context "when the new comment is submitted with blank fields", blank_form_submitted: true do
    scenario "validation errors displayed" do
      expect(page).to have_content("Your comment was not saved!")
      expect(page).to have_content("Author: can't be blank")
      expect(page).to have_content("Text: can't be blank")

      # with a successful consequent comment submitted
      # the validation warnings should disappear
      fill_in "Your Name", with: "Some name"
      fill_in "Say something using markdown...", with: "Some text"
      click_button "Post"

      expect(page).to have_no_content("Your comment was not saved!")
      expect(page).to have_no_content("Author: can't be blank")
      expect(page).to have_no_content("Text: can't be blank")
    end
  end
end
