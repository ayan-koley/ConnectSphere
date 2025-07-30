import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: {
        users: [],
        posts: [],
    },
    loading: false,
    error: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setResults(state, action) {
            state.results = action.payload; // { users: [], posts: [] }
        },
        setError(state, action) {
            state.error = action.payload;
        },
        clearResults(state) {
            state.results = { users: [], posts: [] };
        }
    },
});

export const { setLoading, setResults, setError, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
