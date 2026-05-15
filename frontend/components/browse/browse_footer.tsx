import React from 'react';
import { Link } from 'react-router-dom';

const BrowseFooter: React.FC = () => (
  <footer className="af-footer">
    <div className="af-footer-inner">
      <div className="af-footer-mark-block">
        <div className="wordmark wordmark-sm">
          <span className="wordmark-a">A</span>
          <span className="wordmark-rest">UTEUR</span>
          <span className="wordmark-flix">/flix</span>
        </div>
        <div className="t-meta">A portfolio piece. Trailers, not full films.</div>
      </div>
      <div className="af-footer-grid">
        <div>
          <div className="t-eyebrow">The Catalog</div>
          <ul>
            <li><Link to="/directors">All auteurs</Link></li>
            <li><Link to="/cinemas">By national cinema</Link></li>
            <li><Link to="/decades">By decade</Link></li>
            <li><Link to="/browse">Critics' picks</Link></li>
          </ul>
        </div>
        <div>
          <div className="t-eyebrow">About</div>
          <ul>
            <li>Discovery UI, not streaming</li>
            <li>Data via TMDB</li>
            <li>Rails 7 + React 18</li>
            <li>Colophon</li>
          </ul>
        </div>
        <div>
          <div className="t-eyebrow">Account</div>
          <ul>
            <li><Link to="/manageprofiles">Manage profiles</Link></li>
            <li><Link to="/browse/my-list">My list</Link></li>
            <li><a href="https://github.com/MIFUNEKINSKi/AuteurFlix" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="af-footer-mark t-meta">
      AUTEURFLIX · MMXXVI · A PORTFOLIO PIECE · TMDB-FED
    </div>
  </footer>
);

export default BrowseFooter;
