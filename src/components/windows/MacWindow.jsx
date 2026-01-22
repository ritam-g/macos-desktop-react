import React from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"
function MacWindow({children,width=400,height=400,windowname, windowBox, setwindowBox}) {
  return (
    <>
    <Rnd
            default={{
                x: 100,
                y: 100,
                width: width,
                height: height,
            }}
    >
        <div className="window">
            <nav>
                <div  className="dots">
                    <div onClick={()=>{setwindowBox(state=>({...state,[windowname]:false}))}} className="dot red"></div>
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
