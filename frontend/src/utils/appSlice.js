import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isOnline: true,
    isSideBarOpen: true,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { toggleSideBar, closeSideBar, setIsOnline } = appSlice.actions;
export default appSlice.reducer;
