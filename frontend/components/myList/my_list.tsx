import React from 'react';
import BrowseHeader from '../browse/browse_header';
import BrowseFooter from '../browse/browse_footer';
import MovieDetail from '../browse/movie_detail';
import { Link } from 'react-router-dom';
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

  return (
    <main className="collection-page my-list-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <header className="collection-page-head">
        <span className="t-eyebrow">Your saved</span>
        <h1 className="t-display collection-page-title"><em>My list.</em></h1>
        <p className="collection-page-sub">
          {selectedMovies.length === 0
            ? 'Nothing here yet. Browse the catalog and tap + on any film to save it.'
            : `${selectedMovies.length} ${selectedMovies.length === 1 ? 'film' : 'films'} saved across the catalog.`}
        </p>
      </header>

      {selectedMovies.length === 0 ? (
        <div className="my-list-empty">
          <Link to="/browse" className="btn btn-accent">Find something to watch →</Link>
        </div>
      ) : (
        <section className="filmography-grid my-list-grid">
          {selectedMovies.map((m, i) => (
            <MovieDetail
              key={m.id}
              movie={m}
              tags={tags}
              genres={genres}
              myList={myList}
              currentProfileId={currentProfileId}
              createListItem={handleCreateListItem}
              deleteListItem={handleDeleteListItem}
              index={i + 1}
            />
          ))}
        </section>
      )}

      <BrowseFooter />
    </main>
  );
};

export default MyList;
