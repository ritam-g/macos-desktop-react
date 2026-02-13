import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    visible: false,
    x: 0,
    y: 0,
};

const contextMenuSlice = createSlice({
    name: 'contextMenu',
    initialState,
    reducers: {
        setContextMenu: (state, action) => {
            const { visible, x, y } = action.payload;
            state.visible = visible;
            if (x !== undefined) state.x = x;
            if (y !== undefined) state.y = y;
        },
        closeContextMenu: (state) => {
            state.visible = false;
        },
    },
});

export const { setContextMenu, closeContextMenu } = contextMenuSlice.actions;
export default contextMenuSlice.reducer;
