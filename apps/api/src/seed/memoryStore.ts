import { seedProducts, seedCategories, seedCollections, seedAdmin, seedHomepage } from './seedData.js';

export class MemoryStore {
  static products: any[] = [...seedProducts];
  static categories: any[] = [...seedCategories];
  static collections: any[] = [...seedCollections];
  static admin = { ...seedAdmin };
  static homepage = JSON.parse(JSON.stringify(seedHomepage));
  static auditLogs: any[] = [];
  
  // V2 Agentic Commerce In-Memory Stores
  static carts: Map<string, any> = new Map();
  static orders: any[] = [
    {
      _id: 'ord_demo_101',
      orderNumber: 'SRS-2026-8499',
      sessionId: 'sess_demo_01',
      customer: {
        name: 'Ananya Sharma',
        email: 'ananya.sharma@example.com',
        phone: '+919876543210',
        address: {
          line1: '45 Lotus Boulevard',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560001',
          country: 'India',
        },
      },
      items: [
        {
          productId: seedProducts[0]._id.toString(),
          name: seedProducts[0].name,
          sku: seedProducts[0].sku,
          image: seedProducts[0].images[0].url,
          price: seedProducts[0].price,
          quantity: 1,
          fabric: 'Kanchipuram Silk',
          selectedDrape: 'Nivi',
        },
      ],
      subtotal: seedProducts[0].price,
      shippingFee: 0,
      total: seedProducts[0].price,
      currency: 'INR',
      status: 'PAID',
      paymentStatus: 'CAPTURED',
      source: 'AI_AGENT',
      razorpayOrderId: 'order_demo_rzp_101',
      razorpayPaymentId: 'pay_demo_rzp_999',
      aiExplanation: 'Discovered via natural language query: "traditional red silk saree for wedding under ₹10,000". Verified with Nivi Virtual Try-On.',
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
      updatedAt: new Date(Date.now() - 3600 * 1000 * 2),
    },
  ];
  static payments: any[] = [
    {
      _id: 'pay_rec_001',
      razorpayOrderId: 'order_demo_rzp_101',
      razorpayPaymentId: 'pay_demo_rzp_999',
      razorpaySignature: 'sig_verified_demo_mock_hmac',
      orderId: 'ord_demo_101',
      orderNumber: 'SRS-2026-8499',
      amount: 8499,
      currency: 'INR',
      status: 'CAPTURED',
      method: 'upi',
      email: 'ananya.sharma@example.com',
      contact: '+919876543210',
      createdAt: new Date(Date.now() - 3600 * 1000 * 2),
    },
  ];
  static agentActions: any[] = [
    {
      sessionId: 'sess_demo_01',
      intent: 'Show me a traditional red silk saree for a wedding under ₹10,000',
      state: 'RECOMMENDATION',
      action: 'searchProducts',
      tool: 'searchProducts',
      input: { occasion: 'wedding', color: 'red', fabric: 'silk', maxPrice: 10000 },
      resultSummary: 'Found 4 matching sarees in catalog database.',
      resultReference: { matchedCount: 4, topProductSku: 'SRS-KCB-001' },
      authorization: { required: false, granted: false },
      latencyMs: 142,
      timestamp: new Date(Date.now() - 3600 * 1000 * 3),
    },
    {
      sessionId: 'sess_demo_01',
      intent: 'Try this saree with Nivi drape',
      state: 'TRY_ON',
      action: 'requestTryOn',
      tool: 'requestTryOn',
      input: { productId: seedProducts[0]._id.toString(), drape: 'Nivi' },
      resultSummary: 'Try-on preview generated successfully with 96% garment fidelity.',
      resultReference: { jobId: 'job_tryon_demo_101' },
      authorization: { required: false, granted: false },
      latencyMs: 850,
      timestamp: new Date(Date.now() - 3600 * 1000 * 2.8),
    },
    {
      sessionId: 'sess_demo_01',
      intent: 'Confirm purchase of Crimson Gold Zari Kanchipuram Butta for ₹8,499',
      state: 'CHECKOUT_PENDING_CONFIRMATION',
      action: 'createRazorpayOrder',
      tool: 'createRazorpayOrder',
      input: { productId: seedProducts[0]._id.toString(), price: 8499 },
      resultSummary: 'Customer explicitly authorized payment of ₹8,499. Razorpay order created.',
      resultReference: { razorpayOrderId: 'order_demo_rzp_101', orderNumber: 'SRS-2026-8499' },
      authorization: { required: true, granted: true, authorizedAmount: 8499, userConfirmedAt: new Date(Date.now() - 3600 * 1000 * 2.1) },
      latencyMs: 210,
      timestamp: new Date(Date.now() - 3600 * 1000 * 2),
    },
  ];
  static aiEvents: any[] = [
    { type: 'AI_SESSION_START', sessionId: 'sess_demo_01', timestamp: new Date(Date.now() - 3600 * 1000 * 3.5) },
    { type: 'AI_QUERY', sessionId: 'sess_demo_01', metadata: { query: 'wedding saree red under 10000' }, timestamp: new Date(Date.now() - 3600 * 1000 * 3) },
    { type: 'PRODUCT_RECOMMENDED', sessionId: 'sess_demo_01', productId: seedProducts[0]._id.toString(), productName: seedProducts[0].name, timestamp: new Date(Date.now() - 3600 * 1000 * 2.9) },
    { type: 'TRYON_REQUESTED', sessionId: 'sess_demo_01', productId: seedProducts[0]._id.toString(), metadata: { drape: 'Nivi' }, timestamp: new Date(Date.now() - 3600 * 1000 * 2.8) },
    { type: 'TRYON_COMPLETED', sessionId: 'sess_demo_01', productId: seedProducts[0]._id.toString(), timestamp: new Date(Date.now() - 3600 * 1000 * 2.7) },
    { type: 'ADD_TO_CART', sessionId: 'sess_demo_01', productId: seedProducts[0]._id.toString(), amount: 8499, timestamp: new Date(Date.now() - 3600 * 1000 * 2.5) },
    { type: 'CHECKOUT_STARTED', sessionId: 'sess_demo_01', amount: 8499, timestamp: new Date(Date.now() - 3600 * 1000 * 2.2) },
    { type: 'PAYMENT_AUTHORIZATION', sessionId: 'sess_demo_01', amount: 8499, timestamp: new Date(Date.now() - 3600 * 1000 * 2.1) },
    { type: 'PAYMENT_SUCCESS', sessionId: 'sess_demo_01', amount: 8499, productId: seedProducts[0]._id.toString(), timestamp: new Date(Date.now() - 3600 * 1000 * 2) },
  ];
  static aiJobs: Map<string, any> = new Map();
  static styleProfiles: Map<string, any> = new Map();

  static seed() {
    this.reset();
  }

  static getAllProducts() {
    return this.products;
  }

  static reset() {
    this.products = [...seedProducts];
    this.categories = [...seedCategories];
    this.collections = [...seedCollections];
    this.admin = { ...seedAdmin };
    this.homepage = JSON.parse(JSON.stringify(seedHomepage));
    this.carts.clear();
    this.orders = [];
    this.payments = [];
    this.agentActions = [];
    this.aiEvents = [];
    this.aiJobs.clear();
    this.styleProfiles.clear();
    console.log('🔄 In-Memory Store reset to pristine seeded state.');
  }
}
