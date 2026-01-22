import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'
function Resume({windowname, windowBox, setwindowBox}) {
  return (
    <MacWindow windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox}>
  <div className="resume">
    <iframe src="/resume.pdf" />
  </div>
</MacWindow>

  )
}

export default Resume
