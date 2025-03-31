import { create } from 'zustand';
import { authAPI } from '../services/api';

// Load initial state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Handle errors here
  }
};

const useAuthStore = create((set, get) => ({
  // Core auth state
  isAuthenticated: loadState()?.isAuthenticated || false,
  user: loadState()?.user || null,
  token: loadState()?.token || null,
  currentStep: loadState()?.currentStep || null,
  isLoading: false,
  error: null,

  // Signup flow states
  signupInProgress: loadState()?.signupInProgress || false,
  signupSecurityQuestionsSubmitted: loadState()?.signupSecurityQuestionsSubmitted || false,
  signupEmailVerified: loadState()?.signupEmailVerified || false,

  // Password recovery flow states
  passwordRecoveryInProgress: loadState()?.passwordRecoveryInProgress || false,
  securityVerified: loadState()?.securityVerified || false,
  recoveryEmailVerified: loadState()?.recoveryEmailVerified || false,

  // State setters with persistence
  setStep: (step) => {
    set({ currentStep: step });
    saveState(get());
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Login Flow Actions
  loginAndRedirect: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      
      if (!response || !response.token) {
        throw new Error('Invalid login response');
      }

      // Update auth state
      const newState = {
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        currentStep: 'authenticated',
        isLoading: false
      };
      set(newState);
      saveState(newState);

      // Handle navigation in the store
      window.location.href = '/welcome';
    } catch (error) {
      const errorState = { 
        error: error.message || 'Login failed', 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      };
      set(errorState);
      saveState(errorState);
    }
  },

  logout: async () => {
    try {
      // Call logout endpoint
      await authAPI.logout();
      
      // Clear localStorage
      localStorage.removeItem('authState');
      
      // Reset all state
      const resetState = {
        isAuthenticated: false,
        user: null,
        token: null,
        currentStep: null,
        // Reset all flow states
        signupInProgress: false,
        signupSecurityQuestionsSubmitted: false,
        signupEmailVerified: false,
        passwordRecoveryInProgress: false,
        securityVerified: false,
        recoveryEmailVerified: false,
        isLoading: false,
        error: null
      };
      
      set(resetState);

      // Handle navigation
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  // Signup Flow Actions
  signupAndRedirect: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.signup(userData);
      
      if (!response || !response.success) {
        throw new Error('Invalid signup response');
      }

      // Update auth state
      set({
        signupInProgress: true,
        currentStep: 'signup_started',
        isLoading: false,
        error: null
      });

      // Handle navigation to security questions
      window.location.href = '/security-questions-signup';
    } catch (error) {
      set({ 
        error: error.message || 'Signup failed', 
        isLoading: false,
        signupInProgress: false
      });
    }
  },

  submitSecurityQuestions: async (answers) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.submitSecurityQuestionsSignup(answers);
      if (!response || !response.success) {
        throw new Error('Failed to submit security questions');
      }
      set({ 
        signupSecurityQuestionsSubmitted: true,
        currentStep: 'security_questions_submitted',
        error: null,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to submit security questions',
        isLoading: false
      });
    }
  },

  verifySignupEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.verifyEmailSignup(token);
      if (!response || !response.success) {
        throw new Error('Failed to verify email');
      }
      set({ 
        signupEmailVerified: true,
        currentStep: 'email_verified',
        error: null,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to verify email',
        isLoading: false
      });
    }
  },

  completeSignup: () => {
    set({ 
      signupInProgress: false,
      signupSecurityQuestionsSubmitted: false,
      signupEmailVerified: false,
      currentStep: 'signup_completed',
      error: null
    });
  },

  // Password Recovery Flow Actions
  startPasswordRecovery: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.requestPasswordReset(email);
      if (!response || !response.success) {
        throw new Error('Failed to initiate password recovery');
      }
      set({ 
        passwordRecoveryInProgress: true,
        currentStep: 'recovery_started',
        error: null,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to initiate password recovery',
        isLoading: false
      });
    }
  },

  verifySecurity: async (answers) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.submitSecurityQuestionsReset(answers);
      if (!response || !response.success) {
        throw new Error('Failed to verify security questions');
      }
      set({ 
        securityVerified: true,
        currentStep: 'security_verified',
        error: null,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to verify security questions',
        isLoading: false
      });
    }
  },

  verifyRecoveryEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.verifyEmailReset(token);
      if (!response || !response.success) {
        throw new Error('Failed to verify recovery email');
      }
      set({ 
        recoveryEmailVerified: true,
        currentStep: 'recovery_email_verified',
        error: null,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to verify recovery email',
        isLoading: false
      });
    }
  },

  resetPassword: async (newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.resetPassword(newPassword);
      if (!response || !response.success) {
        throw new Error('Failed to reset password');
      }
      set({
        passwordRecoveryInProgress: false,
        securityVerified: false,
        recoveryEmailVerified: false,
        currentStep: 'password_reset_completed',
        isLoading: false
      });
      return true;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  // User management
  updateUser: (userData) => {
    set({
      user: userData,
      error: null
    });
  },

  // Auth state checks
  isLoggedIn: () => get().isAuthenticated,
  hasToken: () => !!get().token,
  getUser: () => get().user,

  // Flow state checks
  isSignupInProgress: () => get().signupInProgress,
  hasSubmittedSecurityQuestions: () => get().signupSecurityQuestionsSubmitted,
  isSignupEmailVerified: () => get().signupEmailVerified,
  isPasswordRecoveryInProgress: () => get().passwordRecoveryInProgress,
  isSecurityVerified: () => get().securityVerified,
  isRecoveryEmailVerified: () => get().recoveryEmailVerified,

  // Error handling
  clearError: () => set({ error: null }),

  // Reset state
  reset: () => set({
    isAuthenticated: false,
    user: null,
    token: null,
    currentStep: null,
    isLoading: false,
    error: null,
    // Reset all flow states
    signupInProgress: false,
    signupSecurityQuestionsSubmitted: false,
    signupEmailVerified: false,
    passwordRecoveryInProgress: false,
    securityVerified: false,
    recoveryEmailVerified: false
  })
}));

export default useAuthStore; 