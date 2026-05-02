import { createSlice } from '@reduxjs/toolkit';
import { 
  bookAppointment, 
  fetchAllAppointments, 
  fetchMyAppointments, 
  updateAppointmentStatus, 
  deleteAppointment 
} from '../thunks/appointmentThunks';
export { 
  bookAppointment, 
  fetchAllAppointments, 
  fetchMyAppointments, 
  updateAppointmentStatus, 
  deleteAppointment 
};

const initialState = {
  appointments: [],
  status: 'idle',
  error: null,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(fetchAllAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex((a) => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter((a) => a._id !== action.payload);
      });
  },
});

export default appointmentSlice.reducer;

