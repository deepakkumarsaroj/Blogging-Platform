// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    currentUserProfile: null,
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.currentUserProfile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
