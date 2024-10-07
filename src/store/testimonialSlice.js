import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  testimonials: [], // Ensure this is an array
  testimonial: {},
  currentTestimonial: {},
  loading: true,
  err: {},
};
export const getTestimonials = createAsyncThunk(
  "/testimonial/getTestimonials",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/testimonials");
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveTestimonial = createAsyncThunk(
  "/testimonial/saveTestimonial",

  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.post("/testimonials", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateTestimonial = createAsyncThunk(
  "/testimonial/updateTestimonial",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/testimonials/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  "/testimonial/deleteTestimonial",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/testimonials/${data.id}`);
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

export const testimonialSlice = createSlice({
  name: "testimonial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTestimonials.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTestimonials.fulfilled, (state, action) => {
      state.testimonials = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getTestimonials.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(saveTestimonial.fulfilled, (state, action) => {
      state.testimonials.push(action.payload);
      state.loading = false;
    });

    builder.addCase(saveTestimonial.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveTestimonial.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on Saving" };
    });
    builder.addCase(updateTestimonial.fulfilled, (state, action) => {
      const index = state.testimonials.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.testimonials[index] = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(updateTestimonial.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTestimonial.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on updating" };
    });
    builder.addCase(deleteTestimonial.fulfilled, (state, action) => {
      state.testimonials = state.testimonials.filter(
        (n) => n.id !== action.payload.id
      );
      state.loading = false;
    });

    builder.addCase(deleteTestimonial.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTestimonial.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on deleting" };
    });
  },
});

export default testimonialSlice.reducer;
