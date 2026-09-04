import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center bg-obsidian-950">
      <div className="space-y-8 max-w-lg">
        {/* Decorative Gold Ornament */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gold-700 via-gold-500 to-gold-300 p-0.5 shadow-gold-glow animate-pulse-slow">
            <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-gold-400" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-cinzel text-gold-400 font-semibold tracking-[0.3em] uppercase">
            404 — The thread is lost
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-extrabold text-ivory-100 leading-tight">
            The weave you were<br />
            <span className="text-gold-gradient">looking for isn't here.</span>
          </h1>
          <p className="text-sm text-ivory-400 font-light leading-relaxed max-w-sm mx-auto">
            This saree may have been archived, moved, or this URL may not exist in our collection.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/catalog"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-sm uppercase tracking-wider shadow-gold-glow transition"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Explore Full Collection</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-obsidian-900 hover:bg-obsidian-800 text-ivory-200 hover:text-gold-400 text-sm font-semibold border border-gold-500/30 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Showroom</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
