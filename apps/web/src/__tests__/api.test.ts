import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../lib/api';

describe('API Client Layer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getProducts should format query parameters properly', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });
    global.fetch = mockFetch;

    await api.getProducts({ category: 'kanchipuram', fabric: 'Pure Silk' }, 1, 24);

    expect(mockFetch).toHaveBeenCalled();
    const url = mockFetch.mock.calls[0][0];
    expect(url).toContain('category=kanchipuram');
    expect(url).toContain('fabric=Pure+Silk');
  });

  it('searchCatalog should encode special query characters', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { products: [], categories: [], suggestions: [] } }),
    });
    global.fetch = mockFetch;

    await api.searchCatalog('Gold & Red Saree');
    const url = mockFetch.mock.calls[0][0];
    expect(url).toContain('Gold%20%26%20Red%20Saree');
  });
});
