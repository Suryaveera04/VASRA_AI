export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
  order?: number;
}

export interface SareeDNA {
  colors: string[];
  fabric: string[];
  motifs: string[];
  pattern: string;
  border?: {
    color?: string;
    weight?: string;
    type?: string;
  };
  zari: boolean;
  zariType?: string;
  occasion: string[];
  style: string;
  visualEmbedding?: number[];
  palluDetails?: string;
}

export interface AIQualityScore {
  imageQuality: number;
  metadataCompleteness: number;
  sareeVisibility: number;
  garmentFidelity: number;
  seoCompleteness: number;
  overall: number;
}

export interface ProductAttributes {
  fabric?: string;
  color?: string;
  colors?: string[];
  pattern?: string;
  occasion?: string;
  weave?: string;
  border?: string;
  length?: string;
  blousePiece?: boolean;
  custom?: Record<string, string | string[]>;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  categoryName?: string;
  collectionIds: string[];
  price: number;
  compareAtPrice?: number;
  currency: string;
  showPrice: boolean;
  availability: 'AVAILABLE' | 'OUT_OF_STOCK' | 'COMING_SOON' | 'HIDDEN';
  images: ProductImage[];
  videoUrl?: string;
  has3DModel: boolean;
  model3dUrl?: string;
  attributes: ProductAttributes;
  sareeDNA?: SareeDNA;
  tryOn?: {
    enabled: boolean;
    supportedDrapes: string[];
    recommendedDrape?: string;
  };
  ai?: {
    analysisStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
    detectedAttributes?: Record<string, any>;
    aiQualityScore?: AIQualityScore;
    aiGeneratedStory?: string;
    tags?: string[];
  };
  generatedMedia?: Array<{
    url: string;
    modelProfile: string;
    pose: string;
    background: string;
    createdAt: string;
    generatedByAI: boolean;
  }>;
  tags: string[];
  featured: boolean;
  visible: boolean;
  archived: boolean;
  displayOrder: number;
  seo?: {
    title?: string;
    description?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  icon?: string;
  displayOrder: number;
  visible: boolean;
  productCount?: number;
}

export interface Collection {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  productIds: string[];
  displayOrder: number;
  visible: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  fabric?: string;
  selectedDrape?: string;
}

export interface Cart {
  sessionId: string;
  items: CartItem[];
  subtotal: number;
  currency: string;
  total: number;
  source: 'AI_AGENT' | 'DIRECT';
}

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  _id: string;
  orderNumber: string;
  sessionId: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
  status: 'PENDING_PAYMENT' | 'PAID' | 'PAYMENT_FAILED' | 'CANCELLED' | 'FULFILLED';
  paymentStatus: 'UNPAID' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  source: 'AI_AGENT' | 'DIRECT';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  aiExplanation?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentAction {
  _id?: string;
  sessionId: string;
  intent?: string;
  state: string;
  action: string;
  tool?: string;
  input?: any;
  resultSummary?: string;
  resultReference?: any;
  authorization?: {
    required: boolean;
    granted: boolean;
    authorizedAmount?: number;
    userConfirmedAt?: string;
  };
  latencyMs?: number;
  timestamp: string;
}

export interface PhotoValidation {
  isValid: boolean;
  score: number;
  personDetected: boolean;
  faceDetected: boolean;
  lightingQuality: 'GOOD' | 'FAIR' | 'POOR';
  poseSuitability: 'OPTIMAL' | 'ACCEPTABLE' | 'UNSUITABLE';
  feedbackMessage?: string;
}

export interface TryOnJobResult {
  previewUrl: string;
  fidelityScore: number;
  colorPreservationRate: number;
  borderFidelityRate: number;
  palluFidelityRate: number;
  drapeApplied: string;
  disclaimer: string;
}

export interface AIJob {
  jobId: string;
  type: string;
  status: 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress: number;
  currentStage: string;
  result?: TryOnJobResult | any;
  error?: string;
}

export interface RevenueMetrics {
  aiSessions: number;
  aiQueries: number;
  tryOnsRequested: number;
  tryOnsCompleted: number;
  cartAdds: number;
  checkoutStarts: number;
  paidOrdersCount: number;
  aiAssistedOrdersCount: number;
  totalGMV: number;
  aiAssistedGMV: number;
  aiConversionRate: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  dropoffRate: number;
}

export interface MerchantInsight {
  id: string;
  title: string;
  type: 'OPPORTUNITY' | 'PERFORMANCE' | 'ACTIONABLE';
  message: string;
  metric: string;
}

export interface CostAnalytics {
  todayEstimatedCost: number;
  monthEstimatedCost: number;
  tryOnGenerationsCount: number;
  modelGenerationsCount: number;
  llmCallsCount: number;
  costPerTryOn: number;
  costPerOrder: number;
  currency: string;
}

export interface AgentMessageResponse {
  reply: string;
  state: string;
  recommendedProducts?: Product[];
  selectedProduct?: Product;
  comparedProducts?: Product[];
  tryOnJobId?: string;
  suggestedActions: Array<{
    label: string;
    action: string;
    payload?: any;
  }>;
  explainabilityBadge?: string;
  gatedConfirmationRequired?: boolean;
  orderTotal?: number;
}

export interface HomepageSection {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
}

export interface HomepageConfig {
  hero: {
    title: string;
    subtitle: string;
    badgeText?: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    backgroundStyle: '3D_SILK' | 'GOLD_PARTICLES' | 'DARK_HERITAGE';
  };
  sections: HomepageSection[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CatalogFilterState {
  category?: string;
  fabric?: string;
  color?: string;
  occasion?: string;
  weave?: string;
  border?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  q?: string;
  featured?: boolean;
}
