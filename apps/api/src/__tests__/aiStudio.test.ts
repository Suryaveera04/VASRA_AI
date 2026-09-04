import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';
import { MemoryStore } from '../seed/memoryStore.js';

describe('VASRĀ AI Studio & Agentic Commerce Suite', () => {
  beforeAll(async () => {
    // Seed in-memory store
    MemoryStore.seed();
  });

  it('GET /api/v1/catalog/ai should return standardized agent-readable catalog schema', async () => {
    const res = await request(app).get('/api/v1/catalog/ai');
    expect(res.status).toBe(200);
    expect(res.body.version).toBe('2.0.0');
    expect(res.body.catalog).toBeDefined();
    expect(Array.isArray(res.body.catalog)).toBe(true);
    expect(res.body.catalog.length).toBeGreaterThan(0);
    expect(res.body.catalog[0].sareeDNA).toBeDefined();
  });

  it('POST /api/v1/ai/agent/chat should parse intent and recommend sarees under ₹10,000', async () => {
    const res = await request(app)
      .post('/api/v1/ai/agent/chat')
      .send({
        sessionId: 'test_session_101',
        message: 'Show me a traditional red silk saree for a wedding under ₹10,000',
      });

    expect(res.status).toBe(200);
    expect(res.body.data.reply).toBeDefined();
    expect(res.body.data.state).toBe('RECOMMENDATION');
    expect(res.body.data.recommendedProducts).toBeDefined();
    expect(res.body.data.recommendedProducts.length).toBeGreaterThan(0);
    expect(res.body.data.explainabilityBadge).toContain('₹10,000');
  });

  it('POST /api/v1/ai/try-on should validate photo and create asynchronous try-on job', async () => {
    const res = await request(app)
      .post('/api/v1/ai/try-on')
      .send({
        customerPhotoUrl: '/images/products/kanchipuram_red_gold.png',
        sareeImageUrl: '/images/products/kanchipuram_red_gold.png',
        sareeName: 'Kanchipuram Silk Saree',
        drapeStyle: 'Nivi',
      });

    expect(res.status).toBe(202);
    expect(res.body.data.jobId).toBeDefined();
    expect(res.body.data.validation.isValid).toBe(true);
  });

  it('POST /api/v1/checkout/create-razorpay-order should calculate exact server price and return order ID', async () => {
    const products = MemoryStore.getAllProducts();
    const testProduct = products[0];

    const res = await request(app)
      .post('/api/v1/checkout/create-razorpay-order')
      .send({
        sessionId: 'test_session_102',
        items: [{ productId: testProduct._id.toString(), quantity: 1, selectedDrape: 'Nivi' }],
        customer: {
          name: 'Pooja Hegde',
          email: 'pooja@example.com',
          phone: '+91 99887 76655',
        },
        source: 'AI_AGENT',
      });

    expect(res.status).toBe(201);
    expect(res.body.data.razorpayOrderId).toBeDefined();
    expect(res.body.data.amount).toBe(testProduct.price);
    expect(res.body.data.currency).toBe('INR');
  });

  it('POST /api/v1/checkout/verify-payment should verify payment and persist paid order', async () => {
    const products = MemoryStore.getAllProducts();
    const testProduct = products[0];

    // 1. Create order
    const orderRes = await request(app)
      .post('/api/v1/checkout/create-razorpay-order')
      .send({
        sessionId: 'test_session_103',
        items: [{ productId: testProduct._id.toString(), quantity: 1 }],
        customer: { name: 'Pooja', email: 'pooja@test.com', phone: '9988776655' },
        source: 'AI_AGENT',
      });

    // 2. Verify
    const verifyRes = await request(app)
      .post('/api/v1/checkout/verify-payment')
      .send({
        razorpayOrderId: orderRes.body.data.razorpayOrderId,
        razorpayPaymentId: 'pay_test_9999',
        razorpaySignature: 'sig_test_verified',
        sessionId: 'test_session_103',
      });

    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
    expect(verifyRes.body.data.order.status).toBe('PAID');
  });

  it('GET /api/v1/ai/eval/benchmark should run 50 synthetic shopping queries with >= 80% accuracy', async () => {
    const res = await request(app).get('/api/v1/ai/eval/benchmark');
    expect(res.status).toBe(200);
    expect(res.body.totalQueries).toBe(50);
    expect(parseFloat(res.body.accuracyRate)).toBeGreaterThanOrEqual(80);
    expect(res.body.benchmarkPassed).toBe(true);
  });
});
