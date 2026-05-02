import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctors, createDoctorProfile, updateDoctorAction, deleteDoctorAction } from '../thunks/doctorThunks';
export { fetchDoctors, createDoctorProfile, updateDoctorAction, deleteDoctorAction };

const initialState = {
  doctors: [],
  status: 'idle',
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createDoctorProfile.fulfilled, (state, action) => {
        state.doctors.push(action.payload);
      })
      .addCase(updateDoctorAction.fulfilled, (state, action) => {
        const index = state.doctors.findIndex(d => d._id === action.payload._id);
        if (index !== -1) state.doctors[index] = action.payload;
      })
      .addCase(deleteDoctorAction.fulfilled, (state, action) => {
        state.doctors = state.doctors.filter(d => d._id !== action.payload);
      });
  },
});

export default doctorSlice.reducer;

