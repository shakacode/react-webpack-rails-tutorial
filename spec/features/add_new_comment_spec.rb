require "rails_helper"
require "features/shared/examples"
require "features/shared/contexts"

feature "Add new comment" do
  context "React Router", page: :main, js: true do
    context "via Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
    context "via Inline Form", form: :inline do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
    context "via Stacked Form", form: :stacked do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "React/Redux", page: :react_demo, js: true do
    context "via Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
    context "via Inline Form", form: :inline do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
    context "via Stacked Form", form: :stacked do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "simple page", page: :simple, js: true do
    context "via Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end
    context "via Inline Form", form: :inline do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end
    context "via the Stacked Form", form: :stacked do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end
  end

  context "from classic page", page: :classic do
    background { click_link "New Comment" }
    include_examples "New Comment Submission", false
  end
end
