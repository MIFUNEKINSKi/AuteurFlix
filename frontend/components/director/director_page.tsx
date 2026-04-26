import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import MovieDetail from '../browse/movie_detail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  logout as logoutThunk, createListItem, deleteListItem, fetchMovies,
} from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirector } from '../../util/movie_api_util';
import type { DirectorDetail, Movie, Genre, Tag } from '../../types';

const DirectorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [director, setDirector] = useState<DirectorDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const myList = useAppSelector((state) => Object.values(state.entities.myList));
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) =>
    dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  useEffect(() => {
    // Warm movies/genres/tags + user's myList in case the user deep-linked here.
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (!slug) return;
    setDirector(null);
    setError(null);
    fetchDirector(slug)
      .then(setDirector)
      .catch(() => setError('not_found'));
  }, [slug]);

  if (!currentProfileId) {
    return <Navigate to="/browse" replace />;
  }

  const lifespan = (d: DirectorDetail): string => {
    if (d.birthYear && d.deathYear) return `${d.birthYear}–${d.deathYear}`;
    if (d.birthYear) return `b. ${d.birthYear}`;
    return '';
  };

  const initials = (name: string): string => {
    const parts = name.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
  };

  if (error === 'not_found') {
    return (
      <div className="director-page">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="director-error">
          <h1>Director not found</h1>
          <p>We don't have a page for that director yet.</p>
        </div>
      </div>
    );
  }

  if (!director) {
    return (
      <div className="director-page">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="browse-loading">Loading director…</div>
      </div>
    );
  }

  const movies = Object.values(director.movies) as Movie[];
  const genres = Object.values(director.genres) as Genre[];
  const tags = Object.values(director.tags) as Tag[];
  const span = lifespan(director);

  return (
    <div className="director-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <section className="director-hero" aria-label={director.name}>
        <div className="director-hero-inner">
          {director.portraitUrl ? (
            <img className="director-portrait" src={director.portraitUrl} alt={director.name} />
          ) : (
            <div className="director-portrait director-portrait-placeholder" aria-hidden="true">
              <span>{initials(director.name)}</span>
            </div>
          )}
          <div className="director-hero-text">
            <p className="director-eyebrow">Auteur</p>
            <h1 className="director-name">{director.name}</h1>
            <p className="director-meta">
              {director.country ? <span>{director.country}</span> : null}
              {director.country && span ? <span className="director-dot">·</span> : null}
              {span ? <span>{span}</span> : null}
              {(director.country || span) ? <span className="director-dot">·</span> : null}
              <span>{movies.length} {movies.length === 1 ? 'film' : 'films'} on AuteurFlix</span>
            </p>
            {director.bio ? <p className="director-bio">{director.bio}</p> : null}
          </div>
        </div>
      </section>

      <section className="director-filmography">
        <h2 className="director-filmography-title">Filmography</h2>
        {movies.length === 0 ? (
          <p className="director-empty">No films on AuteurFlix yet.</p>
        ) : (
          <div className="director-films-grid">
            {movies.map((movie) => (
              <MovieDetail
                key={movie.id}
                movie={movie}
                tags={tags}
                genres={genres}
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={handleCreateListItem}
                deleteListItem={handleDeleteListItem}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DirectorPage;
