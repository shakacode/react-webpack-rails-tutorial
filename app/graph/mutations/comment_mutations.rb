module CommentMutations

  Create = GraphQL::Relay::Mutation.define do
    name "CreateComment"
    input_field :author, !types.String
    input_field :text, !types.String
    return_field :comment, CommentType

    resolve -> (inputs, ctx) {
      params = inputs.to_h
      params.delete 'clientMutationId'
      {comment: Comment.create(params)}
    }
  end

end
