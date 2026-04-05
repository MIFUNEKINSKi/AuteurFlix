import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Movie, ListItem } from '../../types';

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
    return () => {
      document.body.classList.remove('modal-open-body');
      clearTimeout(timer);
      clearTimeout(videoTimer);
    };
  }, []);

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

  const onList = () => myList.some((item) => item.movie_id === movie.id);

  const toggleListItem = () => {
    if (onList()) {
      const item = myList.find((li) => li.movie_id === movie.id)!;
      deleteListItem(item.id);
    } else {
      createListItem({ movieId: movie.id, profileId: currentProfileId! });
    }
  };

  const onEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    (e.currentTarget as HTMLElement).classList.add('hide');
    (e.currentTarget.parentElement!.previousElementSibling as HTMLElement).classList.remove('hide');
  };

  const displayLength = convertLength(movie.length);
  const listButton = onList() ? '✓' : '+';
  const soundBtn = sound ? window.volumeOff : window.volumeOn;

  return (
    <>
      <div className="modal-backdrop" onClick={toggleModal} />
      <div className="modal">
        <button onClick={toggleModal} className="exit-modal">X</button>
        <img className="modal-thumbnail hide" src={movie.photoUrl} alt="" />
        <div className="modal-vid-container">
          <p className="modal-title">{movie.title}</p>
          <div className="modal-btns">
            <Link to={`/watch/${movie.id}`} className="modal-play">&#9658; Play</Link>
            <button id="modal-add-list" onClick={toggleListItem}>{listButton}</button>
          </div>
          <video
            id="modal-vid"
            src={movie.videoUrl}
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
              <p>{movie.year}</p>
              <p className="modal-director">{movie.director}</p>
              <p>{displayLength}</p>
            </div>
            <p>{movie.summary}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsModal;
