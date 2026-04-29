import React, { useEffect, useRef } from 'react'
import './ContextMenu.scss'
import { useSelector } from 'react-redux'
import useTapAction from '../hooks/useTapAction'

function ContextMenu({ x, y, visible, onClose, actions }) {
    const menuRef = useRef(null)
    const isMobile = useSelector(state => state.responsive.isMobile)
    const viewportWidth = useSelector(state => state.responsive.viewportWidth)
    const viewportHeight = useSelector(state => state.responsive.viewportHeight)
    const newFolderTap = useTapAction(() => { actions.newFolder(); onClose() })
    const infoTap = useTapAction(() => { actions.getInfo(); onClose() })
    const wallpaperTap = useTapAction(() => { actions.changeWallpaper(); onClose() })

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose()
            }
        }
        if (visible) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside)
        }
    }, [visible, onClose])

    if (!visible) return null

    // MOBILE ADAPTATION START
    const menuWidth = isMobile ? 220 : 180
    const maxX = Math.max(12, viewportWidth - menuWidth - 12)
    const maxY = Math.max(12, viewportHeight - 220)
    // MOBILE ADAPTATION END

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{ top: Math.min(y, maxY), left: Math.min(x, maxX), width: menuWidth }}
        >
            <div className="menu-item" role="button" tabIndex={0} {...newFolderTap}>
                <span>New Folder</span>
            </div>
            <div className="menu-separator" />
            <div className="menu-item" role="button" tabIndex={0} {...infoTap}>
                <span>Get Info</span>
            </div>
            <div className="menu-item" role="button" tabIndex={0} {...wallpaperTap}>
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
