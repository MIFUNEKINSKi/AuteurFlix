import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupField: React.FC = () => {
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

  return (
    <div className="signup-container">
      <section className="hero-text">
        <h1>Curated list of movies from Auteur directors and their eras!</h1>
        <h2>Auteur - a filmmaker whose personal influence and artistic control over a movie are so great that the filmmaker is regarded as the author of the movie.</h2>
        <h3>Ready to watch? Enter your email to so we can get to the payment.</h3>
      </section>
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
