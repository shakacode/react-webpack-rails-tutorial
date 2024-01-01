# frozen_string_literal: true

require "rails_helper"
require "system/shared/contexts"

describe "Add new comment" do
  context "when React Router", page: :main, js: true, type: :feature do
    describe "with Horizontal Form" do
      before do
        visit root_path
        click_button "Inline Form"
        click_button "Horizontal Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      before do
        visit root_path
        click_button "Inline Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with Stacked Form" do
      before do
        visit root_path
        click_button "Stacked Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end
  end

  context "when React/Redux", page: :react_demo, js: true, type: :feature do
    describe "with Horizontal Form" do
      before do
        visit root_path
        click_button "Inline Form"
        click_button "Horizontal Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      before do
        visit root_path
        click_button "Inline Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with Stacked Form" do
      before do
        visit root_path
        click_button "Stacked Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_css("#js-comment-count", text: "Comments: #{Comment.count}")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end
  end

  context "when simple page", page: :simple, js: true, type: :feature do
    describe "with Horizontal Form" do
      before do
        visit root_path
        click_button "Inline Form"
        click_button "Horizontal Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with Inline Form" do
      before do
        visit root_path
        click_button "Inline Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end

    describe "with the Stacked Form" do
      before do
        visit root_path
        click_button "Stacked Form"
        submit_form
      end

      it "has the submitted comment" do
        expect(page).to have_css(".js-comment-author", text: "Spicoli")
        expect(page).to have_css(".js-comment-text", text: "dude!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Your comment was not saved!")
        expect(page).to have_no_content("Author: can't be blank")
        expect(page).to have_no_content("Text: can't be blank")
      end
    end
  end
end
