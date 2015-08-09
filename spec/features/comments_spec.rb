require "rails_helper"

feature "Add new comment" do
  scenario " add post via horizontal, stacked, or inline form", js: true do
    visit root_path

    click_link "Horizontal Form"
    fill_in "Your Name", with: "Tommy"
    fill_in "Say something...", with: "Surf's up dude!"
    click_button "Post"
    expect(page).to have_css(".commentList .comment", text: "Tommy")
    expect(page).to have_css(".commentList .comment", text: "Surf's up dude!")

    click_link "Horizontal Form"
    fill_in "Your Name", with: "Jason"
    fill_in "Say something...", with: "<iframe src=\"http://www.w3schools.com\"></iframe>"
    click_button "Post"
    expect(page).to have_css(".commentList .comment", text: "Jason")
    expect(page).not_to have_css("iframe")
    expect(page).to have_css(".commentList .comment", text: "<iframe src=\"http://www.w3schools.com\"")

    click_link "Stacked Form"
    fill_in "Your Name", with: "Spicoli"
    fill_in "Say something...", with: "Cowabunga dude!"
    click_button "Post"
    expect(page).to have_css(".commentList .comment", text: "Spicoli")
    expect(page).to have_css(".commentList .comment", text: "Cowabunga dude!")

    click_link "Inline Form"
    fill_in "Your Name", with: "Wilbur Kookmeyer"
    fill_in "Say something...", with: "dude!"
    click_button "Post"
    expect(page).to have_css(".commentList .comment", text: "Wilbur Kookmeyer")
    expect(page).to have_css(".commentList .comment", text: "dude!")
  end
end
