import React from 'react'
import './DesktopIcon.scss'

function DesktopIcon({ name, icon, onClick }) {
    return (
        <div className="desktop-icon" onClick={onClick}>
            <div className="icon-wrapper">
                <img src={icon} alt={name} />
            </div>
            <span className="icon-name">{name}</span>
        </div>
    )
}

export default DesktopIcon
