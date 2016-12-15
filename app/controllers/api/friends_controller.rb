class Api::FriendsController < ApplicationController

  def my_friends
    @friends = Relationship.my_friends(params[:user_id])
    render json: @friends
  end

end
