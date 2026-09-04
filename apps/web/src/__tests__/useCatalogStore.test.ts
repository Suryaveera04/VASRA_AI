import { describe, it, expect, beforeEach } from 'vitest';
import { useCatalogStore } from '../store/useCatalogStore';

describe('useCatalogStore', () => {
  beforeEach(() => {
    useCatalogStore.getState().resetFilters();
  });

  it('should initialize with default catalog filters', () => {
    const { filters } = useCatalogStore.getState();
    expect(filters.category).toBe('');
    expect(filters.sort).toBe('custom');
  });

  it('should update filters dynamically', () => {
    useCatalogStore.getState().setFilter('category', 'kanchipuram');
    useCatalogStore.getState().setFilter('fabric', 'Silk');

    const { filters } = useCatalogStore.getState();
    expect(filters.category).toBe('kanchipuram');
    expect(filters.fabric).toBe('Silk');
  });

  it('should toggle search modal state', () => {
    expect(useCatalogStore.getState().isSearchOpen).toBe(false);
    useCatalogStore.getState().toggleSearch(true);
    expect(useCatalogStore.getState().isSearchOpen).toBe(true);
    useCatalogStore.getState().toggleSearch(false);
    expect(useCatalogStore.getState().isSearchOpen).toBe(false);
  });

  it('should reset filters back to initial state', () => {
    useCatalogStore.getState().setFilter('category', 'banarasi');
    useCatalogStore.getState().resetFilters();
    expect(useCatalogStore.getState().filters.category).toBe('');
  });
});
