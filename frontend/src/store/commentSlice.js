import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchComment = createAsyncThunk(
    "fetch/comment",
    async(postId) => {
        try {
        
            const response = await axios.get("http://localhost:5000/api/v1/feed");
            return {postId, comment: response.data};
        } catch (error) {
            console.error(error.message);
        }
    }
)


const initialState = {
    byPostId: {},
    isLoading: false,
    error: null
}

const commentSlice  = createSlice({
    name: "feedSlice",
    initialState,
    reducers: {
        addComment: (state, action) => {
            const { postId, comment } = action.payload;
            state.byPostId[postId].unshift(comment);
        },
        removeComment: (state, action) => {
            const { postId, comment } = action.payload;
            state.byPostId[postId] =  state.byPostId[postId].filter(c => c._id !== comment._id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComment.fulfilled, (state, action) => {
                const { postId, comment } = action.payload;
                state.byPostId[postId] = comment;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = "Error happening on fetching comment";
            })
    }
})

export const { addComment, removeComment } = commentSlice.actions;
export default commentSlice.reducer;