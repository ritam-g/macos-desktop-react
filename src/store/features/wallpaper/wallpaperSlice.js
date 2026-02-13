import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bgIndex: 0,
};

const wallpaperSlice = createSlice({
    name: 'wallpaper',
    initialState,
    reducers: {
        setBgIndex: (state, action) => {
            state.bgIndex = action.payload;
        },
        incrementBgIndex: (state, action) => {
            const totalWallpapers = action.payload; // Pass length as payload
            state.bgIndex = (state.bgIndex + 1) % totalWallpapers;
        }
    },
});

export const { setBgIndex, incrementBgIndex } = wallpaperSlice.actions;
export default wallpaperSlice.reducer;
