# frozen_string_literal: true

require "rails_helper"

# Pages
shared_context "when React Router Demo", page: :main do
  before { visit root_path }
end
shared_context "when React Demo", page: :react_demo do
  before { visit no_router_path }
end
shared_context "when Simple Page", page: :simple do
  before { visit simple_path }
end
shared_context "when Classic Page", page: :classic do
  before { visit comments_path }
end

# Fixtures
shared_context "when Existing Comment", existing_comment: true do
  before { Comment.create(author: "John Doe", text: "Hello there!") }
end
