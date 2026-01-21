import { configureStore } from "@reduxjs/toolkit";
import appSliceReducer from "./appSlice";
import chatSliceReducer from "./chatSlice";

const store = configureStore({
  reducer: {
    app: appSliceReducer,
    chat: chatSliceReducer
  }
});

export default store;
