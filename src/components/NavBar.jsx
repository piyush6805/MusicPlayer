import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMusic } from './MusicContext';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchSongs } = useMusic();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchSongs(searchQuery);
      navigate('/browse');
    }
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          Music_Ly
        </Link>
        
        <div className="nav-links">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          
          <Link
            to="/browse"
            className={`nav-link ${isActive('/browse') ? 'active' : ''}`}
          >
            Discover
          </Link>
          
          <Link
            to="/playlist"
            className={`nav-link ${isActive('/playlist') ? 'active' : ''}`}
          >
            My Playlist
          </Link>
        </div>

        <div className="nav-search">
          <span className="nav-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <form onSubmit={handleSearch}>
            <input 
              type="text"
              className="nav-search-input"
              placeholder="Search for songs, artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}