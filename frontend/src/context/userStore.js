import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  // Rehydrate user state from localStorage
  rehydrateUser: () => {
    const token = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      // You may also want to store additional info like name, email, etc.
      set({ user: { token, isAdmin } });
    }
  },
}));
