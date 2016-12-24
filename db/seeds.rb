puts "usage: [$rails db:purge db:migrate db:seed]"

puts "demo users"
one = User.create!(username: "DemoUser", email: "DemoUserOne@example.com", password: "DemoUser")
two = User.create!(username: "andy123", email: "DemoUserTwo@example.com",password: "DemoUser2Here")
three = User.create!(username: "bonnie45", email: "DemoUserThree@example.com",password: "DemoUser3Here")
four = User.create!(username: "jamie678", email: "DemoUserFour@example.com",password: "DemoUser4Here")
five = User.create!(username: "dannyck91", email: "DemoUserFive@example.com",password: "DemoUser5Here")

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

expense_date = Date.strptime('12/18/2016', '%m/%d/%Y')
Expense.transaction do
  dinner = Expense.create!(expense_date: expense_date, title: "Dinner", expense_amount: 56, paid_by_id: one.id)
  dinner_with_three = Debt.create!(expense_id: dinner.id, debt_amount: 31, borrower_id: three.id)
end

expense_date = Date.strptime('12/21/2016', '%m/%d/%Y')
Expense.transaction do
  rent = Expense.create!(expense_date: expense_date, title: "Rent", expense_amount: 2300, paid_by_id: one.id)
  rent_with_two = Debt.create!(expense_id: rent.id, debt_amount: 700, borrower_id: two.id)
  rent_with_three = Debt.create!(expense_id: rent.id, debt_amount: 870, borrower_id: three.id)
end

expense_date = Date.strptime('12/22/2016', '%m/%d/%Y')
Expense.transaction do
  ski_trip = Expense.create!(expense_date: expense_date, title: "Ski Trip", expense_amount: 1650, paid_by_id: five.id)
  trip_with_one = Debt.create!(expense_id: ski_trip.id, debt_amount: 300, borrower_id: one.id)
  trip_with_two = Debt.create!(expense_id: ski_trip.id, debt_amount: 400, borrower_id: two.id)
  trip_with_three = Debt.create!(expense_id: ski_trip.id, debt_amount: 500, borrower_id: three.id)
end

paid_one_by_two = Settlement.create!(settled_amount: 600, from_id: two.id, to_id: one.id)
paid_one_by_three = Settlement.create!(settled_amount: 800, from_id: three.id, to_id: one.id)
paid_five_by_one = Settlement.create!(settled_amount: 250, from_id: one.id, to_id: five.id)
