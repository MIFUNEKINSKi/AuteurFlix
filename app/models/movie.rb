class Movie < ApplicationRecord
    validates :title, :year, :summary, :length, :director , presence: true

    has_many :genre_tags,
        primary_key: :id,
        foreign_key: :movie_id,
        class_name: :Tag

    has_many :genres,
        through: :genre_tags

    # Content-based recommendation: score movies by shared genres and same director
    def self.recommendations_for(movie, limit: 6)
        genre_ids = movie.genre_tags.pluck(:genre_id)
        return none if genre_ids.empty?

        where.not(id: movie.id)
             .joins(:genre_tags)
             .where(tags: { genre_id: genre_ids })
             .select(
                "movies.*",
                "COUNT(tags.id) + CASE WHEN movies.director = #{connection.quote(movie.director)} THEN 2 ELSE 0 END AS relevance_score"
             )
             .group("movies.id")
             .order("relevance_score DESC, movies.year DESC")
             .limit(limit)
    end
end
