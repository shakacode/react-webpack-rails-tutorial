# frozen_string_literal: true

require "rails_helper"
require "system/shared/examples"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :system do
    context "with Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Inline Form", form: :inline do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Stacked Form", form: :stacked do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :system do
    context "with Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Inline Form", form: :inline do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Stacked Form", form: :stacked do
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "when simple page", page: :simple, js: true, type: :system do
    context "with Horizontal Form", form: :horizontal do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end

    context "with Inline Form", form: :inline do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end

    context "with the Stacked Form", form: :stacked do
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end
  end

  context "when from classic page", page: :classic do
    click_link "New Comment"

    include_examples "New Comment Submission", false
  end
end
