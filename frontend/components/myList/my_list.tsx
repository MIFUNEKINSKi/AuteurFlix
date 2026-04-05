import React from 'react';
import BrowseHeader from '../browse/browse_header';
import MovieDetail from '../browse/movie_detail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk, createListItem, deleteListItem } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';

const MyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const genres = useAppSelector((state) => Object.values(state.entities.genres));
  const tags = useAppSelector((state) => Object.values(state.entities.tags));
  const myList = useAppSelector((state) => Object.values(state.entities.myList));
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) => dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  const selectedMovies = myList
    .map((item) => movies[item.movie_id])
    .filter((m) => m !== undefined);

  const display = selectedMovies.map((movie) => (
    <MovieDetail
      myList={myList}
      currentProfileId={currentProfileId}
      createListItem={handleCreateListItem}
      deleteListItem={handleDeleteListItem}
      key={movie.id}
      movie={movie}
      tags={tags}
      genres={genres}
    />
  ));

  return (
    <div className="my-list-container">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
      <div key={currentProfileId} className="my-list-browse">
        <h1>My List</h1>
        <div className="my-list-list">{display}</div>
      </div>
    </div>
  );
};

export default MyList;
