import React from 'react';
import { Link } from 'react-router-dom';
import { logoURL } from '../../assets';

const SplashHeader: React.FC = () => (
  <div className="splash-header">
    <Link to="/"><img id="logo" src={logoURL} alt="AuteurFlix" /></Link>
    <Link className="sign-btn" to="/login">Sign In</Link>
  </div>
);

export default SplashHeader;
