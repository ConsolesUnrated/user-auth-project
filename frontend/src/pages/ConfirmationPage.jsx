import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <button style={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
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
      position: 'relative',
    },
    logoutButton: {
      position: 'absolute',
      top: '2rem',
      right: '2rem',
      padding: '0.8rem 1.5rem',
      backgroundColor: '#4A90E2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s ease',
      ':hover': {
        backgroundColor: '#357ABD'
      }
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
