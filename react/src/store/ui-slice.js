import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: false,
    emojiKeypad: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading(state, action){
            state.loading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        setEmojiKeypad(state, action){
            state.emojiKeypad = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;