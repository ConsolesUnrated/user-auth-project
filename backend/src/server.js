const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  res.json({
    user: {
      id: 1,
      email: req.body.email,
      firstName: 'John',
      lastName: 'Doe'
    },
    token: 'mock-jwt-token'
  });
});

// Signup endpoint
app.post('/api/auth/signup', (req, res) => {
  res.json({
    success: true,
    message: 'Signup initiated successfully'
  });
});

// Security Questions endpoint (for signup)
app.post('/api/auth/security-questions-signup', (req, res) => {
  res.json({
    success: true,
    message: 'Security questions submitted successfully'
  });
});

// Email verification endpoint (for signup)
app.post('/api/auth/verify-email-signup', (req, res) => {
  res.json({
    success: true,
    message: 'Email verified successfully'
  });
});

// Password reset request endpoint
app.post('/api/auth/request-password-reset', (req, res) => {
  res.json({
    success: true,
    message: 'Password reset email sent successfully'
  });
});

// Security Questions endpoint (for password reset)
app.post('/api/auth/security-questions-reset', (req, res) => {
  res.json({
    success: true,
    message: 'Security questions verified successfully'
  });
});

// Email verification endpoint (for password reset)
app.post('/api/auth/verify-email-reset', (req, res) => {
  res.json({
    success: true,
    message: 'Email verified successfully'
  });
});

// Reset password endpoint
app.post('/api/auth/reset-password', (req, res) => {
  res.json({
    success: true,
    message: 'Password reset successfully'
  });
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  console.log('\x1b[32m%s\x1b[0m', 'Successful logout'); // This will show in green in the terminal
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 