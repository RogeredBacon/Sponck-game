Rails.application.routes.draw do
  # root to: 
  # get '/login', to: 'sessions#login', as: :login
  # post '/login', to: 'sessions#authenticate'
  # get '/logout', to 'sessions#logout', as: :logout
  
  resources :users
  resources :games
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
