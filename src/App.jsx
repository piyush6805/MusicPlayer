import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Browse from './components/Browse'
import Playlist from './components/Playlist'
import { MusicProvider } from './components/MusicContext'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <MusicProvider>
      <BrowserRouter>
        <div className="app-container">
          <NavBar />
          <main className="page-transition flex-grow">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/browse" element={<Browse/>} />
              <Route path="/playlist" element={<Playlist/>} />
            </Routes>
          </main>
          <MusicPlayer />
        </div>
      </BrowserRouter>
    </MusicProvider>
  )
}

export default App
