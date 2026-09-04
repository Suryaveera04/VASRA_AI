import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('API Search Controller', () => {
  it('GET /api/v1/search without query should return default suggestions', async () => {
    const res = await request(app).get('/api/v1/search');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.products).toHaveLength(0);
    expect(res.body.data.suggestions.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/search?q=Kanchipuram should match products and return recommendations', async () => {
    const res = await request(app).get('/api/v1/search?q=Kanchipuram');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data.products)).toBe(true);
  });
});
