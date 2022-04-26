Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do 
    resources :profiles, only: [:show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :show] do 
      resources :profiles, only: [:index, :create]
    end 
  end
end
