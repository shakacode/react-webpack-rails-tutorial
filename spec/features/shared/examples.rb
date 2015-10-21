require "rails_helper"
require "features/shared/contexts"

shared_examples "New Comment Submission" do
  context "when the new comment is submitted" do
    let(:name) { "John Smith" }
    let(:text) { "Hello there!" }
    include_context "Form Submitted", name: :name, text: :text

    scenario "comment is added" do
      expect(page).to have_css(".comment", text: name)
      expect(page).to have_css(".comment", text: text)
    end
  end

  context "when the new comment is submmited with blank fields" do
    let!(:comments_count) { all(".comment").size }
    include_context "Form Submitted with Blank Fields"

    scenario "comment is not added" do
      expect(page).to have_selector(".comment", count: comments_count)
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
