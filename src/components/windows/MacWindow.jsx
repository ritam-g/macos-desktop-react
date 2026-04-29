import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"
import { useSelector, useDispatch } from 'react-redux'
import { closeWindow, focusWindow, toggleMinimize } from '../../store/features/windows/windowSlice'
import useTapAction from '../../hooks/useTapAction'

function MacWindow({ children, width = 400, height = 400, windowname }) {
    const dispatch = useDispatch()
    const [maximized, setMaximized] = useState(false)
    const minimized = useSelector(state => state.windows.minimizedWindows[windowname])
    const zIndex = useSelector(state => state.windows.zIndices[windowname])
    const isMobile = useSelector(state => state.responsive.isMobile)
    const viewportWidth = useSelector(state => state.responsive.viewportWidth)
    const viewportHeight = useSelector(state => state.responsive.viewportHeight)

    const handleFocus = () => {
        dispatch(focusWindow(windowname))
    }

    const handleClose = (event) => {
        event.stopPropagation()
        dispatch(closeWindow(windowname))
    }

    const handleMinimize = (event) => {
        event.stopPropagation()
        dispatch(toggleMinimize(windowname))
    }

    const handleMaximize = (event) => {
        event.stopPropagation()
        setMaximized(previous => !previous)
    }
    const closeTap = useTapAction(handleClose)
    const minimizeTap = useTapAction(handleMinimize)
    const maximizeTap = useTapAction(handleMaximize)

    // MOBILE ADAPTATION START
    const mobileWidth = Math.min(viewportWidth - 16, 720)
    const mobileHeight = Math.min(viewportHeight - 110, 760)
    const mobileX = Math.max(8, Math.round((viewportWidth - mobileWidth) / 2))
    const mobileY = Math.max(40, Math.round((viewportHeight - mobileHeight) / 2))
    const mobileLayout = isMobile
        ? {
            position: { x: mobileX, y: mobileY },
            size: { width: mobileWidth, height: mobileHeight },
            dragAxis: 'none',
            disableDragging: true,
            enableResizing: false,
            bounds: 'window',
        }
        : {
            default: {
                x: 100,
                y: 100,
                width: width,
                height: height,
            }
        }
    // MOBILE ADAPTATION END
    const rndLayout = maximized
        ? {
            position: { x: 0, y: 0 },
            size: { width: '100vw', height: '100vh' },
            disableDragging: true,
            enableResizing: false,
            bounds: 'window',
        }
        : mobileLayout

    return (
        <Rnd
            {...rndLayout}
            style={{
                zIndex: zIndex,
                display: minimized ? 'none' : 'flex',
            }}
            onDragStart={handleFocus}
            onMouseDown={handleFocus}
            onTouchStart={handleFocus}
            className={`${maximized ? 'maximized-window' : ''} ${isMobile ? 'mobile-window' : ''}`}
        >
            <div className="window" onClick={handleFocus} style={{ width: '100%', height: '100%' }}>
                <nav onDoubleClick={() => setMaximized(!maximized)}>
                    <div className="dots">
                        <div className="dot red" role="button" aria-label="Close window" {...closeTap}>
                            <span>x</span>
                        </div>
                        <div className="dot yellow" role="button" aria-label="Minimize window" {...minimizeTap}>
                            <span>-</span>
                        </div>
                        <div className="dot green" role="button" aria-label="Toggle fullscreen" {...maximizeTap}>
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
