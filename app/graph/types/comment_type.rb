CommentType = GraphQL::ObjectType.define do
  name "Comment"
  description "A single comment"
  field :id, !types.ID, "ID"
  field :author, !types.String, "Author"
  field :text, !types.String, "Text"
end
