import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"
import { useSelector, useDispatch } from 'react-redux'
import { closeWindow, focusWindow, toggleMinimize } from '../../store/features/windows/windowSlice'

function MacWindow({ children, width = 400, height = 400, windowname }) {
    const dispatch = useDispatch()
    const [maximized, setMaximized] = useState(false);

    const minimized = useSelector(state => state.windows.minimizedWindows[windowname])
    const zIndex = useSelector(state => state.windows.zIndices[windowname])

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

    const handleFocus = () => {
        dispatch(focusWindow(windowname))
    }

    return (
        <Rnd
            {...rndProps}
            style={{
                zIndex: zIndex,
                display: minimized ? 'none' : 'flex',
                // Add a transition if desired, but Rnd might fight it
            }}
            onDragStart={handleFocus}
            onMouseDown={handleFocus}
            className={maximized ? 'maximized-window' : ''}
        >
            <div className="window" onClick={handleFocus} style={{ width: '100%', height: '100%' }}>
                <nav onDoubleClick={() => setMaximized(!maximized)}>
                    <div className="dots">
                        <div onClick={(e) => {
                            e.stopPropagation();
                            dispatch(closeWindow(windowname))
                        }} className="dot red">
                            <span>x</span>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            // Minimize logic
                            dispatch(toggleMinimize(windowname))
                        }} className="dot yellow">
                            <span>-</span>
                        </div>
                        <div onClick={(e) => {
                            e.stopPropagation();
                            setMaximized(!maximized);
                        }} className="dot green">
                            <span>+</span>
                        </div>

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
