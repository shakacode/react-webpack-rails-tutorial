QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema. See available queries."

  # Used by Relay to lookup objects by UUID: /TO BE discussed
  # field :node, field: NodeIdentification.field

  field :viewer, ViewerType do
    description "Global node"
    resolve -> (_obj, _args, _ctx) {
      ""
    }
  end
end
