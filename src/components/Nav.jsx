import React from 'react'
import "./Nav.scss"
import DateTime from './DateTime'
function Nav({ windowBox, setwindowBox, focusWindow }) {
    const toggleApp = (name) => {
        setwindowBox(state => {
            const newState = { ...state, [name]: !state[name] };
            if (newState[name]) {
                setTimeout(() => focusWindow(name), 0); // Focus after state update
            }
            return newState;
        });
    };

    const closeAll = () => {
        setwindowBox({
            github: false,
            note: false,
            resume: false,
            spotify: false,
            cli: false
        });
    };

    return (
        <nav className='Nav'>
            <div className="left ">
                <div
                    onClick={closeAll}
                    className="apple-icon">
                    <img src="navbar-icons/apple.svg" alt="img" />
                </div>
                <div
                    onClick={() => toggleApp('github')}
                    className="nav-item">
                    <p>Ritam Maty</p>
                </div>

                <div className="nav-item">
                    <p
                        onClick={() => toggleApp('resume')}
                    >File</p>
                </div>

                <div className="nav-item">
                    <p

                    >window</p>
                </div>
                <div className="nav-item">
                    <p
                        onClick={() => toggleApp('cli')}
                    >terminal</p>
                </div>

            </div>
            <div className="right">
                <div className="nav-item">
                    <img src="navbar-icons/wifi.svg" alt="img" />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>
            </div>

        </nav>
    )
}

export default Nav
