class PagesController < ApplicationController
  def index
    # NOTE: this could be an alternate syntax if you wanted to pass comments as a variable to a partial
    # @comments_json_sting = render_to_string(partial: "/comments/comments.json.jbuilder",
    #                                         locals: { comments: Comment.all }, format: :json)
    @comments = Comment.all

    # NOTE: @comments is used by the render_to_string call
    @comments_json_string = render_to_string("/comments/index.json.jbuilder")

    # NOTE: It's CRITICAL to call respond_to after calling render_to_string, or else Rails will
    # not render the HTML version of the index page properly.
    respond_to do |format|
      format.html
    end
  end
end
