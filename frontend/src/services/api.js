const API_BASE_URL = 'http://localhost:3001/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = 'API request failed';
    
    if (errorData.message) {
      // For authentication errors, provide a generic message
      if (response.status === 401 || response.status === 404) {
        errorMessage = 'Invalid credentials. Please try again.';
      } else if (response.status === 429) {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else {
        errorMessage = errorData.message;
      }
    }
    
    throw new Error(errorMessage);
  }
  return response.json();
};

// Auth API endpoints
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  // Signup
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Security Questions (Signup)
  submitSecurityQuestionsSignup: async (answers) => {
    const response = await fetch(`${API_BASE_URL}/auth/security-questions-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });
    return handleResponse(response);
  },

  // Email Verification (Signup)
  verifyEmailSignup: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    return handleResponse(response);
  },

  // Password Reset Request
  requestPasswordReset: async (email) => {
    const response = await fetch(`${API_BASE_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  // Security Questions (Password Reset)
  submitSecurityQuestionsReset: async (answers) => {
    const response = await fetch(`${API_BASE_URL}/auth/security-questions-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });
    return handleResponse(response);
  },

  // Email Verification (Password Reset)
  verifyEmailReset: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    return handleResponse(response);
  },

  // Reset Password
  resetPassword: async (newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return handleResponse(response);
  },
}; 