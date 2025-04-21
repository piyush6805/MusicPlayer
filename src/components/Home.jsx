import { useEffect, useState } from 'react';
import { useMusic } from './MusicContext';
import MusicPlayer from './MusicPlayer';
import './Home.css';

const FEATURED_ARTISTS = [
  {
    name: 'Arijit Singh',
    image: 'https://c.saavncdn.com/artists/Arijit_Singh_500x500.jpg'
  },
  {
    name: 'A R Rahman',
    image: 'https://c.saavncdn.com/artists/A.R._Rahman_500x500.jpg'
  },
  {
    name: 'Shreya Ghoshal',
    image: 'https://c.saavncdn.com/artists/Shreya_Ghoshal_003_20200310073153_500x500.jpg'
  },
  {
    name: 'Atif Aslam',
    image: 'https://c.saavncdn.com/artists/Atif_Aslam_500x500.jpg'
  },
  {
    name: 'Neha Kakkar',
    image: 'https://c.saavncdn.com/artists/Neha_Kakkar_006_20200822042626_500x500.jpg'
  },
  {
    name: 'Pritam',
    image: 'https://c.saavncdn.com/artists/Pritam_Chakraborty_500x500.jpg'
  },
  {
    name: 'Jubin Nautiyal',
    image: 'https://c.saavncdn.com/artists/Jubin_Nautiyal_002_20180507091834_500x500.jpg'
  },
  {
    name: 'Badshah',
    image: 'https://c.saavncdn.com/artists/Badshah_005_20230608085916_500x500.jpg'
  }
];

const MOODS_GENRES = [
  'Party', 'Romance', 'Hindi', 'English', 'Punjabi', 'Tamil', 
  'Chill', 'Workout', '90s Hits', 'Devotional'
];

export default function Home() {
  const { searchSongs, searchResults, playSong, loading } = useMusic();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);

  useEffect(() => {
    // Load trending songs on initial load
    searchSongs('New Bollywood');
  }, []);

  useEffect(() => {
    if (searchResults.length > 0) {
      // Split search results into two sections
      setTrendingSongs(searchResults.slice(0, 8));
      setNewReleases(searchResults.slice(8, 16));
    }
  }, [searchResults]);

  const handleArtistClick = (artist) => {
    searchSongs(artist.name);
  };

  const handleMoodClick = (mood) => {
    searchSongs(mood);
  };

  return (
    <div className="home-container container-padding">
      <div className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Music_Ly</h1>
          <p className="hero-subtitle">Listen to your favorite songs, create playlists, and discover new music.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Artists</h2>
        </div>
        <div className="horizontal-scroll">
          {FEATURED_ARTISTS.map((artist) => (
            <div 
              key={artist.name}
              className="artist-card"
              onClick={() => handleArtistClick(artist)}
            >
              <img 
                src={artist.image} 
                alt={artist.name}
                className="artist-image" 
              />
              <p className="artist-name">{artist.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading trending songs...</p>
          </div>
        ) : (
          <div className="horizontal-scroll">
            {trendingSongs.map((song) => (
              <div 
                key={song.id}
                className="song-card"
                onClick={() => playSong(song)}
              >
                <div className="song-image-container">
                  <img 
                    src={song.image[1].url} 
                    alt={song.name}
                    className="song-image" 
                  />
                  <div className="song-overlay">
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="song-details">
                  <h3 className="song-name">{song.name}</h3>
                  <p className="song-artist">
                    {song.artists.primary.map(artist => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">New Releases</h2>
        </div>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading new releases...</p>
          </div>
        ) : (
          <div className="horizontal-scroll">
            {newReleases.map((song) => (
              <div 
                key={song.id}
                className="song-card"
                onClick={() => playSong(song)}
              >
                <div className="song-image-container">
                  <img 
                    src={song.image[1].url} 
                    alt={song.name}
                    className="song-image" 
                  />
                  <div className="song-overlay">
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="song-details">
                  <h3 className="song-name">{song.name}</h3>
                  <p className="song-artist">
                    {song.artists.primary.map(artist => artist.name).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Moods & Genres</h2>
        </div>
        <div className="horizontal-scroll">
          {MOODS_GENRES.map((mood) => (
            <div 
              key={mood}
              className="artist-card"
              onClick={() => handleMoodClick(mood)}
              style={{ padding: '1.5rem 1rem' }}
            >
              <p className="artist-name">{mood}</p>
            </div>
          ))}
        </div>
      </section>

      <MusicPlayer />
    </div>
  );
}