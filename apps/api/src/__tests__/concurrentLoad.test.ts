import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../index.js';

describe('Concurrent User Traffic & Server Maintenance Load Test', () => {
  it('Should handle 100 concurrent requests without crashing or dropping responses', async () => {
    const endpoints = [
      '/health',
      '/ready',
      '/api/v1/products',
      '/api/v1/categories',
      '/api/v1/collections',
      '/api/v1/homepage',
      '/api/v1/search?q=Silk',
    ];

    const CONCURRENT_REQUESTS = 100;
    const startTime = Date.now();

    // Create 100 simultaneous concurrent request promises
    const promises = Array.from({ length: CONCURRENT_REQUESTS }).map((_, index) => {
      const endpoint = endpoints[index % endpoints.length];
      return request(app).get(endpoint);
    });

    const responses = await Promise.all(promises);
    const duration = Date.now() - startTime;

    console.log(`⚡ Load Test Completed: ${CONCURRENT_REQUESTS} concurrent requests processed in ${duration}ms`);

    // Verify all 100 responses succeeded
    responses.forEach((res, i) => {
      expect(res.status, `Request #${i} failed with status ${res.status}`).toBe(200);
      expect(res.body).toBeDefined();
    });

    expect(responses.length).toBe(CONCURRENT_REQUESTS);
    expect(duration).toBeLessThan(10000); // Must process 100 requests in under 10 seconds
  });
});
