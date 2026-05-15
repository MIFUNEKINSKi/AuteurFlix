import React from 'react';
import { Link } from 'react-router-dom';

interface DecadeSummary { decade: number; count: number; }
interface CountrySummary { country: string; count: number; }

interface Props {
  totalDirectors: number;
  totalMovies: number;
  countries: CountrySummary[];
  decades: DecadeSummary[];
}

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

const EntryCards: React.FC<Props> = ({ totalDirectors, totalMovies, countries, decades }) => {
  const maxDecadeCount = Math.max(...decades.map((d) => d.count), 1);

  return (
    <section className="entry-section">
      <header className="entry-section-head">
        <span className="t-eyebrow">Browse the catalog</span>
        <span className="t-row">Other ways in</span>
      </header>
      <div className="entry-grid">
        <Link to="/directors" className="entry-card">
          <div className="entry-card-num t-meta">01 / 03</div>
          <div className="entry-card-title t-display"><em>All {totalDirectors} auteurs</em></div>
          <div className="entry-card-blurb">
            The full roster, alphabetical, with portrait + film count. From Bergman to Wong Kar-wai.
          </div>
          <div className="entry-card-foot t-meta">{totalDirectors} directors · {totalMovies} films →</div>
          <div className="entry-card-mosaic" aria-hidden="true">
            {['#7a1f24', '#1f3a3a', '#c98a3b', '#3a1a1f', '#8c4a3a', '#0a141c', '#3a4a3a', '#d8a455'].map((c, i) => (
              <span key={i} style={{ background: c }} />
            ))}
          </div>
        </Link>

        <Link to="/cinemas" className="entry-card">
          <div className="entry-card-num t-meta">02 / 03</div>
          <div className="entry-card-title t-display"><em>By national cinema</em></div>
          <div className="entry-card-blurb">
            {countries.length} cinemas. Sit through a New Wave, or stay one night in Tehran.
          </div>
          <div className="entry-card-foot t-meta">{countries.length} cinemas · {totalMovies} films →</div>
          <div className="entry-card-codes" aria-hidden="true">
            {countries.slice(0, 8).map((c) => (
              <span key={c.country}>{countryCode(c.country)}</span>
            ))}
          </div>
        </Link>

        <Link to="/decades" className="entry-card">
          <div className="entry-card-num t-meta">03 / 03</div>
          <div className="entry-card-title t-display"><em>By decade</em></div>
          <div className="entry-card-blurb">
            {decades.length > 0 ? `${decades[decades.length - 1].decade}s to today.` : 'Catalog by decade.'} A timeline of cinema.
          </div>
          <div className="entry-card-foot t-meta">{decades.length} decades · {totalMovies} films →</div>
          <div className="entry-card-decades" aria-hidden="true">
            {decades.map((d) => (
              <span key={d.decade}>
                <em>{d.decade}s</em>
                <i style={{ width: `${(d.count / maxDecadeCount) * 100}%` }} />
              </span>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
};

export default EntryCards;
