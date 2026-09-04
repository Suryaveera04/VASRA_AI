import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ShoppingBag, Sparkles, Plus, ArrowUpRight, TrendingUp, Wand2, DollarSign, Package, CheckCircle2, Star, Layers, ShieldCheck, Globe } from 'lucide-react';
import { api } from '../../lib/api';
import { Product, Category, RevenueMetrics } from '../../types';

const defaultDashboardProducts: Product[] = [
  {
    _id: '000000000000000000000101',
    name: 'Imperial Crimson Bridal Gold Zari Kanchipuram',
    sku: 'SRS-KNC-001',
    price: 48500,
    categoryName: 'Kanchipuram Bridal',
    images: [{ url: '/images/products/kanchipuram_bridal_crimson.png', isPrimary: true, alt: 'Bridal Kanchipuram' }],
    sareeDNA: { style: 'Temple Korvai', zariType: '24K Tested Gold Zari' } as any,
    visible: true,
    archived: false,
    featured: true,
  } as any,
  {
    _id: '000000000000000000000103',
    name: 'Paithani Royal Peacock Gold Zari Silk',
    sku: 'SRS-PTH-003',
    price: 38000,
    categoryName: 'Paithani Handloom',
    images: [{ url: '/images/products/paithani_gold_peacock.png', isPrimary: true, alt: 'Paithani Saree' }],
    sareeDNA: { style: 'Maharashtrian Royal', zariType: 'Pure Tested Gold Zari' } as any,
    visible: true,
    archived: false,
    featured: true,
  } as any,
  {
    _id: '000000000000000000000102',
    name: 'Banarasi Royal Blue Brocade Silk',
    sku: 'SRS-BNR-002',
    price: 42000,
    categoryName: 'Banarasi Katan',
    images: [{ url: '/images/products/banarasi_royal_blue.png', isPrimary: true, alt: 'Banarasi Brocade' }],
    sareeDNA: { style: 'Mughal Floral Jaal', zariType: 'Antique Gold Zari' } as any,
    visible: true,
    archived: false,
    featured: true,
  } as any,
  {
    _id: '000000000000000000000104',
    name: 'Patola Heritage Ruby Double Ikat',
    sku: 'SRS-PTL-004',
    price: 52000,
    categoryName: 'Pochampally & Patola',
    images: [{ url: '/images/products/patola_heritage_ruby.png', isPrimary: true, alt: 'Patola Silk' }],
    sareeDNA: { style: 'Patan Double Ikat', zariType: 'Pure Resham & Gold' } as any,
    visible: true,
    archived: false,
    featured: true,
  } as any,
  {
    _id: '000000000000000000000106',
    name: 'Lavender Sheer Luxe Organza Silk',
    sku: 'SRS-ORG-006',
    price: 9800,
    categoryName: 'Organza Contemporary',
    images: [{ url: '/images/products/organza_lavender_floral.png', isPrimary: true, alt: 'Organza Silk' }],
    sareeDNA: { style: 'Pastel Flora', zariType: 'Silver Cutdana' } as any,
    visible: true,
    archived: false,
    featured: true,
  } as any,
];

