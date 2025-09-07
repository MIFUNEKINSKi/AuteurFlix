import React from "react";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Routes } from 'react-router-dom';
import LoginFormContainer from './splash/login_form_container';
import BrowseContainer from "./browse/browse_container";
import SignupFormContainer from './splash/signup_form_container';
import Splash from "./splash/splash";
import ManageProfilesContainer from '../components/profiles/manage_profiles_container';
import ShowMovieContainer from '../components/movies/show_movie_container';
import MyListContainer from '../components/myList/my_list_container';
import SearchContainer from '../components/search/search_container';



const App = () => (
  <div>
    <Routes>
      <Route path='/' element={<AuthRoute><Splash /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><SignupFormContainer /></AuthRoute>} />
      <Route path="/login" element={<AuthRoute><LoginFormContainer /></AuthRoute>} />
      <Route path='/browse' element={<ProtectedRoute><BrowseContainer /></ProtectedRoute>} />
      <Route path='/manageprofiles' element={<ProtectedRoute><ManageProfilesContainer /></ProtectedRoute>} />
      <Route path='/watch/:movieId' element={<ProtectedRoute><ShowMovieContainer /></ProtectedRoute>} /> 
      <Route path='/browse/my-list' element={<ProtectedRoute><MyListContainer /></ProtectedRoute>} /> 
      <Route path='/search' element={<ProtectedRoute><SearchContainer /></ProtectedRoute>} /> 
    </Routes>
  </div>
);

export default App;