import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Sparkles, ChevronRight, Tag } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { api } from '../../lib/api';
import { Product } from '../../types';

export function SearchModal() {
  const navigate = useNavigate();
  const { isSearchOpen, toggleSearch } = useCatalogStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: Product[]; suggestions: string[] }>({
    products: [],
    suggestions: [
      'Kanchipuram Bridal',
      'Paithani Peacock Pallu',
      'Pochampally Ikat',
      'Mysore Crepe Silk',
      'Banarasi Rangkat',
      'Gadwal Handloom',
      'Lavender Organza',
      'Rose Gold Tissue',
    ],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        toggleSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, toggleSearch]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(prev => ({ ...prev, products: [] }));
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await api.searchCatalog(query);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-gold-500/20">
          <Search className="w-5 h-5 text-gold-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees by name, SKU (SRS-KCB-001), fabric, color..."
            autoFocus
            className="w-full bg-transparent text-ivory-100 placeholder-ivory-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-ivory-400 hover:text-gold-400 mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => toggleSearch(false)}
            className="px-2.5 py-1 text-xs rounded-lg bg-obsidian-800 border border-gold-500/20 text-ivory-300 hover:text-gold-400"
          >
            ESC
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Recent / Suggested Quick Tags */}
          {!query && (
            <div>
              <h4 className="text-xs font-cinzel text-gold-400 font-semibold tracking-wider uppercase mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Quick Suggestions
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => setQuery(sug)}
                    className="px-3 py-1.5 rounded-full bg-obsidian-800 border border-gold-500/20 text-xs text-ivory-200 hover:border-gold-500/50 hover:text-gold-400 transition flex items-center gap-1.5"
                  >
                    <Tag className="w-3 h-3 text-gold-400" />
                    <span>{sug}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Loading Indicator */}
          {loading && (
            <div className="py-8 text-center text-sm text-gold-400 animate-pulse">
              Searching luxury saree catalog...
            </div>
          )}

          {/* Product Results List */}
          {!loading && query && results.products.length > 0 && (
            <div>
              <h4 className="text-xs font-cinzel text-gold-400 font-semibold tracking-wider uppercase mb-3">
                Matching Sarees ({results.products.length})
              </h4>
              <div className="space-y-3">
                {results.products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => {
                      toggleSearch(false);
                      navigate(`/product/${product.slug}`);
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-obsidian-800/60 border border-gold-500/10 hover:border-gold-500/40 hover:bg-obsidian-800 transition cursor-pointer group"
                  >
                    <img
                      src={product.images[0]?.url || '/images/products/kanchipuram_red_gold.png'}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border border-gold-500/20 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-semibold text-ivory-100 group-hover:text-gold-400 transition truncate">
                        {product.name}
                      </h5>
                      <p className="text-xs text-ivory-400 truncate">
                        SKU: {product.sku} • {product.attributes.fabric} • {product.attributes.color}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gold-400">₹{product.price.toLocaleString()}</span>
                      <ChevronRight className="w-4 h-4 text-ivory-400 group-hover:text-gold-400 ml-auto mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {!loading && query && results.products.length === 0 && (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-semibold text-ivory-200">No sarees matched "{query}"</p>
              <p className="text-xs text-ivory-400">Try searching for "silk", "butta", "red", "kanchipuram", or SKU code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
