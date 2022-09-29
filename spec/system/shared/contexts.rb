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

# Forms
shared_context "when Horizontal Form", form: :horizontal do
  click_link "Inline Form"
  expect(page).to have_css("form.commentForm.form-inline")

  click_link "Horizontal Form"
  expect(page).to have_css("form.commentForm.form-horizontal")
end
shared_context "when Inline Form", form: :inline do
  click_link "Inline Form"
  expect(page).to have_css("form.commentForm.form-inline")
end
shared_context "when Stacked Form", form: :stacked do
  click_link "Stacked Form"
  expect(page).to have_css("form.commentForm.form-stacked")
end

# Form Submission
shared_context "when Form Submitted", form_submitted: true do |name: "Spicoli", text: "dude!"|
  fill_in "Your Name", with: name
  fill_in "Say something using markdown...", with: text
  click_button "Post"
end

shared_context "when Form Submitted with Blank Fields", blank_form_submitted: true do
  include_context "Form Submitted", name: "", text: ""
end

# Fixtures
shared_context "when Existing Comment", existing_comment: true do
  before { Comment.create(author: "John Doe", text: "Hello there!") }
end
