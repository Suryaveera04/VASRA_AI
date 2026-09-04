import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Plus, Trash2, Edit3, FolderTree } from 'lucide-react';
import { api } from '../../lib/api';
import { Category } from '../../types';

export function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    try {
      await api.createCategory({ name, description });
      setName('');
      setDescription('');
      loadCategories();
    } catch (err: any) {
      alert(err.message || 'Failed to create category.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.deleteCategory(id);
      loadCategories();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-2xl font-bold text-ivory-100">Category CMS</h1>
            <p className="text-xs text-ivory-400">Manage handloom weaving categories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Form */}
          <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4 h-fit">
            <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Add New Category</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Category Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Kanchipuram Tissue"
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Craft backstory summary"
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl p-3 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider"
              >
                Create Category
              </button>
            </form>
          </div>

          {/* Categories List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-ivory-100">{cat.name}</h4>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="p-1 text-rose-400 hover:bg-rose-500/20 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-ivory-400 line-clamp-2">{cat.description}</p>
                  <span className="inline-block text-[10px] font-mono text-gold-400">Slug: /category/{cat.slug}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
