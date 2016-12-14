rails g migration user username:string password_digest:string email:string
rails g migration action name:string
rails g migration relationship user:reference user:reference user:reference action:reference
rails g migration settlement amount:float user:reference user:reference
rails g migration expenses title:string amount:float paid_by:user:references expense_date:datetime
rails g migration debts expense:references amount:float borrower_id:user:references 
