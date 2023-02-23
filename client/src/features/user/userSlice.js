import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isRegistering: false,
  registrationError: null,
  registrationSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userLoginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    userRegisterRequest: (state) => {
      state.isRegistering = true;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    userRegisterSuccess: (state) => {
      state.isRegistering = false;
      state.registrationSuccess = true;
      state.registrationError = null;
    },
    userRegisterFailed: (state, action) => {
      state.isRegistering = false;
      state.registrationError = action.payload;
      state.registrationSuccess = false;
    },
    userLogout: (state) => {
      Cookies.remove("token");
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.isRegistering = false;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    userLoadRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    userLoadFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    userLoadSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdateRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdateFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },
    userUpdateSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = true;
    },
    userUpdatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = true;
    },
    userUpdatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userRegisterFailed,
  userRegisterRequest,
  userRegisterSuccess,
  userLogout,
  userLoadRequest,
  userLoadFailed,
  userLoadSuccess,
  userUpdateRequest,
  userUpdateFailed,
  userUpdateSuccess,
  userUpdatePasswordFailed,
  userUpdatePasswordRequest,
  userUpdatePasswordSuccess,
} = userSlice.actions;

export default userSlice.reducer;
