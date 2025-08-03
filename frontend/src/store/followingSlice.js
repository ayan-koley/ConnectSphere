import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followingIds: [],
};

const followingSlice = createSlice({
    name: "following",
    initialState,
    reducers: {
        setFollowing: (state, action) => {
            state.followingIds = action.payload;
        },
        toggleFollowing: (state, action) => {
            const id = action.payload;
            if (state.followingIds.includes(id)) {
                state.followingIds = state.followingIds.filter(pid => pid !== id);
            } else {
                state.followingIds.push(id);
            }
        }
    },
});

export const { setFollowing, toggleFollowing } = followingSlice.actions;
export default followingSlice.reducer;
