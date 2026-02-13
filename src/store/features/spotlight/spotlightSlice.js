import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

const spotlightSlice = createSlice({
    name: 'spotlight',
    initialState,
    reducers: {
        setSpotlightOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        toggleSpotlight: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { setSpotlightOpen, toggleSpotlight } = spotlightSlice.actions;
export default spotlightSlice.reducer;
