class Api::UsersController < ApplicationController

  # skip_before_action :authenticate_token, only: [:create]

  def create
    user = User.find_by(username: user_params[:username]);
    if !!user
      render json: {unique: "Username is taken"}
    else
      user = User.new(user_params)
      if user.valid?
        if user.save
          render json: {
            jwt: Token.jwt({user: user.id}),
            user: { username: user.username, has_topics: false}
          }
        else
          render json: user.errors
        end
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
