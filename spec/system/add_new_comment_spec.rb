# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :system do
    before { visit root_path }
    describe "with Horizontal Form" do
      subject { page }
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      subject { page }
      before {
        click_link "Inline Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with Stacked Form" do
      subject { page }
      before {
        click_link "Stacked Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :system do
    describe "with Horizontal Form" do
      subject { page }
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      subject { page }
      before {
        click_link "Inline Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with Stacked Form" do
      subject { page }
      before {
        click_link "Stacked Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end
  end

  context "when simple page", page: :simple, js: true, type: :system do
    describe "with Horizontal Form" do
      subject { page }
      before {
        click_link "Inline Form"
        click_link "Horizontal Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      subject { page }
      before {
        click_link "Inline Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end

    describe "with the Stacked Form" do
      subject { page }
      before {
        click_link "Stacked Form"
        submit_form
      }
      it "this sucks" do
        is_expected.to have_css(".js-comment-author", text: "Spicoli")
        is_expected.to have_css(".js-comment-text", text: "dude!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Your comment was not saved!")
        is_expected.to have_no_content("Author: can't be blank")
        is_expected.to have_no_content("Text: can't be blank")
      end
    end
  end
end
