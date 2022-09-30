# frozen_string_literal: true

require "rails_helper"

# Pages
shared_context "when React Router Demo", page: :main do
  before { visit root_path }
end
shared_context "when React Demo", page: :react_demo do
  before { visit no_router_path }
end
shared_context "when Simple Page", page: :simple do
  before { visit simple_path }
end
shared_context "when Classic Page", page: :classic do
  before { visit comments_path }
end

# Fixtures
shared_context "when Existing Comment", existing_comment: true do
  before { Comment.create(author: "John Doe", text: "Hello there!") }
end

shared_examples "check if comment is added" do |expect_comment_count|
  expect(page).to have_css(".js-comment-author", text: name)
  expect(page).to have_css(".js-comment-text", text: text)
  expect(page).to have_no_content("Your comment was not saved!")
  if expect_comment_count
    expect(page).to have_css("#js-comment-count",
                             text: "Comments: #{Comment.count}")
  end
end

shared_examples "expect failed validation" do
  expect(page).to have_content("Your comment was not saved!")
  expect(page).to have_content("Author: can't be blank")
  expect(page).to have_content("Text: can't be blank")
end

shared_examples "expect successful validation" do
  expect(page).to have_no_content("Your comment was not saved!")
  expect(page).to have_no_content("Author: can't be blank")
  expect(page).to have_no_content("Text: can't be blank")
end

# Form Submission
def submit_form(name: "Spicoli", text: "dude!")
  fill_in "Your Name", with: name
  fill_in "Say something using markdown...", with: text
  click_button "Post"
end
