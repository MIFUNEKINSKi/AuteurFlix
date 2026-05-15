import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoURL, avatarURL } from '../../assets';

interface Props {
  logout: () => void;
  resetProfile: () => void;
  searchTitles?: (query: string) => void;
  searchGenres?: (query: string) => void;
}

const BrowseHeader: React.FC<Props> = ({ logout, resetProfile, searchTitles, searchGenres }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(location.pathname.startsWith('/search'));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSwitch = () => { resetProfile(); navigate('/browse'); };
  const handleManage = () => { resetProfile(); navigate('/manageprofiles'); };

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    searchTitles?.(e.currentTarget.value);
    searchGenres?.(e.currentTarget.value);
  };

  const openSearch = () => { navigate('/search'); setSearching(true); };
  const closeSearch = () => {
    setSearch('');
    if (location.pathname.startsWith('/search')) navigate('/browse');
    setSearching(false);
  };

  const activeFor = (paths: string[]) =>
    paths.some((p) => p === '/browse' ? location.pathname === '/browse' : location.pathname.startsWith(p));

  const SearchIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );

  const searchControl = searching ? (
    <div className="search-bar">
      <span className="search-bar-icon">{SearchIcon}</span>
      <input autoFocus className="search-input" type="text" value={search} onChange={update} aria-label="Search" placeholder="Title, Director, Keyword" />
      <button type="button" className="exit-search" onClick={closeSearch} aria-label="Close search">
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 2l8 8M10 2 2 10" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
    </div>
  ) : (
    <button type="button" className="icon-btn" onClick={openSearch} aria-label="Search">
      {SearchIcon}
    </button>
  );

  return (
    <header className={`af-header ${scrolled ? 'solid' : ''}`}>
      <div className="af-header-inner">
        <Link to="/browse" className="wordmark" aria-label="AuteurFlix">
          <span className="wordmark-a">A</span>
          <span className="wordmark-rest">UTEUR</span>
          <span className="wordmark-flix">/flix</span>
        </Link>

        <nav className="af-nav">
          <Link to="/browse" className={`af-nav-item ${activeFor(['/browse']) && location.pathname === '/browse' ? 'active' : ''}`}>Home</Link>
          <Link to="/directors" className={`af-nav-item ${activeFor(['/directors', '/director']) ? 'active' : ''}`}>Auteurs</Link>
          <Link to="/cinemas" className={`af-nav-item ${activeFor(['/cinemas']) ? 'active' : ''}`}>Cinemas</Link>
          <Link to="/decades" className={`af-nav-item ${activeFor(['/decades']) ? 'active' : ''}`}>Decades</Link>
          <Link to="/browse/my-list" className={`af-nav-item ${activeFor(['/browse/my-list']) ? 'active' : ''}`}>My List</Link>
        </nav>

        <div className="af-header-actions">
          {searchControl}
          <div className="profiles-dropdown">
            <button type="button" className="profile-chip" aria-label="Profile">
              <img id="profiles-avatar" src={avatarURL} alt="" />
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <path d="M1 3l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" />
              </svg>
            </button>
            <div className="profiles-dropdown-content">
              <p onClick={handleSwitch}>Switch Profiles</p>
              <p onClick={handleManage}>Manage Profiles</p>
              <p onClick={() => { logout(); navigate('/'); }}>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BrowseHeader;
