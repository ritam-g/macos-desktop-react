import React from 'react'
import "./Dock.scss"
function Dock({ windowBox, setwindowBox, focusWindow }) {
  const openApp = (name) => {
    setwindowBox(state => ({ ...state, [name]: true }));
    focusWindow(name);
  };

  return (

    <footer className='Dock'>
      <div
        onClick={() => openApp('github')}
        className={`icon github ${windowBox.github ? 'active' : ''}`}><img src="/doc-icons/github.svg" alt="" /></div>
      <div
        onClick={() => openApp('note')}
        className={`icon note ${windowBox.note ? 'active' : ''}`}><img src="/doc-icons/note.svg" alt="" /></div>
      <div
        onClick={() => openApp('resume')}
        className={`icon pdf ${windowBox.resume ? 'active' : ''}`}><img src="/doc-icons/pdf.svg" alt="" /></div>
      <div
        onClick={() => { window.open("https://calendar.google.com/", "_blank") }}
        className="icon calender"><img src="/doc-icons/calender.svg" alt="" /></div>
      <div
        onClick={() => openApp('spotify')}
        className={`icon spotify ${windowBox.spotify ? 'active' : ''}`}><img src="/doc-icons/spotify.svg" alt="" /></div>
      <div
        onClick={() => {
          window.open("mailto:ritammaty@gmail.com", "_blank")
        }}
        className="icon mail"><img src="/doc-icons/mail.svg" alt="" /></div>
      <div
        onClick={() => {
          window.open("https://www.linkedin.com/in/ritammaty/", "_blank")
        }}
        className="icon link"><img src="/doc-icons/link.svg" alt="" /></div>
      <div
        onClick={() => openApp('cli')}
        className={`icon cli ${windowBox.cli ? 'active' : ''}`}><img src="/doc-icons/cli.svg" alt="" /></div>
      <div
        onClick={() => openApp('calculator')}
        className={`icon calculator ${windowBox.calculator ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
