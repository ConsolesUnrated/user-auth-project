import React from 'react'
import Signup from './pages/Signup'

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
      <Signup />
    </div>
  )
}

export default App
