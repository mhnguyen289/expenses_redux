Rails.application.routes.draw do
  root 'welcome#index'
  get 'dashboard', to: 'welcome#static_dashboard'
  get 'calculator', to: 'welcome#static_calculator'

  namespace :api, defaults: {format: JSON} do
    get 'dashboard', to: 'users#show'
    post 'signup', to: 'users#create'
    post 'login', to: 'sessions#create'

    resources :expenses, only: [:create]
    get 'expenses_and_lent/:user_id', to: 'expenses#expenses_and_lent'
    get 'expenses_and_borrowed/:user_id', to: 'expenses#expenses_and_borrowed'
    get 'expenses_between/:user_id/:friend_id', to: 'expenses#expenses_and_debts_between'
    get 'friends_of/:user_id', to: 'friends#friends_of'
  end
end
