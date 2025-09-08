class Api::MoviesController < ApplicationController
    
   def index
      @movies = Movie.all
      @genres = Genre.all
      @tags = Tag.all
      render :index
   end

   def show
      @movie = Movie.find(params[:id])
      @genres = Genre.all
      @tags = Tag.all
      render :show
   end

end