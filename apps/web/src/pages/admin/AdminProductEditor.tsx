import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Save, ArrowLeft, Plus, Trash2, Image, Sparkles, Check } from 'lucide-react';
import { api } from '../../lib/api';
import { Category } from '../../types';

export function AdminProductEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id && id !== 'new');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: 45000,
    compareAtPrice: 50000,
    shortDescription: '',
    description: '',
    categoryId: 'cat-1',
    categoryName: 'Kanchipuram Buttas',
    fabric: 'Kanchipuram Silk',
    color: 'Crimson Red',
    occasion: 'Wedding',
    weave: 'Korvai Handloom',
    border: 'Heavy Gold Zari Border',
    tags: 'Wedding, Kanchipuram, Red, Gold Zari',
    featured: true,
    visible: true,
    imageUrl: '/images/products/kanchipuram_red_gold.png',
    images: [
      { url: '/images/products/kanchipuram_red_gold.png', alt: 'Saree View 1', isPrimary: true, order: 0 }
    ],
    seoTitle: '',
    seoDescription: '',
  });

  useEffect(() => {
    async function initData() {
      try {
        const cats = await api.getCategories();
        setCategories(cats);

        if (isEditing && id) {
          setLoading(true);
          const prod = await api.getProductBySlug(id);
          setFormData({
            name: prod.name,
            sku: prod.sku,
            price: prod.price,
            compareAtPrice: prod.compareAtPrice || 0,
            shortDescription: prod.shortDescription || '',
            description: prod.description || '',
            categoryId: prod.categoryId,
            categoryName: prod.categoryName || '',
            fabric: prod.attributes?.fabric || 'Kanchipuram Silk',
            color: prod.attributes?.color || 'Red',
            occasion: prod.attributes?.occasion || 'Wedding',
            weave: prod.attributes?.weave || 'Handloom',
            border: prod.attributes?.border || 'Gold Border',
            tags: prod.tags ? prod.tags.join(', ') : '',
            featured: prod.featured,
            visible: prod.visible,
            imageUrl: prod.images[0]?.url || '/images/products/kanchipuram_red_gold.png',
            images: prod.images && prod.images.length > 0
              ? prod.images.map((img, i) => ({
                  url: img.url,
                  alt: img.alt || prod.name,
                  isPrimary: Boolean(img.isPrimary),
                  order: img.order ?? i,
                }))
              : [
                  { url: '/images/products/kanchipuram_red_gold.png', alt: prod.name, isPrimary: true, order: 0 }
                ],
            seoTitle: prod.seo?.title || '',
            seoDescription: prod.seo?.description || '',
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddImage = () => {
    if (!formData.imageUrl) return;
    setFormData(prev => ({
      ...prev,
      images: [
        ...prev.images,
        { url: prev.imageUrl, alt: prev.name || 'Saree View', isPrimary: prev.images.length === 0, order: prev.images.length }
      ],
      imageUrl: '',
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
      shortDescription: formData.shortDescription,
      description: formData.description,
      categoryId: formData.categoryId,
      categoryName: categories.find(c => c._id === formData.categoryId)?.name || formData.categoryName,
      attributes: {
        fabric: formData.fabric,
        color: formData.color,
        occasion: formData.occasion,
        weave: formData.weave,
        border: formData.border,
      },
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured: formData.featured,
      visible: formData.visible,
      images: formData.images,
      seo: {
        title: formData.seoTitle || formData.name,
        description: formData.seoDescription || formData.shortDescription,
      },
    };

    try {
      if (isEditing && id) {
        await api.updateProduct(id, payload);
      } else {
        await api.createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err: any) {
      alert(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-obsidian-950 p-8 text-gold-400">Loading product editor...</div>;
  }

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/products" className="p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-300 hover:text-gold-400">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-cinzel text-2xl font-bold text-ivory-100">
                {isEditing ? 'Edit Saree Product' : 'Create New Saree'}
              </h1>
              <p className="text-xs text-ivory-400">Configure specifications, images, and pricing</p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Product'}</span>
          </button>
        </div>

        {/* Form Fields Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Basic Info & Attributes */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* General Card */}
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">General Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Crimson Gold Zari Kanchipuram Butta"
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">SKU Code</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                    placeholder="e.g. SRS-KCB-001"
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100 font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Short Description</label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief 1-sentence summary"
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Full Detailed Story & Weave Specifications</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl p-3.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Saree Attributes */}
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Saree Handloom Attributes</h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Fabric</label>
                  <input
                    type="text"
                    name="fabric"
                    value={formData.fabric}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Color Hue</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Occasion</label>
                  <input
                    type="text"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Weave Technique</label>
                  <input
                    type="text"
                    name="weave"
                    value={formData.weave}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Border Work</label>
                  <input
                    type="text"
                    name="border"
                    value={formData.border}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ivory-300 mb-1">Tags (Comma Separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3 py-2 text-xs text-ivory-100"
                  />
                </div>
              </div>
            </div>

            {/* Images Manager */}
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Product Gallery Images</h3>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Paste Image URL (/images/products/...) or Cloudinary URL"
                  className="flex-1 bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="px-4 py-2 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gold-500/30 group bg-obsidian-950">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Visibility */}
          <div className="space-y-6">
            
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Pricing & Category</h3>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Selling Price (INR ₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-sm font-bold text-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Compare-At Price (INR ₹)</label>
                <input
                  type="number"
                  name="compareAtPrice"
                  value={formData.compareAtPrice}
                  onChange={handleChange}
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ivory-300 mb-1">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100"
                >
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visibility Toggles */}
            <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Status & Features</h3>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="visible"
                  checked={formData.visible}
                  onChange={handleChange}
                  className="accent-gold-500 w-4 h-4"
                />
                <span className="text-xs text-ivory-200">Visible in Public Showroom</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="accent-gold-500 w-4 h-4"
                />
                <span className="text-xs text-ivory-200">Featured in Hero / Signature Section</span>
              </label>
            </div>

          </div>

        </form>

      </main>
    </div>
  );
}
