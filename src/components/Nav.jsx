import React from 'react'
import "./Nav.scss"
import DateTime from './DateTime'
function Nav() {
  return (
    <nav className='Nav'>
        <div className="left">
            <div className="apple-icon">
                <img  src="/navbar-icons/apple.svg" alt="img" />
            </div>
            <div className="nav-item">
                <p>Ritam Maty</p>
            </div>
            
            <div className="nav-item">
                <p>File</p>
            </div>
            
            <div className="nav-item">
                <p>window</p> 
            </div>
            <div className="nav-item">
                <p>terminal</p> 
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
