import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SendResetLinkPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just navigate to home or dashboard
    navigate('/security-questions');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Forgot Password</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <p style={styles.loginText}>
            Enter your e-mail address, and we'll give you reset instructions.
          </p>
          <input
            type="text"
            placeholder="Enter your email"
            style={styles.input}
          />
          <button style={styles.button}>
            Request Password Reset
          </button>
          <p style={styles.loginText}>
            Back to <Link to="/login" style={styles.loginLink}>Login</Link>.
          </p>
        </form>
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
    backgroundColor: '#f5f5f5',
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2.5rem',
    marginTop: '-10rem',
    width: '100%',
    maxWidth: '440px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#4A90E2',
    },
  },
  button: {
    padding: '1rem',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: '0.5rem',
    ':hover': {
      backgroundColor: '#357ABD',
    },
  },
  signupText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#333',
  },
  signupLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  loginText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#333',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  },

};

export default SendResetLinkPage;