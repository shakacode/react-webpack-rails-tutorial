# frozen_string_literal: true

require "rails_helper"

describe "with Rescript" do
  describe "tabs change on click" do
    before do
      visit "/rescript"
    end

    it "shows horizontal tab on visit" do
      page.has_css?("form-horizontal")
    end

    it "stops showing horizontal tab when other tab is clicked" do
      find("button", text: "Inline Form")
      page.has_no_css?("form-horizontal")
    end

    it "shows inline form when Inline Form link is clicked" do
      find("button", text: "Inline Form", wait: 10)
      page.has_css?("form-inline")
    end

    it "shows stacked form when Stacked Form link is clicked" do
      find("button", text: "Stacked Form")
      page.has_no_css?("form-inline") and page.has_no_css?("form-horizontal")
    end
  end

  describe "form submission functions" do
    let(:comment) { Comment.new(author: "Author", text: "This is a comment") }
    let(:author_field) { "comment_author" }
    let(:text_field) { "comment_text" }

    before do
      visit "/rescript"
    end

    it "adds a new comment to the page" do
      fill_in author_field, with: comment.author
      fill_in text_field, with: comment.text
      click_button("Post")
      expect(page).to have_selector "h2", text: comment.author
    end

    it "comment count increases with successful form submission" do
      initital_comment_count = Comment.all.count
      new_comment_count = initital_comment_count + 1
      fill_in author_field, with: comment.author
      fill_in text_field, with: comment.text
      click_button("Post")

      page.driver.browser.manage.timeouts.implicit_wait = 1

      expect(Comment.all.count).to equal(new_comment_count)
    end

    it "comment count remains the same when author field is empty" do
      initial_comment_count = Comment.all.count
      fill_in text_field, with: comment.text
      click_button("Post")

      expect(page).to have_text(/Can't save the comment!/)
      expect(Comment.all.count).to equal(initial_comment_count)
    end

    it "comment count remains the same when text field is empty" do
      initial_comment_count = Comment.all.count
      fill_in author_field, with: comment.author
      click_button("Post")

      expect(page).to have_text(/Can't save the comment!/)
      expect(Comment.all.count).to equal(initial_comment_count)
    end

    it "comment count remains the same when both form fields are empty" do
      initial_comment_count = Comment.all.count
      click_button("Post")

      expect(page).to have_text(/Can't save the comment!/)
      expect(Comment.all.count).to equal(initial_comment_count)
    end
  end
end
