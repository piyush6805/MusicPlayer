import { createContext, useState, useContext, useEffect } from 'react';

const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    // Load playlist from localStorage when app starts
    const savedPlaylist = localStorage.getItem('musicly-playlist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }
  }, []);

  const searchSongs = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(`https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.success && data.data.results) {
        setSearchResults(data.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching songs:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = (shuffle = false) => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      if (currentIndex > -1) {
        let nextIndex;
        if (shuffle) {
          // Get random index excluding current song
          nextIndex = Math.floor(Math.random() * (playlist.length - 1));
          if (nextIndex >= currentIndex) nextIndex += 1;
        } else {
          nextIndex = (currentIndex + 1) % playlist.length;
        }
        playSong(playlist[nextIndex]);
      }
    }
  };

  const prevSong = () => {
    if (playlist.length > 0 && currentSong) {
      const currentIndex = playlist.findIndex(song => song.id === currentSong.id);
      if (currentIndex > -1) {
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        playSong(playlist[prevIndex]);
      }
    }
  };

  const addToPlaylist = (song) => {
    if (!playlist.find(s => s.id === song.id)) {
      const newPlaylist = [...playlist, song];
      setPlaylist(newPlaylist);
      localStorage.setItem('musicly-playlist', JSON.stringify(newPlaylist));
    }
  };

  const removeFromPlaylist = (songId) => {
    const newPlaylist = playlist.filter(song => song.id !== songId);
    setPlaylist(newPlaylist);
    localStorage.setItem('musicly-playlist', JSON.stringify(newPlaylist));
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    localStorage.removeItem('musicly-playlist');
  };

  const value = {
    searchResults,
    currentSong,
    isPlaying,
    loading,
    playlist,
    searchSongs,
    playSong,
    togglePlay,
    nextSong,
    prevSong,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}