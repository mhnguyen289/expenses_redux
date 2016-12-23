class Api::FriendsController < ApplicationController

  def friends_of_current_user
    @friends = Relationship.friends_of(current_user.id)
    render json: @friends
  end

end
