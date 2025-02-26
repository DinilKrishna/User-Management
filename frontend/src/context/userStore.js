import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  
  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  // Rehydrate user state from localStorage
  rehydrateUser: () => {
    const token = localStorage.getItem('accessToken');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    if (token) {
      // Even if isAdmin is false, you can set the user details.
      set({ user: { token, isAdmin, email, username } });
    }
  },
}));
