import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  toVisits: [], // Ensure this is an array
  toVisit: {},
  currentToVisit: {},
  loading: true,
  err: {},
};
export const getToVisits = createAsyncThunk(
  "/toVisit/getToVisits",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/toVisits");
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveToVisit = createAsyncThunk(
  "/toVisit/saveToVisit",

  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.post("/toVisits", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateToVisit = createAsyncThunk(
  "/toVisit/updateToVisit",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/toVisits/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteToVisit = createAsyncThunk(
  "/toVisit/deleteToVisit",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/toVisits/${data.id}`);
      response.data = {
        ...data,
        id: data.id,
      };
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const toVisitSlice = createSlice({
  name: "toVisit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToVisits.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getToVisits.fulfilled, (state, action) => {
      state.toVisits = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getToVisits.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(saveToVisit.fulfilled, (state, action) => {
      state.toVisits.push(action.payload);
      state.loading = false;
    });

    builder.addCase(saveToVisit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveToVisit.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on Saving" };
    });
    builder.addCase(updateToVisit.fulfilled, (state, action) => {
      const index = state.toVisits.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.toVisits[index] = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(updateToVisit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateToVisit.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on updating" };
    });
    builder.addCase(deleteToVisit.fulfilled, (state, action) => {
      state.toVisits = state.toVisits.filter(
        (n) => n.id !== action.payload.id
      );
      state.loading = false;
    });

    builder.addCase(deleteToVisit.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteToVisit.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on deleting" };
    });
  },
});

export default toVisitSlice.reducer;
