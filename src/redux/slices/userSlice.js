import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, deleteUserAction } from '../thunks/userThunks';
export { fetchUsers, deleteUserAction };

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // We could add pure synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users Cases
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete User Cases
      .addCase(deleteUserAction.pending, (state) => {
         // Keep status silent or use a specific deleting queue if UX demands it
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        // Filter out the deleted user instantaneously
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

