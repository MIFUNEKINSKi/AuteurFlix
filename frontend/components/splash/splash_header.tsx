import React from 'react';
import { Link } from 'react-router-dom';

const SplashHeader: React.FC = () => (
  <div className="splash-header">
    <Link to="/"><img id="logo" src={window.logoURL} alt="AuteurFlix" /></Link>
    <Link className="sign-btn" to="/login">Sign In</Link>
  </div>
);

export default SplashHeader;
