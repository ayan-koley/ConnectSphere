import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './themeSlice.js';
import searchHistorySlice from './searchHistorySlice.js'
import feedSlice from './feedSlice.js';
import commentSlice from './commentSlice.js'
import authSlice from './authSlice.js'

const store = configureStore({
    reducer: {
        authSlice,
        themeSlice,
        searchHistorySlice,
        feedSlice,
        commentSlice
    }
})

export default store;