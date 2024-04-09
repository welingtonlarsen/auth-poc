import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axios';

export const fetchMe = createAsyncThunk('user/fetchUser', async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
});

const userSlice = createSlice({
  name: 'user',

  initialState: {
    user: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice;
