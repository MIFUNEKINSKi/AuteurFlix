import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomSignupField: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valid.test(email)) {
      navigate('/signup', { state: { email } });
    } else {
      setError('Please enter a valid email.');
    }
  };

  const filled = email === '' ? '' : 'filled';

  return (
    <div className="btm-signup-container">
      <section className="hero-text" />
      <form className="signup-field-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="email"
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <label id={filled}>Email address</label>
          <button className="signup-btn" type="submit">Get Started &gt;</button>
        </div>
      </form>
      <div className="splash-errors">{error}</div>
    </div>
  );
};

export default BottomSignupField;
