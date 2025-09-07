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
Genre.create(id: 6, genre: 'Buñuel')
Genre.create(id: 8, genre: 'Kubrick')
Genre.create(id: 9, genre: '60s')
Genre.create(id: 10, genre: '70s')
Genre.create(id: 11, genre: '80s')
Genre.create(id: 12, genre: '50s')
Genre.create(id: 13, genre: '40s')
Genre.create(id: 14, genre: '2000s')



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
Tag.create(movie_id: 1, genre_id: 13)

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
Tag.create(movie_id: 4, genre_id: 9)


m4 = Movie.find(4)
m4.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/high-and-low-md-web.jpeg'), 
                filename: 'high-and-low-md-web.jpeg'
)
m4.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Y2Mate.is+-+High+and+Low+(Tengoku+to+Jigoku)+1963+trailer+with+subtitles-LV3z2Ytxu90-1080p-1660239252097.mp4'), 
                filename: 'Y2Mate.is - High and Low (Tengoku to Jigoku) 1963 trailer with subtitles-LV3z2Ytxu90-1080p-1660239252097.mp4')
m4.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/High_and_low.png'), 
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
Tag.create(movie_id: 3, genre_id: 13)

m3 = Movie.find(3)
m3.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/black_narcissus_thumbnail.jpeg'), 
                filename: 'black_narcissus_thumbnail.jpeg
')
m3.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/BLACK+NARCISSUS+-+Trailer+-+(1947)+-+HQ+(336p_24fps_H264-96kbit_AAC).mp4'), 
                filename: 'BLACK NARCISSUS - Trailer - (1947) - HQ (336p_24fps_H264-96kbit_AAC).mp4')
m3.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/blacknarcissus.webp'), 
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
Tag.create(movie_id: 2, genre_id: 9)


m2 = Movie.find(2)
m2.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg'), 
                filename: 'Federico Fellini - 8 1_2 (New Trailer) - In UK cinemas 1 May 2015 _ BFI Release (BQ).jpg
')
m2.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Federico Fellini - 8 1_2 (New Trailer) - In UK cinemas 1 May 2015 _ BFI Release (1080p_24fps_H264-128kbit_AAC).mp4')
m2.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg'), 
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
Tag.create(movie_id: 5, genre_id: 12)



m5 = Movie.find(5)
m5.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ikuru.jpeg'), 
                filename: 'ikuru.jpeg
')
m5.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Ikiru _ 1952 _ Akira Kurosawa _ Modern Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
m5.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(BQ).jpg'), 
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
Tag.create(movie_id: 6, genre_id: 11)


m6 = Movie.find(6)
m6.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/kagealtposter.jpeg'), 
                filename: 'kagealtposter.jpeg
')
m6.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Kagemusha+(1980)+Trailer+(480p_25fps_H264-128kbit_AAC).mp4'), 
                filename: 'Kagemusha (1980) Trailer (480p_25fps_H264-128kbit_AAC).mp4')
m6.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/kagemusha_image.jpeg'), 
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
Tag.create(movie_id: 7, genre_id: 11)


m7 = Movie.find(7)
m7.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ran-theatrical-movie-poster-md.jpeg'), 
                filename: 'ran-theatrical-movie-poster-md.jpeg
')
m7.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Ran+_+Official+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
                filename: 'Ran _ Official Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
m7.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/ran-1200-1200-675-675-crop-000000.jpeg'), 
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
Tag.create(movie_id: 8, genre_id: 12)

m8 = Movie.find(8)
m8.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rashomon_onesheet_2009RR_USA_KentWilliams-2.jpeg'), 
                filename: 'Rashomon_onesheet_2009RR_USA_KentWilliams-2.jpeg
')
m8.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rasho%CC%82mon+(1950)+ORIGINAL+TRAILER+%5BHD+1080p%5D+(1080p_30fps_H264-128kbit_AAC).mp4'), 
                filename: 'Rashômon (1950) ORIGINAL TRAILER [HD 1080p] (1080p_30fps_H264-128kbit_AAC).mp4')
m8.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Rashomon-image.jpeg'), 
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
Tag.create(movie_id: 9, genre_id: 12)

m9 = Movie.find(9)
m9.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/seven-samurai-1954-quad-poster-samurai-in-field.jpeg'), 
                filename: 'seven-samurai-1954-quad-poster-samurai-in-field.jpeg
')
m9.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Seven+Samurai+(1954)+Original+Japanese+Theatrical+Trailer+(720p_24fps_H264-192kbit_AAC).mp4'), 
                filename: 'Seven Samurai (1954) Original Japanese Theatrical Trailer (720p_24fps_H264-192kbit_AAC).mp4')
m9.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Seven-Samurai.jpeg'), 
                filename: 'Seven-Samurai.jpeg')


# Movie.create( 
#     {   id: 10, 
#         title: 'Yojimbo', 
#         year: 1961, 
#         summary: "A crafty ronin comes to a town divided by two criminal gangs and decides to play them against each other to free the town.", 
#         length: 110,
#         director: "Kurosawa"
#     }
# )

