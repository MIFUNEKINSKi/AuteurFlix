# Idempotent seed data for AuteurFlix.
#
# Media URLs point directly at the public auteurflix S3 bucket via string
# columns on Movie. No Active Storage / re-upload step, so seeding works on any
# environment without credentials or disk.
#
# This file is safe to re-run on deploy: it upserts records by id and only
# writes the columns it owns, so TMDB metadata populated by `rake tmdb:sync`
# is preserved.

# --- Users & profiles (demo accounts only) ----------------------------------

DEMO_USERS = [
  { id: 1, email: 'demo@user.com',         password: 'password' },
  { id: 2, email: 'hamlet@appacademy.com', password: 'hamlet0'  },
  { id: 3, email: 'dan@gmail.com',         password: 'password' },
  { id: 4, email: 'john@gmail.com',        password: 'password' }
].freeze

DEMO_USERS.each do |attrs|
  user = User.find_or_initialize_by(id: attrs[:id])
  user.email = attrs[:email]
  user.password = attrs[:password] if user.new_record?
  user.save!
end

[
  { user_id: 3, name: 'tante elle'  },
  { user_id: 3, name: 'pram'        },
  { user_id: 3, name: 'living room' }
].each do |attrs|
  Profile.find_or_create_by!(user_id: attrs[:user_id], name: attrs[:name])
end

# --- Genres -----------------------------------------------------------------

GENRES = {
  1  => 'Kurosawa',
  2  => 'Powell and Pressburger',
  3  => 'Koreeda',
  4  => 'Fellini',
  5  => 'Bong Joon Ho',
  6  => 'Buñuel',
  8  => 'Kubrick',
  9  => '60s',
  10 => '70s',
  11 => '80s',
  12 => '50s',
  13 => '40s',
  14 => '2000s'
}.freeze

GENRES.each do |id, name|
  genre = Genre.find_or_initialize_by(id: id)
  genre.genre = name
  genre.save!
end

# --- Movies -----------------------------------------------------------------

S3_BASE = 'https://auteurflix.s3.amazonaws.com'.freeze

