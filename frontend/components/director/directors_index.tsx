import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirectors } from '../../util/movie_api_util';
import type { DirectorSummary } from '../../types';

const monogram = (name: string): string => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  return parts[parts.length - 1]!.slice(0, 3).toUpperCase();
};

const hueFor = (name: string): number => {
  let h = 0;
  for (let i = 0; i < name.length; i += 1) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % 360;
};

const placeholderStyle = (name: string): React.CSSProperties => {
  const h = hueFor(name);
  return {
    background: `linear-gradient(135deg, hsl(${h}deg 35% 28%) 0%, hsl(${(h + 40) % 360}deg 30% 14%) 100%)`,
  };
};

const DirectorsIndex: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorSummary[] | null>(null);
  const dispatch = useAppDispatch();
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());

  useEffect(() => {
    fetchDirectors().then(setDirectors).catch(() => setDirectors([]));
  }, []);

  if (!currentProfileId) return <Navigate to="/browse" replace />;

  return (
    <div className="directors-index-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <section className="directors-index-hero">
        <p className="directors-index-eyebrow">All Auteurs</p>
        <h1 className="directors-index-title">Browse by Director</h1>
        <p className="directors-index-sub">
          AuteurFlix is organized around the people who make the films. Pick a
          director below to see their bio and every one of their films we have.
        </p>
      </section>

      {directors === null ? (
        <div className="browse-loading">Loading directors…</div>
      ) : directors.length === 0 ? (
        <div className="browse-loading">No directors yet.</div>
      ) : (
        <div className="directors-grid">
          {directors.map((d) => (
            <Link key={d.id} to={`/director/${d.slug}`} className="directors-grid-card">
              <div className="directors-grid-portrait">
                {d.portraitUrl ? (
                  <img src={d.portraitUrl} alt={d.name} loading="lazy" />
                ) : (
                  <div
                    className="directors-grid-placeholder"
                    style={placeholderStyle(d.name)}
                    aria-hidden="true"
                  >
                    <span>{monogram(d.name)}</span>
                  </div>
                )}
              </div>
              <p className="directors-grid-name">{d.name}</p>
              <p className="directors-grid-meta">
                {d.country ? <span>{d.country}</span> : null}
                {d.country ? <span className="dot">·</span> : null}
                <span>{d.filmCount} {d.filmCount === 1 ? 'film' : 'films'}</span>
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DirectorsIndex;
