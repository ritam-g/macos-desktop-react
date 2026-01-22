import React, { useEffect, useState } from 'react'
import './app.scss'

import Dock from './components/Dock'
import Nav from './components/Nav'
import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'

const wallpapers = [
  '/mac-wallpaper.jpg',
  '/mac1.jpg',
  '/mac2.jpg',
  '/mac3.jpg',
  '/mac4.jpg',
  '/mac5.jpg',
]

function App() {
  const [windowBox, setwindowBox] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false
  })

  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % wallpapers.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main
      style={{
        backgroundImage: `url(${wallpapers[bgIndex]})`
      }}
    >
      <Nav windowBox={windowBox} setwindowBox={setwindowBox} />
      <Dock windowBox={windowBox} setwindowBox={setwindowBox} />

      {windowBox.github && (
        <Github windowname="github" windowBox={windowBox} setwindowBox={setwindowBox} />
      )}

      {windowBox.note && (
        <Note windowname="note" windowBox={windowBox} setwindowBox={setwindowBox} />
      )}

      {windowBox.resume && (
        <Resume windowname="resume" windowBox={windowBox} setwindowBox={setwindowBox} />
      )}

      {windowBox.spotify && (
        <Spotify windowname="spotify" windowBox={windowBox} setwindowBox={setwindowBox} />
      )}

      {windowBox.cli && (
        <Cli windowname="cli" windowBox={windowBox} setwindowBox={setwindowBox} />
      )}
    </main>
  )
}

export default App
