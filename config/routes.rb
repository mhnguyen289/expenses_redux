Rails.application.routes.draw do
  root 'welcome#index'

  namespace :api, defaults: {format: JSON} do
    get 'dashboard', to: 'users#show'
    post 'signup', to: 'users#create'
    post 'login', to: 'sessions#create'

    resources :expenses, only: [:create]
    get 'expenses/:user_id', to: 'expenses#my_expenses'
    get 'debts/:user_id', to: 'expenses#my_debts'

    resources :friends, only: [:create]
    get 'friends/:user_id', to: 'friends#my_friends'

  end
end
