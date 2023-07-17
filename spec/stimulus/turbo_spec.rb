# frozen_string_literal: true

require "rails_helper"

describe "with Turbo and Stimulus" do
  describe "tabs change on click" do
    before do
      visit "/stimulus"
    end

    it "shows horizontal tab on visit" do
      page.has_css?("form-horizontal")
    end

    it "stops showing horizontal tab when other tab is clicked" do
      click_link("Inline Form")
      page.has_no_css?("form-horizontal")
    end

    it "shows inline form when Inline Form link is clicked" do
      click_link("Inline Form")
      page.has_css?("form-inline")
    end

    it "shows stacked form when Stacked Form link is clicked" do
      click_link("Stacked Form")
      page.has_no_css?("form-inline") and page.has_no_css?("form-horizontal")
    end
  end

  describe "form submission functions" do
    let(:comment) { Comment.new(author: "Author", text: "This is a comment") }
    let(:author_field) { "comment_author" }
    let(:author_error) { "Author: can't be blank" }
    let(:text_field) { "comment_text" }
    let(:text_error) { "Text: can't be blank" }

    before do
      visit "/stimulus"
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
      expect(Comment.all.count).to equal(new_comment_count)
    end

    it "comment count remains the same when author field is empty" do
      initial_comment_count = Comment.all.count
      fill_in text_field, with: comment.text
      click_button("Post")
      expect(Comment.all.count).to equal(initial_comment_count)
    end

    it "comment count remains the same when text field is empty" do
      initial_comment_count = Comment.all.count
      fill_in author_field, with: comment.author
      click_button("Post")
      expect(Comment.all.count).to equal(initial_comment_count)
    end

    it "comment count remains the same when both form fields are empty" do
      initial_comment_count = Comment.all.count
      click_button("Post")
      expect(Comment.all.count).to equal(initial_comment_count)
    end
  end
end
