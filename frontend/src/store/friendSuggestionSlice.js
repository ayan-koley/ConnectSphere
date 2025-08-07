import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    pending: true
}

const friendSuggestionSlice = createSlice({
    name: "friendSuggestion",
    initialState,
    reducers: {
        addToSuggestion: (state, action) => {
            state.users = action.payload;
            state.pending = false;
        }
    }
})

export const { addToSuggestion } = friendSuggestionSlice.actions;
export default friendSuggestionSlice.reducer;