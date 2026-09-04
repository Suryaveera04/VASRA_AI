import { create } from 'zustand';
import { Product, AgentMessageResponse } from '../types';
import { api } from '../lib/api';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  products?: Product[];
  selectedProduct?: Product;
  comparedProducts?: Product[];
  tryOnJobId?: string;
  suggestedActions?: Array<{ label: string; action: string; payload?: any }>;
  explainabilityBadge?: string;
  gatedConfirmationRequired?: boolean;
  orderTotal?: number;
  timestamp: Date;
}

interface AIStylistState {
  isOpen: boolean;
  sessionId: string;
  messages: ChatMessage[];
  isLoading: boolean;
  activeTryOnModal: boolean;
  tryOnProduct: Product | null;
  activeCompareModal: boolean;
  compareProducts: Product[];
  activeVisualSearchModal: boolean;

  openStylist: (initialPrompt?: string) => void;
  closeStylist: () => void;
  toggleStylist: () => void;
  sendMessage: (text: string) => Promise<void>;
  openTryOn: (product: Product) => void;
  closeTryOn: () => void;
  openCompare: (products: Product[]) => void;
  closeCompare: () => void;
  openVisualSearch: () => void;
  closeVisualSearch: () => void;
  resetConversation: () => void;
}

function getOrCreateSessionId(): string {
  let id = localStorage.getItem('vasra_session_id');
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    localStorage.setItem('vasra_session_id', id);
  }
  return id;
}

export const useAIStylistStore = create<AIStylistState>((set, get) => ({
  isOpen: false,
  sessionId: getOrCreateSessionId(),
  messages: [
    {
      id: 'msg_welcome',
      sender: 'agent',
      text: 'Namaste 🙏 Welcome to **VASRĀ AI Showroom**. I am your personal Saree Stylist. Tell me what occasion, color, or budget you are shopping for today!',
      suggestedActions: [
        { label: '✨ Traditional Red Wedding Saree under ₹10,000', action: 'SEND_PROMPT', payload: { prompt: 'Show me a traditional red silk saree for a wedding under ₹10,000' } },
        { label: '👑 Banarasi Brocade for Reception', action: 'SEND_PROMPT', payload: { prompt: 'Show me royal navy banarasi brocade sarees for a reception' } },
        { label: '🌿 Emerald Green Kuttu Temple Saree', action: 'SEND_PROMPT', payload: { prompt: 'Show me emerald green temple border sarees' } },
      ],
      timestamp: new Date(),
    },
  ],
  isLoading: false,
  activeTryOnModal: false,
  tryOnProduct: null,
  activeCompareModal: false,
  compareProducts: [],
  activeVisualSearchModal: false,

  openStylist: (initialPrompt) => {
    set({ isOpen: true });
    if (initialPrompt) {
      get().sendMessage(initialPrompt);
    }
  },

  closeStylist: () => set({ isOpen: false }),
  toggleStylist: () => set((state) => ({ isOpen: !state.isOpen })),

  sendMessage: async (text: string) => {
    if (!text.trim() || get().isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, userMsg],
      isLoading: true,
    }));

    try {
      const response: AgentMessageResponse = await api.chatWithAIStylist({
        sessionId: get().sessionId,
        message: text.trim(),
      });

      const agentMsg: ChatMessage = {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        text: response.reply,
        products: response.recommendedProducts,
        selectedProduct: response.selectedProduct,
        comparedProducts: response.comparedProducts,
        tryOnJobId: response.tryOnJobId,
        suggestedActions: response.suggestedActions,
        explainabilityBadge: response.explainabilityBadge,
        gatedConfirmationRequired: response.gatedConfirmationRequired,
        orderTotal: response.orderTotal,
        timestamp: new Date(),
      };

      set((state) => ({
        messages: [...state.messages, agentMsg],
        isLoading: false,
      }));
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg_err_${Date.now()}`,
        sender: 'agent',
        text: 'I apologize, but I encountered a momentary connection issue. Please try your shopping request again.',
        timestamp: new Date(),
      };
      set((state) => ({
        messages: [...state.messages, errorMsg],
        isLoading: false,
      }));
    }
  },

  openTryOn: (product) => set({ activeTryOnModal: true, tryOnProduct: product }),
  closeTryOn: () => set({ activeTryOnModal: false, tryOnProduct: null }),

  openCompare: (products) => set({ activeCompareModal: true, compareProducts: products }),
  closeCompare: () => set({ activeCompareModal: false, compareProducts: [] }),

  openVisualSearch: () => set({ activeVisualSearchModal: true }),
  closeVisualSearch: () => set({ activeVisualSearchModal: false }),

  resetConversation: () => {
    set({
      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          sender: 'agent',
          text: 'Namaste 🙏 Welcome to **VASRĀ AI Showroom**. What occasion or handloom style can I curate for you today?',
          suggestedActions: [
            { label: '✨ Traditional Red Wedding Saree under ₹10,000', action: 'SEND_PROMPT', payload: { prompt: 'Show me a traditional red silk saree for a wedding under ₹10,000' } },
            { label: '👑 Banarasi Brocade for Reception', action: 'SEND_PROMPT', payload: { prompt: 'Show me royal navy banarasi brocade sarees for a reception' } },
          ],
          timestamp: new Date(),
        },
      ],
    });
  },
}));
