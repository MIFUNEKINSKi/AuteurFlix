import React from 'react';

const KidsCard: React.FC = () => (
  <div className="card cards-below splash-feature-card">
    <div className="splash-feature-icon" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21v-1a8 8 0 0116 0v1" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="6" r="2" />
      </svg>
    </div>
    <div className="cards-below-txt">
      <h1>Browse by director, not by algorithm.</h1>
      <h2>
        Every film is grouped under the auteur who made it. Click a director
        once, see their full filmography, watch the trailers in order.
      </h2>
    </div>
  </div>
);

export default KidsCard;
