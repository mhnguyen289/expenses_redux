class Api::FriendsController < ApplicationController

  def friends_of
    @friends = Relationship.friends_of(params[:user_id])
    render json: @friends
  end

end
