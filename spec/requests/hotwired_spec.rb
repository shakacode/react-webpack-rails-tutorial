# frozen_string_literal: true

require "rails_helper"

describe "Hotwired Demo" do
  describe "routing" do
    it "routes /hotwired to pages#hotwired" do
      expect(Rails.application.routes.recognize_path("/hotwired", method: :get))
        .to include(controller: "pages", action: "hotwired")
    end
  end

  describe "POST /comments.turbo_stream" do
    it "returns turbo stream response on success" do
      params = { comment: attributes_for(:comment) }

      expect { post comments_path(format: :turbo_stream), params: params }.to change(Comment, :count).by(1)
      expect(response).to have_http_status(:ok)
      expect(response.media_type).to eq(Mime[:turbo_stream].to_s)
      expect(response.body).to include('turbo-stream action="prepend" target="comments"')
    end

    it "returns unprocessable entity turbo stream response on validation error" do
      params = { comment: { author: "", text: "" } }

      expect { post comments_path(format: :turbo_stream), params: params }.not_to change(Comment, :count)
      expect(response).to have_http_status(422)
      expect(response.media_type).to eq(Mime[:turbo_stream].to_s)
      expect(response.body).to include('turbo-stream action="update" target="comment-form"')
    end
  end
end
