import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RouteGuard = ({ 
  children, 
  requiredStep, 
  redirectTo = '/login',
  allowedSteps = [],
  requiredFlowState = null,
  allowedFlowStates = []
}) => {
  const { 
    currentStep,
    isSignupInProgress,
    hasSubmittedSecurityQuestions,
    isSignupEmailVerified,
    isPasswordRecoveryInProgress,
    isSecurityVerified,
    isRecoveryEmailVerified
  } = useAuthStore();

  // Helper function to check flow state
  const checkFlowState = () => {
    if (!requiredFlowState && !allowedFlowStates.length) return true;
    
    const currentFlowStates = {
      signupInProgress: isSignupInProgress(),
      securityQuestionsSubmitted: hasSubmittedSecurityQuestions(),
      signupEmailVerified: isSignupEmailVerified(),
      passwordRecoveryInProgress: isPasswordRecoveryInProgress(),
      securityVerified: isSecurityVerified(),
      recoveryEmailVerified: isRecoveryEmailVerified()
    };

    if (requiredFlowState) {
      return currentFlowStates[requiredFlowState];
    }

    return allowedFlowStates.some(state => currentFlowStates[state]);
  };

  // Check if current step is allowed
  const isStepAllowed = () => {
    if (!requiredStep && !allowedSteps.length) return true;
    if (allowedSteps.includes(currentStep)) return true;
    return currentStep === requiredStep;
  };

  // Allow access if:
  // 1. No specific step is required AND no flow state is required
  // 2. Current step is in allowed steps AND flow state is valid
  // 3. Current step matches required step AND flow state is valid
  if ((!requiredStep && !requiredFlowState) || 
      (isStepAllowed() && checkFlowState())) {
    return children;
  }

  // Redirect to specified route if conditions not met
  return <Navigate to={redirectTo} replace />;
};

export default RouteGuard; 