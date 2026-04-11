class Api::MoviesController < ApplicationController

   def index
      @movies = Movie.all
      @genres = Genre.all
      @tags = Tag.all

      if stale?(etag: cache_key, last_modified: Movie.maximum(:updated_at))
        render :index
      end
   end

   def show
      @movie = Movie.find(params[:id])
      @genres = Genre.all
      @tags = Tag.all
      render :show
   end

   def recommendations
      movie = Movie.find(params[:id])
      @movies = Movie.recommendations_for(movie)
      render :recommendations
   end

   private

   def cache_key
      "movies/index/#{Movie.maximum(:updated_at).to_i}-#{Movie.count}-#{Genre.count}-#{Tag.count}"
   end

end
