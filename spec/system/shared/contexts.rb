# frozen_string_literal: true

require "rails_helper"

# Form Submission
def submit_form(name: "Spicoli", text: "dude!")
  fill_in "Your Name", with: name
  fill_in "Say something using markdown...", with: text
  click_button "Post"
end
