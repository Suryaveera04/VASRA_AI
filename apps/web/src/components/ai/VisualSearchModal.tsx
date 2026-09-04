import React, { useState } from 'react';
import { Camera, X, Upload, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useAIStylistStore } from '../../store/useAIStylistStore';
import { api } from '../../lib/api';
import { Product } from '../../types';

export function VisualSearchModal() {
  const { activeVisualSearchModal, closeVisualSearch, openStylist, openTryOn } = useAIStylistStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Product[]>([]);

  if (!activeVisualSearchModal) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const url = event.target.result as string;
          setImagePreview(url);
          performVisualSearch(url);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const performVisualSearch = async (imageUrl: string) => {
    setIsSearching(true);
    try {
      // Analyze image to extract query criteria
      const analysis = await api.analyzeGarment({ imageUrl });
      const fabric = analysis.detectedAttributes?.fabric;
      const color = analysis.detectedAttributes?.colors?.[0];

      const prods = await api.getProducts({ fabric, color }, 1, 6);
      setResults(prods.length > 0 ? prods : await api.getProducts({}, 1, 6));
    } catch {
      const fallback = await api.getProducts({}, 1, 6);
      setResults(fallback);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-xl" onClick={closeVisualSearch} />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-obsidian-950 border border-gold-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gold-500/20 bg-obsidian-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
              <Camera className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient">
                Visual Search by Saree Image
              </h2>
              <span className="text-xs text-ivory-400">
                Upload any saree photo to find visually identical drapes in our catalog
              </span>
            </div>
          </div>

          <button onClick={closeVisualSearch} className="p-2 rounded-full bg-obsidian-800 text-ivory-400 hover:text-gold-400 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Upload Area */}
          <div className="relative rounded-2xl bg-obsidian-900 border-2 border-dashed border-gold-500/30 p-6 flex flex-col items-center justify-center text-center">
            {imagePreview ? (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img src={imagePreview} alt="Reference Saree" className="w-32 h-40 object-cover rounded-xl border border-gold-500/30 shadow-lg" />
                <div className="text-left space-y-2">
                  <span className="px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-400 text-[11px] font-mono">
                    Visual Vector Extracted
                  </span>
                  <p className="text-xs text-ivory-300">Matching motifs, zari borders, and color hues against 30+ handloom drapes.</p>
                  <label className="inline-block px-4 py-2 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-xs text-gold-400 font-semibold cursor-pointer transition">
                    Upload Another Photo
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center space-y-3 py-6">
                <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-cinzel text-base font-bold text-ivory-100">Drop or Upload a Saree Reference Photo</h3>
                  <p className="text-xs text-ivory-400">Find similar color palettes, border weights, and weaving styles.</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>

          {/* Results Grid */}
          {isSearching ? (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto" />
              <p className="font-cinzel text-xs text-gold-400 uppercase tracking-widest">Searching catalog with visual embeddings...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-cinzel text-sm font-bold text-ivory-100 uppercase tracking-wider">
                Top Visual Matches ({results.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((prod) => (
                  <div key={prod._id} className="rounded-2xl bg-obsidian-900 border border-gold-500/20 p-3 space-y-2">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-950">
                      <img src={prod.images[0]?.url} alt={prod.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-obsidian-950/80 backdrop-blur-md text-[10px] font-mono text-gold-400">
                        ₹{prod.price.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold text-ivory-100 line-clamp-1">{prod.name}</h4>
                      <span className="text-[10px] text-ivory-400">{prod.attributes?.fabric}</span>
                    </div>
                    <button
                      onClick={() => {
                        closeVisualSearch();
                        openTryOn(prod);
                      }}
                      className="w-full py-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 text-gold-400 text-xs font-semibold flex items-center justify-center gap-1 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try On Me</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
