import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, MessageCircle, ExternalLink, CheckCircle } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { SITE_CONFIG } from '../../config/siteConfig';

export function QuickViewModal() {
  const navigate = useNavigate();
  const { quickViewProduct, setQuickViewProduct } = useCatalogStore();

  if (!quickViewProduct) return null;

  const handleWhatsApp = () => {
    const productUrl = `${window.location.origin}/product/${quickViewProduct.slug}`;
    const text = `Hello ${SITE_CONFIG.ownerName} / ${SITE_CONFIG.shopName}, I am inquiring about:\n*${quickViewProduct.name}*\nSKU: ${quickViewProduct.sku}\nPrice: ₹${quickViewProduct.price.toLocaleString()}\nLink: ${productUrl}`;
    window.open(SITE_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-obsidian-900 border border-gold-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-950/80 border border-gold-500/30 text-ivory-300 hover:text-gold-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[3/4] bg-obsidian-950">
            <img
              src={quickViewProduct.images[0]?.url || '/images/products/kanchipuram_red_gold.png'}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                  {quickViewProduct.attributes.fabric || 'Pure Silk'}
                </span>
                <span className="text-xs text-ivory-400 font-mono">SKU: {quickViewProduct.sku}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-ivory-100 leading-snug">
                {quickViewProduct.name}
              </h2>

              <p className="text-sm text-ivory-300 leading-relaxed line-clamp-3">
                {quickViewProduct.shortDescription || quickViewProduct.description}
              </p>

              {/* Attributes Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs text-ivory-300 pt-2 border-t border-gold-500/10">
                <div><span className="text-ivory-400">Color:</span> {quickViewProduct.attributes.color}</div>
                <div><span className="text-ivory-400">Occasion:</span> {quickViewProduct.attributes.occasion}</div>
                <div><span className="text-ivory-400">Weave:</span> {quickViewProduct.attributes.weave}</div>
                <div><span className="text-ivory-400">Border:</span> {quickViewProduct.attributes.border}</div>
              </div>

              {/* Price */}
              <div className="pt-2">
                <span className="text-2xl font-bold text-gold-400">
                  ₹{quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="ml-3 text-sm text-ivory-400 line-through">
                    ₹{quickViewProduct.compareAtPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-gold-500/20">
              <button
                onClick={handleWhatsApp}
                className="w-full py-3 rounded-full bg-gradient-to-r from-maroon-800 to-maroon-700 hover:from-maroon-700 hover:to-maroon-600 text-gold-300 font-semibold text-sm border border-gold-500/40 flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageCircle className="w-4 h-4 text-gold-400" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigate(`/product/${quickViewProduct.slug}`);
                }}
                className="w-full py-3 rounded-full bg-obsidian-800 hover:bg-obsidian-700 text-ivory-200 hover:text-gold-400 text-sm font-semibold border border-gold-500/20 flex items-center justify-center gap-2 transition"
              >
                <span>View Full Details & 3D Model</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
