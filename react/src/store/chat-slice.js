import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMessages: [],
    messageInput: "",
    triggerChat: 0
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setAllMessages(state, action){
            state.allMessages = action.payload;
        },
        setMessageInput(state, action){
            state.messageInput = action.payload;
        },
        setTriggerChat(state, action){
            state.triggerChat = action.payload;
        }
    }
});

export const chatActions = chatSlice.actions;
export default chatSlice.reducer;