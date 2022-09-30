# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :system do
    it "with Horizontal Form" do
      click_link "Inline Form"
      click_link "Horizontal Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end

    it "with Inline Form" do
      click_link "Inline Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end

    it "with Stacked Form" do
      click_link "Stacked Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :system do
    it "with Horizontal Form" do
      click_link "Inline Form"
      click_link "Horizontal Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end

    it "with Inline Form" do
      click_link "Inline Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end

    it "with Stacked Form" do
      click_link "Stacked Form"
      submit_form
      include_examples "check if comment is added", true
      include_examples "expect successful validation"
    end
  end

  context "when simple page", page: :simple, js: true, type: :system do
    it "with Horizontal Form" do
      click_link "Inline Form"
      click_link "Horizontal Form"
      submit_form
      include_examples "check if comment is added", false
      include_examples "expect successful validation"
    end

    it "with Inline Form" do
      click_link "Inline Form"
      submit_form
      include_examples "check if comment is added", false
      include_examples "expect successful validation"
    end

    it "with the Stacked Form" do
      click_link "Stacked Form"
      submit_form
      include_examples "check if comment is added", false
      include_examples "expect successful validation"
    end
  end
end
