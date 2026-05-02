import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/doctors');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createDoctorProfile = createAsyncThunk(
  'doctors/create',
  async (doctorData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/doctors', doctorData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDoctorAction = createAsyncThunk(
  'doctors/update',
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/doctors/${id}`, data);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDoctorAction = createAsyncThunk(
  'doctors/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/doctors/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


