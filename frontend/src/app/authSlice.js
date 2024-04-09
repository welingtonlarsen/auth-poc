import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../config/axios';
import globalRouter from '../config/globalRouter';

export const createUser = createAsyncThunk('auth/createUser', async (payload) => {
  const { firstName, lastName, email, password } = payload;

  const response = await axiosInstance.post('/users', {
    name: `${firstName} ${lastName}`,
    email,
    password,
  });

  if (response.status === 201) {
    globalRouter.navigate('/login');
    return response.data;
  } else {
    throw response;
  }
});

export const authUser = createAsyncThunk('auth/authUser', async (payload) => {
  const { email, password } = payload;

  const response = await axiosInstance.post('/auth', { email, password });

  if (response.status === 200) {
    const token = response?.data?.token;
    if (token) {
      globalRouter.navigate('/home');
      return {
        token,
      };
    }
  } else {
    throw response;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    errorMessage: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authUser.fulfilled, (state, action) => {
        const { payload } = action;
        const token = `Bearer ${payload.token}`;

        axiosInstance.defaults.headers.common['Authorization'] = token;

        localStorage.setItem('token', token);

        state.token = token;
      })
      .addCase(authUser.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST') {
          state.errorMessage = 'Invalid credentials.';
        } else {
          state.errorMessage =
            'Something went wrong, please try later or call support team.';
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        if (action.error.code === 'ERR_BAD_REQUEST') {
          state.errorMessage = 'Please fill all fields.';
        } else {
          state.errorMessage =
            'Something went wrong, please try later or call support team.';
        }
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
