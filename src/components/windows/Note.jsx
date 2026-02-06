import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import MacWindow from './MacWindow'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Note.scss'
function Note({ windowname, windowBox, setwindowBox, zIndex, onFocus, onMinimize, minimized }) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedNote = localStorage.getItem('macos_note_content');
        if (savedNote) {
            setContent(savedNote);
            setLoading(false);
        } else {
            fetch("note.txt")
                .then(res => res.text())
                .then(text => {
                    setContent(text);
                    setLoading(false);
                })
                .catch(() => {
                    setContent('// Type your notes or code here...\n\nfunction helloWorld() {\n  console.log("Hello from macOS Desktop!");\n}');
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
        <MacWindow windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox} zIndex={zIndex} onFocus={onFocus} onMinimize={onMinimize} minimized={minimized}>
            <div className="note-window" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="note-toolbar" style={{
                    padding: '5px 15px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        style={{
                            background: isEditing ? '#007aff' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        {isEditing ? 'Save & Preview' : 'Edit Note'}
                    </button>
                </div>

                <div style={{ flex: 1, overflow: 'auto' }}>
                    {loading ? (
                        <div style={{ color: 'white', padding: '20px' }}>Loading...</div>
                    ) : isEditing ? (
                        <textarea
                            value={content}
                            onChange={handleChange}
                            className="note-textarea"
                            placeholder="Write something..."
                            autoFocus
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                color: 'white',
                                padding: '1.5rem',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                resize: 'none',
                                fontFamily: "'Fira Code', 'Menlo', monospace"
                            }}
                        />
                    ) : (
                        <SyntaxHighlighter
                            language="javascript"
                            style={dark}
                            wrapLongLines={true}
                            customStyle={{
                                margin: 0,
                                padding: '1.5rem',
                                background: 'transparent',
                                fontSize: '14px',
                                lineHeight: '1.6',
                                height: '100%',
                                overflowX: 'hidden'
                            }}
                        >
                            {content}
                        </SyntaxHighlighter>
                    )}
                </div>
            </div>
        </MacWindow>
    )
}

export default Note
