class Api::AuthenticationController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    
    if user&.valid_password?(params[:password])
      # Generate JWT or session token
      token = user.generate_jwt
      
      render json: { 
        message: 'Login successful', 
        token: token 
      }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end
end
