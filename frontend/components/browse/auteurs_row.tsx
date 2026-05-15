import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDirectors } from '../../util/movie_api_util';
import type { DirectorSummary } from '../../types';

// Deterministic palette derived from director name -- not editorially curated,
// but distinct per director and stable across renders.
const paletteFor = (name: string): string[] => {
  let seed = 0;
  for (let i = 0; i < name.length; i += 1) seed = (seed * 31 + name.charCodeAt(i)) >>> 0;
  const base = seed % 360;
  return [
    `hsl(${base}deg 38% 26%)`,
    `hsl(${(base + 40) % 360}deg 30% 18%)`,
    `hsl(${(base + 90) % 360}deg 32% 38%)`,
    `hsl(${(base + 200) % 360}deg 20% 16%)`,
  ];
};

const monogramFor = (name: string): string => {
  const surname = name.split(/\s+/).filter(Boolean).pop() ?? name;
  return surname.slice(0, 2).toLowerCase();
};

const AuteursRow: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorSummary[]>([]);

  useEffect(() => {
    fetchDirectors().then(setDirectors).catch(() => setDirectors([]));
  }, []);

  if (directors.length === 0) return null;

  const featured = directors.slice(0, 8);
  const totalCount = directors.length;

  return (
    <div className="rail-section">
      <div className="genre-name auteurs-row">
        <h2 className="rail-title">
          <span className="t-eyebrow">The Collection</span>
          <span className="t-row">Featured auteurs</span>
          <Link to="/directors" className="rail-explore">All {totalCount} auteurs →</Link>
        </h2>
        <div className="rail">
          <div className="rail-scroller auteurs-scroller">
            {featured.map((d, i) => {
              const palette = paletteFor(d.name);
              return (
                <div key={d.id} className="rail-cell">
                  <Link to={`/director/${d.slug}`} className="auteur-card">
                    <div className="auteur-card-inner">
                      <div className="auteur-card-head">
                        <div className="auteur-portrait" style={{ background: palette[0] }}>
                          {d.portraitUrl ? (
                            <img src={d.portraitUrl} alt={d.name} loading="lazy" />
                          ) : (
                            <span className="auteur-portrait-glyph">{monogramFor(d.name)}</span>
                          )}
                          <span className="ring" />
                        </div>
                        <div className="auteur-card-titles">
                          <span className="auteur-card-name">{d.name}</span>
                          <span className="t-meta">
                            №{String(i + 1).padStart(2, '0')}
                            {d.country ? ` · ${d.country}` : ''}
                            {` · ${d.filmCount} films`}
                          </span>
                        </div>
                      </div>
                      <div className="auteur-palette" aria-hidden="true">
                        {palette.map((c, j) => (
                          <span key={j} style={{ background: c }} />
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuteursRow;
