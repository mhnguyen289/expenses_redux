puts "usage: [$rails db:purge db:migrate db:seed]"

puts "demo users"
one = User.create!(username: "DemoUserOne", email: "DemoUserOne@example.com", password: "DemoUser1Here")
two = User.create!(username: "DemoUserTwo", email: "DemoUserTwo@example.com",password: "DemoUser2Here")
three = User.create!(username: "DemoUserThree", email: "DemoUserThree@example.com",password: "DemoUser3Here")
four = User.create!(username: "DemoUserFour", email: "DemoUserFour@example.com",password: "DemoUser4Here")
five = User.create!(username: "DemoUserFive", email: "DemoUserFive@example.com",password: "DemoUser5Here")

puts "actions"
pending = Action.create!(name: "Pending")
accepted = Action.create!(name: "Accepted")
declined = Action.create!(name: "Declined")

puts "relationships"
r1 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: two.id,
  action_id: accepted.id,
  action_user_id: one.id
)

r2 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: three.id,
  action_id: accepted.id,
  action_user_id: one.id
)

r3 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: four.id,
  action_id: declined.id,
  action_user_id: one.id
)

r4 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: five.id,
  action_id: accepted.id,
  action_user_id: five.id
)

one_and_two = Relationship.find_by(a_user_id: one.id, b_user_id: two.id)
one_and_two.update(action_id: 1)

one_and_three = Relationship.find_by(a_user_id: one.id, b_user_id: three.id)
one_and_three.update(action_id: 1)

one_and_four = Relationship.find_by(a_user_id: one.id, b_user_id: four.id)
one_and_four.update(action_id: 2)

one_and_five = Relationship.find_by(a_user_id: one.id, b_user_id: five.id)
one_and_five.update(action_id: 1)
