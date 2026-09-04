import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Image, Upload, Copy, CheckCircle2 } from 'lucide-react';

const defaultMediaAssets = [
  { id: '1', name: 'kanchipuram_red_gold.png', url: '/images/products/kanchipuram_red_gold.png', size: '1.2 MB' },
  { id: '2', name: 'banarasi_royal_blue.png', url: '/images/products/banarasi_royal_blue.png', size: '1.4 MB' },
  { id: '3', name: 'emerald_green_kuttu.png', url: '/images/products/emerald_green_kuttu.png', size: '1.1 MB' },
  { id: '4', name: 'rose_gold_tissue.png', url: '/images/products/rose_gold_tissue.png', size: '980 KB' },
  { id: '5', name: 'burgundy_velvet_border.png', url: '/images/products/burgundy_velvet_border.png', size: '1.3 MB' },
  { id: '6', name: 'peacock_blue_chanderi.png', url: '/images/products/peacock_blue_chanderi.png', size: '1.0 MB' },
];

export function AdminMediaLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-2xl font-bold text-ivory-100">Media Library</h1>
            <p className="text-xs text-ivory-400">High-definition saree imagery & CDN asset manager</p>
          </div>

          <label className="px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-gold-glow">
            <Upload className="w-4 h-4" />
            <span>Upload New Asset</span>
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {defaultMediaAssets.map((asset) => (
            <div key={asset.id} className="group relative rounded-2xl bg-obsidian-900 border border-gold-500/20 overflow-hidden space-y-2 p-3">
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-950">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-ivory-200 font-mono truncate max-w-[120px]">{asset.name}</span>
                <button
                  onClick={() => handleCopy(asset.id, asset.url)}
                  className="text-gold-400 hover:text-gold-300 p-1"
                  title="Copy asset URL"
                >
                  {copiedId === asset.id ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
