import React from 'react';

const ConfirmationPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.checkmark}>✓</div>
        <h1 style={styles.message}>Sign In Successful!</h1>
        <p style={styles.subtext}>Welcome back to your account</p>
      </div>
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'white',
    },
    contentWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      textAlign: 'center',
      marginTop: '-20rem',
    },
    message: {
      fontSize: '2rem',
      color: '#333',
      marginBottom: '20px',
    },
    checkmark: {
      color: '#4A90E2',
      fontSize: '4rem',
      marginBottom: '20px',
    },
    subtext: {
      color: '#4A90E2',
      fontSize: '1.2rem',
    }
};

export default ConfirmationPage;
