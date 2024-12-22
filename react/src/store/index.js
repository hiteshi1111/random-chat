import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default store;