MOVIES = [
  {
    id: 1, title: 'The Red Shoes', year: 1948, length: 133, director: 'Powell and Pressburger',
    summary: "A young ballet dancer is torn between the man she loves and her pursuit to become a prima ballerina.",
    thumbnail: 'il_fullxfull.3352098303_h27q.webp',
    video:     'The_red_shoes_trailer.mp4',
    photo:     'the-red-shoes-.webp',
    genres: [2, 13]
  },
  {
    id: 2, title: '8 1/2', year: 1963, length: 138, director: 'Fellini',
    summary: "A harried movie director retreats into his memories and fantasies.",
    thumbnail: 'Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg',
    video:     'Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'Federico+Fellini+-+8+1_2+(New+Trailer)+-+In+UK+cinemas+1+May+2015+_+BFI+Release+(BQ).jpg',
    genres: [4, 9]
  },
  {
    id: 3, title: 'Black Narcissus', year: 1947, length: 143, director: 'Powell and Pressburger',
    summary: "A group of nuns struggle to establish a convent in the Himalayas, while isolation, extreme weather, altitude, and culture clashes all conspire to drive the well-intentioned missionaries mad.",
    thumbnail: 'black_narcissus_thumbnail.jpeg',
    video:     'BLACK+NARCISSUS+-+Trailer+-+(1947)+-+HQ+(336p_24fps_H264-96kbit_AAC).mp4',
    photo:     'blacknarcissus.webp',
    genres: [2, 13]
  },
  {
    id: 4, title: 'High and Low', year: 1965, length: 143, director: 'Kurosawa',
    summary: "Police procedural crime film directed by Akira Kurosawa, starring Toshiro Mifune, Tatsuya Nakadai and Kyōko Kagawa. The film is loosely based on the 1959 novel King's Ransom by Ed McBain (Evan Hunter).",
    thumbnail: 'high-and-low-md-web.jpeg',
    video:     'Y2Mate.is+-+High+and+Low+(Tengoku+to+Jigoku)+1963+trailer+with+subtitles-LV3z2Ytxu90-1080p-1660239252097.mp4',
    photo:     'High_and_low.png',
    genres: [1, 9]
  },
  {
    id: 5, title: 'Ikuru', year: 1952, length: 143, director: 'Kurosawa',
    summary: "A bureaucrat tries to find meaning in his life after he discovers he has terminal cancer.",
    thumbnail: 'ikuru.jpeg',
    video:     'Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'Ikiru+_+1952+_+Akira+Kurosawa+_+Modern+Trailer+(BQ).jpg',
    genres: [1, 12]
  },
  {
    id: 6, title: 'Kagemusha', year: 1980, length: 162, director: 'Kurosawa',
    summary: "A petty thief with an utter resemblance to a samurai warlord is hired as the lord's double. When the warlord later dies the thief is forced to take up arms in his place.",
    thumbnail: 'kagealtposter.jpeg',
    video:     'Kagemusha+(1980)+Trailer+(480p_25fps_H264-128kbit_AAC).mp4',
    photo:     'kagemusha_image.jpeg',
    genres: [1, 11]
  },
  {
    id: 7, title: 'Ran', year: 1985, length: 162, director: 'Kurosawa',
    summary: "In Medieval Japan, an elderly warlord retires, handing over his empire to his three sons. However, he vastly underestimates how the new-found power will corrupt them and cause them to turn on each other...and him.",
    thumbnail: 'ran-theatrical-movie-poster-md.jpeg',
    video:     'Ran+_+Official+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'ran-1200-1200-675-675-crop-000000.jpeg',
    genres: [1, 11]
  },
  {
    id: 8, title: 'Rashomon', year: 1950, length: 88, director: 'Kurosawa',
    summary: "A harried movie director retreats into his memories and fantasies.",
    thumbnail: 'Rashomon_onesheet_2009RR_USA_KentWilliams-2.jpeg',
    video:     'Rasho%CC%82mon+(1950)+ORIGINAL+TRAILER+%5BHD+1080p%5D+(1080p_30fps_H264-128kbit_AAC).mp4',
    photo:     'Rashomon-image.jpeg',
    genres: [1, 12]
  },
  {
    id: 9, title: 'Seven Samurai', year: 1954, length: 207, director: 'Kurosawa',
    summary: "A veteran samurai, gathers six samurais to protect a village from the cruel bandits. As the samurais teach the natives how to defend themselves, the village is attacked by a pack of 40 bandits.",
    thumbnail: 'seven-samurai-1954-quad-poster-samurai-in-field.jpeg',
    video:     'Seven+Samurai+(1954)+Original+Japanese+Theatrical+Trailer+(720p_24fps_H264-192kbit_AAC).mp4',
    photo:     'Seven-Samurai.jpeg',
    genres: [1, 12]
  },
  {
    id: 10, title: 'Yojimbo', year: 1961, length: 110, director: 'Kurosawa',
    summary: "A crafty ronin comes to a town divided by two criminal gangs and decides to play them against each other to free the town.",
    thumbnail: 'lf.jpeg',
    video:     'YOJIMBO+Trailer+(1961)+-+The+Criterion+Collection+(720p_24fps_H264-192kbit_AAC).mp4',
    photo:     'yojimbo-1200-1200-675-675-crop-000000.jpeg',
    genres: [1, 9]
  },
  {
    id: 11, title: 'Still Walking', year: 2008, length: 115, director: 'Koreeda',
    summary: "A family gathers together for a commemorative ritual whose nature only gradually becomes clear.",
    thumbnail: 'still_walking_thumbnail.jpeg',
    video:     'STILL+WALKING+Trailer+(2008)+-+The+Criterion+Collection+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'still_walking_image.jpeg',
    genres: [3, 14]
  },
  {
    id: 12, title: 'Shoplifters', year: 2018, length: 121, director: 'Koreeda',
    summary: "A family of small-time crooks take in a child they find outside in the cold.",
    thumbnail: 'Shoplifters+-+Official+Trailer+(BQ).jpg',
    video:     'Shoplifters+-+Official+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'shoplifters_image.jpeg',
    genres: [3, 14]
  },
  {
    id: 13, title: 'La Dolce Vita', year: 1960, length: 174, director: 'Fellini',
    summary: "A series of stories following a week in the life of a philandering tabloid journalist living in Rome.",
    thumbnail: "New+trailer+for+Fellini's+La+dolce+vita+-+back+in+cinemas+3+January+2020+_+BFI+(BQ).jpg",
    video:     "New+trailer+for+Fellini's+La+dolce+vita+-+back+in+cinemas+3+January+2020+_+BFI+(1080p_24fps_H264-128kbit_AAC).mp4",
    photo:     'la_dolce_image.jpeg',
    genres: [4, 9]
  },
  {
    id: 14, title: 'Amarcord', year: 1973, length: 123, director: 'Fellini',
    summary: "A series of comedic and nostalgic vignettes set in a 1930s Italian coastal town.",
    thumbnail: 'amarcord-md-web.jpeg',
    video:     'Amarcord+Trailer+(Federico+Fellini%2C+1973)+(360p_24fps_H264-128kbit_AAC).mp4',
    photo:     'amc_image.jpeg',
    genres: [4, 10]
  },
  {
    id: 15, title: 'Parasite', year: 2019, length: 132, director: 'Bong Joon Ho',
    summary: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    thumbnail: 'Parasite+%5BOfficial+Trailer%5D+%E2%80%93+In+Theaters+October+11%2C+2019+(BQ).jpg',
    video:     'Parasite+%5BOfficial+Trailer%5D+%E2%80%93+In+Theaters+October+11%2C+2019+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'Brody-Parasite.webp',
    genres: [5, 14]
  },
  {
    id: 16, title: 'Memories of Murder', year: 2003, length: 132, director: 'Bong Joon Ho',
    summary: "In a small Korean province in 1986, two detectives struggle with the case of multiple young women being found raped and murdered by an unknown culprit.",
    thumbnail: 'mom_thumbnail.jpeg',
    video:     'MEMORIES+OF+MURDER+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     'memories-of-murder-1108x0-c-default.jpeg',
    genres: [4, 14]
  },
  {
    id: 17, title: 'The Discreet Charm of the Bourgeoisie', year: 1972, length: 102, director: 'Buñuel',
    summary: "A surreal, virtually plotless series of dreams centered around six middle-class people and their consistently interrupted attempts to have a meal together.",
    thumbnail: 'discreet_thumbnail.jpeg',
    video:     'Discreet+Charm+of+the+Bourgeosie+(Trailer)+(480p_30fps_H264-128kbit_AAC).mp4',
    photo:     'discreet_image.jpeg',
    genres: [6, 10]
  },
  {
    id: 18, title: '2001: A Space Odyssey', year: 1968, length: 149, director: 'Kubrick',
    summary: "After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000.",
    thumbnail: 'odyssey_thumbnail.jpeg',
    video:     '2001_+A+SPACE+ODYSSEY+-+Trailer+(1080p_24fps_H264-128kbit_AAC).mp4',
    photo:     '2001_+A+SPACE+ODYSSEY+-+Trailer+(BQ).jpg',
    genres: [8, 9]
  },
  {
    id: 19, title: 'Barry Lyndon', year: 1975, length: 185, director: 'Kubrick',
    summary: "An Irish rogue wins the heart of a rich widow and assumes her dead husband's aristocratic position in 18th-century England.",
    thumbnail: 'barry_thumbnail.jpeg',
    video:     "Stanley+Kubrick's+Barry+Lyndon+(New+Trailer+2016)+-+In+cinemas+29+July+_+BFI+release+(1080p_24fps_H264-128kbit_AAC).mp4",
    photo:     "Stanley+Kubrick's+Barry+Lyndon+(New+Trailer+2016)+-+In+cinemas+29+July+_+BFI+release+(BQ).jpg",
    genres: [8, 10]
  }
].freeze

