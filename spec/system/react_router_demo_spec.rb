# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "React Router Routes", js: true, type: :system do
  context "when Root URL", page: :main do
    it "shows comments section" do
      click_link "Comments (Root URL)"
      expect(page).to have_selector("h2", text: "Comments")
    end
  end

  context "when /react-router URL", page: :main do
    it "shows 'React Router is working!' message" do
      click_link "Test React Router ('/react-router')"
      expect(page).to have_selector("h1", text: "React Router is working!")
    end
  end

  context "when /react-router/redirect URL", page: :main do
    before { click_link "Test Redirect (url to '/react-router/redirect' which goes to root '/')" }

    it "shows comments section" do
      expect(page).to have_selector("h2", text: "Comments")
    end

    it "shows redirect message" do
      expect(page).to have_selector(".bg-success", text: "You have been redirected from/react-router/redirect")
    end
  end
end
