class StaticPagesController < ApplicationController
  skip_before_action :ensure_logged_in, only: [:root]
  
  def root
      render :root
    end

end