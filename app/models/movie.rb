class Movie < ApplicationRecord
    validates :title, :year, :summary, :length , presence: true
    

    has_one_attached :thumbnail
    has_one_attached :video
    has_one_attached :photo

    has_many :genre_tags,
        primary_key: :id, 
        foreign_key: :movie_id, 
        class_name: :Tag

    has_many :genres,
        through: :genre_tags


end