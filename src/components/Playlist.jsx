import { useMusic } from './MusicContext';
import MusicPlayer from './MusicPlayer';
import { Link } from 'react-router-dom';
import './Playlist.css';

export default function Playlist() {
  const { playlist, removeFromPlaylist, clearPlaylist, playSong, currentSong } = useMusic();
  
  // Function to format song duration
  const formatDuration = (durationMs) => {
    if (!durationMs) return "0:00";
    const minutes = Math.floor(durationMs / 60);
    const seconds = Math.floor(durationMs % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate total duration of playlist
  const totalDuration = playlist.reduce((acc, song) => acc + (song.duration || 0), 0);
  const formatTotalDuration = () => {
    const minutes = Math.floor(totalDuration / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr ${remainingMinutes} min`;
    }
  };

  // Play all songs in playlist
  const playAll = () => {
    if (playlist.length > 0) {
      playSong(playlist[0]);
    }
  };

  return (
    <div className="playlist-container container-padding">
      <div className="playlist-header">
        <div className="playlist-cover">
          <svg className="playlist-cover-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        <div className="playlist-info">
          <h1 className="playlist-title">My Playlist</h1>
          <p className="playlist-subtitle">Your favorite songs, all in one place</p>
          
          <div className="playlist-stats">
            <div className="playlist-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              </svg>
              <span>Created by You</span>
            </div>
            <div className="playlist-stat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
              </svg>
              <span>{playlist.length} songs</span>
            </div>
            {playlist.length > 0 && (
              <div className="playlist-stat">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                </svg>
                <span>{formatTotalDuration()}</span>
              </div>
            )}
          </div>
          
          {playlist.length > 0 && (
            <div className="playlist-actions">
              <button 
                className="playlist-action-button primary"
                onClick={playAll}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
                Play All
              </button>
              
              <button 
                className="playlist-action-button secondary"
                onClick={clearPlaylist}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                Clear Playlist
              </button>
            </div>
          )}
        </div>
      </div>
      
      {playlist.length > 0 ? (
        <div className="playlist-content">
          <div className="playlist-section-header">
            <h2 className="playlist-section-title">Songs</h2>
          </div>
          
          <table className="playlist-table">
            <thead className="playlist-table-header">
              <tr>
                <th>#</th>
                <th></th>
                <th>Title</th>
                <th>Album</th>
                <th className="text-right">Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {playlist.map((song, index) => (
                <tr 
                  key={song.id}
                  className="playlist-row"
                  onClick={() => playSong(song)}
                  style={currentSong?.id === song.id ? { background: 'var(--color-bg-tertiary)' } : {}}
                >
                  <td className="playlist-row-number">
                    {currentSong?.id === song.id ? (
                      <div className="visualizer">
                        <div className="bar" style={{ animationDuration: '474ms' }}></div>
                        <div className="bar" style={{ animationDuration: '433ms' }}></div>
                        <div className="bar" style={{ animationDuration: '407ms' }}></div>
                      </div>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td>
                    <div className="playlist-row-image">
                      <img src={song.image[1].url} alt={song.name} />
                    </div>
                  </td>
                  <td className="playlist-row-info">
                    <div className="playlist-row-title">{song.name}</div>
                    <div className="playlist-row-artist">
                      {song.artists?.primary?.map(artist => artist.name).join(', ')}
                    </div>
                  </td>
                  <td className="playlist-row-album">{song.album?.name || 'Unknown Album'}</td>
                  <td className="playlist-row-duration">{formatDuration(song.duration)}</td>
                  <td className="playlist-row-actions">
                    <button 
                      className="playlist-row-action remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromPlaylist(song.id);
                      }}
                      title="Remove from playlist"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-playlist">
          <div className="empty-playlist-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
              <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
              <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
              <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
          <h2 className="empty-playlist-text">Your playlist is empty</h2>
          <p className="empty-playlist-subtext">Start adding songs from the Browse or Search pages</p>
          
          <Link to="/browse">
            <button className="empty-playlist-action">Discover Music</button>
          </Link>
        </div>
      )}
      
      <MusicPlayer />
    </div>
  );
}