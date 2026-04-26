import React, { useState, useEffect } from 'react';
import ProfileIndexItem from './profile_index_item';
import { Link } from 'react-router-dom';
import EditProfile from './edit_profile';
import AddProfile from './add_profile';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProfiles, updateProfile, deleteProfile, createProfile } from '../../store/api';
import { logoURL, addProfileURL } from '../../assets';

const ManageProfiles: React.FC = () => {
  const [show, setShow] = useState<'profiles' | 'edit form' | 'add profile'>('profiles');
  const [selectedProfile, setSelectedProfile] = useState<{ id: number | string; name: string }>({ id: 0, name: '' });
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => Object.values(state.entities.profiles));
  const userId = useAppSelector((state) => state.session.id!);

  useEffect(() => {
    dispatch(fetchProfiles(userId));
  }, [dispatch, userId]);

  const handleProfileClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectedProfile({
      id: e.currentTarget.id,
      name: e.currentTarget.getAttribute('name') ?? '',
    });
    setShow('edit form');
  };

  const handleCancel = () => {
    setShow('profiles');
    dispatch(fetchProfiles(userId));
  };

  const handleDelete = async (profileId: number | string) => {
    await dispatch(deleteProfile(Number(profileId)));
    await dispatch(fetchProfiles(userId));
    setShow('profiles');
  };

  if (show === 'edit form') {
    return (
      <EditProfile
        handleCancel={handleCancel}
        profile={selectedProfile}
        handleDelete={handleDelete}
      />
    );
  }

  if (show === 'add profile') {
    return (
      <div>
        <AddProfile userId={userId} handleCancel={handleCancel} />
      </div>
    );
  }

  const addProfileButton = profiles.length === 4 ? null : (
    <li className="edit-profile-container" onClick={() => setShow('add profile')}>
      <img id="edit-profile" src={addProfileURL} />
      <p>Add Profile</p>
    </li>
  );

  return (
    <div>
      <Link to="/" className="profiles-home-btn"><img id="logo" src={logoURL} alt="AuteurFlix" /></Link>
      <div className="edit-profiles-container">
        <h1>Manage Profiles:</h1>
        <ul className="edit-profiles-list">
          {profiles.map((profile) => (
            <ProfileIndexItem
              key={profile.id}
              profile={profile}
              handleClick={handleProfileClick}
              darken="yes"
            />
          ))}
          {addProfileButton}
        </ul>
        <Link to="/browse" className="done-link"><p className="done-btn">Done</p></Link>
      </div>
    </div>
  );
};

export default ManageProfiles;
