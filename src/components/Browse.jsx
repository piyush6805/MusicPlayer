import { useState } from 'react';
import { useMusic } from './MusicContext';
import MusicPlayer from './MusicPlayer';
import './Browse.css';

export default function Browse() {
  const [query, setQuery] = useState('');
  const { searchSongs, searchResults, loading, playSong, addToPlaylist } = useMusic();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchSongs(query);
    }
  };

  // Function to format song duration
  const formatDuration = (durationMs) => {
    if (!durationMs) return "0:00";
    const minutes = Math.floor(durationMs / 60);
    const seconds = Math.floor(durationMs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="browse-container container-padding">
      <div className="browse-header">
        <h1 className="browse-title">Discover Music</h1>
        <p className="browse-subtitle">Search for your favorite songs, artists, or albums</p>
      </div>
      
      <div className="search-box">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="search-input"
          />
          <button 
            type="submit"
            className="search-button"
          >
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Searching for music...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="search-results">
          <div className="results-header">
            <h2 className="results-title">
              Search Results 
              <span className="results-count">{searchResults.length}</span>
            </h2>
          </div>
          
          <div className="song-list">
            {searchResults.map((song, index) => (
              <div key={song.id} className="song-row">
                <div className="song-number">{index + 1}</div>
                <div className="song-row-image">
                  <img 
                    src={song.image[1].url} 
                    alt={song.name}
                  />
                </div>
                <div className="song-info">
                  <h3 className="song-row-name">{song.name}</h3>
                  <p className="song-row-artist">
                    {song.artists.primary.map(artist => artist.name).join(', ')}
                  </p>
                </div>
                <div className="song-album">{song.album?.name || 'Unknown Album'}</div>
                <div className="song-duration">{formatDuration(song.duration)}</div>
                <div className="song-actions">
                  <button
                    onClick={() => playSong(song)}
                    className="song-action-button song-action-play"
                    title="Play"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => addToPlaylist(song)}
                    className="song-action-button"
                    title="Add to Playlist"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : query.trim() !== '' && (
        <div className="empty-results">
          <h3>No results found</h3>
          <p>Try different keywords or check your spelling</p>
        </div>
      )}

      <MusicPlayer />
    </div>
  );
}