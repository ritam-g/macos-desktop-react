import React from 'react'
import Terminal from 'react-console-emulator'
import MacWindow from './MacWindow'
import './cli.scss'
function Cli() {
  const commands = {
    helpme: {
      description: 'About this terminal',
      fn: () =>
        'A macOS-style terminal built with React. Type `projects`, `skills`, or `contact`.'
    },

    whoami: {
      description: 'Show current user',
      fn: () => 'ritam (Frontend Developer)'
    },

    pwd: {
      description: 'Print working directory',
      fn: () => '/Users/ritam'
    },

    ls: {
      description: 'List directory contents',
      fn: () => 'projects  skills.txt  resume.pdf  contact.txt'
    },

    projects: {
      description: 'List major projects',
      fn: () =>
        `• macos-desktop-react
• portfolio-website
• react-ui-experiments`
    },

    skills: {
      description: 'Show technical skills',
      fn: () =>
        `Frontend: React, JavaScript, SCSS, Tailwind
Backend: Node.js (Basics)
Tools: Git, GitHub, Vite, Figma`
    },

    resume: {
      description: 'Open resume',
      fn: () =>
        'Resume available in the Resume window from the dock 👀'
    },

    contact: {
      description: 'Show contact information',
      fn: () =>
        `GitHub: https://github.com/ritam-g
LinkedIn: linkedin.com/in/ritam-g`
    },

    date: {
      description: 'Show current date',
      fn: () => new Date().toString()
    },

    echo: {
      description: 'Echo a passed string',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },

    
  }

  return (
    <MacWindow>
      <div className="cli-sction"></div>
      <Terminal commands={commands}
        welcomeMessage={[
          'Welcome to ritammaty-zsh',
          'macOS-style web terminal ',
          'Type `projects`, `skills`, or `contact`',
        ]}
        promptLabel={'ritammaty:~$ '}
        promptLabelStyle={{
          color: '#00ff9c',
          fontWeight: '600'
        }}
        contentStyle={{
          background: 'transparent',
          color: '#e5e5e5',
          fontFamily: 'Menlo, Monaco, monospace',
          fontSize: '13px'
        }}
        inputStyle={{
          color: '#ffffff'
        }}
        style={{
          background: 'transparent',
          height: '100%',
          padding: '10px'
        }}
      />
    </MacWindow>
  )
}

export default Cli
