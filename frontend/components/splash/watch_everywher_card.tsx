import React from 'react';

const WatchEverywhereCard: React.FC = () => (
  <div className="card cards-below splash-feature-card splash-feature-card-reverse">
    <div className="splash-feature-icon" aria-hidden="true">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="6,4 20,12 6,20" fill="currentColor" />
      </svg>
    </div>
    <div className="cards-below-txt">
      <h1>Trailers, not feeds.</h1>
      <h2>
        No autoplay-the-next-thing rabbit holes, no algorithmic recommendations,
        no ads. Pick a director, watch their trailer, decide if you want the
        film. The whole point is to find things you didn't know you wanted.
      </h2>
    </div>
  </div>
);

export default WatchEverywhereCard;
