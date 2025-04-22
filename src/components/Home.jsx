import { useEffect, useState } from 'react';
import { useMusic } from './MusicContext';
import { Link } from 'react-router-dom';
import './Home.css';

// const FEATURED_ARTISTS = [
//   {
//     name: 'Arijit Singh',
//     image: 'https://c.saavncdn.com/artists/Arijit_Singh_500x500.jpg'
//   },
//   {
//     name: 'A R Rahman',
//     image: 'https://c.saavncdn.com/artists/A.R._Rahman_500x500.jpg'
//   },
//   {
//     name: 'Shreya Ghoshal',
//     image: 'https://c.saavncdn.com/artists/Shreya_Ghoshal_003_20200310073153_500x500.jpg'
//   },
//   {
//     name: 'Atif Aslam',
//     image: 'https://c.saavncdn.com/artists/Atif_Aslam_500x500.jpg'
//   },
//   {
//     name: 'Neha Kakkar',
//     image: 'https://c.saavncdn.com/artists/Neha_Kakkar_006_20200822042626_500x500.jpg'
//   },
//   {
//     name: 'Pritam',
//     image: 'https://c.saavncdn.com/artists/Pritam_Chakraborty_500x500.jpg'
//   },
//   {
//     name: 'Jubin Nautiyal',
//     image: 'https://c.saavncdn.com/artists/Jubin_Nautiyal_002_20180507091834_500x500.jpg'
//   },
//   {
//     name: 'Badshah',
//     image: 'https://c.saavncdn.com/artists/Badshah_005_20230608085916_500x500.jpg'
//   }
// ];

// const MOODS_GENRES = [
//   'Party', 'Romance', 'Hindi', 'English', 'Punjabi', 'Tamil', 
//   'Chill', 'Workout', '90s Hits', 'Devotional'
// ];

const FEATURES = [
  {
    title: "Discover Music",
    description: "Explore millions of tracks across different genres and moods",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1z"/>
      </svg>
    )
  },
  {
    title: "Create Playlists",
    description: "Build and organize your personal music collections",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
        <path d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
      </svg>
    )
  },
  {
    title: "High Quality Audio",
    description: "Experience crystal clear sound quality",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
        <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
      </svg>
    )
  }
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
          <h1 className="hero-title">Your Ultimate Music Experience</h1>
          <p className="hero-subtitle">Stream millions of songs, create playlists, and discover new music with Music_Ly. Your perfect soundtrack starts here.</p>
          <div className="hero-buttons">
            <Link to="/browse" className="hero-button primary">Start Listening</Link>
            <Link to="/playlist" className="hero-button secondary">Create Playlist</Link>
          </div>
        </div>
      </div>

      <section className="features-section">
        <div className="features-grid">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
          
      {/* <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/>
              </svg>
            </div>
            <div className="stat-number">10M+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
                <path d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
              </svg>
            </div>
            <div className="stat-number">50M+</div>
            <div className="stat-label">Songs Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z"/>
              </svg>
            </div>
            <div className="stat-number">320kbps</div>
            <div className="stat-label">Audio Quality</div>
          </div>
        </div>
      </section> */}
    </div>
  );
}