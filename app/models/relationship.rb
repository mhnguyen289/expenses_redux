class Relationship < ApplicationRecord
  belongs_to :action
  belongs_to :user, foreign_key: :a_user_id
  belongs_to :user, foreign_key: :b_user_id
  belongs_to :user, foreign_key: :action_user_id

  def self.my_friends(user_id)
    where("a_user_id = #{user_id} OR b_user_id = #{user_id}")
  end

end
