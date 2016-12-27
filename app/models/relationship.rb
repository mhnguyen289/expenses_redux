class Relationship < ApplicationRecord

  def self.friends_of(user_id)
    results = connection.select_all(sql_friends_of(user_id))
    friends_ids = []
    user = user_id.to_s

    results.each do |r|
      a_user = r["a_user_id"].to_s
      b_user = r["b_user_id"].to_s
      if (a_user != user)
        friends_ids.push(a_user)
      elsif (b_user != user)
        friends_ids.push(b_user)
      end
    end
    list = friends_ids.join(", ");
    if list.length > 0
      connection.select_all(sql_username_of(list))
    else
      []
    end
  end

  private

  def self.sql_username_of(list)
    "SELECT id, username
    FROM users
    WHERE id IN (#{list});"
  end

  def self.sql_friends_of(user_id)
    "SELECT r.a_user_id, r.b_user_id
    FROM relationships r
    WHERE r.a_user_id = '#{user_id}'
    OR r.b_user_id = '#{user_id}';"
  end
end
