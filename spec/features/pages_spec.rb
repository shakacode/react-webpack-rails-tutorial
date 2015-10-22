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
  context "when .source_version file does not exist" do
    let(:sha) { "94d92356828a56db25fccff9d50f41c525eead5x" }
    let(:expected_text) { "5eead5x" }
    before { GitCommitSha.current_sha = sha }
    it_behaves_like "Git Commit SHA"
  end
  context "when .source_version file exists" do
    let(:sha) { "94d92356828a56db25fccff9d50f41c525eead5y" }
    let(:expected_text) { "5eead5y" }
    before do
      `cd #{Rails.root} && echo #{sha} > .source_version`
      GitCommitSha.reset_current_sha
    end
    after { `cd #{Rails.root} && rm .source_version` }
    it_behaves_like "Git Commit SHA"
  end
end
