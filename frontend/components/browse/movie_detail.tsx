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
  const [isClicked, setIsClicked] = useState(false);
  const timerRef = useRef<number | null>(null);

  const movieGenres = useCallback(() => {
    if (!movie?.id) return [];
    const selectedTags = tags.filter((tag) => tag.movie_id === movie.id);
    return selectedTags
      .map((tag) => genres.find((g) => g.id === tag.genre_id))
      .filter((g): g is Genre => g !== undefined);
  }, [movie, tags, genres]);

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopAll = () => {
    clearTimers();
    const videos = document.querySelectorAll<HTMLVideoElement>('.thumbnail-vid');
    videos.forEach((video) => {
      video.pause();
      video.classList.add('idle');
      (video.parentElement!.previousElementSibling as HTMLElement).classList.remove('invisible');
      (video.previousElementSibling as HTMLElement).classList.add('invisible');
      (video.nextElementSibling as HTMLElement).classList.add('invisible');
    });
  };

  const autoplay = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = e.currentTarget.children[1]?.children[1] as HTMLVideoElement;
    if (!video || typeof video.play !== 'function') return;
    video.currentTime = 0;
    timerRef.current = window.setTimeout(() => {
      video.classList.remove('idle');
      (video.nextElementSibling as HTMLElement).classList.remove('invisible');
      (video.previousElementSibling as HTMLElement).classList.remove('invisible');
      video.muted = !sound;
      video.play().catch(() => {});
    }, 1999);
  };

  const stop = (e: React.MouseEvent<HTMLDivElement>) => {
    clearTimers();
    const video = e.currentTarget.children[1]?.children[1] as HTMLVideoElement;
    if (!video || typeof video.pause !== 'function') return;
    video.pause();
    video.classList.add('idle');
    (video.parentElement!.previousElementSibling as HTMLElement).classList.remove('invisible');
    (video.previousElementSibling as HTMLElement).classList.add('invisible');
    (video.nextElementSibling as HTMLElement).classList.add('invisible');
  };

  const handleSoundOff = (e: React.MouseEvent<HTMLImageElement>) => {
    const newSound = !sound;
    setSound(newSound);
    (e.currentTarget.previousElementSibling as HTMLVideoElement).muted = !newSound;
  };

  const onList = () => myList.some((item) => item.movie_id === movie.id);

  const toggleListItem = () => {
    if (!movie?.id) return;
    if (onList()) {
      const item = myList.find((li) => li.movie_id === movie.id)!;
      deleteListItem(item.id);
    } else {
      createListItem({ movieId: movie.id, profileId: currentProfileId! });
    }
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const onEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    (e.currentTarget as HTMLElement).classList.add('idle');
    (e.currentTarget.parentElement!.previousElementSibling as HTMLElement).classList.remove('invisible');
  };

  if (!movie) return null;
  if (showModal) stopAll();

  const tagDisplay = movieGenres()
    .filter((tag) => tag?.id)
    .map((tag) => <p key={tag.id}>{tag.genre}</p>);

  const modal = showModal ? (
    <DetailsModal
      myList={myList}
      createListItem={createListItem}
      deleteListItem={deleteListItem}
      currentProfileId={currentProfileId}
      movie={movie}
      toggleModal={() => setShowModal(false)}
      soundOff={handleSoundOff}
      display={tagDisplay}
      sound={sound}
    />
  ) : null;

  const soundBtn = sound ? window.volumeOff : window.volumeOn;
  const listButton = onList() ? '✓' : '+';

  return (
    <div
      className={`list-item ${isClicked ? 'clicked' : ''} ${showModal ? 'modal-open' : ''}`}
      onMouseEnter={autoplay}
      onMouseLeave={stop}
      onClick={handleClick}
    >
      <img className="thumbnail" src={movie.thumbnailUrl} />
      <div className="details-vid-container">
        <p className="details-title invisible">{movie.title}</p>
        <video
          id={String(movie.id)}
          className="thumbnail-vid idle"
          src={movie.videoUrl}
          onEnded={onEnd}
        />
        <img src={soundBtn} className="sound-off invisible" onClick={handleSoundOff} />
      </div>
      <div className="movie-details hidden">
        <div className="details-btns">
          <div className="details-left-btns">
            <Link to={`/watch/${movie.id}`} id="details-play">&#9658;</Link>
            <button id="details-add-list" onClick={toggleListItem}>{listButton}</button>
          </div>
          <button title="More Info" onClick={() => setShowModal(true)} id="details-info-btn">
            <p>&#8964;</p>
          </button>
        </div>
        <div className="details-tags">{tagDisplay}</div>
      </div>
      {modal}
    </div>
  );
};

export default MovieDetail;
