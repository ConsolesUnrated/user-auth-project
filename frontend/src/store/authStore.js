import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  currentStep: null,
  isLoading: false,
  error: null,

  // State setters
  setStep: (step) => set({ currentStep: step }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Auth actions
  login: (userData, token) => {
    set({
      isAuthenticated: true,
      user: userData,
      token: token,
      currentStep: 'authenticated',
      error: null
    });
  },

  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      currentStep: null,
      error: null
    });
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

  // Error handling
  clearError: () => set({ error: null }),

  // Reset state
  reset: () => set({
    isAuthenticated: false,
    user: null,
    token: null,
    currentStep: null,
    isLoading: false,
    error: null
  })
}));

export default useAuthStore; 