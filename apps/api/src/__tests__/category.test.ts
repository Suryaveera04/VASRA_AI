import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('API Category Controller', () => {
  it('GET /api/v1/categories should return all visible categories', async () => {
    const res = await request(app).get('/api/v1/categories');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/admin/categories with auth should create category', async () => {
    const loginRes = await request(app)
      .post('/api/v1/admin/auth/login')
      .send({ email: 'admin@sreeramsilks.com', password: 'admin123' });

    const token = loginRes.body.data.token;

    const res = await request(app)
      .post('/api/v1/admin/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tussar Silk',
        description: 'Exquisite wild tussar silk sarees',
        icon: 'Sparkles',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Tussar Silk');
  });
});
