require "rails_helper"

shared_context "Comments Factory" do
  subject(:comment) do
    create(
      :comment,
      author: "Bai",
      text: "Some comment text..."
    )
  end
  subject(:comments_list) do
    [
      comment,
      create(
        :comment,
        author: "Iesha",
        text: "And a comment response..."
      )
    ]
  end
  before { comments_list }
end
