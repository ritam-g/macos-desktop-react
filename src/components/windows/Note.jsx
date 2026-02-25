import React, { useState, useEffect } from 'react'
import MacWindow from "./MacWindow"
import "./Note.scss"
import { Plus, Trash2, Search, FileText } from 'lucide-react'

function Note({ windowname }) {
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('mac-notes')
        if (savedNotes) return JSON.parse(savedNotes)

        // Migration from old single note
        const oldNote = localStorage.getItem('mac-note')
        if (oldNote) {
            return [{ id: Date.now(), title: oldNote.split('\n')[0] || 'My Note', content: oldNote, timestamp: Date.now() }]
        }

        return [
            { id: 1, title: 'Welcome', content: 'Welcome to Note App!\nType here...', timestamp: Date.now() }
        ]
    })
    const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        localStorage.setItem('mac-notes', JSON.stringify(notes))
    }, [notes])

    const activeNote = notes.find(n => n.id === activeNoteId)

    const createNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            timestamp: Date.now()
        }
        setNotes([newNote, ...notes])
        setActiveNoteId(newNote.id)
    }

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(n => n.id !== id)
        setNotes(updatedNotes)
        if (activeNoteId === id) {
            setActiveNoteId(updatedNotes[0]?.id || null)
        }
    }

    const updateNote = (content) => {
        const title = content.split('\n')[0] || 'New Note'
        setNotes(notes.map(n =>
            n.id === activeNoteId ? { ...n, content, title, timestamp: Date.now() } : n
        ))
    }

    const filteredNotes = notes.filter(n =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <MacWindow windowname={windowname} width={700} height={500}>
            <div className="notes-app-container">
                <div className="notes-sidebar">
                    <div className="sidebar-header">
                        <div className="search-bar">
                            <Search size={14} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="add-note-btn" onClick={createNote}>
                            <Plus size={18} />
                        </button>
                    </div>
                    <div className="notes-list">
                        {filteredNotes.map(note => (
                            <div
                                key={note.id}
                                className={`note-item ${note.id === activeNoteId ? 'active' : ''}`}
                                onClick={() => setActiveNoteId(note.id)}
                            >
                                <div className="note-item-header">
                                    <FileText size={16} />
                                    <span className="note-title">{note.title || 'Untitled'}</span>
                                </div>
                                <div className="note-item-meta">
                                    {new Date(note.timestamp).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="notes-editor">
                    {activeNote ? (
                        <>
                            <div className="editor-header">
                                <span className="timestamp">
                                    {new Date(activeNote.timestamp).toLocaleString()}
                                </span>
                                <button className="delete-note-btn" onClick={() => deleteNote(activeNote.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <textarea
                                value={activeNote.content}
                                onChange={(e) => updateNote(e.target.value)}
                                className="note-area"
                                spellCheck="false"
                                placeholder="Start typing..."
                                autoFocus
                            ></textarea>
                        </>
                    ) : (
                        <div className="no-active-note">
                            <FileText size={48} opacity={0.2} />
                            <p>Select or create a note</p>
                            <button onClick={createNote}>Create New Note</button>
                        </div>
                    )}
                </div>
            </div>
        </MacWindow>
    )
}

export default Note

