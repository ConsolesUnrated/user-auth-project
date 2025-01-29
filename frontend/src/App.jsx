import React from 'react'
import ConfirmationPage from './pages/ConfirmationPage'

const styles = {
  app: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  }
};

function App() {
  return (
    <div style={styles.app}>
      <ConfirmationPage />
    </div>
  )
}

export default App
