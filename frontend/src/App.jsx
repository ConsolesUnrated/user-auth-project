import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Toast from './components/Toast';

// Private
import WelcomePage from './pages/WelcomePage';

// Public Pages:
import Signup from './pages/Sign-up/Signup';
import Login from './pages/Login';
import SendResetLinkPage from './pages/Reset-Password/SendResetLinkPage';

// Sign up flow:
import ConfirmEmail from './pages/Sign-up/ConfirmEmailPage';
import SecurityQuestionsPageSignup from './pages/Sign-up/SecurityQuestionsPageSignup';

// Reset Password flow:
import SecurityQuestions from './pages/Reset-Password/SecurityQuestionsPage';
import ResetPassword from './pages/Reset-Password/ResetPasswordPage';
import LockedOutPage from './pages/Reset-Password/LockedOutPage';

// Auth Provider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';
import useAuthStore from './store/authStore';

const AppContent = () => {
  const { isAuthenticated } = useAuthStore();
  const [toast, setToast] = useState({
    message: 'Thank you! Your email has been successfully confirmed.',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <RouteGuard redirectTo="/welcome">
            <Login />
          </RouteGuard>
        } />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/signup" element={
          <RouteGuard redirectTo="/welcome">
            <Signup />
          </RouteGuard>
        } />
        <Route path="/send-reset-link" element={
          <RouteGuard redirectTo="/welcome">
            <SendResetLinkPage />
          </RouteGuard>
        } />

        {/* Protected Routes */}
        <Route path="/welcome" element={
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
        } />

        {/* Signup Flow Routes */}
        <Route path="/security-questions-signup" element={
          <RouteGuard 
            requiredFlowState="signupInProgress"
            requiredStep="signup_started"
            redirectTo="/signup"
          >
            <SecurityQuestionsPageSignup />
          </RouteGuard>
        } />
        <Route path="/confirm-email" element={
          <RouteGuard 
            requiredFlowState="signupSecurityQuestionsSubmitted"
            requiredStep="security_questions_submitted"
            redirectTo="/security-questions-signup"
          >
            <ConfirmEmail />
          </RouteGuard>
        } />

        {/* Password Recovery Flow Routes */}
        <Route path="/security-questions" element={
          <RouteGuard 
            requiredFlowState="passwordRecoveryInProgress"
            requiredStep="recovery_started"
            redirectTo="/send-reset-link"
          >
            <SecurityQuestions />
          </RouteGuard>
        } />
        <Route path="/reset-password" element={
          <RouteGuard 
            requiredFlowState="securityVerified"
            requiredStep="security_verified"
            redirectTo="/security-questions"
          >
            <ResetPassword />
          </RouteGuard>
        } />

        {/* Account Locked Route */}
        <Route path="/account-locked" element={
          <RouteGuard 
            requiredFlowState="account_locked"
            requiredStep="account_locked"
            redirectTo="/"
          >
            <LockedOutPage />
          </RouteGuard>
        } />

        {/* Catch-all route - redirects any undefined routes to base */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <AppContent />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;