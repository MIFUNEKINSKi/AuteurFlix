import React, { useEffect, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import BrowseFooter from '../browse/browse_footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout as logoutThunk, fetchMovies } from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';

const DecadesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.entities.movies);
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  useEffect(() => { dispatch(fetchMovies()); }, [dispatch]);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());

  const decades = useMemo(() => {
    const buckets = new Map<number, { count: number; topRated: { title: string; year: number } | null }>();
    Object.values(movies).forEach((m) => {
      if (!m.year) return;
      const decade = Math.floor(m.year / 10) * 10;
      const entry = buckets.get(decade) ?? { count: 0, topRated: null };
      entry.count += 1;
      const rating = m.tmdbRating ?? 0;
      const topRating = entry.topRated ? (Object.values(movies).find((mm) => mm.title === entry.topRated!.title)?.tmdbRating ?? 0) : -1;
      if (rating > topRating) entry.topRated = { title: m.title, year: m.year };
      buckets.set(decade, entry);
    });
    return Array.from(buckets.entries())
      .sort(([a], [b]) => b - a)
      .map(([decade, info]) => ({ decade, count: info.count, topRated: info.topRated }));
  }, [movies]);

  if (!currentProfileId) return <Navigate to="/browse" replace />;

  const totalFilms = decades.reduce((s, d) => s + d.count, 0);

  return (
    <main className="collection-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      <header className="collection-page-head">
        <span className="t-eyebrow">The Collection</span>
        <h1 className="t-display collection-page-title"><em>By decade.</em></h1>
        <p className="collection-page-sub">
          {decades.length} decades. {totalFilms} films. The 20th century into the 21st,
          one stop at a time.
        </p>
      </header>

      <section className="collection-grid">
        {decades.map((d, i) => (
          <Link key={d.decade} to="/browse" className="collection-tile">
            <span className="collection-tile-num t-meta">№{String(i + 1).padStart(2, '0')} · {d.decade}–{d.decade + 9}</span>
            <h2 className="collection-tile-title"><em>{d.decade}s</em></h2>
            <p className="t-meta" style={{ color: 'var(--bone-2)', margin: 0, lineHeight: 1.55 }}>
              {d.count} films
              {d.topRated && ` · ${d.topRated.title} (${d.topRated.year}) leads`}
            </p>
            <span className="collection-tile-foot t-meta">Browse →</span>
          </Link>
        ))}
      </section>

      <BrowseFooter />
    </main>
  );
};

export default DecadesPage;
