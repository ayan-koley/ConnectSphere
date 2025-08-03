import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchGlobalFeed = createAsyncThunk(
    "fetch/globalFeed",
    async(token, thunkApi) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DB_URI}/api/v1/feed`).then((res) => res.data);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message);
        }
    }
)


const initialState = {
    posts: [],
    isLoading: false,
    error: null
}

const feedSlice  = createSlice({
    name: "feedSlice",
    initialState,
    reducers: {
        addToFeed: (state, action) => {
            state.posts.unshift(action.payload);
        },
        removeToFeed: (state, action) => {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },
        clearFeed: (state) => {
            state.posts = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalFeed.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGlobalFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(fetchGlobalFeed.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { addToFeed, removeToFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;