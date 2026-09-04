import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../store/useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
  });

  it('should initialize with correct default state', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle logout cleanly', async () => {
    localStorage.setItem('sree_ram_admin_token', 'mock_token');
    useAuthStore.setState({
      user: { id: '1', name: 'Admin', email: 'admin@sreeramsilks.com', role: 'SUPER_ADMIN' },
      isAuthenticated: true,
    });

    await useAuthStore.getState().logout();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('checkAuth should reset state if no token exists in localStorage', async () => {
    await useAuthStore.getState().checkAuth();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
