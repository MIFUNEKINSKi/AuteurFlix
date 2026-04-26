import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { createProfile } from '../../store/api';

interface Props {
  userId: number;
  handleCancel: () => void;
}

const AddProfile: React.FC<Props> = ({ userId, handleCancel }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Name can't be blank.");
    } else {
      dispatch(createProfile({ user_id: userId, name }))
        .unwrap()
        .then(() => handleCancel())
        .catch((err: any) => {
          if (Array.isArray(err) && err.length > 0) {
            setError(err[0]);
          } else {
            setError('Something went wrong. Please try again.');
          }
        });
    }
  };

  const filled = name === '' ? '' : 'profile-filled';

  return (
    <div className="add-profile-main">
      <header>
        <Link to="/" className="home-button"><img id="logo" src={window.logoURL} alt="AuteurFlix" /></Link>
      </header>
      <div className="add-profile-content">
        <div className="add-profile-text">
          <h1>Add Profile</h1>
          <p>Add a profile for another person watching AuteurFlix.</p>
        </div>
        <div className="add-profile-middle">
          <img src={window.avatar} />
          <div className="add-profile-input-container">
            <input
              className="profile-name-input"
              type="text"
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <label id={filled}>Name</label>
          </div>
        </div>
        <form className="add-profile-bottom" onSubmit={handleSubmit}>
          <p className="profile-error">{error}</p>
          <div className="add-profile-btns">
            <button type="submit" className="save-btn">Continue</button>
            <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
