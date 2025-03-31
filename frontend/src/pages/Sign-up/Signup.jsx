import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthday: ''
  });
  const [password, setPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const navigate = useNavigate();
  const { signupAndRedirect, isLoading, error } = useAuthStore();
  
  const passwordValidation = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupAndRedirect(formData);
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPasswords(true);
  };

  const handleHidePassword = () => {
    setShowPasswords(false);
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>Sign Up</h1>
        {error && <div style={styles.errorMessage}>{error}</div>}
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.nameContainer}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              style={{ ...styles.input, ...styles.nameInput }}
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              style={{ ...styles.input, ...styles.nameInput }}
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            style={styles.input}
            value={formData.username}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type={showPasswords ? "text" : "password"}
            name="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
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
            name="confirmPassword"
            placeholder="Confirm Password"
            style={styles.input}
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
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
          <div>
            <p style={styles.birthdayLabel}>Birthday</p>
            <input
              type="text"
              name="birthday"
              placeholder="MM/DD/YYYY"
              style={styles.input}
              value={formData.birthday}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          <p style={styles.loginText}>
            Already have an account? {' '}
            <span 
              style={styles.loginLink}
              onClick={handleLogin}
              role="button"
              tabIndex={0}
            >
              Login
            </span>
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
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '440px',
    marginTop: '-5rem',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center',
    margin: '0 0 2rem 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '1rem',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '100%',
    marginTop: '0.5rem',
  },
  loginText: {
    marginTop: '1rem',
    textAlign: 'center',
    color: '#333',
    margin: '1rem 0 0 0',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  nameContainer: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
  },
  nameInput: {
    flex: 1,
  },
  birthdayLabel: {
    color: '#333',
    fontSize: '0.9rem',
    margin: '0 0 0.5rem 0',
  },
  requirementsList: {
    margin: '-0.5rem 0 0.5rem 0',
    padding: '0 0.5rem',
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
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: '0',
    marginTop: '-0.5rem',
    marginBottom: '-0.5rem',
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  }
};

export default Signup;