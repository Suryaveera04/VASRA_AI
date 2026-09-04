import { create } from 'zustand';
import { CartItem, Product } from '../types';
import { api } from '../lib/api';

interface CartState {
  sessionId: string;
  items: CartItem[];
  isOpen: boolean;
  source: 'AI_AGENT' | 'DIRECT';
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number, selectedDrape?: string, source?: 'AI_AGENT' | 'DIRECT') => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotalItems: () => number;
}

function getOrCreateSessionId(): string {
  let id = localStorage.getItem('vasra_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem('vasra_session_id', id);
  }
  return id;
}

function loadPersistedItems(): CartItem[] {
  try {
    const raw = localStorage.getItem('vasra_cart_items');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveItemsToStorage(items: CartItem[]) {
  try {
    localStorage.setItem('vasra_cart_items', JSON.stringify(items));
  } catch {}
}

export const useCartStore = create<CartState>((set, get) => ({
  sessionId: getOrCreateSessionId(),
  items: loadPersistedItems(),
  isOpen: false,
  source: 'DIRECT',

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, quantity = 1, selectedDrape = 'Nivi', source = 'DIRECT') => {
    const { items, sessionId } = get();
    const existingIndex = items.findIndex((i) => i.productId === product._id);
    let updatedItems: CartItem[] = [];

    if (existingIndex > -1) {
      updatedItems = [...items];
      updatedItems[existingIndex].quantity += quantity;
      if (selectedDrape) updatedItems[existingIndex].selectedDrape = selectedDrape;
    } else {
      updatedItems = [
        ...items,
        {
          productId: product._id,
          name: product.name,
          sku: product.sku,
          image: product.images[0]?.url || '/images/products/kanchipuram_red_gold.png',
          price: product.price,
          quantity,
          fabric: product.attributes?.fabric,
          selectedDrape,
        },
      ];
    }

    set({ items: updatedItems, isOpen: true, source });
    saveItemsToStorage(updatedItems);
    api.saveCart({ sessionId, items: updatedItems, source }).catch(() => {});
  },

  removeItem: (productId) => {
    const { items, sessionId, source } = get();
    const updatedItems = items.filter((i) => i.productId !== productId);
    set({ items: updatedItems });
    saveItemsToStorage(updatedItems);
    api.saveCart({ sessionId, items: updatedItems, source }).catch(() => {});
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    const { items, sessionId, source } = get();
    const updatedItems = items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
    set({ items: updatedItems });
    saveItemsToStorage(updatedItems);
    api.saveCart({ sessionId, items: updatedItems, source }).catch(() => {});
  },

  clearCart: () => {
    set({ items: [] });
    saveItemsToStorage([]);
    const { sessionId, source } = get();
    api.saveCart({ sessionId, items: [], source }).catch(() => {});
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
