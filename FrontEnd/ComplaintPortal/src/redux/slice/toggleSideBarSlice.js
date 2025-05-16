import { createSlice } from "@reduxjs/toolkit";

const toggleSideBarSlice = createSlice({
  name: "toggleSideBar",
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleSideBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSideBar } = toggleSideBarSlice.actions;
export default toggleSideBarSlice.reducer;
