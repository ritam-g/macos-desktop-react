import React, { useEffect, useState } from 'react'
import './app.scss'

import Dock from './components/Dock'
import Nav from './components/Nav'
import Github from './components/windows/Github'
import Note from './components/windows/Note'
import Resume from './components/windows/Resume'
import Spotify from './components/windows/Spotify'
import Cli from './components/windows/Cli'
import Calculator from './components/windows/Calculator'
import DesktopIcon from './components/DesktopIcon'

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
    cli: false,
    calculator: false
  })

  // Track the order of focus for windows
  const [focusedWindow, setFocusedWindow] = useState(null)
  const [zIndices, setZIndices] = useState({
    github: 1,
    note: 1,
    resume: 1,
    spotify: 1,
    cli: 1,
    calculator: 1
  })

  const [bgIndex, setBgIndex] = useState(0)

  // Function to bring a window to the front
  const focusWindow = (name) => {
    if (!name) return;
    setFocusedWindow(name)
    setZIndices(prev => {
      const currentZ = prev[name] || 1;
      const maxZ = Math.max(...Object.values(prev));
      // Only update if it's not already on top or to ensure it becomes top
      return { ...prev, [name]: maxZ + 1 }
    })
  }

  // Restore background rotation but maybe slower (10s)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % wallpapers.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <main
      style={{
        backgroundImage: `url("${wallpapers[bgIndex]}")`
      }}
    >
      <Nav windowBox={windowBox} setwindowBox={setwindowBox} focusWindow={focusWindow} />
      <Dock windowBox={windowBox} setwindowBox={setwindowBox} focusWindow={focusWindow} />

      {windowBox.github && (
        <Github
          windowname="github"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.github}
          onFocus={() => focusWindow('github')}
        />
      )}

      {windowBox.note && (
        <Note
          windowname="note"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.note}
          onFocus={() => focusWindow('note')}
        />
      )}

      {windowBox.resume && (
        <Resume
          windowname="resume"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.resume}
          onFocus={() => focusWindow('resume')}
        />
      )}

      {windowBox.spotify && (
        <Spotify
          windowname="spotify"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.spotify}
          onFocus={() => focusWindow('spotify')}
        />
      )}

      {windowBox.cli && (
        <Cli
          windowname="cli"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.cli}
          onFocus={() => focusWindow('cli')}
        />
      )}

      {windowBox.calculator && (
        <Calculator
          windowname="calculator"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.calculator}
          onFocus={() => focusWindow('calculator')}
        />
      )}

      <div className="desktop-icons-container">
        <DesktopIcon
          name="Macintosh HD"
          icon="https://img.icons8.com/plasticine/100/hard-drive.png"
          onClick={() => console.log('Hard drive clicked')}
        />
        <DesktopIcon
          name="Trash"
          icon="https://img.icons8.com/plasticine/100/trash.png"
          onClick={() => console.log('Trash clicked')}
        />
      </div>

    </main>
  )
}

export default App
