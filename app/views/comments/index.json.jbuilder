# Specify the partial, as well as the name of the variable used in the partial
json.array! @comments, { partial: "comments/comment", as: :comment }
