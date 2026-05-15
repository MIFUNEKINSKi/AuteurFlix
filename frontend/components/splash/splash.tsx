import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/api';

const MOSAIC_TONES = [
  '#7a1f24', '#1f3a3a', '#c98a3b', '#3a1a1f', '#8c4a3a', '#0a141c',
  '#3a4a3a', '#d8a455', '#5c1a1f', '#1f2a4a', '#7a3a1f', '#3a5a3a',
  '#c5b893', '#2a1a3a', '#5a3a1a', '#7a9c8e', '#8c1f24', '#4a3a1a',
  '#1a1212', '#c84a3a', '#3a4a3a', '#0e2a2c', '#a87a3a', '#0a0a0a',
];

const SplashHeader: React.FC<{ onSignIn: () => void }> = ({ onSignIn }) => (
  <header className="splash-header">
    <div className="splash-header-inner">
      <div className="wordmark wordmark-md">
        <span className="wordmark-a">A</span>
        <span className="wordmark-rest">UTEUR</span>
        <span className="wordmark-flix">/flix</span>
      </div>
      <button type="button" className="btn btn-outline" onClick={onSignIn}>Sign in</button>
    </div>
  </header>
);

const SplashSection: React.FC<{ kicker: string; title: string; body: string }> = ({ kicker, title, body }) => (
  <section className="splash-section">
    <div className="splash-section-grid">
      <div className="t-eyebrow">{kicker}</div>
      <h2 className="t-section">{title}</h2>
      <p className="t-body splash-section-body">{body}</p>
    </div>
  </section>
);

const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: 'Can I actually watch the films?',
    a: 'No. AuteurFlix is a discovery UI. "Play" opens the official YouTube trailer for the film. For the full film, go to your favorite rights-respecting platform — Criterion Channel, Mubi, the library.' },
  { q: 'How is the catalog built?',
    a: 'From TMDB. A rake task ingests a director\'s complete filmography and pulls posters, backdrops, and YouTube trailer keys. New directors are added by name.' },
  { q: 'Why these directors?',
    a: 'A working list of acclaimed auteurs across eras and national cinemas. It is biased toward who the maker wanted to spend time with — Kurosawa, Bergman, Lynch, Bong Joon-ho, and 27 more.' },
  { q: 'Is this a real product?',
    a: 'It is a portfolio piece. The signup is one click. The stack is Rails 7 + React 18 + Postgres (Neon) on Render free-tier. First load may take ~30s while the server wakes up.' },
];

const SplashFAQ: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <section className="splash-faq">
      <div className="splash-section-grid splash-faq-head">
        <div className="t-eyebrow">Questions, asked &amp; answered</div>
        <h2 className="t-section">Plain answers.</h2>
      </div>
      <div className="faq-list">
        {FAQS.map((qa, i) => (
          <details
            key={qa.q}
            open={open === i}
            onClick={(e) => { e.preventDefault(); setOpen(open === i ? -1 : i); }}
          >
            <summary>
              <span className="t-meta">№{String(i + 1).padStart(2, '0')}</span>
              <span className="faq-q">{qa.q}</span>
              <span className="faq-mark" aria-hidden="true">{open === i ? '−' : '+'}</span>
            </summary>
            <p className="t-body faq-a">{qa.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

const SplashFooter: React.FC = () => (
  <footer className="af-footer">
    <div className="af-footer-mark t-meta splash-footer-mark">
      AUTEURFLIX · A PORTFOLIO PIECE · MMXXVI · TMDB-FED
    </div>
  </footer>
);

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDemo = () => {
    dispatch(login({ email: 'dan@gmail.com', password: 'password' }));
  };

  const handleSignIn = () => navigate('/login');

  return (
    <div className="splash">
      <SplashHeader onSignIn={handleSignIn} />

      <section className="splash-hero">
        <div className="splash-mosaic" aria-hidden="true">
          {MOSAIC_TONES.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
        <div className="splash-scrim" />
        <div className="splash-content">
          <span className="t-eyebrow">№ III · A streaming experiment</span>
          <h1 className="t-display splash-title">
            <em>The cinema</em><br />of <em>auteurs.</em>
          </h1>
          <p className="splash-blurb">
            Thirty-one directors. Four hundred and sixty-one films. Discovery
            the way a video-store clerk would shelve it — by hand, with
            opinions, organized around the people who made them.
          </p>
          <div className="splash-actions">
            <button type="button" className="btn btn-accent" onClick={handleDemo}>
              Try the demo
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
            </button>
            <span className="t-meta">No card. <Link to="/login" className="splash-signin-link">Sign in</Link> · or use dan@gmail.com / password</span>
          </div>
        </div>
        <div className="splash-mark t-meta">A · F / MMXXVI</div>
      </section>

      <SplashSection
        kicker="What this is"
        title="A discovery interface, not a streaming service."
        body="AuteurFlix is a portfolio piece built on top of TMDB and the YouTube embed API. 'Play' opens the official trailer. The catalog is real — every director's complete filmography, ingested via a rake task — but the films themselves live on their rights-holders' platforms. Think of this as the lobby card, not the projector booth."
      />

      <SplashSection
        kicker="How it's organized"
        title="By the auteur, not the algorithm."
        body="The home feed is curated, not infinite. There's a Featured Auteurs rail, a small set of editorial rows, and three doors — All Auteurs, By Cinema, By Decade — that lead to dedicated landing pages. Each director gets their own room: bio, signature palette, full filmography, and adjacent recommendations."
      />

      <SplashFAQ />

      <SplashFooter />
    </div>
  );
};

export default Splash;
