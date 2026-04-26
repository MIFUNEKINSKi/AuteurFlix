import type {
  MoviesResponse, MovieResponse, ProfileWithList, RecommendedMovie,
  DirectorSummary, DirectorDetail,
} from '../types';

export const fetchMovies = async (): Promise<MoviesResponse> => {
  const res = await fetch('/api/movies');
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchMovie = async (movieId: number): Promise<MovieResponse> => {
  const res = await fetch(`/api/movies/${movieId}`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createListItem = async (movieId: number, profileId: number): Promise<ProfileWithList> => {
  const res = await fetch('/api/lists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ list: { movie_id: movieId, profile_id: profileId } }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteListItem = async (listId: number): Promise<ProfileWithList> => {
  const res = await fetch(`/api/lists/${listId}`, { method: 'DELETE' });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchRecommendations = async (movieId: number): Promise<RecommendedMovie[]> => {
  const res = await fetch(`/api/movies/${movieId}/recommendations`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const slugifyDirector = (name: string): string =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const fetchDirectors = async (): Promise<DirectorSummary[]> => {
  const res = await fetch('/api/directors');
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchDirector = async (slug: string): Promise<DirectorDetail> => {
  const res = await fetch(`/api/directors/${slug}`);
  if (!res.ok) throw await res.json();
  return res.json();
};
