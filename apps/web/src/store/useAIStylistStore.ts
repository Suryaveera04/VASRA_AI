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
      text: 'Namaste 🙏 Welcome to **VASRĀ AI Showroom**. I am your personal Saree Stylist grounded in active inventory. What occasion, skin undertone, or budget are you shopping for today?',
      suggestedActions: [
        { label: '🔴 Crimson Bridal Kanchipuram', action: 'SEND_PROMPT', payload: { prompt: 'Show me royal crimson bridal Kanchipuram sarees with pure gold zari' } },
        { label: '💜 Paithani Peacock Pallu', action: 'SEND_PROMPT', payload: { prompt: 'I want a Maharashtrian Paithani silk with royal peacock gold pallu' } },
        { label: '💛 Mustard Gadwal for Haldi', action: 'SEND_PROMPT', payload: { prompt: 'Show me mustard yellow and emerald green Gadwal silk under ₹20,000' } },
      ],
      timestamp: new Date(),
    },
    {
      id: 'msg_user_demo',
      sender: 'user',
      text: 'I am shopping for a grand bridal silk saree for an evening reception. My skin undertone is warm golden, and I want pure 24K gold zari under ₹50,000.',
      timestamp: new Date(),
    },
    {
      id: 'msg_agent_response',
      sender: 'agent',
      text: 'Based on your warm golden undertone and evening chandelier reception setting, deep vermilion crimson and royal sapphire highlight warm melanin undertones with 98.4% visual harmony. Here is our master weaver\'s pinnacle recommendation:',
      explainabilityBadge: 'NVIDIA Nemotron-70B: Matched Warm Golden Skin Undertone + Evening Reception Lux Index',
      products: [
        {
          _id: '000000000000000000000101',
          name: 'Imperial Crimson Bridal Gold Zari Kanchipuram',
          slug: 'imperial-crimson-bridal-gold-kanchipuram',
          price: 48500,
          mrp: 58000,
          images: [{ url: '/images/products/kanchipuram_bridal_crimson.png', isPrimary: true, alt: 'Bridal Kanchipuram' }],
          attributes: { fabric: 'Pure Mulberry Silk', color: 'Crimson Vermilion', border: 'Korvai 24K Gold Zari' },
          availability: 'IN_STOCK',
        } as any,
        {
          _id: '000000000000000000000103',
          name: 'Paithani Royal Peacock Gold Zari Silk',
          slug: 'paithani-royal-peacock-gold-silk',
          price: 38000,
          mrp: 45000,
          images: [{ url: '/images/products/paithani_gold_peacock.png', isPrimary: true, alt: 'Paithani Saree' }],
          attributes: { fabric: 'Pure Paithani Silk', color: 'Royal Purple', border: 'Peacock Pallu' },
          availability: 'IN_STOCK',
        } as any,
      ],
      suggestedActions: [
        { label: '✨ Virtual Try-On on My Photo', action: 'OPEN_TRY_ON_MODAL', payload: { productId: '000000000000000000000101' } },
        { label: '🔍 Compare Weaves & Zari Purity', action: 'COMPARE', payload: {} },
        { label: '💳 Instant Secure Checkout', action: 'CONFIRM_PAYMENT', payload: { productId: '000000000000000000000101' } },
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
