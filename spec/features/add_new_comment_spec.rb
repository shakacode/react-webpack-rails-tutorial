require "rails_helper"
require "features/shared/examples"
require "features/shared/contexts"

feature "Add new comment" do
  context "from main page", js: true do
    include_context "Main Page"
    context "via Horizontal Form" do
      include_context "Horizontal Form"
      include_examples "New Comment Submission"
    end
    context "via Inline Form" do
      include_context "Inline Form"
      include_examples "New Comment Submission"
    end
    context "via Stacked Form" do
      include_context "Stacked Form"
      include_examples "New Comment Submission"
    end
  end

  context "from simple page", js: true do
    include_context "Simple Page"
    context "via Horizontal Form" do
      include_context "Horizontal Form"
      include_examples "New Comment Submission"
    end
    context "via Inline Form" do
      include_context "Inline Form"
      include_examples "New Comment Submission"
    end
    context "via the Stacked Form" do
      include_context "Stacked Form"
      include_examples "New Comment Submission"
    end
  end

  context "from classic page" do
    include_context "Classic Page"
    background { click_link "New Comment" }
    include_examples "New Comment Submission"
  end
end
