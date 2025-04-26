import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  userDetails: null,
  error: null,
};

export const userAuthSlice = createSlice({
  name: "userAuthentication",
  initialState,
  reducers: {
    userAuthenticationReq: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    userAuthenticationSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userDetails = action.payload;
    },
    userAuthenticationFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export default userAuthSlice.reducer;

export const userAuthSelector = (state) => state.userAuth;

export const {
  userAuthenticationReq,
  userAuthenticationSuccess,
  userAuthenticationFail,
} = userAuthSlice.actions;