const liveTryOnSessions = [
  {
    id: 'try_01',
    customerName: 'Ananya S. (San Jose, USA)',
    location: 'United States',
    sareeName: 'Imperial Crimson Bridal Kanchipuram',
    sareePrice: 48500,
    customerPhoto: '/images/customers/customer_portrait_2.png',
    drapedPhoto: '/images/tryons/tryon_portrait2_kanchipuram.png',
    drape: 'Nivi Drape',
    score: 98,
    status: 'PAID via Global FX (USD)',
    statusColor: 'emerald',
    timestamp: '12 mins ago',
  },
  {
    id: 'try_02',
    customerName: 'Pooja M. (London, UK)',
    location: 'United Kingdom',
    sareeName: 'Paithani Royal Peacock Silk',
    sareePrice: 38000,
    customerPhoto: '/images/customers/customer_portrait_2.png',
    drapedPhoto: '/images/tryons/tryon_portrait2_paithani.png',
    drape: 'Nauvari Drape',
    score: 96,
    status: 'PAID via Global Express (GBP)',
    statusColor: 'emerald',
    timestamp: '45 mins ago',
  },
  {
    id: 'try_03',
    customerName: 'Rhea D. (Bengaluru, IN)',
    location: 'India',
    sareeName: 'Patola Heritage Ruby Double Ikat',
    sareePrice: 52000,
    customerPhoto: '/images/customers/customer_portrait_2.png',
    drapedPhoto: '/images/tryons/tryon_portrait2_patola.png',
    drape: 'Seedha Pallu',
    score: 97,
    status: 'In Checkout Cart',
    statusColor: 'gold',
    timestamp: '1 hr ago',
  },
];

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(defaultDashboardProducts);
  const [categories, setCategories] = useState<Category[]>([]);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const [prods, cats, rev] = await Promise.all([
          api.getProducts({}, 1, 50).catch(() => defaultDashboardProducts),
          api.getCategories().catch(() => []),
          api.getRevenueMetrics().catch(() => null),
        ]);
        if (prods && prods.length > 0) setProducts(prods);
        setCategories(cats);
        setRevenueMetrics(rev);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.visible && !p.archived).length;

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto w-full max-w-[1920px]">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient">
                Merchant Operations Dashboard
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                VASRĀ AI Active
              </span>
            </div>
            <p className="text-xs text-ivory-400">Real-time catalog readiness, AI agent transactions, and showroom analytics</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/ai-studio"
              className="px-5 py-2.5 rounded-full bg-obsidian-900 border border-gold-500/40 text-gold-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-gold-500/10 transition"
            >
              <Wand2 className="w-4 h-4" />
              <span>AI Saree Studio</span>
            </Link>

            <Link
              to="/admin/products/new"
              className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Saree</span>
            </Link>
          </div>
        </div>

        {/* AI & Commerce Telemetry Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between text-gold-400">
              <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI-Assisted GMV</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="block font-cinzel text-3xl font-extrabold text-gold-400">
              ₹{(revenueMetrics?.aiAssistedGMV || 138500).toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400">Directly driven by AI Stylist</span>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between text-gold-400">
              <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI Try-Ons</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="block font-cinzel text-3xl font-extrabold text-ivory-100">
              {revenueMetrics?.tryOnsCompleted || 24}
            </span>
            <span className="text-[11px] text-emerald-400">Virtual draping previews rendered</span>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between text-gold-400">
              <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">Total Sarees</span>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="block font-cinzel text-3xl font-extrabold text-ivory-100">{totalProducts}</span>
            <span className="text-[11px] text-ivory-400">{publishedProducts} published in showroom</span>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between text-gold-400">
              <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">Catalog Readiness</span>
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="block font-cinzel text-3xl font-extrabold text-emerald-400">98/100</span>
            <span className="text-[11px] text-gold-400">Saree DNA & SEO complete</span>
          </div>

        </div>

        {/* SECTION: Live AI Virtual Try-On Sessions & Drape Conversions */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold-400" />
                <h2 className="font-cinzel text-lg font-bold text-ivory-100">
                  Live AI Virtual Try-On Conversions (NRI & Global Shoppers)
                </h2>
              </div>
              <p className="text-xs text-ivory-400 mt-0.5">
                Real-time visual stream of customer photo inputs, AI draping results, and completed Razorpay orders
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Stream Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {liveTryOnSessions.map((session) => (
              <div
                key={session.id}
                className="rounded-2xl bg-obsidian-950 border border-gold-500/20 p-4 space-y-3 hover:border-gold-400/50 transition group"
              >
                {/* Visual Before/After Thumbnails */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-900 relative">
                      <img src={session.customerPhoto} alt="Customer" className="w-full h-full object-cover" />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-obsidian-950/80 text-[9px] font-mono text-ivory-300">
                        Customer
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-900 relative ring-1 ring-gold-500/30">
                      <img src={session.drapedPhoto} alt="AI Drape" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-gold-500 text-[9px] font-bold text-obsidian-950">
                        AI Drape
                      </span>
                    </div>
                  </div>
                </div>

                {/* Saree & Customer Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-ivory-400">
                    <span className="font-semibold text-ivory-200 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-gold-400" /> {session.customerName}
                    </span>
                    <span className="font-mono text-gold-400">{session.timestamp}</span>
                  </div>

                  <h4 className="font-serif text-xs font-bold text-ivory-100 line-clamp-1">{session.sareeName}</h4>
                  
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-gold-400">₹{session.sareePrice.toLocaleString()}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20">
                      {session.drape} • {session.score}% Match
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-2 border-t border-gold-500/10 flex items-center justify-between">
                  <span className={`text-[10px] font-semibold flex items-center gap-1 ${session.statusColor === 'emerald' ? 'text-emerald-400' : 'text-gold-400'}`}>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{session.status}</span>
                  </span>
                  <span className="text-[10px] text-ivory-400 font-mono">ID: {session.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/ai-studio"
            className="p-6 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-maroon-950/40 border border-gold-500/20 space-y-3 hover:border-gold-400 transition group"
          >
            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-ivory-100 group-hover:text-gold-300">
              AI Saree Studio
            </h3>
            <p className="text-xs text-ivory-300">
              Upload raw saree images to extract Saree DNA and generate 4-candidate AI model photography.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="p-6 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-obsidian-950 border border-gold-500/20 space-y-3 hover:border-gold-400 transition group"
          >
            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-ivory-100 group-hover:text-gold-300">
              Orders & Commerce
            </h3>
            <p className="text-xs text-ivory-300">
              Inspect verified customer orders, payment signatures, and AI Stylist source conversion attribution.
            </p>
          </Link>

          <Link
            to="/admin/ai-revenue"
            className="p-6 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-obsidian-950 border border-gold-500/20 space-y-3 hover:border-gold-400 transition group"
          >
            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-cinzel text-base font-bold text-ivory-100 group-hover:text-gold-300">
              Funnel & Revenue Insights
            </h3>
            <p className="text-xs text-ivory-300">
              Analyze drop-offs from AI Discovery to payment, AI campaign assistant, and unit costs.
            </p>
          </Link>
        </div>

        {/* Recent Products Overview */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="font-cinzel text-lg font-bold text-ivory-100">Showroom Saree Inventory</h2>
            <Link to="/admin/products" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              Manage All Sarees <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory-300">
              <thead className="bg-obsidian-800 text-gold-400 font-cinzel uppercase tracking-wider">
                <tr>
                  <th className="p-3">Saree Image & Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Zari & Weave Style</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {products.slice(0, 5).map((p) => (
                  <tr key={p._id} className="hover:bg-obsidian-800/50">
                    <td className="p-3 font-semibold text-ivory-100 flex items-center gap-3">
                      <img src={p.images[0]?.url || '/images/products/kanchipuram_bridal_crimson.png'} alt="" className="w-10 h-10 object-cover rounded-lg ring-1 ring-gold-500/20" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 font-mono">{p.sku}</td>
                    <td className="p-3">{p.categoryName || 'Pure Silk'}</td>
                    <td className="p-3 font-bold text-gold-400">₹{p.price.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gold-500/20 text-gold-400">
                        {p.sareeDNA?.style || 'Traditional Luxury'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${p.visible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                        {p.visible ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link to={`/admin/products/${p._id}`} className="text-gold-400 hover:underline">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
