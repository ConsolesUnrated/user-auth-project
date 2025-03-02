import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConfirmationPage from './pages/WelcomePage'
import Signup from './pages/Sign-up/Signup'
import Login from './pages/Login'
import SendResetLinkPage from './pages/Reset-Password/SendResetLinkPage'
import ResetPasswordPage from './pages/Reset-Password/ResetPasswordPage'
import SecurityQuestionsPage from './pages/Reset-Password/SecurityQuestionsPage'
import LockedOutPage from './pages/Reset-Password/LockedOutPage'
import SecurityQuestionsPageSignup from './pages/Sign-up/SecurityQuestionsPageSignup'
import ConfirmEmailPage from './pages/Sign-up/ConfirmEmailPage'
function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/sendresetlinkpage" element={<SendResetLinkPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/security-questions" element={<SecurityQuestionsPage />} />
          <Route path="/locked-out" element={<LockedOutPage />} />
          <Route path="/security-questions-signup" element={<SecurityQuestionsPageSignup />} />
          <Route path="/confirm-email" element={<ConfirmEmailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}


const styles = {
  app: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  }
};
export default App