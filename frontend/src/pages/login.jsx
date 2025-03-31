import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login({
        email: username,
        password: password
      });
      
      if (success) {
        navigate('/welcome');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Login</h1>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <div style={styles.passwordActionsContainer}>
            <button
              type="button"
              style={styles.showPasswordButton}
              onMouseDown={handleShowPassword}
              onMouseUp={handleHidePassword}
              onMouseLeave={handleHidePassword}
            >
              show password
            </button>
            <span style={styles.loginLink}>Forgot Password?</span>
          </div>
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p style={styles.signupText}>
            Don't have an account? Sign up
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
    marginBottom: '2rem',
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
  passwordActionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  loginText: {
    textAlign: 'right',
    color: '#333',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  showPasswordButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '0',
    textAlign: 'left',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  }
};

export default Login;
