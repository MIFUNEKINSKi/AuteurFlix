import React, { useState, useEffect, useMemo } from 'react';
import BrowseHeader from './browse_header';
import GenreList from './genre_list';
import DetailsModal from './details_modal';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk } from '../../store/api';
import { fetchMovies, createListItem, deleteListItem } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import type { Movie } from '../../types';

const GenresIndex: React.FC = () => {
  const [sound, setSound] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.entities.movies);
  const genres = useAppSelector((state) => Object.values(state.entities.genres));
  const tags = useAppSelector((state) => Object.values(state.entities.tags));
  const currentProfileId = useAppSelector((state) => state.session.profileId);
  const myList = useAppSelector((state) => Object.values(state.entities.myList));

  // Pick a stable random top movie (only changes when movies change)
  const topMovie = useMemo<Movie | undefined>(() => {
    const movieArr = Object.values(movies);
    if (movieArr.length === 0) return undefined;
    return movieArr[Math.floor(Math.random() * movieArr.length)];
  }, [Object.keys(movies).length]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) => dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  const soundOff = (e: React.MouseEvent<HTMLImageElement>) => {
    setSound((prev) => !prev);
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  const onEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    (e.currentTarget as HTMLElement).classList.toggle('hidden');
    (e.currentTarget.parentElement!.previousElementSibling as HTMLElement).classList.toggle('hidden');
  };

  const convertLength = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const movieGenres = () => {
    if (!topMovie) return [];
    const selectedTags = tags.filter((tag) => tag.movie_id === topMovie.id);
    return selectedTags
      .map((tag) => genres.find((g) => g.id === tag.genre_id))
      .filter((g) => g !== undefined);
  };

  if (!topMovie || Object.keys(movies).length === 0) {
    return (
      <div className="browse-main">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '50px' }}>
          Loading movies...
        </div>
      </div>
    );
  }

  const tagDisplay = movieGenres()
    .filter((tag) => tag?.id)
    .map((tag) => <p key={tag!.id}>{tag!.genre}</p>);

  const genreRows = genres.map((genre) => (
    <div key={genre.id} className="genre-name">
      <h1>{genre.genre}</h1>
      <GenreList
        myList={myList}
        currentProfileId={currentProfileId}
        createListItem={handleCreateListItem}
        deleteListItem={handleDeleteListItem}
        movies={movies}
        genreId={genre.id}
        genres={genres}
        tags={tags}
      />
    </div>
  ));

  const myListSection = myList.length ? (
    <div key={currentProfileId} className="genre-name">
      <h1>My List</h1>
      <GenreList
        currentProfileId={currentProfileId}
        createListItem={handleCreateListItem}
        deleteListItem={handleDeleteListItem}
        movies={movies}
        myList={myList}
        genreId={null}
        tags={tags}
        genres={genres}
      />
    </div>
  ) : null;

  const modal = showModal ? (
    <DetailsModal
      myList={myList}
      currentProfileId={currentProfileId}
      createListItem={handleCreateListItem}
      deleteListItem={handleDeleteListItem}
      movie={topMovie}
      toggleModal={toggleModal}
      soundOff={soundOff}
      display={tagDisplay}
      sound={sound}
    />
  ) : null;

  return (
    <div className="browse-main">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
      <div className="top-movie">
        <img src={topMovie.photoUrl} />
        <h1>{topMovie.title}</h1>
        <div className="top-movie-btns">
          <Link to={`/watch/${topMovie.id}`} className="modal-play">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            Play
          </Link>
          <button className="top-info" onClick={toggleModal}>More info</button>
        </div>
      </div>
      <div className="genres-browse">
        {myListSection}
        {genreRows}
      </div>
      {modal}
    </div>
  );
};

export default GenresIndex;
