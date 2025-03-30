import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, requiredAuth = true, redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuthStore();

  if (requiredAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!requiredAuth && isAuthenticated) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default ProtectedRoute; 