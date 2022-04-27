import React from "react";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Splash from "./splash/splash";
import SignupFormContainer from './splash/signup_form_container';
import LoginFormContainer from './splash/login_form_container';



const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path='/' component={Splash} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
    </Switch>
  </div>
);

export default App;