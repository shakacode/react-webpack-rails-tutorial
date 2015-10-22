require "rails_helper"
require "features/shared/examples"
require "features/shared/contexts"

feature "Add new comment" do
  context "from main page", page: :main, js: true do
    context "via Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission"
    end
    context "via Inline Form", form: :inline do
      include_examples "New Comment Submission"
    end
    context "via Stacked Form", form: :stacked do
      include_examples "New Comment Submission"
    end
  end

  context "from simple page", page: :simple, js: true do
    context "via Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission"
    end
    context "via Inline Form", form: :inline do
      include_examples "New Comment Submission"
    end
    context "via the Stacked Form", form: :stacked do
      include_examples "New Comment Submission"
    end
  end

  context "from classic page", page: :classic do
    background { click_link "New Comment" }
    include_examples "New Comment Submission"
  end
end
