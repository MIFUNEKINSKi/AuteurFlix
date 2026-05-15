import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  useEffect(() => { dispatch(resetSessionErrors()); }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetSessionErrors());
    dispatch(signup({ email, password }));
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
        <span className="t-eyebrow">New viewer</span>
        <h1 className="t-display auth-title"><em>Make a profile.</em></h1>
        <p className="t-body auth-sub">No card, no commitment. A portfolio piece — the signup creates a real account scoped to your inbox.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-field">
            <span className="t-meta">Email</span>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>
          <label className="auth-field">
            <span className="t-meta">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </label>
          {errors.length > 0 && (
            <ul className="auth-errors">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
          <div className="auth-actions">
            <button type="submit" className="btn btn-accent">Make profile</button>
          </div>
        </form>
        <p className="t-meta auth-aside">
          Already have one? <Link to="/login" className="auth-link">Sign in.</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
