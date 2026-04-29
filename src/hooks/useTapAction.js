import { useRef } from 'react'

function useTapAction(action) {
  const touchHandledRef = useRef(false)

  const handleClick = (event) => {
    if (touchHandledRef.current) {
      touchHandledRef.current = false
      return
    }

    action?.(event)
  }

  const handleTouchEnd = (event) => {
    touchHandledRef.current = true
    action?.(event)
  }

  const handleTouchCancel = () => {
    touchHandledRef.current = false
  }

  return {
    onClick: handleClick,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  }
}

export default useTapAction
