import React, { useState, useEffect, useMemo, useRef } from 'react';
import BrowseHeader from './browse_header';
import GenreList from './genre_list';
import DetailsModal from './details_modal';
import AuteursRow from './auteurs_row';
import { Link } from 'react-router-dom';
import { slugifyDirector } from '../../util/movie_api_util';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk } from '../../store/api';
import { fetchMovies, createListItem, deleteListItem } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import type { Movie } from '../../types';

const GenresIndex: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [heroSound, setHeroSound] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.entities.movies);
  const genres = useAppSelector((state) => Object.values(state.entities.genres));
  const tags = useAppSelector((state) => Object.values(state.entities.tags));
  const currentProfileId = useAppSelector((state) => state.session.profileId);
  const myList = useAppSelector((state) => Object.values(state.entities.myList));

  const topMovie = useMemo<Movie | undefined>(() => {
    const movieArr = Object.values(movies);
    if (movieArr.length === 0) return undefined;
    return movieArr[Math.floor(Math.random() * movieArr.length)];
  }, [Object.keys(movies).length]);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setHeroVideoReady(false);
  }, [topMovie?.id]);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) =>
    dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  const toggleModal = () => setShowModal((prev) => !prev);

  const toggleHeroSound = () => {
    const next = !heroSound;
    setHeroSound(next);
    if (heroVideoRef.current) heroVideoRef.current.muted = !next;
  };

  const convertLength = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const criticsPicks = useMemo(() => {
    return Object.values(movies)
      .filter((m) => typeof m.tmdbRating === 'number' && (m.tmdbRating ?? 0) > 0)
      .sort((a, b) => {
        const ra = a.tmdbRating ?? 0;
        const rb = b.tmdbRating ?? 0;
        if (ra !== rb) return rb - ra;
        const va = a.tmdbVoteCount ?? 0;
        const vb = b.tmdbVoteCount ?? 0;
        return vb - va;
      })
      .slice(0, 12)
      .map((m) => m.id);
  }, [movies]);

  if (!topMovie || Object.keys(movies).length === 0) {
    return (
      <div className="browse-main">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="browse-loading">Loading films…</div>
      </div>
    );
  }

  const isDecadeGenre = (g: { genre: string }) => /^\d{2,4}s$/.test(g.genre.trim());
  const directorGenres = genres.filter((g) => !isDecadeGenre(g));
  const decadeGenres = genres
    .filter(isDecadeGenre)
    .sort((a, b) => parseInt(a.genre, 10) - parseInt(b.genre, 10));

  const genreRow = (genre: { id: number; genre: string }, label?: string) => {
    const isDirectorRow = !isDecadeGenre(genre);
    const slug = isDirectorRow ? slugifyDirector(genre.genre) : null;
    return (
      <div key={genre.id} className="genre-name">
        <h2 className="row-title">
          {slug ? (
            <Link to={`/director/${slug}`} className="row-title-link">
              <span>{label ?? genre.genre}</span>
              <span className="row-explore" aria-hidden="true">View director ›</span>
            </Link>
          ) : (
            <>
              <span>{label ?? genre.genre}</span>
              <span className="row-explore" aria-hidden="true">Explore All ›</span>
            </>
          )}
        </h2>
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
    );
  };

  const myListSection = myList.length ? (
    <div key={currentProfileId} className="genre-name">
      <h2 className="row-title">
        <span>My List</span>
        <span className="row-explore" aria-hidden="true">Explore All ›</span>
      </h2>
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

  const criticsPicksSection = criticsPicks.length > 0 ? (
    <div className="genre-name">
      <h2 className="row-title">
        <span>Critics' Picks</span>
        <span className="row-explore" aria-hidden="true">Explore All ›</span>
      </h2>
      <GenreList
        myList={myList}
        currentProfileId={currentProfileId}
        createListItem={handleCreateListItem}
        deleteListItem={handleDeleteListItem}
        movies={movies}
        movieIds={criticsPicks}
        genreId={null}
        tags={tags}
        genres={genres}
      />
    </div>
  ) : null;

  const decadeHeader = decadeGenres.length > 0 ? (
    <h3 className="feed-section-title">By Decade</h3>
  ) : null;

  const modal = showModal ? (
    <DetailsModal
      myList={myList}
      currentProfileId={currentProfileId}
      createListItem={handleCreateListItem}
      deleteListItem={handleDeleteListItem}
      movie={topMovie}
      toggleModal={toggleModal}
      sound={heroSound}
    />
  ) : null;

  return (
    <div className="browse-main">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <section className="hero" aria-label={`Featured: ${topMovie.title}`}>
        <div className="hero-media">
          <img
            className={`hero-image ${heroVideoReady ? 'faded' : ''}`}
            src={topMovie.tmdbBackdropUrl ?? topMovie.photoUrl}
            alt=""
          />
          {topMovie.videoUrl ? (
            <video
              ref={heroVideoRef}
              className={`hero-video ${heroVideoReady ? 'visible' : ''}`}
              key={topMovie.id}
              src={topMovie.videoUrl}
              autoPlay
              muted={!heroSound}
              playsInline
              preload="metadata"
              onCanPlay={() => setHeroVideoReady(true)}
              onEnded={() => setHeroVideoReady(false)}
            />
          ) : null}
          <div className="hero-vignette" />
          <div className="hero-fade-bottom" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Featured Auteur</p>
          <h1 className="hero-title">{topMovie.title}</h1>
          <p className="hero-meta">
            <Link to={`/director/${slugifyDirector(topMovie.director)}`} className="hero-director-link">
              <span className="hero-director">{topMovie.director}</span>
            </Link>
            <span className="hero-dot">·</span>
            <span>{topMovie.year}</span>
            <span className="hero-dot">·</span>
            <span>{convertLength(topMovie.length)}</span>
            {topMovie.tmdbRating ? (
              <>
                <span className="hero-dot">·</span>
                <span className="hero-rating">★ {topMovie.tmdbRating.toFixed(1)}</span>
              </>
            ) : null}
          </p>
          <p className="hero-summary">{topMovie.summary}</p>
          <div className="hero-btns">
            <Link to={`/watch/${topMovie.id}`} className="hero-play">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </Link>
            <button type="button" className="hero-info" onClick={toggleModal}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="11" x2="12" y2="17" strokeLinecap="round" />
                <circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              More Info
            </button>
          </div>
        </div>

        {topMovie.videoUrl ? (
          <button
            type="button"
            className="hero-sound-btn"
            onClick={toggleHeroSound}
            aria-label={heroSound ? 'Mute trailer' : 'Unmute trailer'}
          >
            {heroSound ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M15.54 8.46a5 5 0 010 7.07" />
                <path d="M19.07 4.93a10 10 0 010 14.14" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M23 9l-6 6M17 9l6 6" />
              </svg>
            )}
          </button>
        ) : null}
      </section>

      <div className="genres-browse">
        <AuteursRow />
        {myListSection}
        {criticsPicksSection}
        {directorGenres.map((g) => genreRow(g))}
        {decadeHeader}
        {decadeGenres.map((g) => genreRow(g, `${g.genre}`))}
      </div>
      {modal}
    </div>
  );
};

export default GenresIndex;
