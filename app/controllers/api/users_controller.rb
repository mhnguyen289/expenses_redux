class Api::UsersController < ApplicationController

  skip_before_action :authenticate_token, only: [:create]

  def invite
    invite_email = invite_params[:email]
    user = User.find_by(email: invite_email)
    unless !!user
      username = createUsernameFrom(invite_email)
      user = User.create!(email: invite_email, username: username)
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

  def createUsernameFrom(email)
    index = email.index('@') - 1
    username = email[0..index]
  end

  def create
    params_email = user_params[:email]
    username = createUsernameFrom(params_email)
    user = User.find_by(email: params_email) || User.find_by(username: username)
    if !!user
      if !!user.password_digest
        render json: { unique: "Email/Username already belongs to an account."}
      else
        user.password = user_params[:password]
        render json: token_and_user(user)
      end
    else
      user = User.new(user_params)
      index = params_email.index('@') - 1
      user.username = params_email[0..index]
      if user.valid?
        render json: token_and_user(user)
      else
        render json: { invalid: "Invalid sign up"}
      end
    end
  end

  private

  def token_and_user(user)
    if user.save
      token = Token.jwt({ user: user.id })
      { jwt: token , user: { id: user.id, username: user.username }  }
    else
      user.errors
    end
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def invite_params
    params.require(:invite).permit(:email)
  end
end
