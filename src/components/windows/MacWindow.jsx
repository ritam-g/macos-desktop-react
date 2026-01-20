import React from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"
function MacWindow({children}) {
  return (
    <>
    <Rnd
            default={{
                x: 100,
                y: 100,
                width: 400,
                height: 300
            }}
    >
        <div className="window">
            <nav>
                <div className="dots">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>

                </div>
                <div className="title">
                    <p>ritammaty -zsh — 80x24</p>
                </div>
            </nav>
            <div className="main-content">
                {children}
            </div>
        </div>
     </Rnd>
</>
  )
}

export default MacWindow
