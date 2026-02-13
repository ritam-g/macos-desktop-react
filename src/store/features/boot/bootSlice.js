import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    booting: true,
};

const bootSlice = createSlice({
    name: 'boot',
    initialState,
    reducers: {
        setBooting: (state, action) => {
            state.booting = action.payload;
        },
    },
});

export const { setBooting } = bootSlice.actions;
export default bootSlice.reducer;
