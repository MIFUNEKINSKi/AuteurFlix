Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  # Health check endpoint for Railway
  get '/health', to: proc { [200, {}, ['OK']] }
  
  # Debug endpoint to show startup logs
  get '/debug', to: proc { 
    log_content = File.exist?('/tmp/railway-startup.log') ? File.read('/tmp/railway-startup.log') : 'No startup log found'
    [200, {'Content-Type' => 'text/plain'}, [log_content]]
  }

  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :show] do
        resources :profiles, only: [:index, :create]
    end
    resources :profiles, only: [:show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :movies, only: [:index, :show]
    resources :lists, only: [:create, :destroy]
   
  end 
end
