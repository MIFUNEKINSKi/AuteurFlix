class Api::MoviesController < ApplicationController

   def index
      @movies = Movie.with_attached_thumbnail.with_attached_photo.with_attached_video
      @genres = Genre.all
      @tags = Tag.all

      if stale?(etag: cache_key, last_modified: Movie.maximum(:updated_at))
        render :index
      end
   end

   def show
      @movie = Movie.with_attached_thumbnail.with_attached_photo.with_attached_video.find(params[:id])
      @genres = Genre.all
      @tags = Tag.all
      render :show
   end

   def recommendations
      movie = Movie.find(params[:id])
      @movies = Movie.recommendations_for(movie).with_attached_thumbnail
      render :recommendations
   end

   private

   def cache_key
      "movies/index/#{Movie.maximum(:updated_at).to_i}-#{Movie.count}-#{Genre.count}-#{Tag.count}"
   end

end
