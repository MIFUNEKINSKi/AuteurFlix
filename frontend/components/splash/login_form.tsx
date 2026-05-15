import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/api';
import { resetSessionErrors } from '../../store/errorsSlice';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const errors = useAppSelector((state) => Object.values(state.errors.session));

  useEffect(() => { dispatch(resetSessionErrors()); }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetSessionErrors());
    dispatch(login({ email, password }));
  };

  const handleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: 'dan@gmail.com', password: 'password' }));
  };

  return (
    <div className="auth-page">
      <header className="auth-header">
        <Link to="/" className="wordmark wordmark-md">
          <span className="wordmark-a">A</span>
          <span className="wordmark-rest">UTEUR</span>
          <span className="wordmark-flix">/flix</span>
        </Link>
      </header>
      <div className="auth-card">
        <span className="t-eyebrow">Returning viewer</span>
        <h1 className="t-display auth-title"><em>Sign in.</em></h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="t-meta">Email</span>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="auth-field">
            <span className="t-meta">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </label>
          {errors.length > 0 && (
            <ul className="auth-errors">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
          <div className="auth-actions">
            <button type="submit" className="btn btn-accent">Sign in</button>
            <button type="button" className="btn btn-outline" onClick={handleDemo}>Use demo account</button>
          </div>
        </form>
        <p className="t-meta auth-aside">
          New to AuteurFlix? <Link to="/signup" className="auth-link">Make a profile.</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
