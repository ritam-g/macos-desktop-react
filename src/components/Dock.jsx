import React from 'react'
import "./Dock.scss"
function Dock({ windowBox, setwindowBox, focusWindow, minimizedWindows, toggleMinimize }) {
  const openApp = (name) => {
    if (windowBox[name]) {
      // If open
      if (minimizedWindows && minimizedWindows[name]) {
        // If minimized, restore it
        focusWindow(name);
      } else {
        // If visible, minimizing or focusing? 
        // macOS logic: if focused, minimize? Or just focus? 
        // Let's toggle minimize if already open.
        toggleMinimize(name);
      }
    } else {
      // If closed, open it
      setwindowBox(state => ({ ...state, [name]: true }));
      focusWindow(name);
    }
  };

  return (

    <footer className='Dock' aria-label="Application Dock">
      <div
        onClick={() => openApp('github')}
        className={`icon github ${windowBox.github ? 'active' : ''}`}
        role="button"
        aria-label="Open GitHub Projects"
      >
        <img src="doc-icons/github.svg" alt="GitHub" />
      </div>
      <div
        onClick={() => openApp('note')}
        className={`icon note ${windowBox.note ? 'active' : ''}`}
        role="button"
        aria-label="Open Notes App"
      >
        <img src="doc-icons/note.svg" alt="Notes" />
      </div>
      <div
        onClick={() => openApp('resume')}
        className={`icon pdf ${windowBox.resume ? 'active' : ''}`}
        role="button"
        aria-label="Open Resume"
      >
        <img src="doc-icons/pdf.svg" alt="Resume" />
      </div>
      <div
        onClick={() => { window.open("https://calendar.google.com/", "_blank") }}
        className="icon calender"
        role="button"
        aria-label="Open Google Calendar"
      >
        <img src="doc-icons/calender.svg" alt="Calendar" />
      </div>
      <div
        onClick={() => openApp('spotify')}
        className={`icon spotify ${windowBox.spotify ? 'active' : ''}`}
        role="button"
        aria-label="Open Spotify"
      >
        <img src="doc-icons/spotify.svg" alt="Spotify" />
      </div>
      <div
        onClick={() => {
          window.open("mailto:ritammaty@gmail.com", "_blank")
        }}
        className="icon mail"
        role="button"
        aria-label="Send Email"
      >
        <img src="doc-icons/mail.svg" alt="Mail" />
      </div>
      <div
        onClick={() => {
          window.open("https://www.linkedin.com/in/ritammaty/", "_blank")
        }}
        className="icon link"
        role="button"
        aria-label="View LinkedIn Profile"
      >
        <img src="doc-icons/link.svg" alt="LinkedIn" />
      </div>
      <div
        onClick={() => openApp('cli')}
        className={`icon cli ${windowBox.cli ? 'active' : ''}`}
        role="button"
        aria-label="Open Terminal"
      >
        <img src="doc-icons/cli.svg" alt="Terminal" />
      </div>
      <div
        onClick={() => openApp('calculator')}
        className={`icon calculator ${windowBox.calculator ? 'active' : ''}`}
        role="button"
        aria-label="Open Calculator"
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
