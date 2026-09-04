import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Crown, Star, ChevronRight, MessageCircle, Layers, Camera, Heart, CheckCircle2 } from 'lucide-react';
import { HeroCanvas } from '../components/3d/HeroCanvas';
import { DepthCard } from '../components/ui/DepthCard';
import { ProductCard } from '../components/ui/ProductCard';
import { AICommandBar } from '../components/ai/AICommandBar';
import { useAIStylistStore } from '../store/useAIStylistStore';
import { api } from '../lib/api';
import { Product, Category } from '../types';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { openStylist, openTryOn, openVisualSearch } = useAIStylistStore();

  useEffect(() => {
    async function loadData() {
      try {
        const [prods, cats] = await Promise.all([
          api.getProducts({ featured: true }, 1, 8),
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
    loadData();
  }, []);

  return (
    <div className="w-full space-y-24 pb-20">
      
      {/* SECTION 1: Cinematic 3D Hero across Full Screen */}
      <section className="relative min-h-[96vh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
        <HeroCanvas />

        {/* Hero Atmospheric Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/60 pointer-events-none z-10" />

        {/* Content Container - Expansive Full Width */}
        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            <span>AI-Native 3D Digital Showroom • 2026 Collection</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider leading-tight text-ivory-100 max-w-6xl mx-auto">
            VASRĀ AI
            <span className="block font-serif text-2xl sm:text-4xl md:text-5xl font-normal italic text-gold-gradient mt-3">
              Find the Saree That Feels Like You.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-ivory-300 font-light leading-relaxed">
            Step into India's premier agentic handloom showroom. Converse with your personal AI Stylist, visualize pure silk sarees on yourself with Virtual Try-On, and checkout securely via Razorpay.
          </p>

          {/* Floating AI Command Bar on Hero */}
          <div className="pt-2 max-w-3xl mx-auto">
            <AICommandBar />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => openStylist('Show me wedding sarees under ₹10,000')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Stylist</span>
            </button>

            <Link
              to="/catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-obsidian-900/90 hover:bg-obsidian-800 text-ivory-200 hover:text-gold-400 text-xs sm:text-sm font-semibold border border-gold-500/30 backdrop-blur-md transition flex items-center justify-center gap-2"
            >
              <span>Explore 3D Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto text-xs text-ivory-400 border-t border-gold-500/10">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>100% Pure Silk Mark</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-4 h-4 text-gold-400" />
              <span>Authentic Handloom Weavers</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>AI Virtual Try-On Studio</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-gold-400" />
              <span>Razorpay Agentic Payments</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Virtual Try-On Banner Feature */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-maroon-950/90 via-obsidian-900 to-obsidian-950 border border-gold-500/30 p-8 lg:p-12 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VASRĀ VIRTUAL TRY-ON ENGINE</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ivory-100 leading-tight">
              See Any Saree Draped on You Before You Buy.
            </h2>

            <p className="text-sm sm:text-base text-ivory-300 font-light leading-relaxed max-w-xl">
              Upload your photo and select from 6 authentic regional drapes (Nivi, Bengali, Gujarati, Seedha Pallu, Maharashtrian, Modern). Our neural draping engine preserves exact 24K zari motifs and border weight.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {products[0] && (
                <button
                  onClick={() => openTryOn(products[0])}
                  className="px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Virtual Try-On</span>
                </button>
              )}

              <button
                onClick={openVisualSearch}
                className="px-6 py-4 rounded-full bg-obsidian-900 hover:bg-obsidian-800 text-gold-400 border border-gold-500/30 text-xs font-semibold flex items-center gap-2 transition"
              >
                <Camera className="w-4 h-4" />
                <span>Search by Saree Image</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
            <img
              src="/images/products/kanchipuram_red_gold.png"
              alt="Virtual Try On Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-obsidian-950/80 backdrop-blur-md border border-gold-500/20 text-xs text-gold-400 flex items-center justify-between">
              <span>96% Saree DNA Fidelity</span>
              <span className="text-emerald-400 font-mono">Real-time Drape Fall</span>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: Curated Heritage Categories */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-cinzel text-gold-400 font-semibold tracking-widest uppercase">
              Handloom Traditions
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-ivory-100">
              Curated Masterpiece Categories
            </h2>
          </div>
          <Link to="/catalog" className="text-xs font-semibold text-gold-400 hover:underline flex items-center gap-1">
            <span>Explore All Drapes</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat._id} to={`/category/${cat.slug}`}>
              <DepthCard className="h-80 relative group overflow-hidden">
                <img
                  src={cat.image || '/images/products/kanchipuram_red_gold.png'}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                    {cat.productCount || 4} Masterpieces
                  </span>
                  <h3 className="font-serif text-xl font-bold text-ivory-100 group-hover:text-gold-300 transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-ivory-300 line-clamp-2 leading-relaxed opacity-80">
                    {cat.description}
                  </p>
                </div>
              </DepthCard>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: Featured Imperial Collection */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-cinzel text-gold-400 font-semibold tracking-widest uppercase">
              Signature Collection
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-ivory-100">
              Imperial Masterpiece Showcase
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-sm font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1 transition"
          >
            <span>View Full Catalog ({products.length} Sarees)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      </section>

      {/* SECTION 5: Heritage Story */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="relative rounded-3xl bg-obsidian-900 border border-gold-500/20 p-8 lg:p-16 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3.5 py-1.5 rounded-full bg-maroon-800/80 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase">
              Centuries of Handloom Excellence
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-ivory-100 leading-tight">
              The Heritage of Indian Handloom Mastery
            </h2>
            <p className="text-sm sm:text-base text-ivory-300 leading-relaxed font-light">
              Every saree in Sree Ram Silks tells an ancient story. Handloom weavers spend months weaving pure silk threads combined with tested 24K gold zari to construct heirlooms passed through generations.
            </p>
            <div className="pt-4 flex items-center gap-6">
              <div>
                <span className="block font-cinzel text-3xl font-bold text-gold-gradient">120+</span>
                <span className="text-xs text-ivory-400">Hours Per Weave</span>
              </div>
              <div className="h-8 w-px bg-gold-500/20" />
              <div>
                <span className="block font-cinzel text-3xl font-bold text-gold-gradient">100%</span>
                <span className="text-xs text-ivory-400">Pure Mulberry Silk</span>
              </div>
              <div className="h-8 w-px bg-gold-500/20" />
              <div>
                <span className="block font-cinzel text-3xl font-bold text-gold-gradient">24K</span>
                <span className="text-xs text-ivory-400">Tested Gold Zari</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gold-500/20">
            <img
              src="/images/products/kanchipuram_red_gold.png"
              alt="Handloom Weaving Craftsmanship"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

    </div>
  );
}
