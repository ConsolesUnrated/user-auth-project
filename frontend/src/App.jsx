import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ConfirmationPage from './pages/ConfirmationPage'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
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