# Tag.create(movie_id: 10, genre_id: 1)
# Tag.create(movie_id: 10, genre_id: 9)


# m10 = Movie.find(10)
# m10.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/lf.jpeg'), 
#                 filename: 'lf.jpeg
# ')
# m10.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/YOJIMBO+Trailer+(1961)+-+The+Criterion+Collection+(720p_24fps_H264-192kbit_AAC).mp4'), 
#                 filename: 'YOJIMBO Trailer (1961) - The Criterion Collection (720p_24fps_H264-192kbit_AAC).mp4')
# m10.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/yojimbo-1200-1200-675-675-crop-000000.jpeg'), 
#                 filename: 'yojimbo-1200-1200-675-675-crop-000000.jpeg')


# Movie.create( 
#     {   id: 11, 
#         title: 'Still Walking', 
#         year: 2008, 
#         summary: "A family gathers together for a commemorative ritual whose nature only gradually becomes clear.", 
#         length: 115,
#         director: "Koreeda"
#     }
# )

# Tag.create(movie_id: 11, genre_id: 3)
# Tag.create(movie_id: 11, genre_id: 14)


# m11 = Movie.find(11)
# m11.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/still_walking_thumbnail.jpeg'), 
#                 filename: 'still_walking_thumbnail.jpeg
# ')
# m11.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/STILL+WALKING+Trailer+(2008)+-+The+Criterion+Collection+(1080p_24fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'STILL WALKING Trailer (2008) - The Criterion Collection (1080p_24fps_H264-128kbit_AAC).mp4')
# m11.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/still_walking_image.jpeg'), 
#                 filename: 'still_walking_image.jpeg')


# Movie.create( 
#     {   id: 12, 
#         title: 'Shoplifters', 
#         year: 2018, 
#         summary: "A family of small-time crooks take in a child they find outside in the cold.", 
#         length: 121,
#         director: "Koreeda"
#     }
# )

# Tag.create(movie_id: 12, genre_id: 3)
# Tag.create(movie_id: 12, genre_id: 14)


# m12 = Movie.find(12)
# m12.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Shoplifters+-+Official+Trailer+(BQ).jpg'), 
#                 filename: 'Shoplifters - Official Trailer (BQ).jpg
# ')
# m12.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Shoplifters+-+Official+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'Shoplifters - Official Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
# m12.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/shoplifters_image.jpeg'), 
#                 filename: 'shoplifters_image.jpeg')


# Movie.create( 
#     {   id: 13, 
#         title: 'La Dolce Vita', 
#         year: 1960, 
#         summary: "A series of stories following a week in the life of a philandering tabloid journalist living in Rome.", 
#         length: 174,
#         director: "Fellini"
#     }
# )

# Tag.create(movie_id: 13, genre_id: 4)
# Tag.create(movie_id: 13, genre_id: 9)


# m13 = Movie.find(13)
# m13.thumbnail.attach(io: URI.open("https://auteurflix.s3.amazonaws.com/New+trailer+for+Fellini's+La+dolce+vita+-+back+in+cinemas+3+January+2020+_+BFI+(BQ).jpg"), 
#                 filename: "New trailer for Fellini's La dolce vita - back in cinemas 3 January 2020 _ BFI (BQ).jpg"
# )
# m13.video.attach(io: URI.open("https://auteurflix.s3.amazonaws.com/New+trailer+for+Fellini's+La+dolce+vita+-+back+in+cinemas+3+January+2020+_+BFI+(1080p_24fps_H264-128kbit_AAC).mp4"), 
#                 filename: "New trailer for Fellini's La dolce vita - back in cinemas 3 January 2020 _ BFI (1080p_24fps_H264-128kbit_AAC).mp4")
# m13.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/la_dolce_image.jpeg'), 
#                 filename: 'la_dolce_image.jpeg')


# Movie.create( 
#     {   id: 14, 
#         title: 'Amarcord', 
#         year: 1973, 
#         summary: "A series of comedic and nostalgic vignettes set in a 1930s Italian coastal town.", 
#         length: 123,
#         director: "Fellini"
#     }
# )

# Tag.create(movie_id: 14, genre_id: 4)
# Tag.create(movie_id: 14, genre_id: 10)


# m14 = Movie.find(14)
# m14.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/amarcord-md-web.jpeg'), 
#                 filename: 'amarcord-md-web.jpeg
# ')
# m14.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Amarcord+Trailer+(Federico+Fellini%2C+1973)+(360p_24fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'Amarcord Trailer (Federico Fellini, 1973) (360p_24fps_H264-128kbit_AAC).mp4')
# m14.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/amc_image.jpeg'), 
#                 filename: 'amc_image.jpeg')


# Movie.create( 
#     {   id: 15, 
#         title: 'Parasite', 
#         year: 2019, 
#         summary: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", 
#         length: 132,
#         director: "Bong Joon Ho"
#     }
# )
# green

# Tag.create(movie_id: 15, genre_id: 5)
# Tag.create(movie_id: 15, genre_id: 14)


