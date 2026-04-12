import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovie } from '../../store/api';

const ShowMovie: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const currentMovie = movieId ? movies[Number(movieId)] : null;
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentMovie && movieId) {
      dispatch(fetchMovie(Number(movieId)));
    }
  }, [dispatch, currentMovie, movieId]);

  // Fade in on mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const goBack = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => navigate('/browse'), 220);
  }, [leaving, navigate]);

  // Escape key to go back
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goBack]);

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showControls = () => {
    clearTimers();
    setControlsVisible(true);
    timerRef.current = window.setTimeout(() => setControlsVisible(false), 3000);
  };

  if (!currentMovie) {
    return (
      <div className="movie-container mounted">
        <div className="show-movie-loading">Loading…</div>
      </div>
    );
  }

  const state = leaving ? 'leaving' : mounted ? 'mounted' : 'entering';

  return (
    <div
      className={`movie-container ${state}`}
      onMouseMove={showControls}
      onTouchStart={showControls}
    >
      <button
        type="button"
        className={`show-back ${controlsVisible ? 'visible' : ''}`}
        onClick={goBack}
        aria-label="Back to browse"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </button>
      <video
        autoPlay
        muted
        className="show-movie"
        src={currentMovie.videoUrl}
        controls
        playsInline
      />
    </div>
  );
};

export default ShowMovie;
