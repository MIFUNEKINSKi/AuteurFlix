import type { User } from '../types';

export const signup = async (user: { email: string; password: string }): Promise<User> => {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const login = async (user: { email: string; password: string }): Promise<User> => {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user }),
  });
  if (!res.ok) throw await res.json();
  return res.json();
};

export const logout = async (): Promise<void> => {
  const res = await fetch('/api/session', { method: 'DELETE' });
  if (!res.ok) throw await res.json();
};