# m15 = Movie.find(15)
# m15.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Parasite+%5BOfficial+Trailer%5D+%E2%80%93+In+Theaters+October+11%2C+2019+(BQ).jpg'), 
#                 filename: 'Parasite [Official Trailer] – In Theaters October 11, 2019 (BQ).jpg
# ')
# m15.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Parasite+%5BOfficial+Trailer%5D+%E2%80%93+In+Theaters+October+11%2C+2019+(1080p_24fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'Parasite [Official Trailer] – In Theaters October 11, 2019 (1080p_24fps_H264-128kbit_AAC).mp4')
# m15.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Brody-Parasite.webp'), 
#                 filename: 'Brody-Parasite.webp')


# Movie.create( 
#     {   id: 16, 
#         title: 'Memories of Murder', 
#         year: 2003, 
#         summary: "In a small Korean province in 1986, two detectives struggle with the case of multiple young women being found raped and murdered by an unknown culprit.", 
#         length: 132,
#         director: "Bong Joon Ho"
#     }
# )

# Tag.create(movie_id: 16, genre_id: 4)
# Tag.create(movie_id: 16, genre_id: 14)


# m16 = Movie.find(16)
# m16.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/mom_thumbnail.jpeg'), 
#                 filename: 'mom_thumbnail.jpeg
# ')
# m16.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/MEMORIES+OF+MURDER+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'MEMORIES OF MURDER Trailer (1080p_24fps_H264-128kbit_AAC).mp4')
# m16.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/memories-of-murder-1108x0-c-default.jpeg'), 
#                 filename: 'memories-of-murder-1108x0-c-default.jpeg')


# Movie.create( 
#     {   id: 17, 
#         title: 'The Discreet Charm of the Bourgeoisie', 
#         year: 1972, 
#         summary: "A surreal, virtually plotless series of dreams centered around six middle-class people and their consistently interrupted attempts to have a meal together.", 
#         length: 102,
#         director: "Buñuel"
#     }
# )

# Tag.create(movie_id: 17, genre_id: 6)
# Tag.create(movie_id: 17, genre_id: 10)


# m17 = Movie.find(17)
# m17.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/discreet_thumbnail.jpeg'), 
#                 filename: 'discreet_thumbnail.jpeg
# ')
# m17.video.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/Discreet+Charm+of+the+Bourgeosie+(Trailer)+(480p_30fps_H264-128kbit_AAC).mp4'), 
#                 filename: 'Discreet Charm of the Bourgeosie (Trailer) (480p_30fps_H264-128kbit_AAC).mp4')
# m17.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/discreet_image.jpeg'), 
#                 filename: 'discreet_image.jpeg')


# Movie.create( 
#     {   id: 18, 
#         title: '2001: A Space Odyssey', 
#         year: 1968, 
#         summary: "After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000.", 
#         length: 149,
#         director: "Kubrick"
#     }
# )

# Tag.create(movie_id: 18, genre_id: 8)
# Tag.create(movie_id: 18, genre_id: 9)


# m18 = Movie.find(18)
# m18.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/odyssey_thumbnail.jpeg'), 
#                 filename: 'odyssey_thumbnail.jpeg
# ')
# m18.video.attach(io: URI.open("https://auteurflix.s3.amazonaws.com/2001_+A+SPACE+ODYSSEY+-+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4"), 
#                 filename: "2001_ A SPACE ODYSSEY - Trailer (1080p_24fps_H264-128kbit_AAC).mp4")
# m18.photo.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/2001_+A+SPACE+ODYSSEY+-+Trailer+(BQ).jpg'), 
#                 filename: '2001_ A SPACE ODYSSEY - Trailer (BQ).jpg')


# Movie.create( 
#     {   id: 19, 
#         title: 'Barry Lyndon', 
#         year: 1975, 
#         summary: "An Irish rogue wins the heart of a rich widow and assumes her dead husband's aristocratic position in 18th-century England.", 
#         length: 185,
#         director: "Kubrick"
#     }
# )

# Tag.create(movie_id: 19, genre_id: 8)
# Tag.create(movie_id: 19, genre_id: 10)


# m19 = Movie.find(19)
# m19.thumbnail.attach(io: URI.open('https://auteurflix.s3.amazonaws.com/barry_thumbnail.jpeg'), 
#                 filename: 'barry_thumbnail.jpeg
# ')
# m19.video.attach(io: URI.open("https://auteurflix.s3.amazonaws.com/Stanley+Kubrick's+Barry+Lyndon+(New+Trailer+2016)+-+In+cinemas+29+July+_+BFI+release+(1080p_24fps_H264-128kbit_AAC).mp4"), 
#                 filename: "Stanley Kubrick's Barry Lyndon (New Trailer 2016) - In cinemas 29 July _ BFI release (1080p_24fps_H264-128kbit_AAC).mp4")
# m19.photo.attach(io: URI.open("https://auteurflix.s3.amazonaws.com/Stanley+Kubrick's+Barry+Lyndon+(New+Trailer+2016)+-+In+cinemas+29+July+_+BFI+release+(BQ).jpg"), 
#                 filename: "Stanley Kubrick's Barry Lyndon (New Trailer 2016) - In cinemas 29 July _ BFI release (BQ).jpg")


















