class Api::FriendsController < ApplicationController

  skip_before_action :authenticate_token
  
  def friends_of
    @friends = Relationship.friends_of(params[:user_id])
    render json: @friends
  end

end
