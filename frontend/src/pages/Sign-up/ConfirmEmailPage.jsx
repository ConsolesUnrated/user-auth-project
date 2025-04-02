import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmEmailPage = () => {
  const navigate = useNavigate();
  
  const handleReturnToLogin = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Confirm Your Email</h1>
        <div style={styles.iconContainer}>
          <span style={styles.emailIcon}>✉️</span>
        </div>
        <p style={styles.message}>
          We've sent a confirmation email to your address.
        </p>
        <p style={styles.instruction}>
          Please check your inbox and spam/junk folders to verify your account.
        </p>
        <p style={styles.redirectInfo}>
          After confirming your email, you will be automatically redirected to the login page.
        </p>
        <button 
          style={styles.button}
          onClick={handleReturnToLogin}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        width: '90%',
        maxWidth: '500px',
        textAlign: 'center',
    },
    title: {
        color: '#333',
        marginBottom: '20px',
    },
    iconContainer: {
        margin: '20px 0',
    },
    emailIcon: {
        fontSize: '50px',
    },
    message: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '15px 0',
    },
    instruction: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '15px',
    },
    redirectInfo: {
        fontSize: '16px',
        color: '#555',
        marginBottom: '30px',
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#4285f4',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '12px 24px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    }
};

export default ConfirmEmailPage;