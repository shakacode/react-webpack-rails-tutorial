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

shared_examples "Comments Form" do
  include_context "Form Submitted"

  scenario "submits form", js: true do
    expect(page).to have_css(".comment", text: name)
    expect(page).to have_css(".comment", text: text)
  end
end

shared_context "Horizontal Form" do
  background do
    click_link "Horizontal Form"
  end

  it_behaves_like "Comments Form"

  context "iframe text" do
    let(:iframe_text) { "<iframe src=\"http://www.w3schools.com\"></iframe>" }

    include_context "Form Submitted", text: :iframe_text

    scenario "doesn't add an iframe", js: true do
      expect(page).not_to have_css("iframe")
    end
  end

  context "blank fields" do
    before { @comments_count = all(".comment").size }
    include_context "Form Submitted", name: "", text: ""

    scenario "doesn't add a blank comment", js: true do
      expect(page).to have_selector(".comment", count: @comments_count)
    end
  end
end

shared_context "Inline Form" do
  background do
    click_link "Inline Form"
  end

  it_behaves_like "Comments Form"
end

shared_context "Stacked Form" do
  background do
    click_link "Stacked Form"
  end

  it_behaves_like "Comments Form"
end

feature "Add new comment" do
  context "from the main page" do
    background do
      visit root_path
    end

    include_context "Horizontal Form"
    include_context "Inline Form"
    include_context "Stacked Form"
  end

  context "from the simple page" do
    background do
      visit simple_path
    end

    include_context "Horizontal Form"
    include_context "Inline Form"
    include_context "Stacked Form"
  end

  context "from the classic page" do
    background do
      visit comments_path
      click_link "New Comment"
    end

    it_behaves_like "Comments Form"
  end
end

feature "Edit a comment" do
  context "from the classic page" do
    let(:edited_name) { "Edited Name" }

    background do
      visit comments_path
      click_link "Edit", match: :first
    end

    include_context "Form Submitted", name: :edited_name

    scenario "submits form" do
      expect(page).to have_css(".comment", text: :edited_name)
    end
  end
end

feature "Destroy a comment" do
  context "from the classic page" do
    let(:comment) { Comment.first }

    background do
      visit comments_path
      click_link "Destroy", href: comment_path(comment)
    end

    scenario "destroys comment" do
      expect(page).to_not have_css(".comment", text: comment.author)
      expect(page).to_not have_css(".comment", text: comment.text)
    end
  end
end
