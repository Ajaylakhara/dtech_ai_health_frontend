import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchDepartments = createAsyncThunk(
  'departments/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/departments');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createDepartment = createAsyncThunk(
  'departments/create',
  async (deptData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/departments', deptData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'departments/update',
  async ({ id, deptData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/departments/${id}`, deptData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  'departments/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/departments/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


