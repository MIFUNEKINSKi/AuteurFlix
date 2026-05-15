import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import BrowseHeader from '../browse/browse_header';
import BrowseFooter from '../browse/browse_footer';
import MovieDetail from '../browse/movie_detail';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  logout as logoutThunk, createListItem, deleteListItem, fetchMovies,
} from '../../store/api';
import { resetCurrentProfile } from '../../store/sessionSlice';
import { fetchDirector } from '../../util/movie_api_util';
import type { DirectorDetail, Movie, Genre, Tag } from '../../types';

// ----- Stub helpers: derive missing editorial content from real data -----

// Deterministic palette from a hash of the director's name -- 4 swatches.
const paletteFor = (name: string): string[] => {
  let seed = 0;
  for (let i = 0; i < name.length; i += 1) seed = (seed * 31 + name.charCodeAt(i)) >>> 0;
  const base = seed % 360;
  return [
    `hsl(${base}deg 42% 28%)`,
    `hsl(${(base + 200) % 360}deg 22% 16%)`,
    `hsl(${(base + 40) % 360}deg 36% 50%)`,
    `hsl(${(base + 280) % 360}deg 28% 22%)`,
  ];
};

// Pull-quote stub: first ~120 chars of bio, broken at the first sentence end.
const stubPullQuote = (bio?: string | null): string | null => {
  if (!bio) return null;
  const trimmed = bio.trim();
  const sentenceEnd = trimmed.search(/[.!?]\s/);
  if (sentenceEnd > 40 && sentenceEnd < 200) return trimmed.slice(0, sentenceEnd + 1);
  return trimmed.slice(0, 140) + (trimmed.length > 140 ? '…' : '');
};

// Visual signature stub: derived from the most-tagged genres on this
// director's films + the genres in their catalog.
const stubSignature = (genres: Genre[]): { label: string; desc: string }[] => {
  if (genres.length === 0) {
    return [
      { label: 'Color', desc: 'Tonal palette particular to the auteur.' },
      { label: 'Time', desc: 'Pacing and duration as deliberate authorial choices.' },
      { label: 'Music', desc: 'Recurring sonic motifs across the filmography.' },
      { label: 'Frame', desc: 'Compositional grammar that recurs from film to film.' },
    ];
  }
  const top = genres.slice(0, 4);
  return top.map((g, i) => ({
    label: ['Color', 'Time', 'Music', 'Frame'][i] ?? 'Signature',
    desc: `Recurring in ${g.genre}-keyed works across the filmography.`,
  }));
};

const yearsActiveFrom = (movies: Movie[]): string => {
  if (movies.length === 0) return '—';
  const years = movies.map((m) => m.year).filter((y) => y > 0);
  if (years.length === 0) return '—';
  const min = Math.min(...years);
  const max = Math.max(...years);
  return min === max ? `${min}` : `${min}–${max}`;
};

const splitName = (name: string): [string, string] => {
  const parts = name.split(/\s+/);
  if (parts.length === 1) return ['', parts[0]];
  return [parts[0], parts.slice(1).join(' ')];
};

const monogramFor = (name: string): string => {
  const surname = name.split(/\s+/).filter(Boolean).pop() ?? name;
  return surname.slice(0, 2).toLowerCase();
};

// =====================================================================

const DirectorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [director, setDirector] = useState<DirectorDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filmoView, setFilmoView] = useState<'index' | 'grid'>('index');
  const dispatch = useAppDispatch();

  const myList = useAppSelector((state) => Object.values(state.entities.myList));
  const currentProfileId = useAppSelector((state) => state.session.profileId);

  const handleLogout = () => dispatch(logoutThunk());
  const handleResetProfile = () => dispatch(resetCurrentProfile());
  const handleCreateListItem = (args: { movieId: number; profileId: number }) => dispatch(createListItem(args));
  const handleDeleteListItem = (listId: number) => dispatch(deleteListItem(listId));

  useEffect(() => { dispatch(fetchMovies()); }, [dispatch]);

  useEffect(() => {
    if (!slug) return;
    setDirector(null);
    setError(null);
    fetchDirector(slug).then(setDirector).catch(() => setError('not_found'));
  }, [slug]);

  const movies = useMemo<Movie[]>(() => {
    if (!director) return [];
    return Object.values(director.movies).sort((a, b) => a.year - b.year);
  }, [director]);

  const genres = useMemo<Genre[]>(() => director ? Object.values(director.genres) : [], [director]);
  const tags = useMemo<Tag[]>(() => director ? Object.values(director.tags) : [], [director]);

  if (!currentProfileId) return <Navigate to="/browse" replace />;

  if (error === 'not_found') {
    return (
      <div className="director-page">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="director-empty">
          <span className="t-eyebrow">Auteur not found</span>
          <h1 className="t-section"><em>No entry under that slug.</em></h1>
          <p className="t-body t-muted">Try the <Link to="/directors" className="director-empty-link">all auteurs index</Link>.</p>
        </div>
      </div>
    );
  }

  if (!director) {
    return (
      <div className="director-page">
        <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />
        <div className="browse-loading t-meta">Loading director…</div>
      </div>
    );
  }

  const palette = paletteFor(director.name);
  const pullQuote = stubPullQuote(director.bio);
  const signature = stubSignature(genres);
  const [firstName, restName] = splitName(director.name);
  const yearsActive = yearsActiveFrom(movies);
  const lifespan = director.birthYear && director.deathYear
    ? `${director.birthYear}–${director.deathYear}`
    : director.birthYear ? `${director.birthYear}–` : '—';
  const born = director.birthYear ? `${director.birthYear}, ${director.country ?? '—'}` : director.country ?? '—';

  return (
    <main className="director-page">
      <BrowseHeader logout={handleLogout} resetProfile={handleResetProfile} />

      {/* ============= INTRO SPREAD ============= */}
      <section
        className="director-spread"
        style={{
          ['--p1' as any]: palette[0],
          ['--p2' as any]: palette[1],
          ['--p3' as any]: palette[2],
          ['--p4' as any]: palette[3],
        }}
      >
        <div className="director-stripe" aria-hidden="true">
          <span style={{ background: palette[0] }} />
          <span style={{ background: palette[1] }} />
          <span style={{ background: palette[2] }} />
          <span style={{ background: palette[3] }} />
        </div>

        <div className="director-spread-inner">
          <nav className="director-breadcrumb t-meta">
            <Link to="/directors">The Collection</Link>
            <span>/</span>
            <span>Auteur · {director.name}</span>
          </nav>

          <h1 className="t-display director-name">
            <span>{firstName}</span>
            <em>{restName || firstName}</em>
          </h1>

          <div className="director-meta-grid">
            <div>
              <div className="t-eyebrow">Born</div>
              <div className="director-meta-val">{born}</div>
            </div>
            <div>
              <div className="t-eyebrow">Based</div>
              <div className="director-meta-val">{director.country ?? '—'}</div>
            </div>
            <div>
              <div className="t-eyebrow">Active</div>
              <div className="director-meta-val">{yearsActive}</div>
            </div>
            <div>
              <div className="t-eyebrow">In catalog</div>
              <div className="director-meta-val">{movies.length} films</div>
            </div>
          </div>

          <div className="director-body">
            <aside className="director-portrait-col">
              <div className="director-portrait-large" style={{ background: palette[0] }}>
                {director.portraitUrl ? (
                  <img src={director.portraitUrl} alt={director.name} />
                ) : (
                  <span className="director-portrait-glyph">{monogramFor(director.name)}</span>
                )}
              </div>
              <div className="director-palette">
                <div className="t-eyebrow" style={{ marginBottom: 8 }}>Signature palette</div>
                <div className="director-palette-row">
                  {palette.map((c, i) => (
                    <div key={i} className="swatch">
                      <span style={{ background: c }} />
                      <em className="t-meta">{c}</em>
                    </div>
                  ))}
                </div>
                <div className="t-meta director-palette-caveat">Derived from name hash · not editorially keyed</div>
              </div>
            </aside>

            <div className="director-bio-col">
              {director.bio && (
                <p className="t-body director-bio-text">{director.bio}</p>
              )}

              {pullQuote && (
                <blockquote className="director-pullquote">
                  <span aria-hidden="true" className="pull-mark">“</span>
                  <p>{pullQuote}</p>
                  <cite className="t-meta">— Excerpt, editorial bio</cite>
                </blockquote>
              )}

              <div className="director-signature">
                <div className="t-eyebrow" style={{ marginBottom: 14 }}>Visual signature</div>
                <dl className="signature-list">
                  {signature.map((s, i) => (
                    <div key={i} className="signature-row">
                      <dt>
                        <span className="signature-num t-meta">№0{i + 1}</span>
                        <span className="signature-label">{s.label}</span>
                      </dt>
                      <dd>{s.desc}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {genres.length > 0 && (
                <div className="director-influences">
                  <div className="t-eyebrow">Genre tags</div>
                  <div className="influence-chips">
                    {genres.map((g) => (
                      <span key={g.id} className="chip">{g.genre}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============= FILMOGRAPHY ============= */}
      <section className="filmography">
        <header className="filmography-header">
          <div>
            <span className="t-eyebrow">The complete</span>
            <h2 className="t-section" style={{ marginTop: 8 }}>Filmography</h2>
            <div className="t-meta" style={{ marginTop: 10 }}>
              {movies.length} {movies.length === 1 ? 'entry' : 'entries'} · {yearsActive}
            </div>
          </div>
          <div className="filmography-toggle" role="tablist" aria-label="Filmography view">
            <button
              type="button"
              role="tab"
              aria-selected={filmoView === 'index'}
              className={filmoView === 'index' ? 'active' : ''}
              onClick={() => setFilmoView('index')}
            >Index</button>
            <button
              type="button"
              role="tab"
              aria-selected={filmoView === 'grid'}
              className={filmoView === 'grid' ? 'active' : ''}
              onClick={() => setFilmoView('grid')}
            >Grid</button>
          </div>
        </header>

        {movies.length === 0 ? (
          <p className="director-empty-films t-muted">No films on AuteurFlix yet.</p>
        ) : filmoView === 'index' ? (
          <ol className="filmography-index">
            {movies.map((f, i) => (
              <li key={f.id} className="filmography-row">
                <Link to={`/watch/${f.id}`} className="filmography-row-btn">
                  <span className="film-row-num t-meta">№{String(i + 1).padStart(2, '0')}</span>
                  <span className="film-row-year t-meta">{f.year}</span>
                  <span className="film-row-title">
                    <em>{f.title}</em>
                  </span>
                  <span className="film-row-meta t-meta">
                    {f.length ? `${Math.floor(f.length / 60)}H ${f.length % 60}M` : '—'}
                    {f.tmdbRating ? ` · ★ ${f.tmdbRating.toFixed(1)}` : ''}
                  </span>
                  <span className="film-row-open t-meta">OPEN →</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="filmography-grid">
            {movies.map((f, i) => (
              <MovieDetail
                key={f.id}
                movie={f}
                tags={tags}
                genres={genres}
                myList={myList}
                currentProfileId={currentProfileId}
                createListItem={handleCreateListItem}
                deleteListItem={handleDeleteListItem}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </section>

      <BrowseFooter />
    </main>
  );
};

export default DirectorPage;
