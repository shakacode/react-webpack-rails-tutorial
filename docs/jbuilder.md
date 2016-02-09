# JBuilder Notes
There's a bunch of gotchas with using [Jbuilder](https://github.com/rails/jbuilder) to create the string version of the props to be sent to the react_on_rails_gem. The main thing is that if you follow the example and call Jbuilder like this, you don't run into a number of issues.

```erb
<%= react_component('App', props: render(template: "/comments/index.json.jbuilder"),
    prerender: true) %>
```

However, if you try to set the value of the JSON string inside of the controller, then you will run into several issues with rendering the Jbuilder template from the controller. See the notes in this the example code for app/controllers/pages_controller.rb.

Here's the samples of Jbuilder that we use:

### comments/_comment.json.jbuilder:

```ruby
json.extract! comment, :id, :author, :text, :created_at, :updated_at
```

### comments/index.json.jbuilder:

```ruby
# Specify the partial, as well as the name of the variable used in the partial
json.array! @comments, { partial: "comments/comment", as: :comment }
```

### comments/show.json.jbuilder:

```ruby
json.partial! 'comment', comment: @comment
```

