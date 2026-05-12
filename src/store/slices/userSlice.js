import { createSlice } from "@reduxjs/toolkit";

export const theUser = createSlice({
  name: "TheUser",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    logInUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});
export const { logInUser, clearUser } = theUser.actions;
export default theUser.reducer;
