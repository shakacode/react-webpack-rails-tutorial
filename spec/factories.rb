# frozen_string_literal: true

# This will guess the User class
FactoryBot.define do
  factory :comment do
    author { "John" }
    text { "This is a comment text." }
  end
end
