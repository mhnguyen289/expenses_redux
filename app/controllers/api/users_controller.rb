class Api::UsersController < ApplicationController

  skip_before_action :authenticate_token, only: [:create, :invite]

  def invite
    email = invite_params[:email]
    user = User.find_by(email: email)
    unless !!user
      index = email.index('@') - 1
      username = email[0..index]
      user = User.create!(email: email, username: username)
    end
    relationship = Relationship.new(
      a_user_id: current_user.id,
      b_user_id: user.id
    )
    if relationship.save
      render json: { user: { id: user.id, username: user.username } }
    else
      render json: relationship.errors
    end
  end

  def render_json(user)
    if user.save
      token = Token.jwt({ user: user.id })
      { jwt: token , user: user }
    else
      user.errors
    end
  end

  def create
    user = User.find_by(email: user_params[:email]);
    if !!user
      if !!user.password_digest
        render json: { unique: "Email already belongs to an account."}
      else
        user.password = user_params[:password]
        render json: render_json(user)
      end
    else
      user = User.new(user_params)
      if user.valid?
        render json: render_json(user)
      else
        render json: { invalid: "Invalid sign up"}
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
