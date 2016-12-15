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
