import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: null
}

const themeSlice  = createSlice({
    name: "themeSlice",
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem("theme", state.mode)
            console.log(state.mode);
            document.querySelector('html').className = state.mode;
        },
        toggleMode: (state, action) => {
            state.mode = state.mode === "dark" ? "light" : "dark";
            localStorage.setItem("theme", state.mode);
            document.querySelector('html').className = state.mode;
        }
    }
})

export const { setMode, toggleMode } = themeSlice.actions;
export default themeSlice.reducer;