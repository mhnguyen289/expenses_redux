var result = [
  {"a_user_id":1,"b_user_id":2},
  {"a_user_id":1,"b_user_id":3},
  {"a_user_id":1,"b_user_id":4},
  {"a_user_id":1,"b_user_id":5}];


var friends_of = function(userId, result) {
  var friends = result.reduce(function(acc, item) {
    if (item.a_user_id !== userId) {
      acc.push(item.a_user_id);
    } else if (item.b_user_id !== userId) {
      acc.push(item.b_user_id);
    }
    return acc;
  }, [])

  return friends;
}

console.log(friends_of(1, result))
[2, 3, 4, 5]

SELECT username, id
FROM users
WHERE id IN (2, 3, 4, 5)






=========================================
All debt and expenses info ever:
SELECT *
FROM debts d
INNER JOIN expenses e
ON d.expense_id = e.id

# All borrowed by user id 3
SELECT e.id, e.title, e.expense_amount, e.paid_by_id, d.debt_amount
FROM debts d
INNER JOIN expenses e
ON d.expense_id = e.id
AND d.borrower_id = 3;

#All expenses paid info for user id 5:
SELECT e.id, e.title, e.expense_amount, SUM(debt_amount) AS lent
FROM debts d
INNER JOIN expenses e
ON d.expense_id = e.id
AND e.paid_by_id = 5
GROUP BY e.id
# User id 5 -- All expenses --
# Summer Trip paid $1650, lent $1200

Why use Active Record and JBuilder for Querying.
when I can get the exact columns I want in a result set and sent back that way.

# All expenses & debts
SELECT e.title, e.expense_amount, e.paid_by_id, d.borrower_id, d.debt_amount
FROM debts d
INNER JOIN expenses e
ON d.expense_id = e.id
WHERE e.paid_by_id = 1 OR d.borrower_id = 1;
# User id 1 -- All expenses & debts --
# Rent        1 paid 350, lent total 200
# Summer trip 5 paid 1650, 1 owes 300

# All expense & debts between 2 people
SELECT e.id, e.title, e.expense_amount, e.paid_by_id, d.debt_amount, d.borrower_id
FROM debts d
INNER JOIN expenses e
ON d.expense_id = e.id
WHERE (e.paid_by_id = 5 AND d.borrower_id = 2)
OR (e.paid_by_id = 2 AND d.borrower_id = 5);




------------------------------------------------

All debts and related expense info for 2
SELECT *
FROM expenses e
INNER JOIN debts d
ON e.id = d.expense_id
AND d.borrower_id = 2;
Expense.joins(:debts).where({debts: {borrower_id: 3}})

------------------------------------------------
All expenses paid by 1
SELECT *
FROM Expenses
WHERE paid_by_id = 1;
Expense.where(paid_by_id: 5)

------------------------------------------------
Friends of 5 are [1, 2, 3]
SELECT a_user_id, b_user_id
FROM relationships
WHERE a_user_id = 5 OR b_user_id = 5;
[1, 2, 3] [5]
Friends of 1 are [2, 3, 4, 5] including action ids 1, 2, 3 or Pending, Declined, and Accepted
SELECT a_user_id, b_user_id, action_id
FROM relationships
WHERE a_user_id = 1 OR b_user_id = 1;
[1][2, 3, 4, 5]
Relationship.where("a_user_id = 1 OR b_user_id = 1")

concat the two arrays of a_user_id and b_user_id results,
remove the user herself from array
whats left is the friends list.

------------------------------------------------
rails g migration CreateUsers username:string password_digest:string email:string
rails g migration CreateActions name:string
rails g migration CreateRelationships
rails g migration CreateSettlements amount:decimal
rails g migration CreateExpenses title:string amount:decimal expense_date:datetime
rails g migration CreateDebts expense:references amount:decimal

# precision is the total amount of digits
# scale is the number of digits right of the decimal point
add_column :items, :price, :decimal, :precision => 8, :scale => 2

# custom foreign key
add_foreign_key :posts, :users, column: :author_id

# explicit foreign key in associations
class Store < ActiveRecord::Base
  has_one :person, foreign_key: :foo_bar_store_id
end
