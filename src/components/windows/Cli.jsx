import React from 'react'
import Terminal from 'react-console-emulator'
import MacWindow from './MacWindow'
import './cli.scss'
import { useSelector, useDispatch } from 'react-redux'
import { openWindow } from '../../store/features/windows/windowSlice'

function Cli({ windowname }) {
  const dispatch = useDispatch()
  const windowBox = useSelector(state => state.windows.windowBox)

  const commands = {


    about: {
      description: 'About me',
      fn: () =>
        `Hi 👋 I'm Ritam,
A Frontend Developer passionate about building
macOS-style UI, interactive web apps,
and clean user experiences.

Currently final-year BCA student from Bengal.`
    },

    whoami: {
      description: 'Show current user',
      fn: () => 'ritam — Frontend Developer'
    },

    pwd: {
      description: 'Print working directory',
      fn: () => '/Users/ritam'
    },

    ls: {
      description: 'List directory contents',
      fn: () => 'projects  skills.txt  resume.pdf  contact.txt  experience.txt'
    },

    cat: {
      description: 'Read a file',
      usage: 'cat <filename>',
      fn: (file) => {
        switch (file) {
          case 'skills.txt':
            return `React, JavaScript, SCSS, Tailwind
Git, GitHub, Vite, Figma`
          case 'contact.txt':
            return `GitHub: https://github.com/ritam-g
LinkedIn: linkedin.com/in/ritam-g`
          case 'experience.txt':
            return `• Built macOS Desktop UI in React
• Created multiple frontend projects
• Strong focus on UI/UX & interactions`
          default:
            return 'File not found ❌'
        }
      }
    },

    projects: {
      description: 'List major projects',
      fn: () =>
        `• macos-desktop-react
• portfolio-website
• react-ui-experiments
• figma-like-design-tool`
    },

    skills: {
      description: 'Show technical skills',
      fn: () =>
        `Frontend:
- React, JavaScript, SCSS, Tailwind

Backend:
- Node.js (Basics)

Tools:
- Git, GitHub, Vite, Figma`
    },

    experience: {
      description: 'Work & learning experience',
      fn: () =>
        `• Frontend-focused developer
• Strong in component-based architecture
• Passion for UI systems & design tools`
    },

    stats: {
      description: 'Developer stats',
      fn: () =>
        `⭐ Projects built: 10+
🧠 Daily learner
💻 Focus: Frontend + UI Engineering
🚀 Goal: Product-based company`
    },

    open: {
      description: 'Open an application',
      usage: 'open <github|resume|note|spotify>',
      fn: (app) => {
        if (!app) return 'Specify an app name'

        if (windowBox[app] !== undefined) {
          dispatch(openWindow(app))
          return `Opening ${app}... 🚀`
        }

        return 'App not found ❌'
      }
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
      description: 'Echo text',
      usage: 'echo <text>',
      fn: (...args) => args.join(' ')
    },


  }

  return (
    <MacWindow
      windowname={windowname}
    >
      <div className='cli-sction'>


        <Terminal
          commands={commands}
          welcomeMessage={[
            '┌──────────────────────────────┐',
            '│  Welcome to Ritam’s Portfolio │',
            '│  macOS-style Web Terminal    │',
            '└──────────────────────────────┘',
            'Type `help` to explore 🚀',
          ]}
          promptLabel={'ritam@portfolio:~$ '}
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
            padding: '12px'
          }}
        />
      </div>
    </MacWindow>
  )
}

export default Cli
