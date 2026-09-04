import React from 'react';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';

const fabrics = [
  'All Fabrics',
  'Kanchipuram Silk',
  'Banarasi Silk',
  'Pure Paithani Silk',
  'Pure Gadwal Silk',
  'Pure Mysore Crepe Silk',
  'Pochampally Ikat Silk',
  'Pure Patan Patola Silk',
  'Pure Silk Organza',
  'Tissue Silk',
  'Pure Chanderi Silk Cotton',
  'Kota Doria Silk Cotton',
  'Art Silk',
  'Pure Handloom Silk',
];

const colors = [
  'All Colors',
  'Crimson Red',
  'Royal Purple',
  'Teal & Mustard Yellow',
  'Regal Maroon Wine',
  'Pastel Multi (Blush Pink, Mint, Lavender)',
  'Mustard Yellow & Emerald Green',
  'Soft Lavender Lilac',
  'Ruby Red & Emerald Green',
  'Royal Blue',
  'Rose Gold',
  'Peacock Blue',
  'Burgundy Wine',
  'Pastel Champagne Gold',
  'Sage Mint Green',
];

const occasions = [
  'All Occasions',
  'Bridal Muhurtham',
  'Reception & Evening Gala',
  'Daytime Wedding & Sangeet',
  'Haldi, Pooja & Traditional Wedding',
  'Cocktail, Reception & Summer Soirée',
  'Festive & Contemporary Soirée',
  'Evening Soirée, Office Gala & Festive',
  'Pooja, Daily Festive & Office Wear',
];

interface FilterDrawerProps {
  isMobileDrawer?: boolean;
}

export function FilterDrawer({ isMobileDrawer = false }: FilterDrawerProps) {
  const { filters, setFilter, resetFilters, isFilterDrawerOpen, toggleFilterDrawer } = useCatalogStore();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFilter('maxPrice', val);
  };

  const FilterContent = (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
        <h3 className="font-cinzel text-base font-bold text-gold-400 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Filter Catalog
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-ivory-400 hover:text-gold-400 flex items-center gap-1 transition"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-cinzel text-xs font-semibold text-gold-300 uppercase tracking-wider">
            Budget Ceiling
          </h4>
          <span className="text-xs font-bold text-gold-400">
            {filters.maxPrice ? `≤ ₹${filters.maxPrice.toLocaleString()}` : 'All Prices'}
          </span>
        </div>
        <input
          type="range"
          min="2500"
          max="60000"
          step="2500"
          value={filters.maxPrice || 60000}
          onChange={handlePriceChange}
          className="w-full accent-gold-500 bg-obsidian-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-ivory-400 mt-1 font-mono">
          <span>₹2,500</span>
          <span>₹60,000+</span>
        </div>
      </div>

      {/* Fabric Filter */}
      <div>
        <h4 className="font-cinzel text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2.5">
          Heritage Weave & Fabric
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {fabrics.map((f) => {
            const val = f === 'All Fabrics' ? '' : f;
            const isSelected = filters.fabric === val;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter('fabric', val)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 font-semibold'
                    : 'text-ivory-300 hover:bg-obsidian-800'
                }`}
              >
                <span className="truncate">{f}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Palette */}
      <div>
        <h4 className="font-cinzel text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2.5">
          Shade & Color
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {colors.map((c) => {
            const val = c === 'All Colors' ? '' : c;
            const isSelected = filters.color === val;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setFilter('color', val)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 font-semibold'
                    : 'text-ivory-300 hover:bg-obsidian-800'
                }`}
              >
                <span className="truncate">{c}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="font-cinzel text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2.5">
          Celebration Occasion
        </h4>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {occasions.map((o) => {
            const val = o === 'All Occasions' ? '' : o;
            const isSelected = filters.occasion === val;
            return (
              <button
                key={o}
                type="button"
                onClick={() => setFilter('occasion', val)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40 font-semibold'
                    : 'text-ivory-300 hover:bg-obsidian-800'
                }`}
              >
                <span className="truncate">{o}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );

  if (isMobileDrawer) {
    if (!isFilterDrawerOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-obsidian-950/80 backdrop-blur-md lg:hidden animate-in fade-in duration-200">
        <div className="w-4/5 max-w-sm h-full bg-obsidian-900 border-l border-gold-500/20 p-6 overflow-y-auto">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => toggleFilterDrawer(false)}
              className="p-1.5 rounded-lg text-ivory-400 hover:text-gold-400 bg-obsidian-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {FilterContent}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-obsidian-900/70 border border-gold-500/20 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
      {FilterContent}
    </div>
  );
}
