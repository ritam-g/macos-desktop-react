import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"

function MacWindow({ children, width = 400, height = 400, windowname, windowBox, setwindowBox, zIndex, onFocus, minimized, onMinimize }) {
    const [maximized, setMaximized] = useState(false);

    // If minimized, we hide it but keep it mounted to preserve state.
    // If maximized, we force 0,0 position and 100% size.
    const rndProps = maximized ? {
        position: { x: 0, y: 0 },
        size: { width: '100vw', height: '100vh' }, // adjust for Dock/Nav? 
        disableDragging: true,
        enableResizing: false
    } : {
        default: {
            x: 100,
            y: 100,
            width: width,
            height: height,
        }
    };

    return (
        <Rnd
            {...rndProps}
            style={{
                zIndex: zIndex,
                display: minimized ? 'none' : 'flex',
                // Add a transition if desired, but Rnd might fight it
            }}
            onDragStart={onFocus}
            onMouseDown={onFocus}
            className={maximized ? 'maximized-window' : ''}
        >
            <div className="window" onClick={onFocus} style={{ width: '100%', height: '100%' }}>
                <nav onDoubleClick={() => setMaximized(!maximized)}>
                    <div className="dots">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setwindowBox(state => ({ ...state, [windowname]: false }))
                        }} className="dot red"></div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            // Minimize logic
                            if (onMinimize) onMinimize();
                        }} className="dot yellow"></div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setMaximized(!maximized);
                        }} className="dot green"></div>

                    </div>
                    <div className="title">
                        <p>{windowname} — {maximized ? 'Fullscreen' : '80x24'}</p>
                    </div>
                </nav>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow
