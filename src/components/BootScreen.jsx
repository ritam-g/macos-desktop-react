import React, { useEffect, useState } from 'react'
import './BootScreen.scss'

function BootScreen({ onComplete }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(onComplete, 500) // Wait a bit after 100%
                    return 100
                }
                return prev + 1
            })
        }, 30) // Adjust speed here

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className="boot-screen">
            <div className="logo">
                {/* Ensure this path is correct based on your public folder */}
                <img src="/navbar-icons/apple.svg" alt="Apple Logo" />
            </div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    )
}

export default BootScreen
