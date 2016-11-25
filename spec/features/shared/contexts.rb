require "rails_helper"

# Pages
shared_context "React Router Demo", page: :main do
  background { visit root_path }
end
shared_context "React Demo", page: :react_demo do
  background { visit no_router_path }
end
shared_context "Simple Page", page: :simple do
  background { visit simple_path }
end
shared_context "Classic Page", page: :classic do
  background { visit comments_path }
end

# Forms
shared_context "Horizontal Form", form: :horizontal do
  background do
    # added an extra click on this the non-default link to try to tease out a poltergeist crash
    click_link "Inline Form"
    expect(page).to have_css("form.commentForm.form-inline")

    click_link "Horizontal Form"
    expect(page).to have_css("form.commentForm.form-horizontal")
  end
end
shared_context "Inline Form", form: :inline do
  background do
    click_link "Inline Form"
    expect(page).to have_css("form.commentForm.form-inline")
  end
end
shared_context "Stacked Form", form: :stacked do
  background do
    click_link "Stacked Form"
    expect(page).to have_css("form.commentForm.form-stacked")
  end
end

# Form Submission
shared_context "Form Submitted", form_submitted: true do |name: "Spicoli", text: "dude!"|
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

shared_context "Form Submitted with Blank Fields", blank_form_submitted: true do
  include_context "Form Submitted", name: "", text: ""
end

# Fixtures
shared_context "Existing Comment", existing_comment: true do
  before { Comment.create(author: "John Doe", text: "Hello there!") }
end
