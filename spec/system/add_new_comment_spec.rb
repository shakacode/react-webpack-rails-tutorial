# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :system do
    describe "with Horizontal Form" do
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with Inline Form" do
      before {
        click_link "Inline Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with Stacked Form" do
      before {
        click_link "Stacked Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :system do
    describe "with Horizontal Form" do
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with Inline Form" do
      before {
        click_link "Inline Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with Stacked Form" do
      before {
        click_link "Stacked Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end
  end

  context "when simple page", page: :simple, js: true, type: :system do
    describe "with Horizontal Form" do
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with Inline Form" do
      before {
        click_link "Inline Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end

    describe "with the Stacked Form" do
      before {
        click_link "Stacked Form"
        submit_form
      }
      context "same examples" do
        include_examples "check if comment is added", true
        include_examples "expect successful validation"
      end
    end
  end
end
