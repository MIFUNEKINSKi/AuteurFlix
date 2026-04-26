class Api::DirectorsController < ApplicationController
  def index
    @directors = Director.order(:name)
    @film_counts = Movie.where(director: @directors.pluck(:name))
                        .group(:director)
                        .count
    render :index
  end

  def show
    @director = Director.find_by!(slug: params[:slug])
    @movies = @director.films
    movie_ids = @movies.pluck(:id)
    @tags = Tag.where(movie_id: movie_ids)
    @genres = Genre.where(id: @tags.pluck(:genre_id).uniq)
    render :show
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Director not found' }, status: :not_found
  end
end
