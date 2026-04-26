import React, { useState } from 'react';

interface QA {
  q: string;
  a: React.ReactNode;
}

const FAQS: QA[] = [
  {
    q: 'What is AuteurFlix?',
    a: (
      <>
        A Netflix-style interface for browsing the work of acclaimed
        directors — Kurosawa, Bergman, Lynch, Bong Joon-ho, and 27 more —
        with their full filmography, poster art, and trailers in one place.
        Built as a portfolio piece, free to use, no subscription.
      </>
    ),
  },
  {
    q: 'Where do the films and trailers come from?',
    a: (
      <>
        Metadata, posters, and backdrops come from the The Movie Database
        (TMDB) public API. Trailers are official YouTube uploads keyed via
        TMDB's <code>/movie/&#123;id&#125;/videos</code> endpoint. AuteurFlix
        doesn't host or stream the films themselves.
      </>
    ),
  },
  {
    q: 'Can I watch full movies?',
    a: (
      <>
        No — the "Play" button shows the official trailer. To find a place to
        watch the actual film, click through to TMDB or your usual rental
        service. The point of AuteurFlix is discovery, not streaming.
      </>
    ),
  },
  {
    q: 'How do I add my own films or directors?',
    a: (
      <>
        The catalog is grown via a single rake task:{' '}
        <code>tmdb:ingest_director[Director Name]</code>. Anyone with the
        repo and a TMDB API key can run it locally. See the README for the
        full workflow.
      </>
    ),
  },
  {
    q: 'Is there a real signup, or just the demo?',
    a: (
      <>
        The "Try the Demo" button is the easy path — it logs you straight
        into a shared profile with a few films pre-saved to My List. The
        email signup creates a real account scoped to your inbox, but for
        kicking the tires the demo is enough.
      </>
    ),
  },
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="splash-faq">
      <h2 className="splash-faq-title">Frequently Asked Questions</h2>
      <div className="splash-faq-list">
        {FAQS.map((qa, i) => {
          const open = openIdx === i;
          return (
            <button
              key={qa.q}
              type="button"
              className={`splash-faq-item ${open ? 'open' : ''}`}
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
            >
              <span className="splash-faq-q">
                <span>{qa.q}</span>
                <span className="splash-faq-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
              </span>
              <span className="splash-faq-a">{qa.a}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
