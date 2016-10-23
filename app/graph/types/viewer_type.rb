ViewerType = GraphQL::ObjectType.define do
  name "Viewer"
  description "Global node"

  field :comments, GraphQL::ListType.new(of_type: CommentType) do
    description "Get all comments"
    resolve -> (_obj, _args, _ctx) {
      Comment.order("id DESC")
    }
  end
end
