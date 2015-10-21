require "rails_helper"

shared_examples "Git Commit SHA" do
  # Keep existing env variable intact
  let!(:old_sha) { ENV["DEPLOYMENT_SHA"] }
  after { ENV["DEPLOYMENT_SHA"] = old_sha }
  background { visit root_path }
  it "displays the current git commit" do
    expect(page).to have_css("#git-commit-sha", text: expected_text)
  end
end

feature "Git Commit SHA" do
  context "when env var is not set" do
    let(:sha) { "94d92356828a56db25fccff9d50f41c525eead5x" }
    let(:expected_text) { "5eead5x" }
    before { GitCommitSha.current_sha = sha }
    it_behaves_like "Git Commit SHA"
  end
  context "when env var is set" do
    let(:sha) { "94d92356828a56db25fccff9d50f41c525eead5y" }
    let(:expected_text) { "5eead5y" }
    before do
      ENV["DEPLOYMENT_SHA"] = sha
      GitCommitSha.reset_current_sha
    end
    it_behaves_like "Git Commit SHA"
  end
end
