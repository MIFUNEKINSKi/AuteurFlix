import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignupFooter from './signup_footer';
import SplashHeader from './splash_header';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { signup } from '../../store/api';
import { resetSessionErrors } from '../../store/errorsSlice';

const SignupForm: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as { email?: string } | null;
  const [email, setEmail] = useState(locationState?.email ?? '');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => Object.values(state.errors.session));

  useEffect(() => {
    dispatch(resetSessionErrors());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetSessionErrors());
    dispatch(signup({ email, password }));
  };

  const emailFilled = email === '' ? '' : 'filled';
  const passFilled = password === '' ? '' : 'filled';
  const passError = errors.filter((error) => String(error).includes('Password'));
  const emailError = errors.filter((error) => String(error).includes('Email'));

  return (
    <div className="signup-main">
      <SplashHeader />
      <div className="signup-form-container">
        <h2>Create a password to start your membership</h2>
        <p>We hate paperwork, too.</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-container">
            <input
              className="signup-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label id={emailFilled}>Email</label>
          </div>
          <p className="signup-error">{emailError[0]}</p>
          <div className="signup-input-container">
            <input
              className="signup-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label id={passFilled}>Add a password</label>
          </div>
          <p className="signup-error">{passError[0]}</p>
          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
      </div>
      <SignupFooter />
    </div>
  );
};

export default SignupForm;
