import React, { useState } from 'react';
import { Sparkles, ArrowRight, Camera } from 'lucide-react';
import { useAIStylistStore } from '../../store/useAIStylistStore';

export function AICommandBar() {
  const { openStylist, openVisualSearch } = useAIStylistStore();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      openStylist();
      return;
    }
    openStylist(query.trim());
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-obsidian-900/90 backdrop-blur-xl border border-gold-500/30 rounded-full p-2 shadow-2xl group hover:border-gold-500/60 transition-all"
      >
        <div className="pl-4 pr-2 text-gold-400">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask VASRĀ AI Stylist... E.g. 'Traditional red silk saree for wedding under ₹10,000'"
          className="flex-1 bg-transparent text-xs sm:text-sm text-ivory-100 placeholder:text-ivory-400 focus:outline-none py-2"
        />

        <div className="flex items-center gap-1.5 pr-1">
          <button
            type="button"
            onClick={openVisualSearch}
            title="Visual Search by Saree Photo"
            className="p-2.5 rounded-full bg-obsidian-800 text-ivory-300 hover:text-gold-400 hover:bg-obsidian-700 transition"
          >
            <Camera className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow hover:scale-105 transition"
          >
            <span>Ask AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
