import { createSlice } from '@reduxjs/toolkit'

const MAX_HISTORY_COUNT = 10;

const initialState = {
    history: []
}

const searchHistorySlice  = createSlice({
    name: "searchHistory",
    initialState,
    reducers: {
        addToHistory: (state, action) => {
            const query = action.payload.trim();

            if(!query) return;
            // remove if already exits
            state.history = state.history.filter(q => q.toLowerCase() !== query.toLowerCase());

            state.history.unshift(query);

            // remove if reach max limit
            if(state.history.length > MAX_HISTORY_COUNT) {
                state.history.pop();
            }
        },
        clearHistory: (state, action) => {
            state.history = [];
        }
    }
})

export const { addToHistory, clearHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;