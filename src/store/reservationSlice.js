import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  reservations: [], // Ensure this is an array
  reservation: {},
  loading: true,
  err: {},
};

// Get all reservations
export const getReservations = createAsyncThunk(
  "reservation/getReservations",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/reservations");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Create a reservation
export const saveReservation = createAsyncThunk(
  "reservation/saveReservation",
  async (data, thunkApi) => {
    try {
      console.log(data)
      const response = await axios.post("/reservations", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Update a reservation
export const updateReservation = createAsyncThunk(
  "reservation/updateReservation",
  async ({ id, data }, thunkApi) => {
    try {
      const response = await axios.put(`/reservations/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Delete a reservation
export const deleteReservation = createAsyncThunk(
  "reservation/deleteReservation",
  async (id, thunkApi) => {
    try {
      await axios.delete(`/reservations/${id}`);
      return { id }; // Return the ID for filtering in the state
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Get reservations by hotel ID
export const getReservationsByHotelId = createAsyncThunk(
  "reservation/getReservationsByHotelId",
  async (hotelId, thunkApi) => {
    try {
      const response = await axios.get(`/reservations/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

// Get future reservations by user ID
export const getFutureReservationsByUserId = createAsyncThunk(
  "reservation/getFutureReservationsByUserId",
  async (data, thunkApi) => {
    try {
      const response = await axios.get(
        "/reservations/future?userId=" + data
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReservations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReservations.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.loading = false;
      state.err = "";
    });
    builder.addCase(getReservations.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Problem on getting reservations." };
    });
    builder.addCase(getReservationsByHotelId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReservationsByHotelId.fulfilled, (state, action) => {
      state.reservations = action.payload;
      state.loading = false;
      state.err = "";
    });
    builder.addCase(getReservationsByHotelId.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Problem on getting reservations." };
    });
    builder.addCase(getFutureReservationsByUserId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getFutureReservationsByUserId.fulfilled,
      (state, action) => {
        state.reservations = action.payload;
        state.loading = false;
        state.err = "";
      }
    );
    builder.addCase(getFutureReservationsByUserId.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Problem on getting reservations." };
    });
    builder.addCase(saveReservation.fulfilled, (state, action) => {
      state.reservations.push(action.payload);
      state.loading = false;
    });
    builder.addCase(saveReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveReservation.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on saving reservation." };
    });
    builder.addCase(updateReservation.fulfilled, (state, action) => {
      const index = state.reservations.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.reservations[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReservation.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on updating reservation." };
    });
    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.reservations = state.reservations.filter(
        (n) => n.id !== action.payload.id
      );
      state.loading = false;
    });
    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReservation.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on deleting reservation." };
    });
  },
});

export default reservationSlice.reducer;
