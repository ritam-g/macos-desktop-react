import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import MacWindow from './MacWindow'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Note.scss'
function Note({ windowname, windowBox, setwindowBox, zIndex, onFocus }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedNote = localStorage.getItem('macos_note_content');
        if (savedNote) {
            setContent(savedNote);
            setLoading(false);
        } else {
            fetch("/note.txt")
                .then(res => res.text())
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(() => {
                    setContent('Type your notes here...');
                    setLoading(false);
                });
        }
    }, []);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        localStorage.setItem('macos_note_content', newContent);
    };

    return (
        <MacWindow windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox} zIndex={zIndex} onFocus={onFocus}>
            <div className="note-window" style={{ height: '100%', padding: '0' }}>
                {loading ? (
                    <div style={{ color: 'white', padding: '20px' }}>Loading...</div>
                ) : (
                    <textarea
                        value={content}
                        onChange={handleChange}
                        className="note-textarea"
                        placeholder="Write something..."
                        style={{
                            width: '100%',
                            height: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'white',
                            padding: '1.5rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            resize: 'none',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    />
                )}
            </div>
        </MacWindow>
    )
}

export default Note
