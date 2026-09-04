import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Plus, Search, ArrowUp, ArrowDown, Edit3, Trash2, Eye, EyeOff, Save, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { Product } from '../../types';

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderChanged, setOrderChanged] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts({}, 1, 100);
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const moveProduct = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= products.length) return;

    const updated = [...products];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate displayOrder values
    updated.forEach((p, idx) => {
      p.displayOrder = (idx + 1) * 100;
    });

    setProducts(updated);
    setOrderChanged(true);
  };

  const saveDisplayOrder = async () => {
    setSavingOrder(true);
    try {
      const payload = products.map(p => ({ id: p._id, displayOrder: p.displayOrder }));
      await api.reorderProducts(payload);
      setOrderChanged(false);
    } catch (err) {
      alert('Failed to save product order.');
    } finally {
      setSavingOrder(false);
    }
  };

  const toggleVisibility = async (product: Product) => {
    try {
      await api.updateProduct(product._id, { visible: !product.visible });
      setProducts(products.map(p => p._id === product._id ? { ...p, visible: !p.visible } : p));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const archiveProduct = async (id: string) => {
    if (!confirm('Archive this saree from catalog?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to archive saree.');
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.sku.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-2xl font-bold text-ivory-100">Product Management</h1>
            <p className="text-xs text-ivory-400">Reorder, edit, and control visibility of your sarees</p>
          </div>

          <div className="flex items-center gap-3">
            {orderChanged && (
              <button
                onClick={saveDisplayOrder}
                disabled={savingOrder}
                className="px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg animate-pulse"
              >
                <Save className="w-4 h-4" />
                <span>{savingOrder ? 'Saving...' : 'Save New Display Order'}</span>
              </button>
            )}

            <Link
              to="/admin/products/new"
              className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
            >
              <Plus className="w-4 h-4" />
              <span>New Product</span>
            </Link>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center gap-4 bg-obsidian-900 border border-gold-500/20 rounded-2xl p-4">
          <Search className="w-4 h-4 text-gold-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, SKU..."
            className="w-full bg-transparent text-xs text-ivory-100 placeholder-ivory-400 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-ivory-300">
              <thead className="bg-obsidian-800 text-gold-400 font-cinzel uppercase tracking-wider">
                <tr>
                  <th className="p-3 w-16 text-center">Order</th>
                  <th className="p-3">Saree</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Visibility</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10">
                {filteredProducts.map((p, idx) => (
                  <tr key={p._id} className="hover:bg-obsidian-800/50">
                    
                    {/* Reorder Buttons */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => moveProduct(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-ivory-400 hover:text-gold-400 disabled:opacity-20"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveProduct(idx, 'down')}
                          disabled={idx === filteredProducts.length - 1}
                          className="p-1 text-ivory-400 hover:text-gold-400 disabled:opacity-20"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Saree Info */}
                    <td className="p-3 font-semibold text-ivory-100 flex items-center gap-3">
                      <img src={p.images[0]?.url} alt="" className="w-10 h-10 object-cover rounded-lg border border-gold-500/20" />
                      <span>{p.name}</span>
                    </td>

                    <td className="p-3 font-mono">{p.sku}</td>
                    <td className="p-3">{p.categoryName || 'General'}</td>
                    <td className="p-3 font-bold text-gold-400">₹{p.price.toLocaleString()}</td>

                    {/* Visibility Toggle */}
                    <td className="p-3">
                      <button
                        onClick={() => toggleVisibility(p)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 border transition ${
                          p.visible
                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                            : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        }`}
                      >
                        {p.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{p.visible ? 'Visible' : 'Hidden'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${p._id}`}
                          className="p-1.5 rounded-lg bg-obsidian-800 text-ivory-300 hover:text-gold-400 hover:bg-obsidian-700 transition"
                          title="Edit Saree"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => archiveProduct(p._id)}
                          className="p-1.5 rounded-lg bg-obsidian-800 text-rose-400 hover:bg-rose-500/20 transition"
                          title="Archive Saree"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
