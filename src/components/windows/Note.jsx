import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import MacWindow from './MacWindow'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './Note.scss'
function Note() {
    const [markdown, setmarkdown] = useState(null);
    useEffect(() => {
        fetch("/note.txt")
            .then(res => res.text())
            .then(text => setmarkdown(text))
    }, [])
    return (

        <MacWindow>
            <div className="note-window">
                {markdown ? <SyntaxHighlighter language="typescript" style={dark}>{markdown}</SyntaxHighlighter> : <p>loading</p>}
            </div>
        </MacWindow>

    )
}

export default Note
