import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, Layers, Camera, Check } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { FilterDrawer } from '../components/ui/FilterDrawer';
import { useCatalogStore } from '../store/useCatalogStore';
import { useAIStylistStore } from '../store/useAIStylistStore';
import { api } from '../lib/api';
import { Product, Category } from '../types';

export function Catalog() {
  const [searchParams] = useSearchParams();
  const { filters, setFilters, resetFilters, toggleFilterDrawer } = useCatalogStore();
  const { openStylist, openVisualSearch, openCompare } = useAIStylistStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);

  // Sync URL search params with store
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const fabricParam = searchParams.get('fabric');
    const colorParam = searchParams.get('color');
    const occasionParam = searchParams.get('occasion');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const sortParam = searchParams.get('sort');
    const qParam = searchParams.get('q');

    setFilters({
      category: categoryParam || undefined,
      fabric: fabricParam || undefined,
      color: colorParam || undefined,
      occasion: occasionParam || undefined,
      minPrice: minPriceParam ? parseInt(minPriceParam, 10) : undefined,
      maxPrice: maxPriceParam ? parseInt(maxPriceParam, 10) : undefined,
      sort: sortParam || undefined,
      q: qParam || undefined,
    });
  }, [searchParams]);

  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      try {
        const [prods, cats] = await Promise.all([
          api.getProducts(filters, 1, 50),
          api.getCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, [filters]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    setFilters({ sort });
  };

  const toggleCompareSelection = (productId: string) => {
    if (selectedForCompare.includes(productId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== productId));
    } else {
      if (selectedForCompare.length >= 3) {
        alert('You can compare up to 3 sarees at once.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, productId]);
    }
  };

  const launchCompareModal = () => {
    const compareList = products.filter((p) => selectedForCompare.includes(p._id));
    if (compareList.length < 2) {
      alert('Please select at least 2 sarees to compare.');
      return;
    }
    openCompare(compareList);
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-20 space-y-8">
      
      {/* Full-width container */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 space-y-6">
        
        {/* Header & AI Stylist Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900/90 to-maroon-950/40 border border-gold-500/20 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-2xl sm:text-3xl font-extrabold text-ivory-100">
                VASRĀ AI Catalog
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-xs font-mono border border-gold-500/30">
                {products.length} Masterpieces
              </span>
            </div>
            <p className="text-xs text-ivory-300">
              Handloom silk sarees with Saree DNA intelligence • Interactive 3D & Virtual Try-On
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openStylist()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow hover:scale-105 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Stylist</span>
            </button>

            <button
              onClick={openVisualSearch}
              className="px-4 py-2.5 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 border border-gold-500/30 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Camera className="w-4 h-4" />
              <span>Visual Search</span>
            </button>

            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-4 py-2.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition ${
                compareMode
                  ? 'bg-maroon-800 text-gold-300 border-gold-500'
                  : 'bg-obsidian-800 text-ivory-300 border-gold-500/20 hover:text-gold-400'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{compareMode ? `Comparing (${selectedForCompare.length})` : 'Compare Drapes'}</span>
            </button>
          </div>
        </div>

        {/* Compare Floating Bar (if compare mode active) */}
        {compareMode && (
          <div className="sticky top-24 z-30 p-4 rounded-2xl bg-maroon-950/95 border-2 border-gold-500 flex items-center justify-between shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 text-xs text-gold-300 font-medium">
              <span>Selected {selectedForCompare.length} of 3 sarees to compare.</span>
              {selectedForCompare.length > 0 && (
                <button
                  onClick={() => setSelectedForCompare([])}
                  className="text-ivory-400 hover:text-gold-400 underline text-[11px]"
                >
                  Clear Selection
                </button>
              )}
            </div>

            <button
              onClick={launchCompareModal}
              disabled={selectedForCompare.length < 2}
              className="px-6 py-2 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition disabled:opacity-40"
            >
              Launch Side-by-Side Comparison
            </button>
          </div>
        )}

        {/* Quick Filter Chips & Mobile Filter Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-y border-gold-500/10 text-xs">
          {/* Quick AI Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => resetFilters()}
              className={`px-3 py-1.5 rounded-full transition shrink-0 ${
                !filters.category && !filters.fabric && !filters.occasion && !filters.maxPrice
                  ? 'bg-gold-500 text-obsidian-950 font-bold'
                  : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
              }`}
            >
              All Drapes
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setFilters({ category: cat.slug })}
                className={`px-3 py-1.5 rounded-full transition shrink-0 ${
                  filters.category === cat.slug
                    ? 'bg-gold-500 text-obsidian-950 font-bold'
                    : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
                }`}
              >
                {cat.name}
              </button>
            ))}

            <button
              onClick={() => setFilters({ maxPrice: 5000 })}
              className={`px-3 py-1.5 rounded-full transition shrink-0 ${
                filters.maxPrice === 5000
                  ? 'bg-gold-500 text-obsidian-950 font-bold'
                  : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
              }`}
            >
              Under ₹5,000
            </button>

            <button
              onClick={() => setFilters({ maxPrice: 10000 })}
              className={`px-3 py-1.5 rounded-full transition shrink-0 ${
                filters.maxPrice === 10000
                  ? 'bg-gold-500 text-obsidian-950 font-bold'
                  : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
              }`}
            >
              Under ₹10,000
            </button>
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFilterDrawer(true)}
              className="lg:hidden px-3 py-1.5 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-300 hover:text-gold-400 flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
              <span>Filters</span>
            </button>

            <select
              value={filters.sort || ''}
              onChange={handleSortChange}
              className="bg-obsidian-900 border border-gold-500/20 rounded-full px-3 py-1.5 text-ivory-300 focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              <option value="">Sort: Featured Weaves</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* ─── Main Two-Column Layout: Left Sticky Sidebar + Right Product Grid ─── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            <FilterDrawer />
          </aside>

          {/* Right Column: Product Grid */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {loading ? (
              <div className="py-24 text-center space-y-4">
                <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-cinzel text-xs text-gold-400 uppercase tracking-widest">
                  Filtering handloom database...
                </p>
              </div>
            ) : products.length === 0 ? (
              <div className="py-24 text-center space-y-4 bg-obsidian-900/60 rounded-3xl border border-gold-500/20">
                <Sparkles className="w-12 h-12 text-gold-500/40 mx-auto" />
                <h3 className="font-cinzel text-xl text-ivory-100">No matching drapes found</h3>
                <p className="text-xs text-ivory-400 max-w-sm mx-auto">
                  Try adjusting your filter criteria or ask our AI Stylist to search across our broader warehouse catalog.
                </p>
                <button
                  onClick={() => resetFilters()}
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((prod) => (
                  <div key={prod._id} className="relative">
                    {compareMode && (
                      <button
                        onClick={() => toggleCompareSelection(prod._id)}
                        className={`absolute top-3 right-3 z-30 p-2 rounded-full border-2 transition ${
                          selectedForCompare.includes(prod._id)
                            ? 'bg-gold-500 border-obsidian-950 text-obsidian-950 shadow-gold-glow'
                            : 'bg-obsidian-950/80 border-gold-500 text-gold-400'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Slide-Out Drawer */}
      <FilterDrawer isMobileDrawer={true} />
    </div>
  );
}
