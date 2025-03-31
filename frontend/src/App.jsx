import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';
import useAuthStore from './store/authStore';

const AppContent = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <RouteGuard redirectTo="/welcome">
          <Login />
        </RouteGuard>
      } />
      <Route path="/signup" element={
        <RouteGuard redirectTo="/welcome">
          <Signup />
        </RouteGuard>
      } />
      <Route path="/forgot-password" element={
        <RouteGuard redirectTo="/welcome">
          <ForgotPassword />
        </RouteGuard>
      } />

      {/* Protected Routes */}
      <Route path="/welcome" element={
        <ProtectedRoute>
          <WelcomePage />
        </ProtectedRoute>
      } />

      {/* Signup Flow Routes */}
      <Route path="/security-questions" element={
        <RouteGuard 
          requiredFlowState="signupInProgress"
          redirectTo="/signup"
        >
          <SecurityQuestions />
        </RouteGuard>
      } />
      <Route path="/confirm-email" element={
        <RouteGuard 
          requiredFlowState="securityQuestionsSubmitted"
          redirectTo="/security-questions"
        >
          <ConfirmEmail />
        </RouteGuard>
      } />

      {/* Password Recovery Flow Routes */}
      <Route path="/reset-password" element={
        <RouteGuard 
          requiredFlowState="securityVerified"
          redirectTo="/forgot-password"
        >
          <ResetPassword />
        </RouteGuard>
      } />

      {/* Account Locked Route */}
      <Route path="/account-locked" element={
        <RouteGuard 
          requiredFlowState="account_locked"
          redirectTo="/login"
        >
          <AccountLocked />
        </RouteGuard>
      } />

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
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