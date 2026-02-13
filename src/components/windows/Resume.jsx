import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'

function Resume({ windowname }) {
  return (
    <MacWindow windowname={windowname}>
      <div className="resume">
        <iframe src="/resume.pdf" title="Resume" />
      </div>
    </MacWindow>

  )
}

export default Resume
