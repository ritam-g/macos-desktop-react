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
import ContextMenu from './components/ContextMenu'
import Spotlight from './components/Spotlight'

const wallpapers = [
  'mac-wallpaper.jpg',
  'mac1.jpg',
  'mac2.jpg',
  'mac3.jpg',
  'mac4.jpg',
  'mac5.jpg',
]

import BootScreen from './components/BootScreen'

function App() {
  const [booting, setBooting] = useState(true)
  const [windowBox, setwindowBox] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    cli: false,
    calculator: false
  })

  // Minimized state
  const [minimizedWindows, setMinimizedWindows] = useState({
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



  const [spotlightOpen, setSpotlightOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSpotlightOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSpotlightLaunch = (appId) => {
    // Check if the app exists in windowBox state
    if (windowBox.hasOwnProperty(appId)) {
      if (minimizedWindows[appId]) {
        restoreWindow(appId)
      } else {
        setwindowBox(prev => ({ ...prev, [appId]: true }))
        focusWindow(appId)
      }
    }
  }

  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 })

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    })
  }

  const contextActions = {
    newFolder: () => alert('New Folder created (Mock)'),
    getInfo: () => alert('macOS Desktop React\nVersion 1.0.0\nDeveloper: Ritam Maty'),
    changeWallpaper: () => setBgIndex(prev => (prev + 1) % wallpapers.length)
  }

  const toggleMinimize = (name) => {
    setMinimizedWindows(prev => ({ ...prev, [name]: !prev[name] }))
  }

  // Modified to restore if minimized
  const restoreWindow = (name) => {
    setMinimizedWindows(prev => ({ ...prev, [name]: false }))
    focusWindow(name)
  }

  // Restore background rotation but maybe slower (10s)
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % wallpapers.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (booting) {
    return <BootScreen onComplete={() => setBooting(false)} />
  }

  return (
    <main
      style={{
        backgroundImage: `url("${wallpapers[bgIndex]}")`
      }}
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu({ ...contextMenu, visible: false })}
    >
      <ContextMenu
        {...contextMenu}
        onClose={() => setContextMenu({ ...contextMenu, visible: false })}
        actions={contextActions}
      />
      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        onLaunch={handleSpotlightLaunch}
      />
      <Nav windowBox={windowBox} setwindowBox={setwindowBox} focusWindow={restoreWindow} />
      <Dock
        windowBox={windowBox}
        setwindowBox={setwindowBox}
        focusWindow={restoreWindow}
        minimizedWindows={minimizedWindows}
        toggleMinimize={toggleMinimize}
      />

      {windowBox.github && (
        <Github
          windowname="github"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.github}
          onFocus={() => restoreWindow('github')}
          minimized={minimizedWindows.github}
          onMinimize={() => toggleMinimize('github')}
        />
      )}

      {windowBox.note && (
        <Note
          windowname="note"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.note}
          onFocus={() => restoreWindow('note')}
          minimized={minimizedWindows.note}
          onMinimize={() => toggleMinimize('note')}
        />
      )}

      {windowBox.resume && (
        <Resume
          windowname="resume"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.resume}
          onFocus={() => restoreWindow('resume')}
          minimized={minimizedWindows.resume}
          onMinimize={() => toggleMinimize('resume')}
        />
      )}

      {windowBox.spotify && (
        <Spotify
          windowname="spotify"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.spotify}
          onFocus={() => restoreWindow('spotify')}
          minimized={minimizedWindows.spotify}
          onMinimize={() => toggleMinimize('spotify')}
        />
      )}

      {windowBox.cli && (
        <Cli
          windowname="cli"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.cli}
          onFocus={() => restoreWindow('cli')}
          minimized={minimizedWindows.cli}
          onMinimize={() => toggleMinimize('cli')}
        />
      )}

      {windowBox.calculator && (
        <Calculator
          windowname="calculator"
          windowBox={windowBox}
          setwindowBox={setwindowBox}
          zIndex={zIndices.calculator}
          onFocus={() => restoreWindow('calculator')}
          minimized={minimizedWindows.calculator}
          onMinimize={() => toggleMinimize('calculator')}
        />
      )}

      <div className="desktop-icons-container">
        <DesktopIcon
          name="Macintosh HD"
          icon="image.png"
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
