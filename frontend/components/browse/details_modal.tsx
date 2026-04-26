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
    fetchRecommendations(activeMovie.id)
      .then(setRecommendations)
      .catch(() => {});

    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch(() => {});
    }
    if (modalRef.current) modalRef.current.scrollTop = 0;
  }, [activeMovie.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
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

  const convertLength = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
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

  const sameDirector = recommendations.filter(
    (r) => r.director && r.director === activeMovie.director,
  );
  const otherRecs = recommendations.filter(
    (r) => !r.director || r.director !== activeMovie.director,
  );

  const displayLength = convertLength(activeMovie.length);
  const modalState = closing ? 'closing' : open ? 'open' : 'opening';

  const renderRecCard = (rec: RecommendedMovie) => (
    <button
      key={rec.id}
      type="button"
      className="recommendation-card"
      onClick={(e) => handleRecommendationClick(e, rec)}
    >
      {(rec.tmdbCardUrl || rec.thumbnailUrl) ? (
        <div className="recommendation-thumb">
          <img src={rec.tmdbCardUrl ?? rec.thumbnailUrl} alt={rec.title} loading="lazy" />
        </div>
      ) : (
        <div className="recommendation-thumb recommendation-thumb-placeholder" aria-hidden="true" />
      )}
      <div className="recommendation-info">
        <p className="recommendation-title">{rec.title}</p>
        <div className="recommendation-meta">
          <span className="rec-year">{rec.year}</span>
          {rec.tmdbRating ? (
            <span className="rec-rating">★ {rec.tmdbRating.toFixed(1)}</span>
          ) : null}
        </div>
        {rec.director ? <p className="recommendation-director">{rec.director}</p> : null}
      </div>
    </button>
  );

  return (
    <>
      <div
        className={`modal-backdrop ${modalState}`}
        onClick={handleClose}
      />
      <div
        className={`modal ${modalState}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={activeMovie.title}
      >
        <button onClick={handleClose} className="exit-modal" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 6L18 18M18 6L6 18" />
          </svg>
        </button>

        <div className="modal-hero">
          <img
            className={`modal-hero-image ${videoReady ? 'faded' : ''}`}
            src={activeMovie.tmdbBackdropUrl ?? activeMovie.photoUrl}
            alt=""
          />
          <video
            ref={videoRef}
            id="modal-vid"
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
          <div className="modal-hero-gradient" />
          <div className="modal-hero-content">
            <h2 className="modal-title">{activeMovie.title}</h2>
            <p className="modal-subtitle">
              <Link
                to={`/director/${slugifyDirector(activeMovie.director)}`}
                className="modal-director-link"
                onClick={handleClose}
              >
                <span className="modal-director">{activeMovie.director}</span>
              </Link>
              <span className="modal-dot">·</span>
              <span>{activeMovie.year}</span>
              <span className="modal-dot">·</span>
              <span>{displayLength}</span>
            </p>
            <div className="modal-btns">
              <Link to={`/watch/${activeMovie.id}`} className="modal-play">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </Link>
              <button
                className="modal-icon-btn"
                title={onList() ? 'Remove from List' : 'Add to List'}
                onClick={toggleListItem}
                aria-label={onList() ? 'Remove from List' : 'Add to List'}
              >
                {onList() ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {activeMovie.videoUrl ? (
            <button
              className="modal-sound-btn"
              onClick={handleSoundToggle}
              aria-label={sound ? 'Mute' : 'Unmute'}
            >
              {sound ? (
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
        </div>

        <div className="modal-details">
          <div className="modal-details-main">
            {activeMovie.tmdbRating ? (
              <p className="modal-rating-row">
                <span className="tmdb-rating" title={`${activeMovie.tmdbVoteCount ?? 0} votes on TMDB`}>
                  ★ {activeMovie.tmdbRating.toFixed(1)}
                </span>
                <span className="tmdb-rating-label">TMDB</span>
              </p>
            ) : null}
            <p className="modal-summary">{activeMovie.summary}</p>
          </div>
          <aside className="modal-details-aside">
            <div className="aside-row">
              <span className="aside-label">Director</span>
              <Link
                to={`/director/${slugifyDirector(activeMovie.director)}`}
                className="aside-value aside-link"
                onClick={handleClose}
              >
                {activeMovie.director}
              </Link>
            </div>
            {activeGenres.length > 0 ? (
              <div className="aside-row">
                <span className="aside-label">Genres</span>
                <span className="aside-value">
                  {activeGenres.map((g) => g.genre).join(', ')}
                </span>
              </div>
            ) : null}
            <div className="aside-row">
              <span className="aside-label">Year</span>
              <span className="aside-value">{activeMovie.year}</span>
            </div>
          </aside>
        </div>

        {sameDirector.length > 0 ? (
          <div className="modal-recommendations">
            <h3>More from {activeMovie.director}</h3>
            <div className="recommendations-grid">
              {sameDirector.map(renderRecCard)}
            </div>
          </div>
        ) : null}

        {otherRecs.length > 0 ? (
          <div className="modal-recommendations">
            <h3>More Like This</h3>
            <div className="recommendations-grid">
              {otherRecs.map(renderRecCard)}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DetailsModal;
