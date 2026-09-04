import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShieldCheck, Sparkles, Box, Check, Share2, Copy, CheckCircle2, ChevronRight, Truck, Heart, CreditCard, ShoppingBag, Layers, RefreshCw } from 'lucide-react';
import { ProductViewer3D } from '../components/3d/ProductViewer3D';
import { useAIStylistStore } from '../store/useAIStylistStore';
import { useCartStore } from '../store/useCartStore';
import { api } from '../lib/api';
import { Product } from '../types';
import { SITE_CONFIG } from '../config/siteConfig';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const { openTryOn, openStylist, openCompare } = useAIStylistStore();
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await api.getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-gold-400 font-cinzel text-sm">
        Loading imperial saree details & 3D digital twin...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full max-w-[1920px] mx-auto px-4 pt-36 pb-20 text-center space-y-4">
        <h2 className="font-cinzel text-2xl text-ivory-100">The weave you were looking for is not in the active catalog.</h2>
        <Link to="/catalog" className="inline-block px-8 py-3.5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider">
          Explore Full Collection
        </Link>
      </div>
    );
  }

  const currentImage = product.images[activeImageIndex]?.url || product.images[0]?.url || '/images/products/kanchipuram_red_gold.png';

  const handleWhatsApp = () => {
    const text = `Hello ${SITE_CONFIG.ownerName} / ${SITE_CONFIG.shopName}, I am interested in purchasing:\n*${product.name}*\nSKU: ${product.sku}\nPrice: ₹${product.price.toLocaleString()}\nLink: ${window.location.href}`;
    window.open(SITE_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectBuy = () => {
    addItem(product, 1, 'Nivi', 'DIRECT');
    openCart();
  };

  const handleLikeThisBut = (variation: string) => {
    openStylist(`I like the ${product.name}, but I want ${variation}`);
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-20 space-y-12">
      
      {/* Full-width container using complete space */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-ivory-400">
          <Link to="/" className="hover:text-gold-400">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/catalog" className="hover:text-gold-400">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gold-400 font-semibold truncate max-w-sm">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image Gallery & 3D Viewer */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Visual Window (2D Photo or 3D Canvas) */}
            {show3DViewer ? (
              <ProductViewer3D imageUrl={currentImage} productName={product.name} />
            ) : (
              <div className="relative aspect-[3/4] max-h-[640px] rounded-3xl overflow-hidden bg-obsidian-950 border border-gold-500/20 shadow-2xl group">
                <img
                  src={currentImage}
                  alt={product.images[activeImageIndex]?.alt || product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full bg-gold-500/90 text-obsidian-950 font-bold text-xs uppercase tracking-wider backdrop-blur-md shadow-lg">
                    Silk Mark Certified
                  </span>
                  {product.sareeDNA?.zari && (
                    <span className="px-3 py-1 rounded-full bg-obsidian-950/80 border border-gold-500/40 text-gold-300 text-xs backdrop-blur-md">
                      {product.sareeDNA.zariType || 'Tested Gold Zari'}
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-xs font-mono">
                    SKU: {product.sku}
                  </span>
                </div>
              </div>
            )}

            {/* Controls: Thumbnail Rail & 3D / Try-On Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3 overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setShow3DViewer(false); setActiveImageIndex(idx); }}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition shrink-0 ${
                      !show3DViewer && activeImageIndex === idx ? 'border-gold-500 scale-105 shadow-gold-glow' : 'border-gold-500/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {/* Virtual Try-On Trigger */}
                <button
                  onClick={() => openTryOn(product)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow hover:scale-105 transition shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>✨ Try This Saree</span>
                </button>

                {/* 3D Viewer Switch Button */}
                <button
                  onClick={() => setShow3DViewer(!show3DViewer)}
                  className={`px-4 py-2.5 rounded-full border text-xs font-semibold flex items-center gap-2 transition shrink-0 ${
                    show3DViewer
                      ? 'bg-gold-500 text-obsidian-950 border-gold-500 shadow-gold-glow'
                      : 'bg-obsidian-900 text-gold-400 border-gold-500/40 hover:bg-gold-500/10'
                  }`}
                >
                  <Box className="w-4 h-4" />
                  <span>{show3DViewer ? 'Gallery View' : 'Inspect in 3D'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Specifications & Commercial Action */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                  {product.attributes.fabric || 'Pure Silk'} • {product.categoryName || 'Heritage Drape'}
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs text-ivory-400 hover:text-gold-400 flex items-center gap-1.5 transition"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied!' : 'Share Saree'}</span>
                </button>
              </div>

              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-ivory-100 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-gold-400">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-ivory-400 line-through">
                    ₹{product.compareAtPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider ml-auto">
                  {product.availability}
                </span>
              </div>

              <p className="text-sm text-ivory-300 font-light leading-relaxed pt-2 border-t border-gold-500/10">
                {product.description}
              </p>
            </div>

            {/* Saree DNA Intelligent Attribute Box */}
            <div className="space-y-3 bg-obsidian-900 border border-gold-500/20 rounded-2xl p-5 text-xs text-ivory-200 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-cinzel font-semibold text-gold-400 tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Saree DNA & Specifications</span>
                </h3>
                <span className="text-[10px] font-mono text-emerald-400">
                  Readiness: {product.ai?.aiQualityScore?.overall || 95}/100
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                <div><span className="text-ivory-400">Fabric:</span> {product.attributes.fabric}</div>
                <div><span className="text-ivory-400">Primary Color:</span> {product.attributes.color}</div>
                <div><span className="text-ivory-400">Occasion:</span> {product.attributes.occasion}</div>
                <div><span className="text-ivory-400">Zari:</span> {product.sareeDNA?.zariType || 'Gold Zari'}</div>
                <div><span className="text-ivory-400">Border:</span> {product.attributes.border}</div>
                <div><span className="text-ivory-400">Length:</span> {product.attributes.length || '6.3 Meters'}</div>
                <div><span className="text-ivory-400">Blouse:</span> {product.attributes.blousePiece !== false ? 'Included' : 'Not Included'}</div>
                <div><span className="text-ivory-400">Try-On:</span> 6 Drapes Supported</div>
              </div>
            </div>

            {/* Commercial Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDirectBuy}
                  className="py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:scale-[1.02] active:scale-[0.98] text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Now (₹{product.price.toLocaleString()})</span>
                </button>

                <button
                  onClick={() => {
                    addItem(product, 1, 'Nivi', 'DIRECT');
                    openCart();
                  }}
                  className="py-4 rounded-full bg-obsidian-900 hover:bg-obsidian-800 text-ivory-100 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3.5 rounded-full bg-maroon-800/80 hover:bg-maroon-700 text-gold-300 font-bold text-xs uppercase tracking-wider border border-gold-500/30 flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-gold-400" />
                <span>Reserve / Inquire on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-ivory-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-gold-400" /> Silk Mark Certified</span>
                <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold-400" /> Insured Free Delivery</span>
              </div>
            </div>

            {/* "I Like This, But..." Section (PRD Section 25) */}
            <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/20 space-y-2.5">
              <span className="text-xs font-cinzel text-gold-400 font-semibold uppercase tracking-wider block">
                ✦ I Like This Saree, But...
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleLikeThisBut('something under ₹7,000')}
                  className="px-2.5 py-1 rounded-full bg-obsidian-950 border border-gold-500/20 text-[11px] text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                >
                  Want under ₹7,000
                </button>
                <button
                  onClick={() => handleLikeThisBut('a darker shade')}
                  className="px-2.5 py-1 rounded-full bg-obsidian-950 border border-gold-500/20 text-[11px] text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                >
                  Want darker shade
                </button>
                <button
                  onClick={() => handleLikeThisBut('a lighter fabric like tissue or chanderi')}
                  className="px-2.5 py-1 rounded-full bg-obsidian-950 border border-gold-500/20 text-[11px] text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                >
                  Lighter fabric
                </button>
                <button
                  onClick={() => handleLikeThisBut('more gold zari on the border')}
                  className="px-2.5 py-1 rounded-full bg-obsidian-950 border border-gold-500/20 text-[11px] text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                >
                  More gold zari
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
