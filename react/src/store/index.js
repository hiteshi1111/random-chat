import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat-slice";

const store = configureStore({
    reducer: {
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;