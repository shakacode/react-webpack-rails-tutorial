class GraphqlController < ApplicationController
  # Ignore CSRF, rely on some auth token
  protect_from_forgery except: [:create]

  def create
    # Uncomment `context` if you want to define current user instance in context
    result = RelaySchema.execute(
      params[:query],
      # debug: true,
      variables: params[:variables],
      # context: {
      #  current_user: set_current_user
      # }
    )
    render json: result
  rescue Exception => e
    render json: { 'errors': [{ 'message': e.message }] }
  end

  private

  def set_current_user
    User.find_by(id: cookies.signed["user.id"])
  end
end
