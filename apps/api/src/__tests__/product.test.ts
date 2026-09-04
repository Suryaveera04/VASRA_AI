import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('API Product Controller', () => {
  it('GET /api/v1/products should return product catalog list', async () => {
    const res = await request(app).get('/api/v1/products');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination).toBeDefined();
  });

  it('GET /api/v1/products should support category & fabric filtering', async () => {
    const res = await request(app).get('/api/v1/products?fabric=Silk');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/v1/products/:slug should return individual product', async () => {
    const listRes = await request(app).get('/api/v1/products');
    const firstProduct = listRes.body.data[0];
    
    if (firstProduct) {
      const res = await request(app).get(`/api/v1/products/${firstProduct.slug}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe(firstProduct.name);
    }
  });

  it('POST /api/v1/admin/products without auth should fail with 401', async () => {
    const res = await request(app)
      .post('/api/v1/admin/products')
      .send({ name: 'Test Saree', sku: 'TEST-01', price: 9999 });

    expect(res.status).toBe(401);
  });

  it('POST /api/v1/admin/products with valid auth should create product', async () => {
    const loginRes = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({ email: 'admin@sreeramsilks.com', password: 'admin123' });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .post('/api/v1/admin/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Royal Heritage Golden Zari Saree',
        sku: 'RHS-ZARI-101',
        price: 45000,
        shortDescription: 'Pure gold zari work handcrafted saree',
        categoryId: 'kanchipuram',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Royal Heritage Golden Zari Saree');
  });
});
