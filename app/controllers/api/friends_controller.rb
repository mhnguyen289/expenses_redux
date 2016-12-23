class Api::FriendsController < ApplicationController

  def friends_of
    friends = Relationship.friends_of(current_user.id)
    render json: friends
  end

end
