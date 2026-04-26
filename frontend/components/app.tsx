import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './splash/login_form';
import Browse from './browse/browse';
import SignupForm from './splash/signup_form';
import Splash from './splash/splash';
import ManageProfiles from './profiles/manage_profiles';
import ShowMovie from './movies/show_movie';
import MyList from './myList/my_list';
import Search from './search/search';
import DirectorPage from './director/director_page';

const App: React.FC = () => (
  <div>
    <Routes>
      <Route path="/" element={<AuthRoute><Splash /></AuthRoute>} />
      <Route path="/signup" element={<AuthRoute><SignupForm /></AuthRoute>} />
      <Route path="/login" element={<AuthRoute><LoginForm /></AuthRoute>} />
      <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
      <Route path="/manageprofiles" element={<ProtectedRoute><ManageProfiles /></ProtectedRoute>} />
      <Route path="/watch/:movieId" element={<ProtectedRoute><ShowMovie /></ProtectedRoute>} />
      <Route path="/browse/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path="/director/:slug" element={<ProtectedRoute><DirectorPage /></ProtectedRoute>} />
    </Routes>
  </div>
);

export default App;
