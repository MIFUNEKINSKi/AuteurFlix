Rails.application.routes.draw do
  root to: 'static_pages#root'
  
  # Health check endpoint for Railway
  get '/health', to: proc { [200, {}, ['OK']] }
  
  # Database test endpoint
  get '/db-test', to: proc { 
    begin
      user_count = User.count
      migration_status = ActiveRecord::Base.connection.execute("SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 5").to_a
      content = "Database working! Users: #{user_count}\nRecent migrations: #{migration_status.map { |row| row['version'] }.join(', ')}"
      [200, {'Content-Type' => 'text/plain'}, [content]]
    rescue => e
      [500, {'Content-Type' => 'text/plain'}, ["Database error: #{e.message}"]]
    end
  }
  
  # Favicon route to prevent 404 errors
  get '/favicon.ico', to: proc { [204, {}, ['']] }
  
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
