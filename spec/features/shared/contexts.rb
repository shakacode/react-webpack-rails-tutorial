require "rails_helper"

# Pages
shared_context "Main Page" do
  background { visit root_path }
end
shared_context "Simple Page" do
  background { visit simple_path }
end
shared_context "Classic Page" do
  background { visit comments_path }
end

# Forms
shared_context "Horizontal Form" do
  background { click_link "Horizontal Form" }
end
shared_context "Inline Form" do
  background { click_link "Inline Form" }
end
shared_context "Stacked Form" do
  background { click_link "Stacked Form" }
end

# Form Submission
shared_context "Form Submitted" do |name: "Spicoli", text: "dude!"|
  let(:hint_name) { "Your Name" }
  let(:hint_text) { "Say something using markdown..." }
  let(:name) { name }
  let(:text) { text }

  background do
    fill_in hint_name, with: name
    fill_in hint_text, with: text
    click_button "Post"
  end
end

shared_context "Form Submitted with Blank Fields" do
  include_context "Form Submitted", name: "", text: ""
end

# Fixtures
shared_context "Existing Comment" do
  before { Comment.create(author: "John Doe", text: "Hello there!") }
end
