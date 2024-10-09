class Api::SessionsController < ApplicationController

    skip_before_action :ensure_logged_in, only: [:create, :destroy]
    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )
        if @user
            login!(@user)
            render 'api/users/show'
        else 
            render json: ['Invalid email or password'], status: 422
        end
    end

    def destroy
        if current_user
          logout!
          render json: {}
        else
          render json: ['No user to log out'], status: 404
        end
      end

end