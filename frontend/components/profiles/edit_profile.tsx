import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { updateProfile } from '../../store/api';
import { logoURL, avatarURL } from '../../assets';

interface Props {
  profile: { id: number | string; name: string };
  handleCancel: () => void;
  handleDelete: (profileId: number | string) => void;
}

const EditProfile: React.FC<Props> = ({ profile, handleCancel, handleDelete }) => {
  const [name, setName] = useState(profile.name);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.length === 0) {
      setError("Name can't be blank.");
    } else {
      dispatch(updateProfile({ id: Number(profile.id), name }))
        .unwrap()
        .then(() => handleCancel());
    }
  };

  return (
    <div className="edit-profile-main">
      <Link to="/" className="profiles-home-btn"><img id="logo" src={logoURL} alt="AuteurFlix" /></Link>
      <div className="edit-profile-content">
        <div className="edit-profile-text">
          <h1>Edit Profile</h1>
        </div>
        <form className="edit-profile-form" onSubmit={handleEditSubmit}>
          <div className="img-input-container">
            <img src={avatarURL} alt="" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="edit-profile-bottom">
            <p className="profile-error">{error}</p>
            <div className="edit-buttons-container">
              <button type="submit" className="save-btn">Save</button>
              <button type="button" className="cancel-btn" onClick={() => handleCancel()}>Cancel</button>
              <button type="button" className="cancel-btn" onClick={() => handleDelete(profile.id)}>Delete Profile</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
