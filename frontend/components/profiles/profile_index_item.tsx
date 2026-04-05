import React from 'react';
import type { Profile } from '../../types';

interface Props {
  profile: Profile;
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  darken?: string;
  pencil?: string;
}

const ProfileIndexItem: React.FC<Props> = ({ profile, handleClick, darken, pencil }) => {
  const dark = darken === 'yes' ? 'dark' : '';
  return (
    <li
      id={String(profile.id)}
      // @ts-expect-error — name attribute used for reading in parent click handler
      name={profile.name}
      onClick={handleClick}
      className="profile-item"
    >
      <img src={window.avatar} className={dark} />
      <img
        src={window.editPencil}
        className={pencil === 'hidden' ? 'pencil hidden' : 'pencil'}
      />
      <p>{profile.name}</p>
    </li>
  );
};

export default ProfileIndexItem;
