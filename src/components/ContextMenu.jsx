import React, { useEffect, useRef } from 'react'
import './ContextMenu.scss'

function ContextMenu({ x, y, visible, onClose, actions }) {
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose()
            }
        }
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [visible, onClose])

    if (!visible) return null

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{ top: y, left: x }}
        >
            <div className="menu-item" onClick={() => { actions.newFolder(); onClose(); }}>
                <span>New Folder</span>
            </div>
            <div className="menu-separator" />
            <div className="menu-item" onClick={() => { actions.getInfo(); onClose(); }}>
                <span>Get Info</span>
            </div>
            <div className="menu-item" onClick={() => { actions.changeWallpaper(); onClose(); }}>
                <span>Change Wallpaper</span>
            </div>
            <div className="menu-separator" />
            <div className="menu-item has-submenu">
                <span>Sort By</span>
                <span className="arrow">▶</span>
            </div>
            <div className="menu-item has-submenu">
                <span>Clean Up By</span>
                <span className="arrow">▶</span>
            </div>
        </div>
    )
}

export default ContextMenu
