Rails.application.routes.draw do
  root 'welcome#index'
  get 'dashboard', to: 'welcome#static_dashboard'
  get 'calculator', to: 'welcome#static_calculator'

  namespace :api, defaults: {format: JSON} do
    resources :expenses, only: [:create]
    get 'dashboard', to: 'users#show'
    post 'login', to: 'sessions#create'
    get 'expenses_of_current_user_with/:friend_id', to: 'expenses#expenses_with'
    get 'friends_of_current_user', to: 'friends#friends_of_current_user'
  end
end
