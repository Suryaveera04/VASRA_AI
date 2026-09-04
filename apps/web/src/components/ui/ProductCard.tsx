import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, MessageCircle, Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { DepthCard } from './DepthCard';
import { useCatalogStore } from '../../store/useCatalogStore';
import { useAIStylistStore } from '../../store/useAIStylistStore';
import { useCartStore } from '../../store/useCartStore';
import { SITE_CONFIG } from '../../config/siteConfig';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setQuickViewProduct } = useCatalogStore();
  const { openTryOn } = useAIStylistStore();
  const { addItem, openCart } = useCartStore();

  const primaryImage = product.images[0]?.url || '/images/products/kanchipuram_red_gold.png';
  const secondaryImage = product.images[1]?.url || primaryImage;

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const productUrl = `${window.location.origin}/product/${product.slug}`;
    const text = `Hello ${SITE_CONFIG.ownerName} / ${SITE_CONFIG.shopName}, I am interested in purchasing:\n*${product.name}*\nSKU: ${product.sku}\nPrice: ₹${product.price.toLocaleString()}\nLink: ${productUrl}`;
    window.open(SITE_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  const handleTryOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openTryOn(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product, 1, 'Nivi', 'DIRECT');
    openCart();
  };

  return (
    <DepthCard className="group h-full flex flex-col">
      <Link to={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-obsidian-950">
        
        {/* Images with smooth transition */}
        <img
          src={primaryImage}
          alt={product.images[0]?.alt || product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={secondaryImage}
            alt={product.images[1]?.alt || product.name}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            loading="lazy"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full bg-gold-500/90 text-obsidian-950 font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3" /> Signature
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-obsidian-950/80 border border-gold-500/30 text-gold-300 text-[10px] uppercase tracking-wider backdrop-blur-md">
            {product.attributes.fabric || 'Pure Silk'}
          </span>
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            onClick={handleTryOnClick}
            className="px-3 py-2 rounded-full bg-obsidian-950/90 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 text-xs font-semibold flex items-center gap-1.5 backdrop-blur-md transition shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try On</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleQuickAdd}
              className="p-2 rounded-full bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition shadow-xl"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="p-2 rounded-full bg-obsidian-900/90 border border-gold-500/40 text-ivory-200 hover:text-gold-400 transition shadow-xl"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-obsidian-900/90 border-t border-gold-500/10">
        <div>
          <div className="text-[10px] text-ivory-400 font-mono tracking-wider uppercase flex items-center justify-between mb-1">
            <span>SKU: {product.sku}</span>
            <span className="text-gold-400">{product.attributes.occasion || 'Heritage'}</span>
          </div>
          <Link to={`/product/${product.slug}`} className="block group-hover:text-gold-400 transition">
            <h3 className="font-serif text-sm sm:text-base font-semibold text-ivory-100 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-gold-400">
                ₹{product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-ivory-400 line-through">
                  ₹{product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleWhatsAppInquiry}
            className="px-2.5 py-1.5 rounded-full bg-maroon-800/80 hover:bg-maroon-800 text-gold-300 text-xs font-medium border border-gold-500/20 transition flex items-center gap-1"
            title="Inquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Inquire</span>
          </button>
        </div>
      </div>
    </DepthCard>
  );
}
