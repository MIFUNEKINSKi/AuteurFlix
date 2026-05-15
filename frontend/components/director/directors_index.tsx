import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import BrowseFooter from '../browse/browse_footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirectors } from '../../util/movie_api_util';
import type { DirectorSummary } from '../../types';

const monogramFor = (name: string): string => {
  const surname = name.split(/\s+/).filter(Boolean).pop() ?? name;
  return surname.slice(0, 2).toLowerCase();
};

const paletteFor = (name: string): string => {
  let seed = 0;
  for (let i = 0; i < name.length; i += 1) seed = (seed * 31 + name.charCodeAt(i)) >>> 0;
  return `hsl(${seed % 360}deg 38% 26%)`;
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

  const sorted = (directors ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const totalFilms = (directors ?? []).reduce((s, d) => s + d.filmCount, 0);

  return (
    <main className="directors-index-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <header className="directors-index-hero">
        <span className="t-eyebrow">The Collection</span>
        <h1 className="t-display directors-index-title">
          <em>All {directors?.length ?? '—'} auteurs.</em>
        </h1>
        <p className="directors-index-sub">
          The complete roster. Alphabetical, with portrait, country, and the count of
          films in catalog. {totalFilms} films in total. Click any name to open
          their room.
        </p>
      </header>

      {directors === null ? (
        <div className="browse-loading t-meta">Loading directors…</div>
      ) : sorted.length === 0 ? (
        <div className="browse-loading t-meta">No directors yet.</div>
      ) : (
        <section className="directors-grid">
          {sorted.map((d, i) => (
            <Link key={d.id} to={`/director/${d.slug}`} className="dir-tile">
              <span className="dir-tile-num t-meta">№{String(i + 1).padStart(2, '0')}</span>
              <span className="dir-tile-portrait" style={{ background: paletteFor(d.name) }}>
                {d.portraitUrl ? (
                  <img src={d.portraitUrl} alt={d.name} loading="lazy" />
                ) : (
                  <span className="dir-tile-glyph">{monogramFor(d.name)}</span>
                )}
              </span>
              <span className="dir-tile-name">{d.name}</span>
              <span className="t-meta dir-tile-meta">
                {d.country ?? '—'} · {d.filmCount} films
              </span>
            </Link>
          ))}
        </section>
      )}

      <BrowseFooter />
    </main>
  );
};

export default DirectorsIndex;
