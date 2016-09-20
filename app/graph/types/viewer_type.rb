ViewerType = GraphQL::ObjectType.define do
  name "Viewer"
  description "Global node"

  field :comments, GraphQL::ListType.new(of_type: CommentType) do
    description 'Get all comments'
    resolve -> (obj, args, ctx) {
      Comment.all
    }
  end

end
