import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn = useAppSelector((state) => Boolean(state.session.id));
  const location = useLocation();
  return loggedIn ? <Navigate to="/browse" replace state={{ from: location }} /> : <>{children}</>;
};

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedIn = useAppSelector((state) => Boolean(state.session.id));
  const location = useLocation();
  return loggedIn ? <>{children}</> : <Navigate to="/" replace state={{ from: location }} />;
};
