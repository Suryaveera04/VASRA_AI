import {
  Product,
  Category,
  Collection,
  HomepageConfig,
  AdminUser,
  CatalogFilterState,
  Cart,
  Order,
  RevenueMetrics,
  FunnelStage,
  MerchantInsight,
  CostAnalytics,
  AgentAction,
  AIJob,
  AgentMessageResponse,
} from '../types';

const API_BASE = '/api/v1';

async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('sree_ram_admin_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'same-origin',
  });

  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'API Request failed');
  }

  return json.data;
}

export const api = {
  // ─── Public Catalog ────────────────────────────────────────────────────────
  getProducts: async (filters: CatalogFilterState = {}, page = 1, limit = 50) => {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.fabric) params.append('fabric', filters.fabric);
    if (filters.color) params.append('color', filters.color);
    if (filters.occasion) params.append('occasion', filters.occasion);
    if (filters.weave) params.append('weave', filters.weave);
    if (filters.border) params.append('border', filters.border);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.q) params.append('q', filters.q);
    if (filters.featured) params.append('featured', 'true');
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    return fetcher<Product[]>(`/products?${params.toString()}`);
  },

  getProductBySlug: async (slug: string) => {
    return fetcher<Product>(`/products/${slug}`);
  },

  getCategories: async () => {
    return fetcher<Category[]>('/categories');
  },

  getCollections: async () => {
    return fetcher<Collection[]>('/collections');
  },

  getHomepageConfig: async () => {
    return fetcher<HomepageConfig>('/homepage');
  },

  searchCatalog: async (query: string) => {
    return fetcher<{ products: Product[]; categories: Category[]; suggestions: string[] }>(
      `/search?q=${encodeURIComponent(query)}`
    );
  },

  // ─── Agent-Readable Catalog & AI Buyer ──────────────────────────────────────
  getAgentReadableCatalog: async () => {
    return fetcher<any>('/catalog/ai');
  },

  // ─── Customer AI Shopping Agent & Try-On ───────────────────────────────────
  chatWithAIStylist: async (payload: {
    sessionId: string;
    message: string;
    context?: any;
    userConfirmedPayment?: boolean;
  }) => {
    return fetcher<AgentMessageResponse>('/ai/agent/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  requestVirtualTryOn: async (payload: {
    customerPhotoUrl: string;
    sareeImageUrl: string;
    sareeName: string;
    drapeStyle: string;
  }) => {
    return fetcher<{ jobId: string; status: string; validation: any }>('/ai/try-on', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  getAIJobStatus: async (jobId: string) => {
    return fetcher<AIJob>(`/ai/jobs/${jobId}`);
  },

  // ─── Cart & Razorpay Checkout ───────────────────────────────────────────────
  getCart: async (sessionId: string) => {
    return fetcher<Cart>(`/checkout/cart/${sessionId}`);
  },

  saveCart: async (cartData: { sessionId: string; items: any[]; source?: string }) => {
    return fetcher<Cart>('/checkout/cart', {
      method: 'POST',
      body: JSON.stringify(cartData),
    });
  },

  createRazorpayOrder: async (orderPayload: {
    sessionId: string;
    items: any[];
    customer: any;
    source?: 'AI_AGENT' | 'DIRECT';
    aiExplanation?: string;
  }) => {
    return fetcher<any>('/checkout/create-razorpay-order', {
      method: 'POST',
      body: JSON.stringify(orderPayload),
    });
  },

  verifyPayment: async (paymentPayload: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    sessionId?: string;
  }) => {
    return fetcher<{ order: Order; message: string }>('/checkout/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentPayload),
    });
  },

  // ─── Auth & Admin ──────────────────────────────────────────────────────────
  login: async (credentials: { email: string; password: string }) => {
    const res = await fetcher<{ token: string; admin: AdminUser }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      localStorage.setItem('sree_ram_admin_token', res.token);
    }
    return res;
  },

  logout: async () => {
    localStorage.removeItem('sree_ram_admin_token');
    return fetcher('/admin/auth/logout', { method: 'POST' });
  },

  getMe: async () => {
    return fetcher<AdminUser>('/admin/auth/me');
  },

  createProduct: async (productData: Partial<Product>) => {
    return fetcher<Product>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  updateProduct: async (id: string, productData: Partial<Product>) => {
    return fetcher<Product>(`/admin/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    });
  },

  deleteProduct: async (id: string) => {
    return fetcher(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  },

  reorderProducts: async (items: { id: string; displayOrder: number }[]) => {
    return fetcher('/admin/products/reorder', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  },

  createCategory: async (categoryData: Partial<Category>) => {
    return fetcher<Category>('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  updateCategory: async (id: string, categoryData: Partial<Category>) => {
    return fetcher<Category>(`/admin/categories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(categoryData),
    });
  },

  deleteCategory: async (id: string) => {
    return fetcher(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  },

  updateHomepageConfig: async (config: Partial<HomepageConfig>) => {
    return fetcher<HomepageConfig>('/admin/homepage', {
      method: 'PATCH',
      body: JSON.stringify(config),
    });
  },

  // ─── Admin AI Studio ───────────────────────────────────────────────────────
  analyzeGarment: async (payload: { imageUrl: string; sareeName?: string }) => {
    return fetcher<any>('/admin/ai-studio/analyze-garment', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  generateModelPhotos: async (payload: {
    sareeImageUrl: string;
    sareeName: string;
    modelProfile: string;
    pose: string;
    background: string;
    lighting: string;
    cameraFraming: string;
  }) => {
    return fetcher<{ jobId: string; status: string; message: string }>('/admin/ai-studio/generate-model-photos', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  generateCampaign: async (payload: { prompt?: string; collectionTitle?: string }) => {
    return fetcher<any>('/admin/ai-studio/campaign', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // ─── Admin Orders ──────────────────────────────────────────────────────────
  getOrders: async (filters: { status?: string; source?: string } = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    return fetcher<Order[]>(`/admin/orders?${params.toString()}`);
  },

  updateOrderStatus: async (orderId: string, payload: { status?: string; paymentStatus?: string }) => {
    return fetcher<Order>(`/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  // ─── Admin AI Analytics & Audit ────────────────────────────────────────────
  getRevenueMetrics: async () => {
    return fetcher<RevenueMetrics>('/admin/ai-analytics/revenue');
  },

  getConversionFunnel: async () => {
    return fetcher<FunnelStage[]>('/admin/ai-analytics/funnel');
  },

  getMerchantInsights: async () => {
    return fetcher<MerchantInsight[]>('/admin/ai-analytics/insights');
  },

  getCostAnalytics: async () => {
    return fetcher<CostAnalytics>('/admin/ai-analytics/cost');
  },

  getAgentAuditTrail: async (sessionId?: string) => {
    const params = new URLSearchParams();
    if (sessionId) params.append('sessionId', sessionId);
    return fetcher<AgentAction[]>(`/admin/ai-analytics/audit?${params.toString()}`);
  },

  // ─── Admin AI Settings & NVIDIA NIM ─────────────────────────────────────────
  getAISettings: async () => {
    return fetcher<{
      hasNvidiaKey: boolean;
      maskedKey: string;
      nvidiaLlmModel: string;
      nvidiaImageModel: string;
      nvidiaBaseUrl: string;
      customAiApiKey: string;
      customAiBaseUrl: string;
      customAiModel: string;
      availableLlmModels: Array<{ id: string; name: string }>;
      availableImageModels: Array<{ id: string; name: string }>;
    }>('/admin/ai-settings');
  },

  updateAISettings: async (payload: {
    nvidiaApiKey?: string;
    nvidiaLlmModel?: string;
    nvidiaImageModel?: string;
    customAiApiKey?: string;
    customAiBaseUrl?: string;
    customAiModel?: string;
  }) => {
    return fetcher<{
      hasNvidiaKey: boolean;
      nvidiaLlmModel: string;
      nvidiaImageModel: string;
    }>('/admin/ai-settings', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  testAIConnection: async (payload: { apiKey?: string; model?: string }) => {
    return fetcher<{
      message: string;
      reply: string;
      model: string;
    }>('/admin/ai-settings/test', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // ─── Demo Reset ────────────────────────────────────────────────────────────
  resetDemoData: async () => {
    return fetcher<{ message: string }>('/admin/demo/reset', {
      method: 'POST',
    });
  },
};
