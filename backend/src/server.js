const express = require('express');
const cors = require('cors');
const { validateSignup } = require('./middleware/validation');
const { query } = require('./config/db');
const { logDatabaseOperation } = require('./utils/logger');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Get user from database
    const result = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    
    if (result.rows.length === 0) {
      // Log failed attempt for non-existent user
      await query(
        'INSERT INTO login_history (username, ip_address, status, failure_reason, email) VALUES ($1, $2, $3, $4, $5)',
        [username, req.ip, 'failed', 'User not found', username]
      );
      console.log(`Login failed: ${username} - User not found`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    
    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      // Log failed attempt for incorrect password
      await query(
        'INSERT INTO login_history (user_id, username, ip_address, status, failure_reason, email) VALUES ($1, $2, $3, $4, $5, $6)',
        [user.id, username, req.ip, 'failed', 'Invalid password', user.email]
      );
      console.log(`Login failed: ${username} - Invalid password`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Record successful login
    await query(
      'INSERT INTO login_history (user_id, username, ip_address, status, email) VALUES ($1, $2, $3, $4, $5)',
      [user.id, username, req.ip, 'success', user.email]
    );

    // Get login history
    const loginHistoryResult = await query(
      `SELECT 
        COUNT(*) as total_attempts,
        SUM(CASE WHEN status = 'success' THEN 1 ELSE 0 END) as successful_logins,
        MAX(CASE WHEN status = 'success' THEN login_timestamp END) as last_successful_login,
        COUNT(CASE WHEN status = 'failed' AND login_timestamp > NOW() - INTERVAL '24 hours' THEN 1 END) as recent_failed_attempts
       FROM login_history 
       WHERE user_id = $1`,
      [user.id]
    );

    // Get detailed login history
    const detailedHistoryResult = await query(
      `SELECT 
        login_timestamp,
        status,
        failure_reason
       FROM login_history 
       WHERE user_id = $1
       ORDER BY login_timestamp DESC`,
      [user.id]
    );

    const loginHistory = loginHistoryResult.rows[0];
    const successfulLogins = parseInt(loginHistory.successful_logins);
    const lastLogin = loginHistory.last_successful_login;
    const recentFailedAttempts = parseInt(loginHistory.recent_failed_attempts);
    const detailedHistory = detailedHistoryResult.rows;

    // Keep detailed logging in the backend
    logDatabaseOperation('Login', { 
      username: user.username,
      email: user.email,
      successfulLogins,
      lastLogin,
      recentFailedAttempts
    });
    
    // Only send necessary information to frontend
    res.json({
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        loginCount: successfulLogins,
        lastLogin: lastLogin
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signup endpoint with validation
app.post('/api/auth/signup', validateSignup, async (req, res) => {
  try {
    const { 
      username,
      email, 
      password,
      confirmPassword,
      firstName, 
      lastName,
      birthday
    } = req.body;

    // Verify passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check if username already exists
    const usernameCheck = await query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (usernameCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Check if email already exists
    const emailCheck = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // Insert user into database
    const result = await query(
      'INSERT INTO users (username, email, password_hash, first_name, last_name, birthday) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, email, passwordHash, firstName, lastName, birthday]
    );

    const user = result.rows[0];
    logDatabaseOperation('Signup', { 
      username: user.username,
      email: user.email, 
      firstName, 
      lastName,
      birthday 
    });
    
    res.json({
      success: true,
      message: 'Signup initiated successfully',
      userId: user.id
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Security Questions endpoint (for signup)
app.post('/api/auth/security-questions-signup', async (req, res) => {
  try {
    const { 
      userId, 
      question1, 
      answer1, 
      question2, 
      answer2,
      question3,
      answer3
    } = req.body;
    
    await query(
      'INSERT INTO security_questions (user_id, question1, answer1, question2, answer2, question3, answer3) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [userId, question1, answer1, question2, answer2, question3, answer3]
    );

    logDatabaseOperation('Security Questions Added', { userId });
    
    res.json({
      success: true,
      message: 'Security questions submitted successfully'
    });
  } catch (error) {
    console.error('Security questions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Email verification endpoint (for signup)
app.post('/api/auth/verify-email-signup', async (req, res) => {
  try {
    const { userId } = req.body;
    
    await query(
      'UPDATE users SET is_email_verified = true WHERE id = $1',
      [userId]
    );

    logDatabaseOperation('Email Verified', { userId });
    
    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Password reset request endpoint
app.post('/api/auth/request-password-reset', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Generate reset token
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    // Get user ID
    const userResult = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const userId = userResult.rows[0].id;
    
    // Store reset token
    await query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'1 hour\')',
      [userId, token]
    );

    logDatabaseOperation('Password Reset Requested', { email });
    
    res.json({
      success: true,
      message: 'Password reset email sent successfully'
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Security Questions endpoint (for password reset)
app.post('/api/auth/security-questions-reset', async (req, res) => {
  try {
    const { email, answer1, answer2 } = req.body;
    
    // Get user's security questions
    const result = await query(
      `SELECT sq.* FROM security_questions sq 
       JOIN users u ON sq.user_id = u.id 
       WHERE u.email = $1`,
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Security questions not found' });
    }
    
    const questions = result.rows[0];
    
    // Verify answers
    if (questions.answer1 !== answer1 || questions.answer2 !== answer2) {
      return res.status(401).json({ error: 'Invalid answers' });
    }

    logDatabaseOperation('Security Questions Verified', { email });
    
    res.json({
      success: true,
      message: 'Security questions verified successfully'
    });
  } catch (error) {
    console.error('Security questions verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset password endpoint
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await query(
      'UPDATE users SET password_hash = $1 WHERE email = $2',
      [passwordHash, decoded.email]
    );

    logDatabaseOperation('Password Reset', { email: decoded.email });
    
    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  logDatabaseOperation('Logout', {});
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 