import React, { useEffect } from 'react'
import './app.scss'
import { useSelector, useDispatch } from 'react-redux'

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
import BootScreen from './components/BootScreen'

import { setBooting } from './store/features/boot/bootSlice'
import { setBgIndex, incrementBgIndex } from './store/features/wallpaper/wallpaperSlice'
import { toggleSpotlight, setSpotlightOpen } from './store/features/spotlight/spotlightSlice'
import { setContextMenu, closeContextMenu } from './store/features/contextMenu/contextMenuSlice'
import { openWindow, restoreWindow, focusWindow, toggleMinimize } from './store/features/windows/windowSlice'

const wallpapers = [
  'mac-wallpaper.jpg',
  'mac1.jpg',
  'mac2.jpg',
  'mac3.jpg',
  'mac4.jpg',
  'mac5.jpg',
]

function App() {
  const dispatch = useDispatch()

  const booting = useSelector(state => state.boot.booting)
  const bgIndex = useSelector(state => state.wallpaper.bgIndex)
  const spotlightOpen = useSelector(state => state.spotlight.isOpen)
  const contextMenu = useSelector(state => state.contextMenu)

  const windowBox = useSelector(state => state.windows.windowBox)
  const minimizedWindows = useSelector(state => state.windows.minimizedWindows)
  const zIndices = useSelector(state => state.windows.zIndices)


  // Spotlight Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        dispatch(toggleSpotlight())
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dispatch])

  const handleSpotlightLaunch = (appId) => {
    if (windowBox.hasOwnProperty(appId)) {
      dispatch(openWindow(appId));
    }
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    dispatch(setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    }))
  }

  const contextActions = {
    newFolder: () => alert('New Folder created (Mock)'),
    getInfo: () => alert('macOS Desktop React\nVersion 1.0.0\nDeveloper: Ritam Maty'),
    changeWallpaper: () => dispatch(incrementBgIndex(wallpapers.length))
  }

  // Background rotation
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementBgIndex(wallpapers.length))
    }, 10000)

    return () => clearInterval(interval)
  }, [dispatch])

  if (booting) {
    return <BootScreen onComplete={() => dispatch(setBooting(false))} />
  }

  return (
    <main
      style={{
        backgroundImage: `url("${wallpapers[bgIndex]}")`
      }}
      onContextMenu={handleContextMenu}
      onClick={() => dispatch(closeContextMenu())}
    >
      <ContextMenu
        {...contextMenu}
        onClose={() => dispatch(closeContextMenu())}
        actions={contextActions}
      />
      <Spotlight
        isOpen={spotlightOpen}
        onClose={() => dispatch(setSpotlightOpen(false))}
        onLaunch={handleSpotlightLaunch}
      />

      {/* Props removed via Redux */}
      <Nav />
      <Dock />

      {windowBox.github && (
        <Github windowname="github" />
      )}

      {windowBox.note && <Note windowname="note" />}
      {windowBox.resume && <Resume windowname="resume" />}
      {windowBox.spotify && <Spotify windowname="spotify" />}
      {windowBox.cli && <Cli windowname="cli" />}
      {windowBox.calculator && <Calculator windowname="calculator" />}

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
