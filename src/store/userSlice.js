import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  users: [], // Ensure this is an array
  user: {},
  currentUser: {},
  loading: true,
  err: {},
};
export const getUsers = createAsyncThunk(
  "/user/getUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/users");
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const getUser = createAsyncThunk(
  "/user/getUser",
  async (id, thunkApi) => {
    try {
      const response = await axios.get("/users/"+id);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);



export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default userSlice.reducer;
