import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  isAuthenticated: false,
  isRegistered: false,
  accessToken: "",
  userId: 0,
  err: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (loginCred, thunkApi) => {
    try {
      console.log(loginCred);
      const response = await axios.post(`/auth/login`, loginCred);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      localStorage.setItem("role", response.data.role);

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (loginCred, thunkApi) => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);


export const register = createAsyncThunk(
  "auth/register",
  async (registerCred, thunkApi) => {
    try {
      console.log(registerCred)
      const response = await axios.post(`/auth/register`, registerCred);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.err = "";
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.accessToken = "";
      state.err = "Invalid Credentials";
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state,) => {
      state.isAuthenticated = false;
      state.err = "";
    });
    builder.addCase(logout.rejected, (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.accessToken = "";
      state.err = "Invalid Credentials";
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.isRegistered = true;
      state.err = "";
    });
    builder.addCase(register.rejected, (state) => {
      state.loading = false;
      state.err = "Username or Email existed.";
    });
  },
});

export default securitySlice.reducer;
