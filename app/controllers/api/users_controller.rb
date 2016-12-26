class Api::UsersController < ApplicationController

  skip_before_action :authenticate_token, only: [:create, :invite]

  def invite
    user = User.find_by(email: invite_params[:email])
    unless !!user
      user = User.create!(email: invite_params[:email])
    end
    relationship = Relationship.new(a_user_id: current_user.id, b_user_id: user.id)
    if relationship.save
      # send email to user
      render json: user
    else
      render json: relationship.errors
    end
  end

  def create
    user = User.find_by(email: user_params[:email]);
    if !!user
      if !!user.password_digest
        render json: { unique: "Email already belongs to another account." }
      else
        user.password = user_params[:password]
        if user.save
          render json: {
            jwt: Token.jwt({user: user.id}),
            user: user
          }
        else
          render json: user.errors
        end
      end
    else
      user = User.new(user_params)
      if user.valid?
        if user.save
          render json: {
            jwt: Token.jwt({user: user.id}),
            user: user
          }
        else
          render json: user.errors
        end
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def invite_params
    params.require(:invite).permit(:email)
  end
end
