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

  def signup
    user = User.new(user_params)
    
    if user.save
      token = user.generate_jwt
      render json: { 
        message: 'Signup successful', 
        token: token 
      }, status: :created
    else
      render json: { 
        errors: user.errors.full_messages 
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
