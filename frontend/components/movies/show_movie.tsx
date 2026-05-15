import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovie } from '../../store/api';
import { slugifyDirector } from '../../util/movie_api_util';

const convertLength = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}H ${m}M` : `${m}M`;
};

const ShowMovie: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const currentMovie = movieId ? movies[Number(movieId)] : null;
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentMovie && movieId) dispatch(fetchMovie(Number(movieId)));
  }, [dispatch, currentMovie, movieId]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const goBack = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => navigate('/browse'), 220);
  }, [leaving, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') goBack(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goBack]);

  const clearTimers = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  useEffect(() => () => clearTimers(), []);

  if (!currentMovie) {
    return (
      <div className="watch-page mounted">
        <div className="browse-loading t-meta">Loading trailer…</div>
      </div>
    );
  }

  const state = leaving ? 'leaving' : mounted ? 'mounted' : 'entering';
  const hasLocal = !!currentMovie.videoUrl;
  const hasYT = !!(currentMovie.tmdbVideoKey && currentMovie.tmdbVideoSite === 'YouTube');
  const slug = slugifyDirector(currentMovie.director);

  return (
    <div className={`watch-page ${state}`}>
      <div className="watch-bar">
        <button type="button" onClick={goBack} className="watch-back">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2 4 7l5 5" stroke="currentColor" fill="none" strokeWidth="1.5" /></svg>
          Back
        </button>
        <div className="watch-bar-mid">
          <span className="t-eyebrow">Now playing · trailer</span>
          <span className="watch-bar-title"><em>{currentMovie.title}</em></span>
          <Link to={`/director/${slug}`} className="t-meta watch-bar-director">{currentMovie.director.toUpperCase()}</Link>
          <span className="t-meta">{currentMovie.year} · {convertLength(currentMovie.length)}</span>
        </div>
        <div className="watch-bar-spacer" />
      </div>

      <div className="watch-stage">
        {hasLocal ? (
          <video
            autoPlay
            muted
            className="watch-video"
            src={currentMovie.videoUrl}
            controls
            playsInline
          />
        ) : hasYT ? (
          <iframe
            className="watch-video watch-iframe"
            src={`https://www.youtube.com/embed/${currentMovie.tmdbVideoKey}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
            title={currentMovie.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="watch-empty">
            <span className="t-eyebrow">No trailer in TMDB</span>
            <h2 className="t-section watch-empty-title"><em>Trailer not available.</em></h2>
            <p className="t-body watch-empty-body">
              TMDB doesn't have a YouTube key for "{currentMovie.title}". Try the director's other films,
              or browse the catalog.
            </p>
            <div className="watch-empty-actions">
              <Link to={`/director/${slug}`} className="btn btn-accent">More from {currentMovie.director}</Link>
              <Link to="/browse" className="btn btn-outline">Back to browse</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMovie;
