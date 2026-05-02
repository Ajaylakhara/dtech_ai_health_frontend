import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchPatients, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from '../thunks/patientThunks';

const initialState = {
  patients: [],
  status: 'idle',
  error: null,
};

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.patients.push(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.patients.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.patients[index] = action.payload;
        }
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.patients = state.patients.filter((p) => p._id !== action.payload);
      });
  },
});

export { fetchPatients, createPatient, updatePatient, deletePatient };
export default patientSlice.reducer;

