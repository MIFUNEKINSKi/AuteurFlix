import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import BrowseFooter from '../browse/browse_footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk, fetchMovies } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirectors } from '../../util/movie_api_util';
import type { DirectorSummary } from '../../types';

const countryCode = (name: string): string => {
  const map: Record<string, string> = {
    'Japan': 'JPN', 'France': 'FRA', 'United States': 'USA', 'USA': 'USA',
    'Italy': 'ITA', 'Sweden': 'SWE', 'Germany': 'DEU', 'Austria': 'AUT',
    'Soviet Union': 'URS', 'Hong Kong': 'HKG', 'Spain': 'ESP', 'España': 'ESP',
    'Denmark': 'DNK', 'Poland': 'POL', 'United Kingdom': 'GBR', 'England': 'GBR',
    'Scotland': 'SCT', 'South Korea': 'KOR',
  };
  return map[name] ?? name.slice(0, 3).toUpperCase();
};

const CinemasPage: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorSummary[]>([]);
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  useEffect(() => {
    dispatch(fetchMovies());
    fetchDirectors().then(setDirectors).catch(() => {});
  }, [dispatch]);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());

  const countries = useMemo(() => {
    if (directors.length === 0) return [];
    const dirCountry = new Map<string, string>();
    directors.forEach((d) => { if (d.country) dirCountry.set(d.name, d.country); });
    const buckets = new Map<string, { count: number; directors: Set<string> }>();
    Object.values(movies).forEach((m) => {
      const c = dirCountry.get(m.director);
      if (!c) return;
      const entry = buckets.get(c) ?? { count: 0, directors: new Set<string>() };
      entry.count += 1;
      entry.directors.add(m.director);
      buckets.set(c, entry);
    });
    return Array.from(buckets.entries())
      .sort(([, a], [, b]) => b.count - a.count)
      .map(([country, info]) => ({ country, count: info.count, directors: Array.from(info.directors) }));
  }, [movies, directors]);

  if (!currentProfileId) return <Navigate to="/browse" replace />;

  const totalFilms = countries.reduce((s, c) => s + c.count, 0);

  return (
    <main className="collection-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <header className="collection-page-head">
        <span className="t-eyebrow">The Collection</span>
        <h1 className="t-display collection-page-title"><em>National cinema.</em></h1>
        <p className="collection-page-sub">
          {countries.length} cinemas. {totalFilms} films. Pick a country to see every
          auteur in catalog working in that tradition.
        </p>
      </header>

      <section className="collection-grid">
        {countries.map((c, i) => (
          <Link key={c.country} to="/directors" className="collection-tile">
            <span className="collection-tile-num t-meta">№{String(i + 1).padStart(2, '0')} · {countryCode(c.country)}</span>
            <h2 className="collection-tile-title"><em>{c.country}</em></h2>
            <p className="t-meta" style={{ color: 'var(--bone-2)', margin: 0, lineHeight: 1.55 }}>
              {c.directors.length} auteur{c.directors.length === 1 ? '' : 's'} · {c.count} films
            </p>
            <span className="collection-tile-foot t-meta">Browse →</span>
          </Link>
        ))}
      </section>

      <BrowseFooter />
    </main>
  );
};

export default CinemasPage;
