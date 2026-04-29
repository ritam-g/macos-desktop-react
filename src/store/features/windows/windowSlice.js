import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    windowBox: {
        github: false,
        note: false,
        resume: false,
        spotify: false,
        cli: false,
        calculator: false,
    },
    minimizedWindows: {
        github: false,
        note: false,
        resume: false,
        spotify: false,
        cli: false,
        calculator: false,
    },
    focusedWindow: null,
    zIndices: {
        github: 1,
        note: 1,
        resume: 1,
        spotify: 1,
        cli: 1,
        calculator: 1,
    },
};

const windowSlice = createSlice({
    name: 'windows',
    initialState,
    reducers: {
        setWindowBox: (state, action) => {
            // payload can be { github: true } or logic to toggle
            // Simplest: pass the entire new object or patch
            // Let's assume payload is partial update: { key: value }
            Object.keys(action.payload).forEach(key => {
                state.windowBox[key] = action.payload[key];
            });
        },
        openWindow: (state, action) => {
            const windowName = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.windowBox, windowName)) {
                state.windowBox[windowName] = true;
                state.minimizedWindows[windowName] = false;

                // Focus logic
                state.focusedWindow = windowName;
                const maxZ = Math.max(...Object.values(state.zIndices));
                state.zIndices[windowName] = maxZ + 1;
            }
        },
        closeWindow: (state, action) => {
            const windowName = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.windowBox, windowName)) {
                state.windowBox[windowName] = false;
            }
        },
        toggleMinimize: (state, action) => {
            const windowName = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.minimizedWindows, windowName)) {
                state.minimizedWindows[windowName] = !state.minimizedWindows[windowName];
            }
        },
        restoreWindow: (state, action) => {
            const windowName = action.payload;
            if (Object.prototype.hasOwnProperty.call(state.minimizedWindows, windowName)) {
                state.minimizedWindows[windowName] = false;
                // Focus logic copied
                state.focusedWindow = windowName;
                const maxZ = Math.max(...Object.values(state.zIndices));
                state.zIndices[windowName] = maxZ + 1;
            }
        },
        focusWindow: (state, action) => {
            const windowName = action.payload;
            if (!windowName) return;
            state.focusedWindow = windowName;
            const maxZ = Math.max(...Object.values(state.zIndices));
            state.zIndices[windowName] = maxZ + 1;
        }
    },
});

export const { setWindowBox, openWindow, closeWindow, toggleMinimize, restoreWindow, focusWindow } = windowSlice.actions;
export default windowSlice.reducer;
