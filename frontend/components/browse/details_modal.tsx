import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Movie, ListItem, RecommendedMovie, Genre, Tag } from '../../types';
import { fetchRecommendations, slugifyDirector } from '../../util/movie_api_util';
import { useAppSelector } from '../../store/hooks';

interface Props {
  movie: Movie;
  sound: boolean;
  myList: ListItem[];
  currentProfileId: number | null;
  toggleModal: () => void;
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const convertLength = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}H ${m}M` : `${m}M`;
};

// Derive a "match %" deterministically from TMDB rating (so it feels real, not random)
const matchPercent = (rating?: number, votes?: number) => {
  if (!rating) return null;
  const base = Math.min(99, Math.round(rating * 10));
  const adjustment = Math.min(8, Math.floor(Math.log10((votes ?? 1) + 1)));
  return Math.min(99, base + adjustment);
};

const DetailsModal: React.FC<Props> = ({
  movie, sound: initialSound, myList, currentProfileId,
  toggleModal, createListItem, deleteListItem,
}) => {
  const [sound, setSound] = useState(initialSound);
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie>(movie);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const allMovies = useAppSelector((state) => state.entities.movies);
  const genres = useAppSelector((state) => Object.values(state.entities.genres) as Genre[]);
  const tags = useAppSelector((state) => Object.values(state.entities.tags) as Tag[]);

  const activeGenres = useMemo(() => {
    const movieTags = tags.filter((t) => t.movie_id === activeMovie.id);
    return movieTags
      .map((t) => genres.find((g) => g.id === t.genre_id))
      .filter((g): g is Genre => g !== undefined);
  }, [tags, genres, activeMovie.id]);

  useEffect(() => {
    document.body.classList.add('modal-open-body');
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('modal-open-body');
    };
  }, []);

  useEffect(() => {
    setVideoReady(false);
    setRecommendations([]);
    fetchRecommendations(activeMovie.id).then(setRecommendations).catch(() => {});
    const video = videoRef.current;
    if (video) { video.load(); video.play().catch(() => {}); }
    if (modalRef.current) modalRef.current.scrollTop = 0;
  }, [activeMovie.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setOpen(false);
    window.setTimeout(toggleModal, 260);
  };

  const handleRecommendationClick = (e: React.MouseEvent, rec: RecommendedMovie) => {
    e.stopPropagation();
    const localMovie = allMovies[rec.id];
    if (localMovie) {
      setActiveMovie(localMovie);
    } else if (rec.tmdbId) {
      window.open(`https://www.themoviedb.org/movie/${rec.tmdbId}`, '_blank');
    }
  };

  const handleSoundToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newSound = !sound;
    setSound(newSound);
    if (videoRef.current) videoRef.current.muted = !newSound;
  };

  const onList = () => myList.some((item) => item.movie_id === activeMovie.id);
  const toggleListItem = () => {
    if (onList()) {
      const item = myList.find((li) => li.movie_id === activeMovie.id)!;
      deleteListItem(item.id);
    } else {
      createListItem({ movieId: activeMovie.id, profileId: currentProfileId! });
    }
  };

  const sameDirector = recommendations.filter((r) => r.director && r.director === activeMovie.director);
  const otherRecs = recommendations.filter((r) => !r.director || r.director !== activeMovie.director);

  const match = matchPercent(activeMovie.tmdbRating, activeMovie.tmdbVoteCount);
  const modalState = closing ? 'closing' : open ? 'open' : 'opening';
  const heroSrc = activeMovie.tmdbBackdropUrl ?? activeMovie.photoUrl;

  const renderRecCard = (rec: RecommendedMovie, index: number) => {
    const numStr = String(index + 1).padStart(2, '0');
    return (
      <button
        key={rec.id}
        type="button"
        className="rec-card"
        onClick={(e) => handleRecommendationClick(e, rec)}
      >
        <div className="rec-card-media">
          {(rec.tmdbCardUrl || rec.thumbnailUrl) ? (
            <img src={rec.tmdbCardUrl ?? rec.thumbnailUrl} alt={rec.title} loading="lazy" />
          ) : (
            <div className="placeholder rec-card-placeholder" style={{ ['--ph' as any]: '#3a2a1a' }} aria-hidden="true" />
          )}
          <span className="rec-card-num t-meta">№{numStr}</span>
        </div>
        <div className="rec-card-info">
          <div className="rec-card-row">
            <span className="rec-card-title"><em>{rec.title}</em></span>
            <span className="t-meta">{rec.year}</span>
          </div>
          {rec.director && <span className="rec-card-director t-meta">{rec.director.toUpperCase()}</span>}
          {rec.tmdbRating ? (
            <span className="rec-card-rating t-meta">★ {rec.tmdbRating.toFixed(1)}</span>
          ) : null}
        </div>
      </button>
    );
  };

  return (
    <>
      <div className={`modal-shroud ${modalState}`} onClick={handleClose} />
      <div
        className={`modal ${modalState}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={activeMovie.title}
      >
        <button onClick={handleClose} className="modal-close" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>

        {/* Hero */}
        <div className="modal-hero">
          {heroSrc ? (
            <img
              className={`modal-hero-image ${videoReady ? 'faded' : ''}`}
              src={heroSrc}
              alt=""
            />
          ) : (
            <div className="modal-hero-image placeholder" style={{ ['--ph' as any]: '#3a2a1a' }} aria-hidden="true" />
          )}
          {activeMovie.videoUrl ? (
            <video
              ref={videoRef}
              className={`modal-hero-video ${videoReady ? 'visible' : ''}`}
              key={activeMovie.id}
              src={activeMovie.videoUrl}
              muted={!sound}
              playsInline
              preload="metadata"
              autoPlay
              onCanPlay={() => setVideoReady(true)}
              onEnded={() => setVideoReady(false)}
            />
          ) : null}
          <div className="modal-hero-scrim" />
          <div className="modal-hero-content">
            <span className="t-eyebrow">An auteur film by {activeMovie.director}</span>
            <h2 className="t-display modal-title"><em>{activeMovie.title}</em></h2>
            <div className="modal-meta-row">
              {match && <span className="match-pill">{match}% match</span>}
              <span className="t-meta">{activeMovie.year}</span>
              <span className="t-meta">{convertLength(activeMovie.length)}</span>
              {activeMovie.tmdbRating ? <span className="t-meta">★ {activeMovie.tmdbRating.toFixed(1)}</span> : null}
              {activeGenres.length > 0 && (
                <span className="t-meta">{activeGenres.map((g) => g.genre).join(' · ')}</span>
              )}
            </div>
            <div className="modal-actions">
              <Link to={`/watch/${activeMovie.id}`} className="btn btn-accent">
                <svg width="13" height="13" viewBox="0 0 13 13"><path d="M3 1.5 11 6.5 3 11.5z" fill="currentColor" /></svg>
                Play trailer
              </Link>
              <button type="button" className="btn btn-outline" onClick={toggleListItem}>
                {onList() ? '✓ On list' : '+ My List'}
              </button>
            </div>
          </div>
          {activeMovie.videoUrl ? (
            <button type="button" className="modal-sound-btn icon-btn dark" onClick={handleSoundToggle} aria-label={sound ? 'Mute' : 'Unmute'}>
              {sound ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5L6 9H3v6h3l5 4V5Z" /><path d="M16 8c2 2 2 6 0 8M19 5c3.5 3.5 3.5 10.5 0 14" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5L6 9H3v6h3l5 4V5Z" /><path d="m17 9 5 5M22 9l-5 5" /></svg>
              )}
            </button>
          ) : null}
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-body-grid">
            <div className="modal-about">
              <p className="modal-summary">{activeMovie.summary}</p>
            </div>
            <aside className="modal-aside">
              <dl className="modal-spec">
                <div>
                  <dt>Director</dt>
                  <dd>
                    <Link
                      to={`/director/${slugifyDirector(activeMovie.director)}`}
                      className="modal-spec-link"
                      onClick={handleClose}
                    >
                      {activeMovie.director}
                    </Link>
                  </dd>
                </div>
                <div><dt>Year</dt><dd>{activeMovie.year}</dd></div>
                <div><dt>Runtime</dt><dd>{convertLength(activeMovie.length)}</dd></div>
                {activeGenres.length > 0 && (
                  <div>
                    <dt>Genre</dt>
                    <dd>{activeGenres.map((g) => g.genre).join(', ')}</dd>
                  </div>
                )}
                {activeMovie.tmdbRating ? (
                  <div>
                    <dt>TMDB</dt>
                    <dd>★ {activeMovie.tmdbRating.toFixed(1)} <span className="t-meta">({activeMovie.tmdbVoteCount ?? 0} votes)</span></dd>
                  </div>
                ) : null}
                {activeMovie.tmdbVideoKey && (
                  <div>
                    <dt>Trailer</dt>
                    <dd className="t-meta">YouTube · TMDB-keyed</dd>
                  </div>
                )}
              </dl>
            </aside>
          </div>

          {sameDirector.length > 0 && (
            <div className="modal-rail-wrap">
              <h3 className="rail-title">
                <span className="t-eyebrow">More from</span>
                <span className="t-row"><em>{activeMovie.director}</em></span>
              </h3>
              <div className="rec-grid">
                {sameDirector.slice(0, 6).map((r, i) => renderRecCard(r, i))}
              </div>
            </div>
          )}

          {otherRecs.length > 0 && (
            <div className="modal-rail-wrap">
              <h3 className="rail-title">
                <span className="t-eyebrow">If you liked this</span>
                <span className="t-row">More like this</span>
              </h3>
              <div className="rec-grid">
                {otherRecs.slice(0, 6).map((r, i) => renderRecCard(r, i))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsModal;
