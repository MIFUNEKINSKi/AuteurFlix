import React from "react";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
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
    <Switch>
      <AuthRoute exact path='/' component={Splash} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <ProtectedRoute exact path='/browse' component={BrowseContainer} />
      <ProtectedRoute exact path='/manageprofiles' component={ManageProfilesContainer} />
      <ProtectedRoute exact path='/watch/:movieId' component={ShowMovieContainer} /> 
      <ProtectedRoute exact path='/browse/my-list' component={MyListContainer} /> 
      {/* <ProtectedRoute exact path='/search' component={SearchContainer} />  */}
    </Switch>
  </div>
);

export default App;