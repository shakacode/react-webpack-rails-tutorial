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
      body = response.body.b
      chunks = []

      until body.empty?
        body = discard_blank_frame_lines(body)
        break if body.empty?

        chunk, body = parse_length_prefixed_chunk(body)
        chunks << chunk
      end

      chunks
    end

    def discard_blank_frame_lines(body)
      body = body.byteslice(1..) || "".b while body.start_with?("\n")
      body
    end

    def parse_length_prefixed_chunk(body)
      header_end = body.index("\n")
      raise "Malformed length-prefixed RSC payload: missing header newline" unless header_end

      metadata_json, content_length_hex = body.byteslice(0, header_end).split("\t", 2)
      raise "Malformed length-prefixed RSC payload: missing tab separator" unless content_length_hex

      content_start = header_end + 1
      content_length = parse_content_length(content_length_hex)
      content = body.byteslice(content_start, content_length)
      raise "Malformed length-prefixed RSC payload: truncated content" unless content&.bytesize == content_length

      [
        parse_payload_metadata(metadata_json, content),
        body.byteslice(content_start + content_length, body.bytesize) || "".b
      ]
    end

    def parse_content_length(content_length_hex)
      Integer(content_length_hex, 16)
    rescue ArgumentError
      raise "Malformed length-prefixed RSC payload: invalid hex length '#{content_length_hex}'"
    end

    def parse_payload_metadata(metadata_json, content)
      metadata = JSON.parse(metadata_json.force_encoding(Encoding::UTF_8))
      content.force_encoding(Encoding::UTF_8)
      metadata["html"] = metadata.delete("payloadType") == "object" ? JSON.parse(content) : content
      metadata
    end

    def expect_valid_rsc_payload
      expect(response).to have_http_status(:ok)
      expect(response.media_type).to eq("application/x-ndjson")
      chunks = parsed_chunks
      expect(chunks).not_to be_empty
      expect(chunks.any? { |chunk| chunk.key?("html") }).to be(true)
    end

    it "raises a malformed payload error for invalid hex content lengths" do
      payload = { payloadType: "string" }.to_json

      expect { parse_length_prefixed_chunk("#{payload}\tzz\ncontent".b) }
        .to raise_error(RuntimeError, "Malformed length-prefixed RSC payload: invalid hex length 'zz'")
    end

    it "streams a valid RSC payload for ServerComponentsPage" do
      get "/rsc_payload/ServerComponentsPage", params: { props: "{}" }
      expect_valid_rsc_payload
    end

    it "streams a valid RSC payload for ServerComponentsPage with populated comments" do
      now = 1.minute.ago.iso8601
      comments = [
        { id: 1, author: "Alice", text: "Hello **markdown**", created_at: now, updated_at: now }
      ]
      get "/rsc_payload/ServerComponentsPage", params: { props: { comments: comments }.to_json }
      expect_valid_rsc_payload
    end

    it "streams a valid RSC payload for LiveActivity" do
      get "/rsc_payload/LiveActivity", params: { props: "{}" }
      expect_valid_rsc_payload
    end
  end
end
