import React from 'react'
import "./Nav.scss"
import DateTime from './DateTime'
import { useSelector, useDispatch } from 'react-redux'
import { openWindow, closeWindow, setWindowBox } from '../store/features/windows/windowSlice'
import useTapAction from '../hooks/useTapAction'

function Nav() {
    const dispatch = useDispatch()
    const windowBox = useSelector(state => state.windows.windowBox)

    const toggleApp = (name) => {
        if (windowBox[name]) {
            dispatch(closeWindow(name))
        } else {
            dispatch(openWindow(name))
        }
    };

    const closeAll = () => {
        dispatch(setWindowBox({
            github: false,
            note: false,
            resume: false,
            spotify: false,
            cli: false
        }))
    };

    const appleTap = useTapAction(closeAll)
    const ritamTap = useTapAction(() => toggleApp('github'))
    const fileTap = useTapAction(() => toggleApp('resume'))
    const terminalTap = useTapAction(() => toggleApp('cli'))

    return (
        <nav className='Nav' aria-label="Main Navigation Bar">
            <div className="left ">
                <div
                    className="apple-icon"
                    role="button"
                    aria-label="Apple Menu - Click to close all windows"
                    {...appleTap}
                >
                    <img src="navbar-icons/apple.svg" alt="Apple Menu" />
                </div>
                <div
                    className="nav-item"
                    role="button"
                    aria-label="Developer Name"
                    {...ritamTap}
                >
                    <p>Ritam Maty</p>
                </div>

                <div className="nav-item" role="button" aria-label="File Menu" {...fileTap}>
                    <p>File</p>
                </div>

                <div className="nav-item" role="button" aria-label="Window Menu">
                    <p

                    >window</p>
                </div>
                <div className="nav-item" role="button" aria-label="Terminal Menu" {...terminalTap}>
                    <p>terminal</p>
                </div>

            </div>
            <div className="right">
                <div className="nav-item" aria-label="Control Center">
                    {/* Control Center */}
                    <svg width="18" height="18" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 19C7.5 17.6193 8.61929 16.5 10 16.5H23.5C24.8807 16.5 26 17.6193 26 19C26 20.3807 24.8807 21.5 23.5 21.5H10C8.61929 21.5 7.5 20.3807 7.5 19Z" fill="white" />
                        <path d="M7.5 10C7.5 8.61929 8.61929 7.5 10 7.5H23.5C24.8807 7.5 26 8.61929 26 10C26 11.3807 24.8807 12.5 23.5 12.5H10C8.61929 12.5 7.5 11.3807 7.5 10Z" fill="white" />
                        <circle cx="10" cy="19" r="4" fill="white" />
                        <circle cx="23.5" cy="10" r="4" fill="white" />
                    </svg>
                </div>
                <div className="nav-item" aria-label="Battery Status 100%">
                    {/* Battery 100% */}
                    <svg width="22" height="18" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="20" height="10" rx="2" stroke="white" strokeWidth="2" />
                        <rect x="3" y="3" width="16" height="6" rx="1" fill="white" />
                        <path d="M23 4V8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="nav-item" aria-label="Wifi Status">
                    <img src="navbar-icons/wifi.svg" alt="Wifi Connected" style={{ width: '18px' }} />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>
            </div>

        </nav>
    )
}

export default Nav
