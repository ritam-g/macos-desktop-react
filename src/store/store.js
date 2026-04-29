import { configureStore } from '@reduxjs/toolkit';
import bootReducer from './features/boot/bootSlice';
import wallpaperReducer from './features/wallpaper/wallpaperSlice';
import spotlightReducer from './features/spotlight/spotlightSlice';
import contextMenuReducer from './features/contextMenu/contextMenuSlice';
import windowReducer from './features/windows/windowSlice';
import responsiveReducer from './features/responsive/responsiveSlice';

const store = configureStore({
    reducer: {
        boot: bootReducer,
        wallpaper: wallpaperReducer,
        spotlight: spotlightReducer,
        contextMenu: contextMenuReducer,
        windows: windowReducer,
        responsive: responsiveReducer,
    },
});

export default store;
