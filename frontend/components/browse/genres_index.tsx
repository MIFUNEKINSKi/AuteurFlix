import React, { useState, useEffect, useMemo, useRef } from 'react';
import BrowseHeader from './browse_header';
import GenreList from './genre_list';
import DetailsModal from './details_modal';
import AuteursRow from './auteurs_row';
import EntryCards from './entry_cards';
import BrowseFooter from './browse_footer';
import { Link } from 'react-router-dom';
import { slugifyDirector } from '../../util/movie_api_util';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk } from '../../store/api';
import { fetchMovies, createListItem, deleteListItem } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirectors } from '../../util/movie_api_util';
import type { Movie, DirectorSummary } from '../../types';

const splitTitleForItalic = (title: string): React.ReactNode => {
  const parts = title.split(' ');
  if (parts.length === 1) return <em>{title}</em>;
  const split = Math.max(1, Math.floor(parts.length / 2));
  return (
    <>
      <em>{parts.slice(0, split).join(' ')}</em>
      {' '}
      {parts.slice(split).join(' ')}
    </>
  );
};

const convertLength = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}H ${m}M` : `${m}M`;
};

const GenresIndex: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [heroSound, setHeroSound] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [directors, setDirectors] = useState<DirectorSummary[]>([]);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.entities.movies);
  const genres = useAppSelector((state) => Object.values(state.entities.genres));
  const tags = useAppSelector((state) => Object.values(state.entities.tags));
  const currentProfileId = useAppSelector((state) => state.session.profileId);
  const myList = useAppSelector((state) => Object.values(state.entities.myList));

  // Pick a stable featured film by highest TMDB rating × vote weight
  const topMovie = useMemo<Movie | undefined>(() => {
    const movieArr = Object.values(movies);
    if (movieArr.length === 0) return undefined;
    const scored = movieArr
      .filter((m) => (m.tmdbRating ?? 0) > 0 && (m.tmdbBackdropUrl || m.photoUrl))
      .sort((a, b) => {
        const sa = (a.tmdbRating ?? 0) * Math.log10((a.tmdbVoteCount ?? 1) + 1);
        const sb = (b.tmdbRating ?? 0) * Math.log10((b.tmdbVoteCount ?? 1) + 1);
        return sb - sa;
      });
    // Rotate within the top 12 deterministically per page load
    const pool = scored.slice(0, 12);
    if (pool.length === 0) return movieArr[0];
    return pool[Math.floor(Math.random() * pool.length)];
  }, [Object.keys(movies).length]);

  useEffect(() => {
    dispatch(fetchMovies());
    fetchDirectors().then(setDirectors).catch(() => {});
  }, [dispatch]);

  useEffect(() => { setHeroVideoReady(false); }, [topMovie?.id]);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) => dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  const toggleModal = () => setShowModal((p) => !p);
  const toggleHeroSound = () => {
    const next = !heroSound;
    setHeroSound(next);
    if (heroVideoRef.current) heroVideoRef.current.muted = !next;
  };

  // Critics' Picks: top 12 by tmdbRating × log(voteCount)
  const criticsPicks = useMemo(() => {
    return Object.values(movies)
      .filter((m) => (m.tmdbRating ?? 0) > 0)
      .sort((a, b) => {
        const sa = (a.tmdbRating ?? 0) * Math.log10((a.tmdbVoteCount ?? 1) + 1);
        const sb = (b.tmdbRating ?? 0) * Math.log10((b.tmdbVoteCount ?? 1) + 1);
        return sb - sa;
      })
      .slice(0, 12)
      .map((m) => m.id);
  }, [movies]);

  // Restorations & rediscoveries: pre-1990 films sorted by rating
  const restorations = useMemo(() => {
    return Object.values(movies)
      .filter((m) => m.year < 1990 && (m.tmdbRating ?? 0) >= 7)
      .sort((a, b) => (b.tmdbRating ?? 0) - (a.tmdbRating ?? 0))
      .slice(0, 12)
      .map((m) => m.id);
  }, [movies]);

  // Top 2 director "spotlight" rows — most films + highest avg rating
  const spotlightGenres = useMemo(() => {
    const directorGenres = genres.filter((g) => !/^\d{2,4}s$/.test(g.genre.trim()));
    const ranked = directorGenres
      .map((g) => {
        const taggedMovieIds = tags.filter((t) => t.genre_id === g.id).map((t) => t.movie_id);
        const films = taggedMovieIds.map((id) => movies[id]).filter(Boolean);
        const avgRating = films.length === 0 ? 0
          : films.reduce((s, m) => s + (m.tmdbRating ?? 0), 0) / films.length;
        return { genre: g, count: films.length, score: films.length * avgRating };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);
    return ranked.map((r) => r.genre);
  }, [genres, tags, movies]);

  // Decade + country counts for entry-card stats
  const decadeSummary = useMemo(() => {
    const buckets = new Map<number, number>();
    Object.values(movies).forEach((m) => {
      if (!m.year) return;
      const d = Math.floor(m.year / 10) * 10;
      buckets.set(d, (buckets.get(d) ?? 0) + 1);
    });
    return Array.from(buckets.entries())
      .sort(([a], [b]) => b - a)
      .map(([d, count]) => ({ decade: d, count }));
  }, [movies]);

  const countrySummary = useMemo(() => {
    if (directors.length === 0) return [];
    const dirCountry = new Map<string, string>();
    directors.forEach((d) => { if (d.country) dirCountry.set(d.name, d.country); });
    const buckets = new Map<string, number>();
    Object.values(movies).forEach((m) => {
      const c = dirCountry.get(m.director);
      if (!c) return;
      buckets.set(c, (buckets.get(c) ?? 0) + 1);
    });
    return Array.from(buckets.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([country, count]) => ({ country, count }));
  }, [movies, directors]);

  if (!topMovie || Object.keys(movies).length === 0) {
    return (
      <div className="browse-main">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="browse-loading t-meta">Loading the collection…</div>
      </div>
    );
  }

  const totalMovies = Object.keys(movies).length;
  const totalDirectors = directors.length || spotlightGenres.length;

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

      {/* ============= HERO ============= */}
      <section className="hero" aria-label={`Featured: ${topMovie.title}`}>
        <div className="hero-backdrop">
          <img
            className={`hero-layer hero-image ${heroVideoReady ? '' : 'on'}`}
            src={topMovie.tmdbBackdropUrl ?? topMovie.photoUrl}
            alt=""
          />
          {topMovie.videoUrl ? (
            <video
              ref={heroVideoRef}
              className={`hero-layer hero-video ${heroVideoReady ? 'on' : ''}`}
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
          <div className="hero-scrim" />
          <div className="hero-vignette" />
        </div>

        <div className="hero-content">
          <span className="t-eyebrow">Featured this week · Auteur in focus</span>
          <h1 className="t-display hero-title">{splitTitleForItalic(topMovie.title)}</h1>
          <div className="hero-meta">
            <Link to={`/director/${slugifyDirector(topMovie.director)}`} className="hero-director-link">
              <span className="hero-director">{topMovie.director}</span>
            </Link>
            <span className="t-meta">
              {topMovie.year} · {convertLength(topMovie.length)}
              {topMovie.tmdbRating ? ` · ★ ${topMovie.tmdbRating.toFixed(1)}` : ''}
            </span>
          </div>
          <p className="hero-blurb">{topMovie.summary}</p>
          <div className="hero-actions">
            <Link to={`/watch/${topMovie.id}`} className="btn btn-accent">
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5 12 7 3 12.5z" fill="currentColor" /></svg>
              Play trailer
            </Link>
            <button type="button" className="btn btn-ghost" onClick={toggleModal}>
              <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" /><path d="M7 4v3.5l2 1.2" stroke="currentColor" fill="none" strokeWidth="1.4" /></svg>
              More info
            </button>
          </div>
        </div>

        <div className="hero-controls">
          {topMovie.videoUrl ? (
            <button type="button" onClick={toggleHeroSound} className="icon-btn dark" aria-label={heroSound ? 'Mute trailer' : 'Unmute trailer'}>
              {heroSound ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5L6 9H3v6h3l5 4V5Z" /><path d="M16 8c2 2 2 6 0 8M19 5c3.5 3.5 3.5 10.5 0 14" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5L6 9H3v6h3l5 4V5Z" /><path d="m17 9 5 5M22 9l-5 5" /></svg>
              )}
            </button>
          ) : null}
          <span className="hero-aspect t-meta">Trailer · YouTube · {convertLength(topMovie.length)}</span>
        </div>
      </section>

      {/* ============= FEED ============= */}
      <div className="browse-stack">
        {/* No. 01 — Critics' Picks */}
        {criticsPicks.length > 0 && (
          <div className="rail-section">
            <div className="genre-name">
              <h2 className="rail-title">
                <span className="t-eyebrow">No. 01</span>
                <span className="t-row">Critics' picks · this week</span>
              </h2>
              <GenreList
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={handleCreateListItem}
                deleteListItem={handleDeleteListItem}
                movies={movies}
                movieIds={criticsPicks}
                genreId={null}
                genres={genres}
                tags={tags}
              />
            </div>
          </div>
        )}

        {/* Featured Auteurs rail */}
        <AuteursRow />

        {/* My List */}
        {myList.length > 0 && (
          <div className="rail-section">
            <div className="genre-name">
              <h2 className="rail-title">
                <span className="t-eyebrow">No. 02</span>
                <span className="t-row">My List</span>
                <Link to="/browse/my-list" className="rail-explore">Explore all →</Link>
              </h2>
              <GenreList
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={handleCreateListItem}
                deleteListItem={handleDeleteListItem}
                movies={movies}
                genreId={null}
                genres={genres}
                tags={tags}
              />
            </div>
          </div>
        )}

        {/* Director spotlights — top 2 */}
        {spotlightGenres.map((g, idx) => {
          const slug = slugifyDirector(g.genre);
          return (
            <div key={g.id} className="rail-section">
              <div className="genre-name">
                <h2 className="rail-title">
                  <span className="t-eyebrow">Spotlight</span>
                  <Link to={`/director/${slug}`} className="t-row rail-title-link"><em>{g.genre}</em>, complete</Link>
                  <Link to={`/director/${slug}`} className="rail-explore">View director →</Link>
                </h2>
                <GenreList
                  myList={myList}
                  currentProfileId={currentProfileId}
                  createListItem={handleCreateListItem}
                  deleteListItem={handleDeleteListItem}
                  movies={movies}
                  genreId={g.id}
                  genres={genres}
                  tags={tags}
                />
              </div>
            </div>
          );
        })}

        {/* Restorations & rediscoveries */}
        {restorations.length > 0 && (
          <div className="rail-section">
            <div className="genre-name">
              <h2 className="rail-title">
                <span className="t-eyebrow">Currents</span>
                <span className="t-row">Restorations & rediscoveries</span>
              </h2>
              <GenreList
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={handleCreateListItem}
                deleteListItem={handleDeleteListItem}
                movies={movies}
                movieIds={restorations}
                genreId={null}
                genres={genres}
                tags={tags}
              />
            </div>
          </div>
        )}

        {/* Three entry cards — the IA shortcut */}
        <EntryCards
          totalDirectors={totalDirectors}
          totalMovies={totalMovies}
          countries={countrySummary}
          decades={decadeSummary}
        />

        <BrowseFooter />
      </div>

      {modal}
    </div>
  );
};

export default GenresIndex;
