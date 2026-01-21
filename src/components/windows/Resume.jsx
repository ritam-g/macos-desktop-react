import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'
function Resume() {
  return (
    <MacWindow>
  <div className="resume">
    <iframe src="/resume.pdf" />
  </div>
</MacWindow>

  )
}

export default Resume
