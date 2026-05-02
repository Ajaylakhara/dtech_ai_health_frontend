import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const bookAppointment = createAsyncThunk(
  'appointments/book',
  async (appointmentData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/appointments/doctor-appointments'); // Using doctor-appointments for admin/doctor
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchMyAppointments = createAsyncThunk(
  'appointments/fetchMine',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/appointments/my-appointments');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateStatus',
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/appointments/${id}/status`, { status });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/appointments/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


