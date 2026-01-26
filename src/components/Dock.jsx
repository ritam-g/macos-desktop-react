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
        className="icon github"><img src="/doc-icons/github.svg" alt="" /></div>
      <div
        onClick={() => openApp('note')}
        className="icon note"><img src="/doc-icons/note.svg" alt="" /></div>
      <div
        onClick={() => openApp('resume')}
        className="icon pdf"><img src="/doc-icons/pdf.svg" alt="" /></div>
      <div
        onClick={() => { window.open("https://calendar.google.com/", "_blank") }}
        className="icon calender"><img src="/doc-icons/calender.svg" alt="" /></div>
      <div
        onClick={() => openApp('spotify')}
        className="icon spotify"><img src="/doc-icons/spotify.svg" alt="" /></div>
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
        className="icon cli"><img src="/doc-icons/cli.svg" alt="" /></div>
    </footer>

  )
}

export default Dock
