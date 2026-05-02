import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axiosInstance';

export const fetchPatients = createAsyncThunk(
  'patients/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/patients');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createPatient = createAsyncThunk(
  'patients/create',
  async (patientData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/patients', patientData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePatient = createAsyncThunk(
  'patients/update',
  async ({ id, patientData }, thunkAPI) => {
    try {
      const response = await axiosInstance.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePatient = createAsyncThunk(
  'patients/delete',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/patients/${id}`);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);


