import React, { useState, useEffect } from 'react'
import MacWindow from "./MacWindow"
import "./Note.scss"

function Note({ windowname }) {
    const [note, setNote] = useState(() => {
        return localStorage.getItem('mac-note') || "Welcome to Note App!\nType here..."
    })

    useEffect(() => {
        localStorage.setItem('mac-note', note)
    }, [note])

    return (
        <MacWindow windowname={windowname}
        >
            <div className="note-container">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="note-area"
                    spellCheck="false"
                ></textarea>
            </div>
        </MacWindow>
    )
}

export default Note
