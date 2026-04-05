import { createAsyncThunk } from '@reduxjs/toolkit';
import * as SessionAPI from '../util/session_api_util';
import * as MovieAPI from '../util/movie_api_util';
import * as ProfileAPI from '../util/profile_api_util';

// Session thunks

export const login = createAsyncThunk(
  'session/login',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await SessionAPI.login(user);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const signup = createAsyncThunk(
  'session/signup',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      return await SessionAPI.signup(user);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const logout = createAsyncThunk('session/logout', SessionAPI.logout);

// Movie thunks

export const fetchMovies = createAsyncThunk('movies/fetchAll', MovieAPI.fetchMovies);

export const fetchMovie = createAsyncThunk('movies/fetchOne', MovieAPI.fetchMovie);

export const createListItem = createAsyncThunk(
  'lists/create',
  async ({ movieId, profileId }: { movieId: number; profileId: number }) => {
    return MovieAPI.createListItem(movieId, profileId);
  }
);

export const deleteListItem = createAsyncThunk('lists/delete', MovieAPI.deleteListItem);

export const fetchRecommendations = createAsyncThunk('movies/fetchRecommendations', MovieAPI.fetchRecommendations);

// Profile thunks

export const fetchProfiles = createAsyncThunk('profiles/fetchAll', ProfileAPI.fetchProfiles);

export const fetchCurrentProfile = createAsyncThunk('profiles/fetchCurrent', ProfileAPI.fetchProfile);

export const createProfile = createAsyncThunk(
  'profiles/create',
  async (profile: { user_id: number; name: string }, { rejectWithValue }) => {
    try {
      return await ProfileAPI.createProfile(profile);
    } catch (errors) {
      return rejectWithValue(errors);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profiles/update',
  async (profile: { id: number; name: string }) => {
    return ProfileAPI.updateProfile(profile);
  }
);

export const deleteProfile = createAsyncThunk('profiles/delete', ProfileAPI.deleteProfile);
