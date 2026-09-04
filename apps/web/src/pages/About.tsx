import React from 'react';
import { Sparkles, ShieldCheck, Crown, Heart } from 'lucide-react';

export function About() {
  return (
    <div className="w-full min-h-screen pt-28 pb-20 space-y-12">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-10">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs font-cinzel text-gold-400 font-semibold uppercase tracking-widest">
            The Legacy of VASRĀ AI & Sree Ram Silks
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold text-ivory-100">
            Centuries of Indian Weaving Mastery • Reimagined in 3D
          </h1>
        </div>

        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-gold-500/20 shadow-2xl">
          <img src="/images/products/kanchipuram_red_gold.png" alt="Sree Ram Silks Heritage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto text-ivory-300 space-y-6 text-base sm:text-lg leading-relaxed font-light">
          <p>
            Founded on the ancient looms of Kanchipuram and Varanasi, VASRĀ AI / Sree Ram Silks represents the pinnacle of Indian textile artistry. For generations, our master drapers have preserved the sacred traditions of 24K gold zari weaving, Korvai temple interlocking, and Banarasi kadwa brocades.
          </p>
          <p>
            Each saree in our digital showroom is a living piece of art—woven using 100% pure Mulberry silk, natural dyes, and tested zari threads that shine across generations. Now with VASRĀ AI, every customer can interactively style and drape these masterpieces on themselves in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gold-500/20">
          <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold-500/20 text-center space-y-3 shadow-xl">
            <Crown className="w-10 h-10 text-gold-400 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-ivory-100">Royal Heritage</h3>
            <p className="text-xs text-ivory-400">Preserving 300+ year-old weaving techniques for global patrons.</p>
          </div>
          <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold-500/20 text-center space-y-3 shadow-xl">
            <ShieldCheck className="w-10 h-10 text-gold-400 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-ivory-100">Silk Mark Certified</h3>
            <p className="text-xs text-ivory-400">Authentic 100% pure Mulberry silk verified by official silk boards.</p>
          </div>
          <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold-500/20 text-center space-y-3 shadow-xl">
            <Sparkles className="w-10 h-10 text-gold-400 mx-auto" />
            <h3 className="font-cinzel text-xl font-bold text-ivory-100">24K Zari Weave</h3>
            <p className="text-xs text-ivory-400">Woven with genuine tested silver-gold zari threads that never tarnish.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
