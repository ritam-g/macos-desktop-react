import { createSlice } from '@reduxjs/toolkit'

const getViewportState = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      viewportWidth: 1024,
      viewportHeight: 768,
    }
  }

  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  return {
    isMobile: viewportWidth < 768,
    viewportWidth,
    viewportHeight,
  }
}

const initialState = getViewportState()

const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setViewportState: (state, action) => {
      const { isMobile, viewportWidth, viewportHeight } = action.payload
      state.isMobile = isMobile
      state.viewportWidth = viewportWidth
      state.viewportHeight = viewportHeight
    },
  },
})

export const { setViewportState } = responsiveSlice.actions
export default responsiveSlice.reducer
