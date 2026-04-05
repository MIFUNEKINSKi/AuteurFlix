// Domain models (match Rails API responses)

export interface User {
  id: number;
  email: string;
}

export interface Profile {
  id: number;
  user_id: number;
  name: string;
  list_items?: number[];
}

export interface ProfileWithList extends Profile {
  myList: Record<number, ListItem>;
}

export interface Movie {
  id: number;
  title: string;
  summary: string;
  director: string;
  year: number;
  length: number;
  photoUrl: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre_ids?: number[];
  tmdbRating?: number;
  tmdbVoteCount?: number;
  tmdbPosterUrl?: string;
}

export interface Genre {
  id: number;
  genre: string;
  movie_ids?: number[];
}

export interface Tag {
  id: number;
  movie_id: number;
  genre_id: number;
}

export interface ListItem {
  id: number;
  profile_id: number;
  movie_id: number;
}

// API response shapes

export interface MoviesResponse {
  movies: Record<number, Movie>;
  genres: Record<number, Genre>;
  tags: Record<number, Tag>;
}

export interface MovieResponse {
  movie: Movie;
}

export interface RecommendedMovie {
  id: number;
  title: string;
  year: number;
  director: string;
  thumbnailUrl?: string;
  tmdbRating?: number;
  tmdbId?: number;
}

// Redux state shape

export interface EntitiesState {
  users: Record<number, User>;
  movies: Record<number, Movie>;
  genres: Record<number, Genre>;
  tags: Record<number, Tag>;
  profiles: Record<number, Profile>;
  myList: Record<number, ListItem>;
}

export interface SessionState {
  id: number | null;
  profileId: number | null;
}

export interface ErrorsState {
  session: string[];
}

export interface RootState {
  entities: EntitiesState;
  session: SessionState;
  errors: ErrorsState;
}
