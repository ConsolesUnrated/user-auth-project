import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  currentStep: null,
  setStep: (step) => set({ currentStep: step }),
  login: (userData, token) => {
    set({
      isAuthenticated: true,
      user: userData,
      token: token,
      currentStep: 'authenticated'
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      currentStep: null
    });
  },
  updateUser: (userData) => {
    set({
      user: userData
    });
  }
}));

export default useAuthStore; 