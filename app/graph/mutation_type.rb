MutationType = GraphQL::ObjectType.define do
  name "Mutation"
  description "The mutation root of this schema. See available mutations."

  field :createComment, field: CommentMutations::Create.field
end
