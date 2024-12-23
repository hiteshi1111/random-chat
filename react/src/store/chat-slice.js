import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMessages: [],
    realTimeMessages: [],
    message: "",
    triggerChat: 0
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setAllMessages(state, action){
            state.allMessages = action.payload;
        },
        setMessage(state, action){
            state.message = action.payload;
        },
        setRealTimeMessages(state, action){
            state.realTimeMessages = action.payload;
        },
        setTriggerChat(state, action){
            state.triggerChat = action.payload;
        }
    }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;