import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SignupFooter from './signup_footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/api';
import { resetSessionErrors } from '../../store/errorsSlice';
import { logoURL } from '../../assets';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => Object.values(state.errors.session));

  useEffect(() => {
    dispatch(resetSessionErrors());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetSessionErrors());
    dispatch(login({ email, password }));
  };

  const handleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: 'dan@gmail.com', password: 'password' }));
  };

  const filled = email === '' ? '' : 'filled';
  const passFilled = password === '' ? '' : 'filled';
  const errorList = errors.length > 0
    ? errors.map((error, index) => <li key={index}>{error}</li>)
    : [];

  return (
    <div>
      <div className="login-main">
        <header className="login-header">
          <Link to="./" className="home-button"><img id="logo" src={logoURL} alt="AuteurFlix" /></Link>
        </header>
        <div className="login-container">
          <h2>Sign In</h2>
          <form className="form-content">
            <div className="login-input-container">
              <input
                className="login-input"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label id={filled}>Email address</label>
            </div>
            <div className="login-input-container">
              <input
                className="login-input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label id={passFilled}>Password</label>
            </div>
            {errorList.length > 0 && <ul className="error-list">{errorList}</ul>}
            <button className="login-btn" onClick={handleSubmit}>Sign In</button>
            <button className="login-btn" onClick={handleDemo}>Sign In as Demo User</button>
          </form>
          <span>New to AuteurFlix? <Link to="/signup" className="link-text">Sign up now.</Link></span>
        </div>
      </div>
      <SignupFooter />
    </div>
  );
};

export default LoginForm;
