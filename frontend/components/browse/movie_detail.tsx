import React, { useState, useRef, useCallback } from 'react';
import DetailsModal from './details_modal';
import { Link } from 'react-router-dom';
import { slugifyDirector } from '../../util/movie_api_util';
import type { Movie, Genre, Tag, ListItem } from '../../types';

interface Props {
  movie: Movie;
  tags: Tag[];
  genres: Genre[];
  myList: ListItem[];
  currentProfileId: number | null;
  index?: number;
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const MovieDetail: React.FC<Props> = ({
  movie, tags, genres, myList, currentProfileId, index, createListItem, deleteListItem,
}) => {
  const [sound, setSound] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = window.setTimeout(() => {
      setHovered(true);
      const vid = videoRef.current;
      if (vid && movie.videoUrl) {
        if (!vid.src) vid.src = movie.videoUrl;
        vid.currentTime = 0;
        vid.muted = !sound;
        vid.play().catch(() => {});
      }
    }, 600);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setHovered(false);
    const vid = videoRef.current;
    if (vid) { vid.pause(); vid.currentTime = 0; }
  };

  const onList = () => myList.some((item) => item.movie_id === movie.id);

  const toggleListItem = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!movie?.id) return;
    if (onList()) {
      const item = myList.find((li) => li.movie_id === movie.id)!;
      deleteListItem(item.id);
    } else {
      createListItem({ movieId: movie.id, profileId: currentProfileId! });
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMouseLeave();
    setShowModal(true);
  };

  if (!movie) return null;

  const numStr = index !== undefined ? String(index).padStart(3, '0') : null;
  const thumb = movie.tmdbCardUrl ?? movie.thumbnailUrl;

  const modal = showModal ? (
    <DetailsModal
      myList={myList}
      createListItem={createListItem}
      deleteListItem={deleteListItem}
      currentProfileId={currentProfileId}
      movie={movie}
      toggleModal={() => setShowModal(false)}
      sound={sound}
    />
  ) : null;

  return (
    <>
      <div
        className={`film-card poster ${hovered ? 'is-hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openModal}
      >
        <div className="film-card-media">
          {thumb ? (
            <img className="film-card-thumb" src={thumb} alt={movie.title} loading="lazy" />
          ) : (
            <div className="film-card-thumb placeholder" style={{ ['--ph' as any]: '#3a2a1a' }} aria-hidden="true">
              <span className="placeholder-label">{movie.title.toUpperCase()} · BACKDROP</span>
            </div>
          )}
          {numStr && <span className="film-card-num t-meta">№{numStr}</span>}
          {/* hover overlay */}
          <div className="film-card-overlay">
            <div className="film-card-overlay-actions">
              <Link to={`/watch/${movie.id}`} className="film-card-play" onClick={(e) => e.stopPropagation()} aria-label="Play trailer">
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5 12 7 3 12.5z" fill="currentColor" /></svg>
              </Link>
              <button type="button" className="film-card-add" onClick={toggleListItem} aria-label={onList() ? 'Remove from list' : 'Add to list'}>
                {onList() ? (
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="film-card-info">
          <div className="film-card-row">
            <span className="film-card-title">
              <em>{movie.title}</em>
            </span>
            <span className="t-meta film-card-year">{movie.year}</span>
          </div>
          <Link
            to={`/director/${slugifyDirector(movie.director)}`}
            className="film-card-director t-meta"
            onClick={(e) => e.stopPropagation()}
          >
            {movie.director.toUpperCase()}
          </Link>
        </div>
      </div>
      {modal}
    </>
  );
};

export default MovieDetail;
