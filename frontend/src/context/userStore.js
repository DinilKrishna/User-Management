import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  // Rehydrate user state from localStorage
  rehydrateUser: () => {
    const token = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (token && isAdmin) {
      // Optionally, decode token or store additional info
      set({ user: { token, isAdmin } });
    }
  },
}));
