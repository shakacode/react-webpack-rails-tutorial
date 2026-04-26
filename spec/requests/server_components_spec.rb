# frozen_string_literal: true

require "rails_helper"

describe "Server Components" do
  it "GET /server-components returns the demo page shell" do
    get "/server-components"
    expect(response).to have_http_status(:ok)
    expect(response.body).to include("React Server Components Demo")
  end

  describe "RSC payload endpoint" do
    def parsed_chunks
      response.body.each_line.filter_map do |line|
        stripped = line.strip
        next if stripped.empty?

        JSON.parse(stripped)
      end
    end

    def expect_valid_rsc_payload
      expect(response).to have_http_status(:ok)
      expect(response.media_type).to eq("application/x-ndjson")
      chunks = parsed_chunks
      expect(chunks).not_to be_empty
      expect(chunks.any? { |chunk| chunk.key?("html") }).to be(true)
    end

    it "streams a valid RSC payload for ServerComponentsPage" do
      get "/rsc_payload/ServerComponentsPage", params: { props: "{}" }
      expect_valid_rsc_payload
    end

    it "streams a valid RSC payload for LiveActivity" do
      get "/rsc_payload/LiveActivity", params: { props: "{}" }
      expect_valid_rsc_payload
    end
  end
end
