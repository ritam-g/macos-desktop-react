import React from 'react'
import './DesktopIcon.scss'
import useTapAction from '../hooks/useTapAction'

function DesktopIcon({ name, icon, onClick }) {
    const tapHandlers = useTapAction(onClick)

    return (
        <div className="desktop-icon" role="button" tabIndex={0} {...tapHandlers}>
            <div className="icon-wrapper">
                <img src={icon} alt={name} />
            </div>
            <span className="icon-name">{name}</span>
        </div>
    )
}

export default DesktopIcon
