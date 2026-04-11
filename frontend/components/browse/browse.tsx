import React from 'react';
import ProfilesIndex from '../profiles/profiles_index';
import GenresIndex from './genres_index';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProfiles, fetchCurrentProfile, createProfile, fetchMovies } from '../../store/api';

const Browse: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.session.id!);
  const profiles = useAppSelector((state) => Object.values(state.entities.profiles));
  const currentProfile = useAppSelector((state) => state.session.profileId);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    dispatch(fetchCurrentProfile(Number(e.currentTarget.id)));
  };

  if (!currentProfile) {
    return (
      <ProfilesIndex
        fetchMovies={() => dispatch(fetchMovies())}
        handleClick={handleClick}
        profiles={profiles}
        fetchProfiles={(userId: number) => { dispatch(fetchProfiles(userId)); }}
        userId={currentUserId}
      />
    );
  }

  return (
    <div>
      <GenresIndex />
    </div>
  );
};

export default Browse;
