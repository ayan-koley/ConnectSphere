import { configureStore } from "@reduxjs/toolkit";
import themeSlice from './themeSlice.js';
import searchHistorySlice from './searchHistorySlice.js';
import feedSlice from './feedSlice.js';
import commentSlice from './commentSlice.js';
import authSlice from './authSlice.js';
import searchSlice from './searchSlice.js';
import reactionSlice from './reactionSlice.js';
import followingSlice from './followingSlice.js';
import friendSuggestionSlice from './friendSuggestionSlice.js';

const store = configureStore({
    reducer: {
        authSlice,
        theme: themeSlice,
        searchHistory: searchHistorySlice,
        search: searchSlice,
        feedSlice,
        comments: commentSlice,
        reaction: reactionSlice,
        following: followingSlice,
        friendSuggestionSlice
    }
})

export default store;