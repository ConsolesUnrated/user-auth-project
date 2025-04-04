import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState(false);
  const [password, setPassword] = useState('');
  
  const passwordValidation = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/login');  // Navigate to login after password reset
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPasswords(true);
  };

  const handleHidePassword = () => {
    setShowPasswords(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Reset Password</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="New Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={styles.requirementsList}>
            <div style={styles.requirementsGrid}>
              {Object.entries({
                '+12 Characters': 'length',
                'Uppercase': 'uppercase',
                'Lowercase': 'lowercase',
                'Number': 'number',
                'Special Character': 'special',
              }).map(([text, key]) => (
                <div key={key} style={styles.requirementItem}>
                  <span style={{
                    ...styles.checkmark,
                    color: passwordValidation[key] ? '#4CAF50' : '#aaa'
                  }}>
                    ✓
                  </span>
                  <span style={{
                    ...styles.requirementText,
                    fontWeight: passwordValidation[key] ? '600' : '400',
                    color: passwordValidation[key] ? '#333' : '#666'
                  }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Confirm New Password"
            style={styles.input}
          />
          <button
            type="button"
            style={styles.showPasswordButton}
            onMouseDown={handleShowPassword}
            onMouseUp={handleHidePassword}
            onMouseLeave={handleHidePassword}
          >
            show password
          </button>
          <button style={styles.button}>
            Reset Password
          </button>
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
    width: '100%',
    boxSizing: 'border-box',
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
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: '#357ABD',
    },
  },
  requirementsList: {
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
    padding: '0 0.5rem',
    width: '100%',
  },
  requirementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.2rem 1rem',
  },
  requirementItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8rem',
  },
  checkmark: {
    transition: 'color 0.2s ease',
  },
  requirementText: {
    transition: 'all 0.2s ease',
  },
  showPasswordButton: {
    background: 'none',
    border: 'none',
    color: '#666',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: '0',
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
    alignSelf: 'flex-end',
    marginLeft: '0.5rem',
  },
};

export default ResetPasswordPage; 