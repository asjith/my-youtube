import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.unshift(action.payload);
    },
    clearMessages: (state) => {
      state.length = 0;
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
