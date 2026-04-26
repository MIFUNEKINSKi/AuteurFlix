import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/api';

const SignupField: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(email)) {
      navigate('/signup', { state: { email } });
    } else {
      setError('Please enter a valid email.');
    }
  };

  const handleDemo = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(login({ email: 'dan@gmail.com', password: 'password' }));
  };

  return (
    <div className="signup-container">
      <section className="hero-text">
        <p className="hero-eyebrow">The director's cinema, streamed.</p>
        <h1>Films by the people who made them.</h1>
        <h2>
          Kurosawa. Bergman. Lynch. Bong Joon-ho. 27 more auteurs, every
          one of their films, every trailer.
        </h2>
        <h3>Free demo, no email needed — built as a portfolio piece.</h3>
      </section>

      <div className="splash-cta-row">
        <button type="button" className="signup-btn signup-btn-primary" onClick={handleDemo}>
          Try the Demo
        </button>
        <span className="splash-cta-or">or sign up with your email</span>
      </div>

      <form className="signup-field-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="email"
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder={email === '' ? 'Email address' : ''}
          />
          {email !== '' && <label id="filled">Email address</label>}
        </div>
        <button className="signup-btn" type="submit">Get Started</button>
      </form>
      <div className="splash-errors">{error}</div>
    </div>
  );
};

export default SignupField;
