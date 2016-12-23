Rails.application.routes.draw do
  root 'welcome#index'
  get 'dashboard', to: 'welcome#static_dashboard'
  get 'calculator', to: 'welcome#static_calculator'

  namespace :api, defaults: {format: JSON} do
    resources :expenses, only: [:create]
    get 'dashboard', to: 'users#show'
    post 'login', to: 'sessions#create'
    get 'expenses_with/:friend_id', to: 'expenses#expenses_with'
    get 'lent_by', to: 'expenses#lent_by'
    get 'owed_by', to: 'expenses#owed_by'
    get 'friends_of', to: 'friends#friends_of'
  end
end
