import React from 'react';

const EnjoyCard: React.FC = () => (
  <div className="card cards-below splash-feature-card splash-feature-card-reverse">
    <div className="splash-feature-icon" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <polygon points="10,8 16,10 10,12" fill="currentColor" />
      </svg>
    </div>
    <div className="cards-below-txt">
      <h1>The complete filmography.</h1>
      <h2>
        500 films across 31 directors, every trailer, every backdrop. Pulled
        from TMDB, refreshed automatically — no curation gaps, no abandoned rows.
      </h2>
    </div>
  </div>
);

export default EnjoyCard;
