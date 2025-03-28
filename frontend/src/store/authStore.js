import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (userData, token) => {
    set({
      isAuthenticated: true,
      user: userData,
      token: token
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null
    });
  },
  updateUser: (userData) => {
    set({
      user: userData
    });
  }
}));

export default useAuthStore; 