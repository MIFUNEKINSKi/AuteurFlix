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
  // Logout is best-effort: even if the server returns an error (e.g. the
  // session already expired server-side), the client must still clear its
  // own state. Swallow non-OK responses rather than throwing.
  try {
    await fetch('/api/session', { method: 'DELETE' });
  } catch {
    // network failure — still proceed with client-side logout
  }
};
