import { configureStore } from "@reduxjs/toolkit";
import userAuthenticationReducer from "../features/user/userAuthenticationSlice";
import userLoginReducer from "../features/user/userLoginSlice"

export const store = configureStore({
  reducer: {
    // Reducers
    userAuthentication: userAuthenticationReducer,
    user: userLoginReducer
  },
});
