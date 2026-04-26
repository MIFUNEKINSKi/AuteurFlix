import React from 'react';

const DownloadCard: React.FC = () => (
  <div className="card cards-below splash-feature-card">
    <div className="splash-feature-icon" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h7l2 3h9v13a2 2 0 01-2 2H3z" />
        <line x1="7" y1="14" x2="17" y2="14" />
        <line x1="7" y1="18" x2="13" y2="18" />
      </svg>
    </div>
    <div className="cards-below-txt">
      <h1>Bios, portraits, lifespans.</h1>
      <h2>
        Every director gets a landing page with their photo, a one-paragraph
        bio, and the films we have. National-cinema rows group them by country
        for when you want to dig into a single tradition.
      </h2>
    </div>
  </div>
);

export default DownloadCard;
