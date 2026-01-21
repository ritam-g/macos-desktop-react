import React from 'react'
import Terminal from 'react-console-emulator'
import MacWindow from './MacWindow'

function Cli() {
  const commands = {
    echo: {
      description: 'Echo a passed string',
      usage: 'echo <string>',
      fn: (...args) => args.join(' ')
    },
    whoami: {
      description: 'Show current user',
      fn: () => 'ritam'
    },
    helpme: {
      description: 'About this terminal',
      fn: () => 'This is a macOS-style web terminal built with React.'
    }
  }

  return (
    <MacWindow>
      <Terminal
        commands={commands}
        welcomeMessage={[
          'Welcome to ritammaty-zsh',
          'Type `help` to see available commands',
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
