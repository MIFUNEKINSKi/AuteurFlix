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
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSwitch = () => {
    resetProfile();
    navigate('/browse');
  };

  const handleManage = () => {
    resetProfile();
    navigate('/manageprofiles');
  };

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    searchTitles?.(e.currentTarget.value);
    searchGenres?.(e.currentTarget.value);
  };

  const openSearch = () => {
    navigate('/search');
    setSearching(true);
  };

  const closeSearch = () => {
    setSearch('');
    if (location.pathname.startsWith('/search')) {
      navigate('/browse');
    }
    setSearching(false);
  };

  const filled = search === '' ? '' : 'search-filled';

  const SearchIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  const searchControl = searching ? (
    <div className="search-bar">
      <span className="search-bar-icon">{SearchIcon}</span>
      <input autoFocus className="search-input" type="text" value={search} onChange={update} aria-label="Search" />
      <label id={filled}>Title, Director, Keyword</label>
      <button type="button" className="exit-search" onClick={closeSearch} aria-label="Close search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6L18 18M18 6L6 18" />
        </svg>
      </button>
    </div>
  ) : (
    <button type="button" className="search-icon-btn" onClick={openSearch} aria-label="Search">
      {SearchIcon}
    </button>
  );

  return (
    <div className={`browse-header ${scrolled ? 'browse-header-scrolled' : ''}`}>
      <Link to="/" className="home-button">
        <img id="logo" src={logoURL} alt="AuteurFlix" />
      </Link>
      <nav className="left-nav">
        <Link to="/browse/">Home</Link>
        <Link to="/browse/my-list">My List</Link>
        <a href="https://github.com/MIFUNEKINSKi/AuteurFlix" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/chris-moore-27438989/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
      <div className="right-nav">
        {searchControl}
        <div className="profiles-dropdown">
          <div className="dropdown-btn">
            <img id="profiles-avatar" src={avatarURL} alt="" />
            <span id="profiles-arrow">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
          <div className="profiles-dropdown-content">
            <p onClick={handleSwitch}>Switch Profiles</p>
            <p onClick={handleManage}>Manage Profiles</p>
            <p onClick={() => { logout(); navigate('/'); }}>Sign Out of AuteurFlix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseHeader;
