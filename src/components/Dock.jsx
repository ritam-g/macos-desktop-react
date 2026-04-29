import React from 'react'
import "./Dock.scss"
import { useSelector, useDispatch } from 'react-redux'
import { openWindow, toggleMinimize, restoreWindow } from '../store/features/windows/windowSlice'
import useTapAction from '../hooks/useTapAction'

function Dock() {
  const dispatch = useDispatch()
  const windowBox = useSelector(state => state.windows.windowBox)
  const minimizedWindows = useSelector(state => state.windows.minimizedWindows)

  const openApp = (name) => {
    if (windowBox[name]) {
      // If open
      if (minimizedWindows[name]) {
        // If minimized, restore it
        dispatch(restoreWindow(name));
      } else {
        // If visible, toggle minimize
        dispatch(toggleMinimize(name));
      }
    } else {
      // If closed, open it
      dispatch(openWindow(name));
    }
  };

  const githubTap = useTapAction(() => openApp('github'))
  const noteTap = useTapAction(() => openApp('note'))
  const resumeTap = useTapAction(() => openApp('resume'))
  const calendarTap = useTapAction(() => window.open("https://calendar.google.com/", "_blank"))
  const spotifyTap = useTapAction(() => openApp('spotify'))
  const mailTap = useTapAction(() => window.open("mailto:ritammaty@gmail.com", "_blank"))
  const linkedInTap = useTapAction(() => window.open("https://www.linkedin.com/in/ritammaty/", "_blank"))
  const cliTap = useTapAction(() => openApp('cli'))
  const calculatorTap = useTapAction(() => openApp('calculator'))

  return (

    <footer className='Dock' aria-label="Application Dock">
      <div
        className={`icon github ${windowBox.github ? 'active' : ''}`}
        role="button"
        aria-label="Open GitHub Projects"
        {...githubTap}
      >
        <img src="doc-icons/github.svg" alt="GitHub" />
      </div>
      <div
        className={`icon note ${windowBox.note ? 'active' : ''}`}
        role="button"
        aria-label="Open Notes App"
        {...noteTap}
      >
        <img src="doc-icons/note.svg" alt="Notes" />
      </div>
      <div
        className={`icon pdf ${windowBox.resume ? 'active' : ''}`}
        role="button"
        aria-label="Open Resume"
        {...resumeTap}
      >
        <img src="doc-icons/pdf.svg" alt="Resume" />
      </div>
      <div
        className="icon calender"
        role="button"
        aria-label="Open Google Calendar"
        {...calendarTap}
      >
        <img src="doc-icons/calender.svg" alt="Calendar" />
      </div>
      <div
        className={`icon spotify ${windowBox.spotify ? 'active' : ''}`}
        role="button"
        aria-label="Open Spotify"
        {...spotifyTap}
      >
        <img src="doc-icons/spotify.svg" alt="Spotify" />
      </div>
      <div
        className="icon mail"
        role="button"
        aria-label="Send Email"
        {...mailTap}
      >
        <img src="doc-icons/mail.svg" alt="Mail" />
      </div>
      <div
        className="icon link"
        role="button"
        aria-label="View LinkedIn Profile"
        {...linkedInTap}
      >
        <img src="doc-icons/link.svg" alt="LinkedIn" />
      </div>
      <div
        className={`icon cli ${windowBox.cli ? 'active' : ''}`}
        role="button"
        aria-label="Open Terminal"
        {...cliTap}
      >
        <img src="doc-icons/cli.svg" alt="Terminal" />
      </div>
      <div
        className={`icon calculator ${windowBox.calculator ? 'active' : ''}`}
        role="button"
        aria-label="Open Calculator"
        {...calculatorTap}
      >
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <title>Calculator Icon</title>
          <rect x="4" y="2" width="16" height="20" rx="3" fill="#ff9f0a" />
          <rect x="7" y="6" width="10" height="4" rx="1" fill="white" fillOpacity="0.3" />
          <circle cx="8" cy="13" r="1" fill="white" />
          <circle cx="12" cy="13" r="1" fill="white" />
          <circle cx="16" cy="13" r="1" fill="white" />
          <circle cx="8" cy="16" r="1" fill="white" />
          <circle cx="12" cy="16" r="1" fill="white" />
          <circle cx="16" cy="16" r="1" fill="white" />
          <circle cx="8" cy="19" r="1" fill="white" />
          <circle cx="12" cy="19" r="1" fill="white" />
          <circle cx="16" cy="19" r="1" fill="white" />
        </svg>
      </div>
    </footer>

  )
}

export default Dock