MOVIES.each do |data|
  movie = Movie.find_or_initialize_by(id: data[:id])
  movie.assign_attributes(
    title:         data[:title],
    year:          data[:year],
    summary:       data[:summary],
    length:        data[:length],
    director:      data[:director],
    thumbnail_url: "#{S3_BASE}/#{data[:thumbnail]}",
    video_url:     "#{S3_BASE}/#{data[:video]}",
    photo_url:     "#{S3_BASE}/#{data[:photo]}"
  )
  movie.save!

  # Rebuild this movie's genre tags without touching others.
  Tag.where(movie_id: movie.id).delete_all
  data[:genres].each do |genre_id|
    Tag.create!(movie_id: movie.id, genre_id: genre_id)
  end
end

# Drop any *seeded* movies that are no longer in the seed list. Movies that
# were created by `rake tmdb:ingest_director` (i.e. live outside the explicit
# id range below) must NEVER be deleted by db:seed -- they're real catalog
# data populated from TMDB and only exist on production.
seeded_ids = MOVIES.map { |m| m[:id] }
stale_seeded_ids = Movie
  .where(id: 1..(seeded_ids.max + 1000)) # only scan the seed-id range
  .where.not(id: seeded_ids)
  .where(tmdb_id: nil)                   # belt-and-suspenders: never touch tmdb-synced rows
  .pluck(:id)
