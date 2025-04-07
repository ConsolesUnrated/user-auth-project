import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, requiredAuth = true, redirectTo = '/' }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (requiredAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!requiredAuth && isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute; 