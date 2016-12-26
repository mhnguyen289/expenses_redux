class Api::SessionsController < ApplicationController

  skip_before_action :authenticate_token, only: [:create]

  def create
    email = user_params[:email]
    password = user_params[:password]
    user = User.authenticate_credentials(email, password)
    if !!user
      render json: {
        jwt: Token.jwt({ user: user.id }),
        user: {id: user.id, username: user.username}
      }
    else
      render json: { invalid: "Invalid email/password combination" }
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
