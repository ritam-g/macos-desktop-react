import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'
function Resume({ windowname, windowBox, setwindowBox, zIndex, onFocus, onMinimize, minimized }) {
  return (
    <MacWindow windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox} zIndex={zIndex} onFocus={onFocus} onMinimize={onMinimize} minimized={minimized}>
      <div className="resume">
        <iframe src="/resume.pdf" />
      </div>
    </MacWindow>

  )
}

export default Resume