if stale_seeded_ids.any?
  Tag.where(movie_id: stale_seeded_ids).delete_all
  List.where(movie_id: stale_seeded_ids).delete_all if defined?(List)
  Movie.where(id: stale_seeded_ids).delete_all
end

# --- Directors --------------------------------------------------------------
#
# Director rows match Movie#director by exact name. Bios and metadata are
# editorial; tmdb_person_id lets the TMDB sync task populate portrait_url +
# refresh bio/country later. Slug is auto-generated by the model.

DIRECTORS = [
  {
    name: 'Kurosawa',
    tmdb_person_id: 5026,
    country: 'Japan',
    birth_year: 1910,
    death_year: 1998,
    bio: "Akira Kurosawa was a Japanese filmmaker whose 30-film career reshaped world cinema. " \
         "He drew on Noh theatre, Western literature, and the chambara tradition to make films " \
         "ranging from intimate humanism (Ikiru) to vast-scale period epics (Ran, Seven Samurai). " \
         "Kurosawa's command of weather, movement, and group choreography influenced everyone " \
         "from Sergio Leone to George Lucas."
  },
  {
    name: 'Powell and Pressburger',
    tmdb_person_id: 68424,
    country: 'United Kingdom',
    birth_year: 1905,
    bio: "The Archers - Michael Powell and Emeric Pressburger - wrote, produced, and directed " \
         "together from 1943 to 1956, sharing every screen credit. Their work fused British " \
         "tradition with continental European sensibilities, producing films of unusual visual " \
         "ambition (The Red Shoes, Black Narcissus, A Matter of Life and Death) that anticipated " \
         "modern auteur cinema by decades."
  },
  {
    name: 'Koreeda',
    tmdb_person_id: 25645,
    country: 'Japan',
    birth_year: 1962,
    bio: "Hirokazu Kore-eda began in documentary and brings that observational stillness to his " \
         "fiction. His films keep returning to families assembled out of necessity rather than " \
         "blood (Shoplifters, Like Father Like Son, Nobody Knows), watching small gestures " \
         "accumulate into moral weight without underlining the lesson."
  },
  {
    name: 'Fellini',
    tmdb_person_id: 4415,
    country: 'Italy',
    birth_year: 1920,
    death_year: 1993,
    bio: "Federico Fellini moved Italian cinema from neorealism into something more dreamlike and " \
         "personal. From La Strada and Nights of Cabiria through 8 1/2 and Amarcord, his films " \
         "treated memory, fantasy, and Catholic iconography as raw cinematic material - coining " \
         "the adjective 'Felliniesque' along the way."
  },
  {
    name: 'Bong Joon Ho',
    tmdb_person_id: 21684,
    country: 'South Korea',
    birth_year: 1969,
    bio: "Bong Joon-ho works across genres - monster movie (The Host), procedural " \
         "(Memories of Murder), dystopian sci-fi (Snowpiercer, Okja), and class satire (Parasite) - " \
         "while keeping a consistent eye on the absurdity of social systems and the people " \
         "trapped inside them. Parasite's 2020 Best Picture win was the first ever for a " \
         "non-English-language film."
  },
  {
    name: 'Buñuel',
    tmdb_person_id: 793,
    country: 'Spain',
    birth_year: 1900,
    death_year: 1983,
    bio: "Luis Buñuel began in surrealist Paris (Un Chien Andalou) and spent six decades aiming " \
         "his camera at the comfortable cruelties of bourgeois life. His Mexican and French " \
         "periods (Los Olvidados, Viridiana, The Discreet Charm of the Bourgeoisie) treat " \
         "religion, sex, and authority with deadpan irreverence that still feels current."
  },
  {
    name: 'Kubrick',
    tmdb_person_id: 240,
    country: 'United States',
    birth_year: 1928,
    death_year: 1999,
    bio: "Stanley Kubrick made only thirteen features, each one a deliberate genre intervention: " \
         "war (Paths of Glory, Dr. Strangelove), science fiction (2001), horror (The Shining), " \
         "costume drama (Barry Lyndon). His exacting visual control and willingness to spend " \
         "years per film made him the prototype of the modern reclusive auteur."
  }
].freeze

DIRECTORS.each do |attrs|
  director = Director.find_or_initialize_by(name: attrs[:name])
  director.assign_attributes(attrs)
  director.save!
end

puts "Seeded #{Movie.count} movies, #{Genre.count} genres, #{Tag.count} tags, " \
     "#{Director.count} directors, #{User.count} users, #{Profile.count} profiles"
