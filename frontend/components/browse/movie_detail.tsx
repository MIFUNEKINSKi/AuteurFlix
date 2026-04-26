import React, { useState, useRef, useCallback } from 'react';
import DetailsModal from './details_modal';
import { Link } from 'react-router-dom';
import type { Movie, Genre, Tag, ListItem } from '../../types';

interface Props {
  movie: Movie;
  tags: Tag[];
  genres: Genre[];
  myList: ListItem[];
  currentProfileId: number | null;
  createListItem: (args: { movieId: number; profileId: number }) => void;
  deleteListItem: (listId: number) => void;
}

const MovieDetail: React.FC<Props> = ({
  movie, tags, genres, myList, currentProfileId, createListItem, deleteListItem,
}) => {
  const [sound, setSound] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const movieGenres = useCallback(() => {
    if (!movie?.id) return [];
    const selectedTags = tags.filter((tag) => tag.movie_id === movie.id);
    return selectedTags
      .map((tag) => genres.find((g) => g.id === tag.genre_id))
      .filter((g): g is Genre => g !== undefined);
  }, [movie, tags, genres]);

  const handleMouseEnter = () => {
    hoverTimer.current = window.setTimeout(() => {
      setHovered(true);
      const vid = videoRef.current;
      if (vid) {
        if (!vid.src && movie.videoUrl) vid.src = movie.videoUrl;
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
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
    }
  };

  const handleSoundOff = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSound = !sound;
    setSound(newSound);
    if (videoRef.current) videoRef.current.muted = !newSound;
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

  const tagDisplay = movieGenres().map((g) => (
    <span key={g.id} className="card-genre-tag">{g.genre}</span>
  ));

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
        className={`card ${hovered ? 'card-hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-media">
          <img
            className="card-thumbnail"
            src={movie.thumbnailUrl}
            alt={movie.title}
            loading="lazy"
          />
          <video
            ref={videoRef}
            className={`card-video ${hovered ? 'playing' : ''}`}
            preload="none"
            muted
            playsInline
            onEnded={() => setHovered(false)}
          />
          {hovered && (
            <button className="card-sound-btn" onClick={handleSoundOff}>
              {sound ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 010 7.07" /><path d="M19.07 4.93a10 10 0 010 14.14" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M23 9l-6 6M17 9l6 6" />
                </svg>
              )}
            </button>
          )}
        </div>

        <div className="card-info">
          <div className="card-buttons">
            <div className="card-buttons-left">
              <Link to={`/watch/${movie.id}`} className="card-btn card-play" onClick={(e) => e.stopPropagation()} aria-label="Play">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </Link>
              <button className="card-btn card-add" onClick={toggleListItem} title={onList() ? 'Remove from List' : 'Add to List'} aria-label={onList() ? 'Remove from List' : 'Add to List'}>
                {onList() ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                )}
              </button>
            </div>
            <button className="card-btn card-expand" onClick={openModal} title="More Info" aria-label="More Info">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
          <p className="card-title">{movie.title}</p>
          <p className="card-director">
            <span>{movie.director}</span>
            <span className="card-dot">·</span>
            <span>{movie.year}</span>
          </p>
          <div className="card-meta">
            {tagDisplay}
          </div>
        </div>
      </div>
      {modal}
    </>
  );
};

export default MovieDetail;
