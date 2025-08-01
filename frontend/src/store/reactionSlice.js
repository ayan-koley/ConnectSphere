import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedPostIds: [],
    favoritedPostIds: [],
};

const reactionSlice = createSlice({
    name: "reaction",
    initialState,
    reducers: {
        setReactions: (state, action) => {
            state.likedPostIds = action.payload.likedPostIds;
            state.favoritedPostIds = action.payload.favoritedPostIds;
        },
        toggleLike: (state, action) => {
            const id = action.payload;
            if (state.likedPostIds.includes(id)) {
                state.likedPostIds = state.likedPostIds.filter(pid => pid !== id);
            } else {
                state.likedPostIds.push(id);
            }
        },
        toggleFavorite: (state, action) => {
            const id = action.payload;
            if (state.favoritedPostIds.includes(id)) {
                state.favoritedPostIds = state.favoritedPostIds.filter(pid => pid !== id);
            } else {
                state.favoritedPostIds.push(id);
            }
        },
    },
});

export const { setReactions, toggleLike, toggleFavorite } = reactionSlice.actions;
export default reactionSlice.reducer;
