# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


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
        director: "Powell and Pressburger"
    }
)

Tag.create(movie_id: 1, genre_id: 2)
m1 = Movie.find(1)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/il_fullxfull.3352098303_h27q.webp'), 
                filename: 'il_fullxfull.3352098303_h27q.webp
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
         director: "Kurosawa"
    }
)

Tag.create(movie_id: 4, genre_id: 1)
m1 = Movie.find(4)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/high-and-low-md-web.jpeg'), 
                filename: 'high-and-low-md-web.jpeg
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
        director: "Powell and Pressburger"
    }
)

Tag.create(movie_id: 3, genre_id: 2)
m1 = Movie.find(3)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/black_narcissus_thumbnail.jpeg'), 
                filename: 'black_narcissus_thumbnail.jpeg
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
        director: "Fellini"
    }
)

Tag.create(movie_id: 2, genre_id: 4)
m1 = Movie.find(2)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg'), 
                filename: 'Federico Fellini - 8 1_2 (New Trailer) - In UK cinemas 1 May 2015 _ BFI Release (BQ).jpg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Federico Fellini - 8 1_2 (New Trailer) - In UK cinemas 1 May 2015 _ BFI Release (1080p_24fps_H264-128kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg'), 
                filename: 'Federico Fellini - 8 1_2 (New Trailer) - In UK cinemas 1 May 2015 _ BFI Release (BQ).jpg')

Movie.create( 
    {   id: 5, 
        title: 'Ikuru', 
        year: 1952, 
        summary: "A bureaucrat tries to find meaning in his life after he discovers he has terminal cancer.
", 
        length: 143,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 5, genre_id: 1)
m1 = Movie.find(5)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ikuru.jpeg'), 
                filename: 'ikuru.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Ikiru _ 1952 _ Akira Kurosawa _ Modern Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(BQ).jpg'), 
                filename: 'Ikiru _ 1952 _ Akira Kurosawa _ Modern Trailer (BQ).jpg')

Movie.create( 
    {   id: 6, 
        title: 'Kagemusha', 
        year: 1980, 
        summary: "A petty thief with an utter resemblance to a samurai warlord is hired as the lord's double. When the warlord later dies the thief is forced to take up arms in his place.", 
        length: 162,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 6, genre_id: 1)
m1 = Movie.find(6)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/kagealtposter.jpeg'), 
                filename: 'kagealtposter.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Kagemusha+(1980)+Trailer+(480p_25fps_H264-128kbit_AAC).mp4'), 
                filename: 'Kagemusha (1980) Trailer (480p_25fps_H264-128kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/kagemusha_image.jpeg'), 
                filename: 'kagemusha_image.jpeg')

Movie.create( 
    {   id: 7, 
        title: 'Ran', 
        year: 1985, 
        summary: "In Medieval Japan, an elderly warlord retires, handing over his empire to his three sons. However, he vastly underestimates how the new-found power will corrupt them and cause them to turn on each other...and him.", 
        length: 162,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 7, genre_id: 1)
m1 = Movie.find(7)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ran-theatrical-movie-poster-md.jpeg'), 
                filename: 'ran-theatrical-movie-poster-md.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ran+_+Official+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Ran _ Official Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ran-1200-1200-675-675-crop-000000.jpeg'), 
                filename: 'ran-1200-1200-675-675-crop-000000.jpeg')

Movie.create( 
    {   id: 8, 
        title: 'Rashomon', 
        year: 1950, 
        summary: "A harried movie director retreats into his memories and fantasies.", 
        length: 88,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 8, genre_id: 1)
m1 = Movie.find(8)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rashomon_onesheet_2009RR_USA_KentWilliams-2.jpeg'), 
                filename: 'Rashomon_onesheet_2009RR_USA_KentWilliams-2.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rasho%CC%82mon+(1950)+ORIGINAL+TRAILER+%5BHD+1080p%5D+(1080p_30fps_H264-128kbit_AAC).mp4'), 
                filename: 'Rashômon (1950) ORIGINAL TRAILER [HD 1080p] (1080p_30fps_H264-128kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rashomon-image.jpeg'), 
                filename: 'Rashomon-image.jpeg')


Movie.create( 
    {   id: 9, 
        title: 'Seven Samurai', 
        year: 1954, 
        summary: "A veteran samurai, gathers six samurais to protect a village from the cruel bandits. As the samurais teach the natives how to defend themselves, the village is attacked by a pack of 40 bandits.", 
        length: 207,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 9, genre_id: 1)
m1 = Movie.find(9)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/seven-samurai-1954-quad-poster-samurai-in-field.jpeg'), 
                filename: 'seven-samurai-1954-quad-poster-samurai-in-field.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Seven+Samurai+(1954)+Original+Japanese+Theatrical+Trailer+(720p_24fps_H264-192kbit_AAC).mp4'), 
                filename: 'Seven Samurai (1954) Original Japanese Theatrical Trailer (720p_24fps_H264-192kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Seven-Samurai.jpeg'), 
                filename: 'Seven-Samurai.jpeg')


Movie.create( 
    {   id: 10, 
        title: 'Yojimbo', 
        year: 1961, 
        summary: "A crafty ronin comes to a town divided by two criminal gangs and decides to play them against each other to free the town.", 
        length: 110,
        director: "Kurosawa"
    }
)

Tag.create(movie_id: 10, genre_id: 1)
m1 = Movie.find(10)
m1.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/lf.jpeg'), 
                filename: 'lf.jpeg
')
m1.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/YOJIMBO+Trailer+(1961)+-+The+Criterion+Collection+(720p_24fps_H264-192kbit_AAC).mp4'), 
                filename: 'YOJIMBO Trailer (1961) - The Criterion Collection (720p_24fps_H264-192kbit_AAC).mp4')
m1.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/yojimbo-1200-1200-675-675-crop-000000.jpeg'), 
                filename: 'yojimbo-1200-1200-675-675-crop-000000.jpeg')


                















