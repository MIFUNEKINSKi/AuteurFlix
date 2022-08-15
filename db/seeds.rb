# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'open-uri'

User.destroy_all
Profile.destroy_all
Movie.destroy_all
Genre.destroy_all
Tag.destroy_all

User.create(id: 1, email: 'demo@user.com', password: 'password')
User.create(id: 2, email: 'hamlet@appacademy.com', password: 'dummy')
User.create(id: 3, email: 'dan@gmail.com', password: 'password')
User.create(id: 4, email: 'john@gmail.com', password: 'password')

Profile.create(user_id: 3, name: 'tante elle')
Profile.create(user_id: 3, name: 'pram')
Profile.create(user_id: 3, name: 'living room')

Genre.create(id: 1, genre: 'Kurosawa')
Genre.create(id: 2, genre: 'Powell and Pressburger')
Genre.create(id: 3, genre: 'Koreeda')
Genre.create(id: 4, genre: 'Fellini')
Genre.create(id: 5, genre: 'Bong Joon Ho')
Genre.create(id: 6, genre: 'Bunuel')
Genre.create(id: 7, genre: 'Coen Brothers')
Genre.create(id: 8, genre: 'Chaplin')



Movie.create( 
    {   id: 1, 
        title: 'The Red Shoes', 
        year: 1948, 
        summary: "A young ballet dancer is torn between the man she loves and her pursuit to become a prima ballerina.", 
        length: 133, 
        rating: 'PG'
    }
)

Tag.create(movie_id: 1, genre_id: 2)
m1 = Movie.find(1)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/the-red-shoes-.webp'), 
                filename: 'the-red-shoes-.webp
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/The_red_shoes_trailer.mp4'), 
                filename: 'The_red_shoes_trailer.mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/the-red-shoes-.webp'), 
                filename: 'the-red-shoes-.webp')

Movie.create( 
    {   id: 4, 
        title: 'High and Low', 
        year: 1965, 
        summary: "Police procedural crime film directed by Akira Kurosawa, starring Toshiro Mifune, Tatsuya Nakadai and Kyōko Kagawa. The film is loosely based on the 1959 novel King's Ransom by Ed McBain (Evan Hunter).", 
        length: 143, 
        rating: 'PG'
    }
)

Tag.create(movie_id: 4, genre_id: 1)
m1 = Movie.find(4)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/High_and_low.png'), 
                filename: 'High_and_low.png
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Y2Mate.is+-+High+and+Low+(Tengoku+to+Jigoku)+1963+trailer+with+subtitles-LV3z2Ytxu90-1080p-1660239252097.mp4'), 
                filename: 'Y2Mate.is - High and Low (Tengoku to Jigoku) 1963 trailer with subtitles-LV3z2Ytxu90-1080p-1660239252097.mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/High_and_low.png'), 
                filename: 'High_and_low.png')
Movie.create( 
    {   id: 3, 
        title: 'Black Narcissus', 
        year: 1947, 
        summary: "A group of nuns struggle to establish a convent in the Himalayas, while isolation, extreme weather, altitude, and culture clashes all conspire to drive the well-intentioned missionaries mad.", 
        length: 143, 
        rating: 'PG'
    }
)

Tag.create(movie_id: 3, genre_id: 2)
m1 = Movie.find(3)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/blacknarcissus.webp'), 
                filename: 'blacknarcissus.webp
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/BLACK+NARCISSUS+-+Trailer+-+(1947)+-+HQ+(336p_24fps_H264-96kbit_AAC).mp4'), 
                filename: 'BLACK NARCISSUS - Trailer - (1947) - HQ (336p_24fps_H264-96kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/blacknarcissus.webp'), 
                filename: 'blacknarcissus.webp')
Movie.create( 
    {   id: 2, 
        title: '8 1/2', 
        year: 1963, 
        summary: "A harried movie director retreats into his memories and fantasies.", 
        length: 138, 
        rating: 'PG'
    }
)

Tag.create(movie_id: 2, genre_id: 1)
m1 = Movie.find(2)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/sleepless_in_seattle_thumbnail.png'), 
                filename: 'sleepless_in_seattle.png
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/sleepless_in_seattle.mp4'), 
                filename: 'sleepless_in_seattle.mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/sleepless_in_seattle.png'), 
                filename: 'sleepless_in_seattle.png')
















