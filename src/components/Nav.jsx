import React from 'react'
import "./Nav.scss"
import DateTime from './DateTime'
function Nav({github,note,resume,spotify,cli, setwindowBox}) {
  return (
    <nav className='Nav'>
        <div className="left ">
            <div
            onClick={()=>{setwindowBox(github=false,note=false,resume=false,spotify=false,cli=false)}}
            className="apple-icon">
                <img  src="/navbar-icons/apple.svg" alt="img" />
            </div>
            <div 
            onClick={()=>{setwindowBox(state=>({...state, github: !state.github}))}}
            className="nav-item">
                <p>Ritam Maty</p>
            </div>
            
            <div className="nav-item">
                <p
                onClick={()=>{setwindowBox(state=>({...state,resume:!resume}))}}
                >File</p>
            </div>
            
            <div className="nav-item">
                <p
                
                >window</p> 
            </div>
            <div className="nav-item">
                <p
                onClick={()=>{setwindowBox(state=>({...state,cli:!cli}))}}
                >terminal</p> 
            </div>

        </div>
        <div className="right">
            <div className="nav-item">
                <img src="/navbar-icons/wifi.svg" alt="img" />
            </div>
            <div className="nav-item">
                <DateTime/>
            </div>
        </div>
      
    </nav>
  )
}

export default Nav
