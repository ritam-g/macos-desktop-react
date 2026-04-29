
import React, { useState, useEffect, useRef } from 'react'
import './Spotlight.scss'
import { useSelector } from 'react-redux'

const apps = [
    { id: 'note', name: 'Notes', type: 'app', icon: 'doc-icons/note.svg' },
    { id: 'github', name: 'Github', type: 'app', icon: 'doc-icons/github.svg' },
    { id: 'resume', name: 'Resume', type: 'app', icon: 'doc-icons/pdf.svg' },
    { id: 'spotify', name: 'Spotify', type: 'app', icon: 'doc-icons/spotify.svg' },
    { id: 'cli', name: 'Terminal', type: 'app', icon: 'doc-icons/cli.svg' },
    { id: 'calculator', name: 'Calculator', type: 'app', icon: 'doc-icons/calculator_icon.png' }, // Need icon?
    // External
    { id: 'calendar', name: 'Calendar', type: 'link', url: 'https://calendar.google.com/', icon: 'doc-icons/calender.svg' },
    { id: 'mail', name: 'Mail', type: 'link', url: 'mailto:ritammaty@gmail.com', icon: 'doc-icons/mail.svg' },
    { id: 'linkedin', name: 'LinkedIn', type: 'link', url: 'https://www.linkedin.com/in/ritammaty/', icon: 'doc-icons/link.svg' },
]

function Spotlight({ isOpen, onClose, onLaunch }) {
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef(null)
    const isMobile = useSelector(state => state.responsive.isMobile)

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(query.toLowerCase())
    )

    const handleLaunch = (app) => {
        if (app.type === 'link') {
            window.open(app.url, '_blank')
        } else {
            onLaunch(app.id)
        }
        onClose()
    }

    useEffect(() => {
        if (isOpen) {
            const frame = window.requestAnimationFrame(() => {
                setQuery('')
                setSelectedIndex(0)
                inputRef.current?.focus()
            })

            return () => window.cancelAnimationFrame(frame)
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => Math.max(prev - 1, 0))
        } else if (e.key === 'Enter') {
                e.preventDefault()
                const activeApp = filteredApps[selectedIndex]
                if (activeApp) {
                    if (activeApp.type === 'link') {
                        window.open(activeApp.url, '_blank')
                    } else {
                        onLaunch(activeApp.id)
                    }
                    onClose()
                }
            } else if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, filteredApps, selectedIndex, onLaunch, onClose])

    if (!isOpen) return null

    return (
        <div
            className="spotlight-overlay"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
            onTouchEnd={(event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            }}
        >
            <div className="spotlight-container" onClick={e => e.stopPropagation()}>
                <div className="search-bar">
                    <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L15.0001 15.0001M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Spotlight Search"
                        value={query}
                        onChange={e => {
                            setQuery(e.target.value)
                            setSelectedIndex(0)
                        }}
                    />
                </div>
                {filteredApps.length > 0 && (
                    <div className="results-list">
                        {filteredApps.map((app, index) => (
                            <div
                                key={app.id}
                                className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleLaunch(app)}
                                onTouchEnd={(event) => {
                                    event.preventDefault()
                                    handleLaunch(app)
                                }}
                                onMouseEnter={() => !isMobile && setSelectedIndex(index)}
                            >
                                <div className="app-icon">
                                    {/* Handle icons that might be missing or SVG paths */}
                                    {app.icon && <img src={app.icon} alt={app.name} onError={(e) => e.target.style.display = 'none'} />}
                                </div>
                                <span>{app.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Spotlight
