import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isAuthenticated: false,
    accessToken: null,
    role: null,
    unit: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, role, unit } = action.payload;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.role = role;
      state.unit = unit;
    },
    setCurrentUser: (state, action) => {
      state.authUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.authUser = null;
      state.role = null
      state.unit = null
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
export const selectAuthUser = (state: RootState) => state.auth.authUser;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
