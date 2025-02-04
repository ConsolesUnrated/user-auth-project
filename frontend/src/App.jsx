import React from 'react'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ConfirmationPage from './pages/ConfirmationPage'

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
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