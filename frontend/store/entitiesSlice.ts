import { createSlice } from '@reduxjs/toolkit';
import {
  login, signup, logout,
  fetchMovies, fetchMovie,
  fetchProfiles, fetchCurrentProfile,
  createProfile, updateProfile, deleteProfile,
  createListItem, deleteListItem,
} from './api';
import type { EntitiesState } from '../types';

const initialState: EntitiesState = {
  users: {},
  movies: {},
  genres: {},
  tags: {},
  profiles: {},
  myList: {},
};

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Users
      .addCase(login.fulfilled, (state, action) => {
        state.users[action.payload.id] = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.users[action.payload.id] = action.payload;
      })

      // Movies, Genres, Tags
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.movies;
        state.genres = action.payload.genres;
        state.tags = action.payload.tags;
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movies[action.payload.movie.id] = action.payload.movie;
      })

      // Profiles
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles[action.payload.id] = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profiles[action.payload.id] = action.payload;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        // API returns the refreshed profiles index after destroy.
        state.profiles = action.payload;
      })

      // Current profile / myList
      .addCase(fetchCurrentProfile.fulfilled, (state, action) => {
        state.myList = action.payload.myList ?? {};
      })
      .addCase(createListItem.fulfilled, (state, action) => {
        state.myList = action.payload.myList ?? {};
      })
      .addCase(deleteListItem.fulfilled, (state, action) => {
        state.myList = action.payload.myList ?? {};
      })

      // Logout clears everything
      .addCase(logout.fulfilled, () => initialState);
  },
});

export default entitiesSlice.reducer;
