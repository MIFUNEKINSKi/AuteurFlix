import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddProfile from './add_profile';
import type { Profile } from '../../types';

interface Props {
  profiles: Profile[];
  userId: number;
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  fetchProfiles: (userId: number) => void;
  fetchMovies: () => void;
}

const TONES = ['#7a1f24', '#1f3a3a', '#c98a3b', '#3a3a3a', '#5c1a1f'];

const ProfilesIndex: React.FC<Props> = ({ profiles, userId, handleClick, fetchProfiles, fetchMovies }) => {
  const [show, setShow] = useState<'profiles' | 'add profile'>('profiles');

  useEffect(() => {
    fetchProfiles(userId);
    fetchMovies();
  }, [fetchProfiles, fetchMovies, userId]);

  const handleCancel = () => setShow('profiles');

  if (show === 'add profile') {
    return <AddProfile userId={userId} handleCancel={handleCancel} />;
  }

  const glyphFor = (name: string) => name.trim()[0]?.toLowerCase() ?? 'a';

  return (
    <div className="profile-picker">
      <Link to="/" className="profile-picker-mark">
        <span className="wordmark wordmark-md">
          <span className="wordmark-a">A</span>
          <span className="wordmark-rest">UTEUR</span>
          <span className="wordmark-flix">/flix</span>
        </span>
      </Link>
      <div className="profile-picker-inner">
        <span className="t-eyebrow profile-picker-eyebrow">Welcome back · pick a viewer</span>
        <h1 className="t-display profile-picker-title"><em>Who's watching?</em></h1>
        <div className="profile-grid">
          {profiles.map((profile, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <button
                key={profile.id}
                type="button"
                className="profile-card"
                id={String(profile.id)}
                onClick={(e) => handleClick(e as unknown as React.MouseEvent<HTMLLIElement>)}
              >
                <div className="profile-card-tile" style={{ background: tone }}>
                  <span className="profile-card-num t-meta">№{String(i + 1).padStart(2, '0')}</span>
                  <span className="profile-card-glyph">{glyphFor(profile.name)}</span>
                  <span className="profile-card-role t-meta">Viewer</span>
                </div>
                <div className="profile-card-foot">
                  <span className="profile-card-name">{profile.name}</span>
                  <span className="t-meta">Profile №{String(i + 1).padStart(2, '0')}</span>
                </div>
              </button>
            );
          })}
          {profiles.length < 4 && (
            <button type="button" className="profile-card add" onClick={() => setShow('add profile')}>
              <div className="profile-card-tile add-tile">
                <span className="add-plus">+</span>
                <span className="t-meta">Add a viewer</span>
              </div>
              <div className="profile-card-foot">
                <span className="profile-card-name profile-card-name-mute">New profile</span>
                <span className="t-meta">Up to 4</span>
              </div>
            </button>
          )}
        </div>
        <div className="profile-picker-foot">
          <Link to="/manageprofiles" className="btn btn-outline">Manage profiles</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilesIndex;
