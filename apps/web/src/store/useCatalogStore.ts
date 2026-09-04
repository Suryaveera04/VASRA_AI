import { create } from 'zustand';
import { Product, Category, CatalogFilterState } from '../types';

interface CatalogStoreState {
  filters: CatalogFilterState;
  isSearchOpen: boolean;
  isFilterDrawerOpen: boolean;
  quickViewProduct: Product | null;
  setFilter: (key: keyof CatalogFilterState, value: any) => void;
  setFilters: (filters: Partial<CatalogFilterState>) => void;
  resetFilters: () => void;
  toggleSearch: (open?: boolean) => void;
  toggleFilterDrawer: (open?: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
}

const initialFilters: CatalogFilterState = {
  category: '',
  fabric: '',
  color: '',
  occasion: '',
  weave: '',
  border: '',
  minPrice: undefined,
  maxPrice: undefined,
  sort: 'custom',
  q: '',
};

export const useCatalogStore = create<CatalogStoreState>((set) => ({
  filters: initialFilters,
  isSearchOpen: false,
  isFilterDrawerOpen: false,
  quickViewProduct: null,

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: initialFilters }),

  toggleSearch: (open) =>
    set((state) => ({ isSearchOpen: open !== undefined ? open : !state.isSearchOpen })),

  toggleFilterDrawer: (open) =>
    set((state) => ({ isFilterDrawerOpen: open !== undefined ? open : !state.isFilterDrawerOpen })),

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
}));
