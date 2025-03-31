import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, requiredAuth = true, redirectTo = '/' }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // If we're already on the root path, don't redirect
  if (location.pathname === '/') {
    return children;
  }

  if (requiredAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requiredAuth && isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute; 