import React from 'react'
import { Rnd } from 'react-rnd'
import "./Window.scss"
function MacWindow({ children, width = 400, height = 400, windowname, windowBox, setwindowBox, zIndex, onFocus }) {
    return (
        <>
            <Rnd
                default={{
                    x: 100,
                    y: 100,
                    width: width,
                    height: height,
                }}
                style={{ zIndex: zIndex }}
                onDragStart={onFocus}
                onMouseDown={onFocus}
            >
                <div className="window" onClick={onFocus}>
                    <nav>
                        <div className="dots">
                            <div onClick={(e) => {
                                e.stopPropagation();
                                setwindowBox(state => ({ ...state, [windowname]: false }))
                            }} className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>

                        </div>
                        <div className="title">
                            <p>{windowname} — 80x24</p>
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
