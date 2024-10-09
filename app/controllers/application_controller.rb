class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?
    before_action :ensure_logged_in
    skip_forgery_protection

    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    # def ensure_logged_in
    #     render json: ['Not logged in'], status: 404 unless logged_in?
    # end

    def ensure_logged_in
        unless current_user
          render json: { error: 'You must be logged in to perform this action' }, status: :unauthorized
        end
      end
      

    def logged_in?
        !!current_user
    end

    def login!(user)
        @current_user = user
        session[:session_token] = user.reset_session_token! # This should set a new unique session token and store it in the session.
    end
    

    def logout!
        if current_user
            current_user.reset_session_token!
        end
        session[:session_token] = nil
        @current_user = nil
    end 
end