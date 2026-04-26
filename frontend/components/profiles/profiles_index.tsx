import React, { useState, useEffect } from 'react';
import ProfileIndexItem from './profile_index_item';
import { Link } from 'react-router-dom';
import AddProfile from './add_profile';
import type { Profile } from '../../types';
import { logoURL, addProfileURL } from '../../assets';

interface Props {
  profiles: Profile[];
  userId: number;
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  fetchProfiles: (userId: number) => void;
  fetchMovies: () => void;
}

const ProfilesIndex: React.FC<Props> = ({ profiles, userId, handleClick, fetchProfiles, fetchMovies }) => {
  const [show, setShow] = useState<'profiles' | 'add profile'>('profiles');

  useEffect(() => {
    fetchProfiles(userId);
    fetchMovies();
  }, [fetchProfiles, fetchMovies, userId]);

  const handleCancel = () => setShow('profiles');

  if (show === 'add profile') {
    return (
      <div>
        <AddProfile userId={userId} handleCancel={handleCancel} />
      </div>
    );
  }

  const addProfile = profiles.length === 4 ? null : (
    <li className="add-profile-container" onClick={() => setShow('add profile')}>
      <img id="add-profile" src={addProfileURL} />
      <p>Add Profile</p>
    </li>
  );

  return (
    <div>
      <Link to="/" className="profiles-home-btn"><img id="logo" src={logoURL} alt="AuteurFlix" /></Link>
      <div className="profiles-container">
        <h1>Who's Watching?</h1>
        <ul className="profiles-list">
          {profiles.map((profile) => (
            <ProfileIndexItem
              key={profile.id}
              profile={profile}
              handleClick={handleClick}
              pencil="hidden"
            />
          ))}
          {addProfile}
        </ul>
        <Link className="manage-link" to="/manageprofiles">
          <p className="manage">Manage Profiles</p>
        </Link>
      </div>
    </div>
  );
};

export default ProfilesIndex;
