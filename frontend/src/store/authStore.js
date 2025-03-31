import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // Core auth state
  isAuthenticated: false,
  user: null,
  token: null,
  currentStep: null,
  isLoading: false,
  error: null,

  // Signup flow states
  signupInProgress: false,
  signupSecurityQuestionsSubmitted: false,
  signupEmailVerified: false,

  // Password recovery flow states
  passwordRecoveryInProgress: false,
  securityVerified: false,
  recoveryEmailVerified: false,

  // State setters
  setStep: (step) => set({ currentStep: step }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Login Flow Actions
  loginAndRedirect: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await mockLoginAPI(credentials);
      
      if (!response || !response.token) {
        throw new Error('Invalid login response');
      }

      // Update auth state
      set({
        isAuthenticated: true,
        user: response.user,
        token: response.token,
        currentStep: 'authenticated',
        isLoading: false
      });

      // Handle navigation in the store
      window.location.href = '/welcome';
    } catch (error) {
      set({ 
        error: error.message || 'Login failed', 
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null
      });
    }
  },

  logout: () => {
    set({
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
      recoveryEmailVerified: false
    });
  },

  // Signup Flow Actions
  startSignup: (userData) => {
    set({ 
      signupInProgress: true,
      currentStep: 'signup_started',
      error: null
    });
  },

  submitSecurityQuestions: (answers) => {
    set({ 
      signupSecurityQuestionsSubmitted: true,
      currentStep: 'security_questions_submitted',
      error: null
    });
  },

  verifySignupEmail: () => {
    set({ 
      signupEmailVerified: true,
      currentStep: 'email_verified',
      error: null
    });
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
  startPasswordRecovery: (email) => {
    set({ 
      passwordRecoveryInProgress: true,
      currentStep: 'recovery_started',
      error: null
    });
  },

  verifySecurity: (answers) => {
    set({ 
      securityVerified: true,
      currentStep: 'security_verified',
      error: null
    });
  },

  verifyRecoveryEmail: () => {
    set({ 
      recoveryEmailVerified: true,
      currentStep: 'recovery_email_verified',
      error: null
    });
  },

  resetPassword: async (newPassword) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      await mockResetPasswordAPI(newPassword);
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

// Mock API functions (replace with actual API calls)
const mockLoginAPI = async (credentials) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    user: {
      id: 1,
      email: credentials.email,
      firstName: 'John',
      lastName: 'Doe'
    },
    token: 'mock-jwt-token'
  };
};

const mockResetPasswordAPI = async (newPassword) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export default useAuthStore; 