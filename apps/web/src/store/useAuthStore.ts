import { create } from 'zustand';
import { AdminUser } from '../types';
import { api } from '../lib/api';

interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('sree_ram_admin_token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const { admin } = await api.login({ email, password });
      set({ user: admin, isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.logout();
    } catch (e) {
      // ignore
    }
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    if (!localStorage.getItem('sree_ram_admin_token')) {
      set({ user: null, isAuthenticated: false });
      return;
    }
    try {
      const user = await api.getMe();
      set({ user, isAuthenticated: true });
    } catch (e) {
      localStorage.removeItem('sree_ram_admin_token');
      set({ user: null, isAuthenticated: false });
    }
  },
}));
