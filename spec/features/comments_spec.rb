require "rails_helper"

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

shared_examples "Form" do
  include_context "Form Submitted"

  scenario "submits form", js: true do
    expect(page).to have_css(".commentList .comment", text: name)
    expect(page).to have_css(".commentList .comment", text: text)
  end
end

feature "Add new comment" do
  background do
    visit root_path
  end

  context "Horizonal Form" do
    background do
      click_link "Horizontal Form"
    end

    it_behaves_like "Form"

    context "iframe text" do
      let(:iframe_text) { "<iframe src=\"http://www.w3schools.com\"></iframe>" }

      include_context "Form Submitted", text: :iframe_text

      scenario "doesn't add an iframe", js: true do
        expect(page).not_to have_css("iframe")
      end
    end
  end

  context "Inline Form" do
    background do
      click_link "Inline Form"
    end

    it_behaves_like "Form"
  end

  context "Stacked Form" do
    background do
      click_link "Stacked Form"
    end

    it_behaves_like "Form"
  end
end
