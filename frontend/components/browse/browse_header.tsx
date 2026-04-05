import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

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

  const handleSwitch = () => {
    resetProfile();
    if (location.pathname.startsWith('/search')) {
      navigate('/');
    } else {
      window.location.reload();
    }
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

  const oSearch = () => {
    navigate('/search');
    setSearching(true);
  };

  const finishSearch = () => {
    if (location.pathname.startsWith('/search')) {
      navigate('/browse');
    }
  };

  const filled = search === '' ? '' : 'search-filled';
  const searchImage = searching ? (
    <div className="search-bar">
      <img id="search-bar-icon" src={window.searchIcon} />
      <input autoFocus className="search-input" type="text" onChange={update} />
      <label id={filled}>Title, Keyword</label>
      <p className="exit-search" onClick={finishSearch}>X</p>
    </div>
  ) : (
    <img className="search-icon" src={window.searchIcon} onClick={oSearch} />
  );

  return (
    <div className="browse-header">
      <Link to="/" className="home-button"><img id="logo" src={window.logoURL} alt="Napflix" /></Link>
      <div className="left-nav">
        <Link to="/browse/"><p>Home</p></Link>
        <Link to="/browse/my-list"><p>My List</p></Link>
        <a href="https://github.com/MIFUNEKINSKi/AuteurFlix" target="_blank">GitHub</a>
        <a href="https://www.linkedin.com/in/chris-moore-27438989/" target="_blank">LinkedIn</a>
      </div>
      <div className="right-nav">
        {searchImage}
        <div className="profiles-dropdown">
          <div className="dropdown-btn">
            <img id="profiles-avatar" src={window.avatar} />
            <p id="profiles-arrow">Profiles</p>
          </div>
          <div className="profiles-dropdown-content">
            <p onClick={handleSwitch}>Switch Profiles</p>
            <p onClick={handleManage}>Manage Profiles</p>
            <p onClick={logout}>Sign Out of AuteurFlix</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseHeader;
