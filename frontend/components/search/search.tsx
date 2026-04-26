import React, { useState } from 'react';
import BrowseHeader from '../browse/browse_header';
import MovieDetail from '../browse/movie_detail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk, createListItem, deleteListItem } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import type { Movie } from '../../types';

const Search: React.FC = () => {
  const [searchString, setSearchString] = useState('');
  const [movieMatches, setMovieMatches] = useState<Movie[][]>([]);
  const [genreMatches, setGenreMatches] = useState<Movie[][]>([]);
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => Object.values(state.entities.movies));
  const genres = useAppSelector((state) => Object.values(state.entities.genres));
  const tags = useAppSelector((state) => Object.values(state.entities.tags));
  const myList = useAppSelector((state) => Object.values(state.entities.myList));
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) => dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  const searchTitles = (query: string) => {
    if (query === '') {
      setMovieMatches([]);
      setSearchString(query);
    } else {
      const q = query.toLowerCase();
      const byTitle = movies.filter((m) => m.title.toLowerCase().includes(q));
      const byDirector = movies.filter((m) => m.director?.toLowerCase().includes(q));
      const bySummary = movies.filter((m) => m.summary.toLowerCase().includes(q));
      setMovieMatches([byTitle, byDirector, bySummary]);
      setSearchString(query);
    }
  };

  const searchGenres = (query: string) => {
    if (query === '') {
      setGenreMatches([]);
      setSearchString(query);
    } else {
      const matchingGenres = genres.filter((g) => g.genre.toLowerCase().includes(query.toLowerCase()));
      const genreIds = matchingGenres.map((g) => g.id);
      const matchingTags = tags.filter((tag) => genreIds.includes(tag.genre_id));
      const movieIds = matchingTags.map((tag) => tag.movie_id);
      const matchingMovies = movies.filter((m) => movieIds.includes(m.id));
      setGenreMatches([matchingMovies]);
      setSearchString(query);
    }
  };

  const movieSet = new Set(movieMatches.flat().concat(genreMatches.flat()));
  const displayMovies = Array.from(movieSet);
  const header = searchString.length > 0 && displayMovies.length === 0
    ? `Your search for '${searchString}' did not have any matches.`
    : '';

  const display = displayMovies.map((movie) => (
    <MovieDetail
      myList={myList}
      currentProfileId={currentProfileId}
      createListItem={handleCreateListItem}
      deleteListItem={handleDeleteListItem}
      key={movie.id}
      movie={movie}
      tags={tags}
      genres={genres}
    />
  ));

  return (
    <div className="search-main">
      <BrowseHeader
        searchGenres={searchGenres}
        searchTitles={searchTitles}
        logout={handleLogout}
        resetProfile={handleResetProfile}
      />
      <div key={currentProfileId} className="search-list-browse">
        <h1 className="search-title">{header}</h1>
        <div className="search-list">{display}</div>
      </div>
    </div>
  );
};

export default Search;
