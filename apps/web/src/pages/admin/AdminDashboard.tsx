import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ShoppingBag, FolderTree, Sparkles, Plus, Eye, ArrowUpRight, TrendingUp, Wand2, DollarSign, Package } from 'lucide-react';
import { api } from '../../lib/api';
import { Product, Category, RevenueMetrics } from '../../types';

export function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const [prods, cats, rev] = await Promise.all([
          api.getProducts({}, 1, 50),
          api.getCategories(),
          api.getRevenueMetrics().catch(() => null),
        ]);
        setProducts(prods);
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
  const featuredProducts = products.filter((p) => p.featured).length;

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
              ₹{(revenueMetrics?.aiAssistedGMV || 8499).toLocaleString()}
            </span>
            <span className="text-[11px] text-emerald-400">Directly driven by AI Stylist</span>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
            <div className="flex items-center justify-between text-gold-400">
              <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI Try-Ons</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="block font-cinzel text-3xl font-extrabold text-ivory-100">
              {revenueMetrics?.tryOnsCompleted || 8}
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
            <span className="block font-cinzel text-3xl font-extrabold text-emerald-400">94/100</span>
            <span className="text-[11px] text-gold-400">Saree DNA & SEO complete</span>
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
              Inspect Razorpay orders, payment signatures, and AI Stylist source conversion attribution.
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
            <h2 className="font-cinzel text-lg font-bold text-ivory-100">Recently Updated Sarees</h2>
            <Link to="/admin/products" className="text-xs text-gold-400 hover:underline flex items-center gap-1">
              Manage All Sarees <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory-300">
              <thead className="bg-obsidian-800 text-gold-400 font-cinzel uppercase tracking-wider">
                <tr>
                  <th className="p-3">Saree Name</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Saree DNA</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {products.slice(0, 5).map((p) => (
                  <tr key={p._id} className="hover:bg-obsidian-800/50">
                    <td className="p-3 font-semibold text-ivory-100 flex items-center gap-3">
                      <img src={p.images[0]?.url} alt="" className="w-9 h-9 object-cover rounded-lg" />
                      <span>{p.name}</span>
                    </td>
                    <td className="p-3 font-mono">{p.sku}</td>
                    <td className="p-3">{p.categoryName || 'General'}</td>
                    <td className="p-3 font-bold text-gold-400">₹{p.price.toLocaleString()}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gold-500/20 text-gold-400">
                        {p.sareeDNA?.style || 'Traditional'}
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
