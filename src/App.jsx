import React, { useEffect, useRef } from 'react'
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
import { incrementBgIndex } from './store/features/wallpaper/wallpaperSlice'
import { toggleSpotlight, setSpotlightOpen } from './store/features/spotlight/spotlightSlice'
import { setContextMenu, closeContextMenu } from './store/features/contextMenu/contextMenuSlice'
import { openWindow } from './store/features/windows/windowSlice'
import { setViewportState } from './store/features/responsive/responsiveSlice'

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
  const longPressTimerRef = useRef(null)
  const suppressNextClickRef = useRef(false)

  const booting = useSelector(state => state.boot.booting)
  const bgIndex = useSelector(state => state.wallpaper.bgIndex)
  const spotlightOpen = useSelector(state => state.spotlight.isOpen)
  const contextMenu = useSelector(state => state.contextMenu)
  const isMobile = useSelector(state => state.responsive.isMobile)
  const viewportWidth = useSelector(state => state.responsive.viewportWidth)
  const viewportHeight = useSelector(state => state.responsive.viewportHeight)

  const windowBox = useSelector(state => state.windows.windowBox)


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

  useEffect(() => () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current)
    }
  }, [])

  // MOBILE ADAPTATION START
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      dispatch(setViewportState({
        isMobile: width < 768,
        viewportWidth: width,
        viewportHeight: height,
      }))
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    window.addEventListener('orientationchange', updateViewport)

    return () => {
      window.removeEventListener('resize', updateViewport)
      window.removeEventListener('orientationchange', updateViewport)
    }
  }, [dispatch])
  // MOBILE ADAPTATION END

  const handleSpotlightLaunch = (appId) => {
    if (Object.prototype.hasOwnProperty.call(windowBox, appId)) {
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
    changeWallpaper: () => dispatch(incrementBgIndex(wallpapers.length)),
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

  const handleTouchStart = (e) => {
    if (!isMobile) return

    const touch = e.touches?.[0]
    if (!touch) return

    if (touch.target?.closest?.('.window, .Dock, .Nav, .spotlight-container, .context-menu, .desktop-icon')) {
      return
    }

    longPressTimerRef.current = window.setTimeout(() => {
      suppressNextClickRef.current = true
      dispatch(setContextMenu({
        visible: true,
        x: Math.min(touch.clientX, Math.max(16, viewportWidth - 220)),
        y: Math.min(touch.clientY, Math.max(16, viewportHeight - 220)),
      }))
    }, 500)
  }

  const clearLongPress = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  return (
    <main
      className={isMobile ? 'mobile-mode' : ''}
      style={{
        backgroundImage: `url("${wallpapers[bgIndex]}")`
      }}
      onContextMenu={handleContextMenu}
      onClick={() => {
        if (suppressNextClickRef.current) {
          suppressNextClickRef.current = false
          return
        }

        dispatch(closeContextMenu())
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={clearLongPress}
      onTouchEnd={clearLongPress}
      onTouchCancel={clearLongPress}
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
