puts "usage: [$rails db:purge db:migrate db:seed]"

puts "demo users"
one = User.create!(username: "DemoUser1Here", email: "DemoUserOne@example.com", password: "DemoUser1Here")
two = User.create!(username: "andy123", email: "DemoUserTwo@example.com",password: "DemoUser2Here")
three = User.create!(username: "bonnie", email: "DemoUserThree@example.com",password: "DemoUser3Here")
four = User.create!(username: "jamie45", email: "DemoUserFour@example.com",password: "DemoUser4Here")
five = User.create!(username: "dannyck", email: "DemoUserFive@example.com",password: "DemoUser5Here")

puts "actions"
pending = Action.create!(name: "PENDING")
accepted = Action.create!(name: "ACCEPTED")
declined = Action.create!(name: "DECLINED")

puts "relationships"
r1 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: two.id,
  action_id: pending.id,
  action_user_id: one.id
)

r2 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: three.id,
  action_id: pending.id,
  action_user_id: one.id
)

r3 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: four.id,
  action_id: pending.id,
  action_user_id: one.id
)

r4 = Relationship.create!(
  a_user_id: one.id,
  b_user_id: five.id,
  action_id: pending.id,
  action_user_id: five.id
)

r5 = Relationship.create!(
  a_user_id: two.id,
  b_user_id: five.id,
  action_id: pending.id,
  action_user_id: five.id
)

r6 = Relationship.create!(
  a_user_id: three.id,
  b_user_id: five.id,
  action_id: pending.id,
  action_user_id: five.id
)

one_and_two = Relationship.find_by(a_user_id: one.id, b_user_id: two.id)
one_and_two.update(action_id: accepted.id)

one_and_three = Relationship.find_by(a_user_id: one.id, b_user_id: three.id)
one_and_three.update(action_id: accepted.id)

one_and_four = Relationship.find_by(a_user_id: one.id, b_user_id: four.id)
one_and_four.update(action_id: accepted.id)

one_and_five = Relationship.find_by(a_user_id: one.id, b_user_id: five.id)
one_and_five.update(action_id: accepted.id)

two_and_five = Relationship.find_by(a_user_id: two.id, b_user_id: five.id)
two_and_five.update(action_id: accepted.id)

three_and_five = Relationship.find_by(a_user_id: three.id, b_user_id: five.id)
three_and_five.update(action_id: accepted.id)

expense_date = Date.strptime('12/21/2016', '%m/%d/%Y') #Date.today

Expense.transaction do
  meals = Expense.create!(expense_date: expense_date, title: "Meals", expense_amount: 350, paid_by_id: one.id)
  meal_with_three = Debt.create!(expense_id: meals.id, debt_amount: 200, borrower_id: three.id)
end

Expense.transaction do
  rent = Expense.create!(expense_date: expense_date, title: "Rent", expense_amount: 2300, paid_by_id: one.id)
  rent_with_two = Debt.create!(expense_id: rent.id, debt_amount: 600, borrower_id: two.id)
  rent_with_three = Debt.create!(expense_id: rent.id, debt_amount: 700, borrower_id: three.id)
end

Expense.transaction do
  summer_trip = Expense.create!(expense_date: expense_date, title: "Winter Trip", expense_amount: 1650, paid_by_id: five.id)
  trip_with_one = Debt.create!(expense_id: summer_trip.id, debt_amount: 300, borrower_id: one.id)
  trip_with_two = Debt.create!(expense_id: summer_trip.id, debt_amount: 400, borrower_id: two.id)
  trip_with_three = Debt.create!(expense_id: summer_trip.id, debt_amount: 500, borrower_id: three.id)
end

paid_one_by_two = Settlement.create!(settled_amount: 600, from_id: two.id, to_id: one.id)
paid_one_by_three = Settlement.create!(settled_amount: 800, from_id: three.id, to_id: one.id)
paid_five_by_one = Settlement.create!(settled_amount: 250, from_id: one.id, to_id: five.id)
