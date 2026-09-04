import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductCard } from '../components/ui/ProductCard';
import { api } from '../lib/api';
import { Product, Category } from '../types';

export function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      if (!slug) return;
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          api.getCategories(),
          api.getProducts({ category: slug }),
        ]);
        const cat = cats.find(c => c.slug === slug || c._id === slug);
        setCategory(cat || null);
        setProducts(prods);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCategoryData();
  }, [slug]);

  return (
    <div className="w-full min-h-screen pt-28 pb-20 space-y-12">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-cinzel text-gold-400 font-semibold uppercase tracking-widest">
            Curated Handloom Tradition
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold text-ivory-100">
            {category ? category.name : slug}
          </h1>
          <p className="text-sm text-ivory-300 font-light leading-relaxed">
            {category?.description || 'Discover exquisite sarees within this curated weaving style.'}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gold-400 font-cinzel text-xs uppercase tracking-widest">
            Loading category drapes...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {products.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-ivory-400 space-y-4 bg-obsidian-900/60 rounded-3xl border border-gold-500/20 max-w-2xl mx-auto">
            <p>No sarees available under this category currently.</p>
            <Link to="/catalog" className="inline-block px-8 py-3.5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow">
              Explore Entire Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
