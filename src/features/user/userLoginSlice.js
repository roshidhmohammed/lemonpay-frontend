import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo");
const parsedUserInfo = userInfoFromStorage
  ? JSON.parse(userInfoFromStorage)
  : null;

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  userInfo: parsedUserInfo,
  error: null,
};

export const userLoginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginReq: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    userLoginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    userLogout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      state.userInfo = null;
    },
  },
});

export default userLoginSlice.reducer;

export const userSelector = (state) => state.user;

export const { userLoginReq, userLoginSuccess, userLoginFail, userLogout } =
  userLoginSlice.actions;
