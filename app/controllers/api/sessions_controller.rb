class Api::SessionsController < ApplicationController

  # skip_before_action :authenticate_token, only: [:create]

  def create
    username = user_params[:username]
    password = user_params[:password]
    user = User.authenticate_credentials(username, password)
    if !!user
      render json: {
        jwt: Token.jwt({ user: user.id }),
        user: update_user_has_topics(user)
      }
    else
      render json: { invalid: "Invalid username/password combination" }
    end
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
