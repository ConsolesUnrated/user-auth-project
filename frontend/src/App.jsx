import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import Signup from './pages/Sign-up/Signup';
import Login from './pages/login';
import SendResetLinkPage from './pages/Reset-Password/SendResetLinkPage';
import ResetPasswordPage from './pages/Reset-Password/ResetPasswordPage';
import SecurityQuestionsPage from './pages/Reset-Password/SecurityQuestionsPage';
import LockedOutPage from './pages/Reset-Password/LockedOutPage';
import SecurityQuestionsPageSignup from './pages/Sign-up/SecurityQuestionsPageSignup';
import ConfirmEmailPage from './pages/Sign-up/ConfirmEmailPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RouteGuard from './components/RouteGuard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requiredAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requiredAuth={false}>
                  <Signup />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <ProtectedRoute requiredAuth={false}>
                  <SendResetLinkPage />
                </ProtectedRoute>
              } 
            />

            {/* Gated Routes */}
            <Route 
              path="/reset-password" 
              element={
                <ProtectedRoute>
                  <RouteGuard 
                    requiredStep="security_questions_verified"
                    redirectTo="/security-questions"
                  >
                    <ResetPasswordPage />
                  </RouteGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/security-questions" 
              element={
                <ProtectedRoute>
                  <RouteGuard 
                    requiredStep="signup_completed"
                    allowedSteps={['password_recovery_initiated']}
                    redirectTo="/login"
                  >
                    <SecurityQuestionsPage />
                  </RouteGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/confirm-email" 
              element={
                <ProtectedRoute>
                  <RouteGuard 
                    requiredStep="security_questions_completed"
                    redirectTo="/security-questions"
                  >
                    <ConfirmEmailPage />
                  </RouteGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/welcome" 
              element={
                <ProtectedRoute>
                  <RouteGuard 
                    requiredStep="authenticated"
                    redirectTo="/login"
                  >
                    <WelcomePage />
                  </RouteGuard>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account-locked" 
              element={
                <ProtectedRoute>
                  <RouteGuard 
                    requiredStep="account_locked"
                    redirectTo="/login"
                  >
                    <LockedOutPage />
                  </RouteGuard>
                </ProtectedRoute>
              } 
            />

            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

const styles = {
  app: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  }
};

export default App;