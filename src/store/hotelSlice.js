import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  hotels: [], // Ensure this is an array
  hotel: {},
  currentHotel: {},
  loading: true,
  err: {},
};
export const getHotels = createAsyncThunk(
  "/hotel/getHotels",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/hotels");
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const getHotelsByFilter = createAsyncThunk(
    "/hotel/getHotelsByFilter",
    async (data, thunkApi) => {
      console.log(data)
      try {
        const response = await axios.get("/hotels/search?country="+data.country+"&city="+data.city+"&guestCount="+data.guessCount+"&entryDate="+data.entryDate+"&outDate="+data.outDate+"&maxPrice="+data.maxPrice);
        return response.data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
    }
  );
export const saveHotel = createAsyncThunk(
  "/hotel/saveHotel",

  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.post("/hotels", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateHotel = createAsyncThunk(
  "/hotel/updateHotel",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/hotels/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteHotel = createAsyncThunk(
  "/hotel/deleteHotel",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/hotels/${data.id}`);
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

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHotels.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getHotels.fulfilled, (state, action) => {
      state.hotels = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getHotels.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(getHotelsByFilter.pending, (state) => {
        state.loading = true;
      });
  
      builder.addCase(getHotelsByFilter.fulfilled, (state, action) => {
        state.hotels = action.payload;
        state.loading = false;
        state.err = "";
      });
  
      builder.addCase(getHotelsByFilter.rejected, (state) => {
        state.loading = false;
        state.err = "Problem on getting Data.";
      });
    builder.addCase(saveHotel.fulfilled, (state, action) => {
      state.hotels.push(action.payload);
      state.loading = false;
    });

    builder.addCase(saveHotel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveHotel.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on Saving" };
    });
    builder.addCase(updateHotel.fulfilled, (state, action) => {
      const index = state.hotels.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.hotels[index] = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(updateHotel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateHotel.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on updating" };
    });
    builder.addCase(deleteHotel.fulfilled, (state, action) => {
      state.hotels = state.hotels.filter(
        (n) => n.id !== action.payload.id
      );
      state.loading = false;
    });

    builder.addCase(deleteHotel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteHotel.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on deleting" };
    });
  },
});

export default hotelSlice.reducer;
