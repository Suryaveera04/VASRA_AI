import React from 'react';
import { X, Sparkles, Check, ArrowRight, CreditCard } from 'lucide-react';
import { useAIStylistStore } from '../../store/useAIStylistStore';
import { useCartStore } from '../../store/useCartStore';
import { Product } from '../../types';

export function SareeCompareModal() {
  const { activeCompareModal, closeCompare, compareProducts, openTryOn } = useAIStylistStore();
  const { addItem, openCart } = useCartStore();

  if (!activeCompareModal || compareProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-xl" onClick={closeCompare} />

      <div className="relative w-full max-w-6xl max-h-[92vh] bg-obsidian-950 border border-gold-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gold-500/20 bg-obsidian-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient">
                Saree DNA Side-by-Side Comparison
              </h2>
              <span className="text-xs text-ivory-400">
                Comparing {compareProducts.length} authentic handloom drapes
              </span>
            </div>
          </div>

          <button onClick={closeCompare} className="p-2 rounded-full bg-obsidian-800 text-ivory-400 hover:text-gold-400 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {compareProducts.map((prod) => (
              <div
                key={prod._id}
                className="rounded-2xl bg-obsidian-900 border border-gold-500/20 overflow-hidden flex flex-col justify-between p-4 space-y-4 hover:border-gold-400 transition"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-950">
                    <img
                      src={prod.images[0]?.url || '/images/products/kanchipuram_red_gold.png'}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 font-cinzel text-xs font-bold">
                      ₹{prod.price.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                      SKU: {prod.sku}
                    </span>
                    <h3 className="font-serif text-base font-bold text-ivory-100">{prod.name}</h3>
                  </div>

                  {/* Saree DNA Specs */}
                  <div className="space-y-2 bg-obsidian-950/80 rounded-xl p-3 text-xs border border-gold-500/10">
                    <div className="flex justify-between">
                      <span className="text-ivory-400">Fabric:</span>
                      <span className="text-ivory-200 font-semibold">{prod.attributes?.fabric || 'Pure Silk'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory-400">Occasion:</span>
                      <span className="text-ivory-200">{prod.attributes?.occasion || 'Wedding'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory-400">Zari Type:</span>
                      <span className="text-gold-400">{prod.sareeDNA?.zariType || 'Tested Gold Zari'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory-400">Border:</span>
                      <span className="text-ivory-200">{prod.attributes?.border || 'Traditional'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ivory-400">Catalog Readiness:</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {prod.ai?.aiQualityScore?.overall || 94}/100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => {
                      closeCompare();
                      openTryOn(prod);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-gold-500/30 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Try on Me</span>
                  </button>

                  <button
                    onClick={() => {
                      addItem(prod, 1, 'Nivi', 'AI_AGENT');
                      closeCompare();
                      openCart();
                    }}
                    className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Select & Buy Saree</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
