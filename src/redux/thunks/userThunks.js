import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

// Fetch All Users
export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, thunkAPI) => {
    try {
      // Need to attach Authorization manually if axiosInstance interceptor isn't fully configured
      // We read the global state using thunkAPI.getState()
      const { auth: { userInfo } } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const response = await axiosInstance.get('/auth/users', config);
      return response.data; // Will return the raw array from MongoDB
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete User
export const deleteUserAction = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      const { auth: { userInfo } } = thunkAPI.getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      await axiosInstance.delete(`/auth/users/${id}`, config);
      return id; // Return the ID so the frontend reducer can instantly filter it out
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


