Rails.application.routes.draw do
    devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  resources :users, only: [:create, :show, :update, :destroy]
  resources :rental_properties
  resources :rental_applications
  resources :feedbacks, only: [:index, :create, :show]
     # your custom UsersController for profile viewing remains separate
    # other routes...
  end
  
