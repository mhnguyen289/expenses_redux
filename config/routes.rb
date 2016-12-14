Rails.application.routes.draw do
  root 'welcome#index'

  namespace :api, defaults: {format: JSON} do
    get 'dashboard', to: 'users#show'
    post 'signup', to: 'users#create'
    post 'login', to: 'sessions#create'
  end
end
