import React from 'react';
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
import useAuthStore from './store/authStore';

function AppContent() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div style={styles.app}>
      {isAuthenticated ? <WelcomePage /> : <Login />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
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