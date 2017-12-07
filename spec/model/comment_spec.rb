require "rails_helper"

describe Comment, type: :model do
  subject(:comment) { create(:comment) }

  describe "model instance" do
    it { should respond_to(:author) }
    it { should respond_to(:text) }
  end
end
