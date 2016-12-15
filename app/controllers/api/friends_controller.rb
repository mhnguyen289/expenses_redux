class Api::FriendsController < ApplicationController

  skip_before_action :authenticate_token #, only: [:create]

  def create

  end

  def my_friends
    render json: Relationship.my_friends(params[:user_id])
  end

  def friend_params
    #params.require(:).permit()
  end
end
