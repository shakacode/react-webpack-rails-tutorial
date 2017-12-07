require "rails_helper"

shared_context "Comment Props" do
  it "with props for a collection of Comments," do
    expect(comments_store.first[:props]).to have_node(:comments)
  end
end

shared_context "Comment 0 Attributes" do
  it "with nodes for Comment 0 attributes," do
    expect(comment_json(0)).to have_node(:id)
    expect(comment_json(0)).to have_node(:author).with("Iesha")
    expect(comment_json(0)).to have_node(:text).with("And a comment response...")
  end
end

shared_context "Comment 1 Attributes" do
  it "with nodes for Comment 1 attributes," do
    expect(comment_json(1)).to have_node(:id)
    expect(comment_json(1)).to have_node(:author).with("Bai")
    expect(comment_json(1)).to have_node(:text)
      .with("Some comment text...")
  end
end
