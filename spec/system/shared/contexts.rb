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

# Form Submission
def submit_form(name: "Spicoli", text: "dude!")
  fill_in "Your Name", with: name
  fill_in "Say something using markdown...", with: text
  click_button "Post"
end
