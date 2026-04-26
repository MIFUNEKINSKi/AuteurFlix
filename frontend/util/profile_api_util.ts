import type { Profile, ProfileWithList } from '../types';

export const fetchProfiles = async (userId: number): Promise<Record<number, Profile>> => {
  const res = await fetch(`/api/users/${userId}/profiles`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const fetchProfile = async (profileId: number): Promise<ProfileWithList> => {
  const res = await fetch(`/api/profiles/${profileId}`);
  if (!res.ok) throw await res.json();
  return res.json();
};

export const createProfile = async (profile: { user_id: number; name: string }): Promise<Profile> => {
  const res = await fetch(`/api/users/${profile.user_id}/profiles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const updateProfile = async (profile: { id: number; name: string }): Promise<Profile> => {
  const res = await fetch(`/api/profiles/${profile.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const deleteProfile = async (profileId: number): Promise<Record<number, Profile>> => {
  const res = await fetch(`/api/profiles/${profileId}`, { method: 'DELETE' });
  if (!res.ok) throw await res.json();
  return res.json();
};
