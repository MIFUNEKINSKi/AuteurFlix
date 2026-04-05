import { createSlice } from '@reduxjs/toolkit';
import { login, signup } from './api';
import type { ErrorsState } from '../types';

const initialState: ErrorsState = {
  session: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    resetSessionErrors(state) {
      state.session = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.session = [];
      })
      .addCase(signup.fulfilled, (state) => {
        state.session = [];
      })
      .addCase(login.rejected, (state, action) => {
        state.session = (action.payload as string[]) ?? [];
      })
      .addCase(signup.rejected, (state, action) => {
        state.session = (action.payload as string[]) ?? [];
      });
  },
});

export const { resetSessionErrors } = errorsSlice.actions;
export default errorsSlice.reducer;
