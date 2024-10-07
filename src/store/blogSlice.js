import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/api";

const initialState = {
  blogs: [], // Ensure this is an array
  blog: {},
  currentBlog: {},
  loading: true,
  err: {},
};
export const getBlogs = createAsyncThunk(
  "/blog/getBlogs",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/blogs");
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveBlog = createAsyncThunk(
  "/blog/saveBlog",

  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.post("/blogs", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateBlog = createAsyncThunk(
  "/blog/updateBlog",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/blogs/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "/blog/deleteBlog",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/blogs/${data.id}`);
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

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getBlogs.rejected, (state) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
    builder.addCase(saveBlog.fulfilled, (state, action) => {
      state.blogs.push(action.payload);
      state.loading = false;
    });

    builder.addCase(saveBlog.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveBlog.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on Saving" };
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      const index = state.blogs.findIndex(
        (n) => n.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs[index] = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(updateBlog.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateBlog.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on updating" };
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter(
        (n) => n.id !== action.payload.id
      );
      state.loading = false;
    });

    builder.addCase(deleteBlog.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteBlog.rejected, (state) => {
      state.loading = false;
      state.err = { message: "Error on deleting" };
    });
  },
});

export default blogSlice.reducer;
