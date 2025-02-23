import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConfirmationPage from './pages/ConfirmationPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import SendResetLinkPage from './pages/Reset-Password/SendResetLinkPage'
import ResetPasswordPage from './pages/Reset-Password/ResetPasswordPage'
import SecurityQuestionsPage from './pages/Reset-Password/SecurityQuestionsPage'

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/sendresetlinkpage" element={<SendResetLinkPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/security-questions" element={<SecurityQuestionsPage />} />
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