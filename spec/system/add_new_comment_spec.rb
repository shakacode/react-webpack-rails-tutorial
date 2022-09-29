# frozen_string_literal: true

require "rails_helper"
require "system/shared/examples"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :system do
    context "with Horizontal Form" do
      include_examples "with Horizontal Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Inline Form" do
      include_examples "with Inline Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Stacked Form" do
      include_examples "with Stacked Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :system do
    context "with Horizontal Form" do
      include_examples "with Horizontal Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Inline Form" do
      include_examples "with Inline Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end

    context "with Stacked Form" do
      include_examples "with Stacked Form"
      include_examples "New Comment Submission", true
      include_examples "Validation errors displaying"
    end
  end

  context "when simple page", page: :simple, js: true, type: :system do
    context "with Horizontal Form" do
      include_examples "with Horizontal Form"
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end

    context "with Inline Form" do
      include_examples "with Inline Form"
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end

    context "with the Stacked Form" do
      include_examples "with Stacked Form"
      include_examples "New Comment Submission", false
      include_examples "Validation errors displaying"
    end
  end
end
