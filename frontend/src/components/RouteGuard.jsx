import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RouteGuard = ({ 
  children, 
  requiredStep, 
  redirectTo,
  allowedSteps = [] 
}) => {
  const { currentStep } = useAuthStore();

  // If no specific step is required, allow access
  if (!requiredStep) {
    return children;
  }

  // If current step is in allowed steps, allow access
  if (allowedSteps.includes(currentStep)) {
    return children;
  }

  // If current step matches required step, allow access
  if (currentStep === requiredStep) {
    return children;
  }

  // Otherwise, redirect to specified route
  return <Navigate to={redirectTo} replace />;
};

export default RouteGuard; 