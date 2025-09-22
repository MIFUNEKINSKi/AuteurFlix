class StaticPagesController < ApplicationController
  skip_before_action :ensure_logged_in, only: [:root]
  
  def root
    begin
      render :root
    rescue => e
      # If there's an error (like database issues), render a simple page
      render plain: "AuteurFlix Loading... (Error: #{e.message})"
    end
  end

end