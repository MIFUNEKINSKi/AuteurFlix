import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMovie } from '../../store/api';

const ShowMovie: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const currentMovie = movieId ? movies[Number(movieId)] : null;
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!currentMovie && movieId) {
      dispatch(fetchMovie(Number(movieId)));
    }
  }, [dispatch, currentMovie, movieId]);

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showControls = () => {
    clearTimers();
    const arrow = document.getElementById('back-arrow');
    if (arrow) {
      arrow.classList.remove('hidden');
      timerRef.current = window.setTimeout(() => arrow.classList.add('hidden'), 3000);
    }
  };

  const goBack = () => navigate('/browse');

  if (!currentMovie) {
    return <div style={{ color: 'white', fontSize: '24px', textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="movie-container" onMouseMove={showControls}>
      <div id="back-arrow" className="hidden" onClick={goBack}>
        <span className="arrow-icon">&larr;</span>
        <span className="back-text">Back</span>
      </div>
      <video
        autoPlay
        muted
        className="show-movie"
        src={currentMovie.videoUrl}
        controls
        width={1000}
      />
    </div>
  );
};

export default ShowMovie;
