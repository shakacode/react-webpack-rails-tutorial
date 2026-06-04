# frozen_string_literal: true

require "rails_helper"

describe "Server Components demo" do
  before { visit "/server-components" }

  it "renders the four demo sections" do
    expect(page).to have_selector("h2", text: "Server Environment")
    expect(page).to have_selector("h2", text: "Interactive Client Component")
    expect(page).to have_selector("h2", text: "Live Server Activity")
    expect(page).to have_selector("h2", text: "Streamed Comments")
  end

  it "shows server-side data in ServerInfo" do
    expect(page).to have_content("Platform")
    expect(page).to have_content("Architecture")
    expect(page).to have_content("Node.js")
    expect(page).to have_content("CPU Cores")
  end

  describe "Live Server Activity (RSCRoute)" do
    it "shows the initial activity card with the live stats labels" do
      expect(page).to have_content("SERVER TIME")
      expect(page).to have_content("FREE RAM")
      expect(page).to have_content("UPTIME (HRS)")
      expect(page).to have_content("Refresh count: 0")
    end

    it "updates content when Refresh is clicked" do
      click_button "Refresh"
      expect(page).to have_content("Refresh count: 1")
    end

    it "shows the ErrorBoundary fallback when Simulate Error is clicked, then recovers on Retry" do
      click_button "Simulate Error"
      expect(page).to have_content("Server component fetch failed")

      click_button "Retry"
      expect(page).to have_content("SERVER TIME")
      expect(page).to have_no_content("Server component fetch failed")
    end
  end
end
