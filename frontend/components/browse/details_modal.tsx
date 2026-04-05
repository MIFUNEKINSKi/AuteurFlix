import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Movie, ListItem, RecommendedMovie } from '../../types';
import { fetchRecommendations } from '../../util/movie_api_util';
import { useAppSelector } from '../../store/hooks';

interface Props {
  movie: Movie;
  sound: boolean;
  myList: ListItem[];
  currentProfileId: number | null;
  toggleModal: () => void;
  soundOff: (e: React.MouseEvent<HTMLImageElement>) => void;
  display: React.ReactNode;
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const DetailsModal: React.FC<Props> = ({
  movie, sound: initialSound, myList, currentProfileId,
  toggleModal, soundOff, display, createListItem, deleteListItem,
}) => {
  const [sound, setSound] = useState(initialSound);
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);
  const [activeMovie, setActiveMovie] = useState<Movie>(movie);
  const modalRef = useRef<HTMLDivElement>(null);
  const allMovies = useAppSelector((state) => state.entities.movies);

  useEffect(() => {
    document.body.classList.add('modal-open-body');
    const timer = setTimeout(() => {
      const modal = document.querySelector('.modal') as HTMLElement;
      if (modal) {
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate3d(-50%, -50%, 0)';
      }
    }, 0);
    const videoTimer = setTimeout(() => {
      const video = document.getElementById('modal-vid') as HTMLVideoElement;
      if (video) video.play().catch(() => {});
    }, 100);

    fetchRecommendations(activeMovie.id)
      .then(setRecommendations)
      .catch(() => {});

    return () => {
      document.body.classList.remove('modal-open-body');
      clearTimeout(timer);
      clearTimeout(videoTimer);
    };
  }, [activeMovie.id]);

  const handleRecommendationClick = (e: React.MouseEvent, rec: RecommendedMovie) => {
    e.stopPropagation();
    const localMovie = allMovies[rec.id];
    if (localMovie) {
      setActiveMovie(localMovie);
      setRecommendations([]);
      if (modalRef.current) modalRef.current.scrollTop = 0;
    } else if (rec.tmdbId) {
      window.open(`https://www.themoviedb.org/movie/${rec.tmdbId}`, '_blank');
    }
  };

  const handleSoundOff = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    const newSound = !sound;
    setSound(newSound);
    const video = document.getElementById('modal-vid') as HTMLVideoElement;
    if (video) video.muted = !newSound;
  };

  const convertLength = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
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

  const onEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    (e.currentTarget as HTMLElement).classList.add('hide');
    (e.currentTarget.parentElement!.previousElementSibling as HTMLElement).classList.remove('hide');
  };

  const displayLength = convertLength(activeMovie.length);
  const listButton = onList() ? '✓' : '+';
  const soundBtn = sound ? window.volumeOff : window.volumeOn;

  return (
    <>
      <div className="modal-backdrop" onClick={toggleModal} />
      <div className="modal" ref={modalRef}>
        <button onClick={toggleModal} className="exit-modal">X</button>
        <img className="modal-thumbnail hide" src={activeMovie.photoUrl} alt="" />
        <div className="modal-vid-container">
          <p className="modal-title">{activeMovie.title}</p>
          <div className="modal-btns">
            <Link to={`/watch/${activeMovie.id}`} className="modal-play">&#9658; Play</Link>
            <button id="modal-add-list" className="tooltip" title={onList() ? 'Remove from List' : 'Add to List'} onClick={toggleListItem}>{listButton}</button>
          </div>
          <video
            id="modal-vid"
            key={activeMovie.id}
            src={activeMovie.videoUrl}
            muted={!sound}
            preload="metadata"
            autoPlay
            onEnded={onEnd}
          />
          <img src={soundBtn} className="modal-sound-off" onClick={handleSoundOff} />
        </div>
        <div className="modal-details">
          <div className="left-details">
            <div>
              <p>{activeMovie.year}</p>
              <p className="modal-director">{activeMovie.director}</p>
              <p>{displayLength}</p>
              {activeMovie.tmdbRating && (
                <p className="tmdb-rating" title={`${activeMovie.tmdbVoteCount} votes on TMDB`}>
                  ★ {activeMovie.tmdbRating.toFixed(1)}
                </p>
              )}
            </div>
            <p>{activeMovie.summary}</p>
          </div>
        </div>
        {recommendations.length > 0 && (
          <div className="modal-recommendations">
            <h3>More Like This</h3>
            <div className="recommendations-grid">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="recommendation-card"
                  onClick={(e) => handleRecommendationClick(e, rec)}
                >
                  {rec.thumbnailUrl && (
                    <img src={rec.thumbnailUrl} alt={rec.title} loading="lazy" />
                  )}
                  <div className="recommendation-info">
                    <p className="recommendation-title">{rec.title}</p>
                    <span>{rec.year} &middot; {rec.director}</span>
                    {rec.tmdbRating && <span className="tmdb-rating">★ {rec.tmdbRating.toFixed(1)}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsModal;
