import { createSlice } from '@reduxjs/toolkit';
import { login, signup, logout, fetchCurrentProfile, createListItem, deleteListItem } from './api';
import type { SessionState } from '../types';

const initialState: SessionState = {
  id: null,
  profileId: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    resetCurrentProfile(state) {
      state.profileId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.id = action.payload.id;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.id = action.payload.id;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState)
      .addCase(fetchCurrentProfile.fulfilled, (state, action) => {
        state.profileId = action.payload.id;
      })
      .addCase(createListItem.fulfilled, (state, action) => {
        state.profileId = action.payload.id;
      })
      .addCase(deleteListItem.fulfilled, (state, action) => {
        state.profileId = action.payload.id;
      });
  },
});

export const { resetCurrentProfile } = sessionSlice.actions;
export default sessionSlice.reducer;
