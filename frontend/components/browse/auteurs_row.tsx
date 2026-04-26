import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchDirectors } from '../../util/movie_api_util';
import type { DirectorSummary } from '../../types';

// Three-letter monogram from the most distinctive surname, or first 3 letters
// of a single-word name. Distinguishes "Kubrick" (KUB) from "Kurosawa" (KUR).
const monogram = (name: string): string => {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const surname = parts[parts.length - 1]!;
  return surname.slice(0, 3).toUpperCase();
};

// Deterministic per-name hue so each director's placeholder reads as
// distinct color even before TMDB portraits load.
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

const AuteursRow: React.FC = () => {
  const [directors, setDirectors] = useState<DirectorSummary[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetchDirectors().then(setDirectors).catch(() => setDirectors([]));
  }, []);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, directors.length]);

  const scroll = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (directors.length === 0) return null;

  return (
    <div className="genre-name auteurs-row">
      <h2 className="row-title">
        <Link to="/directors" className="row-title-link">
          <span>Featured Auteurs</span>
          <span className="row-explore" aria-hidden="true">Browse all ›</span>
        </Link>
      </h2>
      <div className="carousel auteurs-carousel">
        {canScrollLeft && (
          <button
            type="button"
            className="carousel-arrow carousel-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        <div className="carousel-slider auteurs-slider" ref={sliderRef}>
          {directors.map((d) => (
            <Link key={d.id} to={`/director/${d.slug}`} className="auteur-card">
              <div className="auteur-portrait">
                {d.portraitUrl ? (
                  <img src={d.portraitUrl} alt={d.name} loading="lazy" />
                ) : (
                  <div
                    className="auteur-portrait-placeholder"
                    style={placeholderStyle(d.name)}
                    aria-hidden="true"
                  >
                    <span>{monogram(d.name)}</span>
                  </div>
                )}
              </div>
              <p className="auteur-name">{d.name}</p>
              <p className="auteur-meta">
                {d.country ? <span>{d.country}</span> : null}
                {d.country ? <span className="auteur-dot">·</span> : null}
                <span>{d.filmCount} {d.filmCount === 1 ? 'film' : 'films'}</span>
              </p>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className="carousel-arrow carousel-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AuteursRow;
