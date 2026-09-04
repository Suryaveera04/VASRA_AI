import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-obsidian-950 border-t border-gold-500/20 text-ivory-300 pt-16 pb-12 relative overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Narrative */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
              <span className="font-cinzel text-xl font-bold text-gold-gradient">
                VASRĀ AI
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ivory-400 leading-relaxed">
              Curators of authentic handloom heritage. Crafting 24K gold zari Kanchipuram silk, Banarasi brocades, and temple weaves for discerning connoisseurs worldwide with interactive AI styling and Virtual Try-On.
            </p>
            <div className="flex items-center gap-4 text-gold-400 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold-300 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold-300 transition">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Showroom Catalog
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/catalog" className="hover:text-gold-400 transition">All Silk Sarees</Link></li>
              <li><Link to="/category/buttas" className="hover:text-gold-400 transition">Kanchipuram Buttas</Link></li>
              <li><Link to="/category/brokets" className="hover:text-gold-400 transition">Banarasi Brocades</Link></li>
              <li><Link to="/category/kuttu" className="hover:text-gold-400 transition">Kuttu Temple Weaves</Link></li>
              <li><Link to="/category/tissue" className="hover:text-gold-400 transition">Tissue Silk Collection</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Information & Help
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/about" className="hover:text-gold-400 transition">Craftsmanship Story</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition">Private Consultation</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold-400 transition">Terms of Service</Link></li>
              <li><Link to="/admin/login" className="text-gold-500/80 hover:text-gold-400 transition flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-cinzel text-sm font-semibold text-gold-400 tracking-wider uppercase mb-4">
              Showroom Address
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-ivory-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>108 Imperial Heritage Lane, Silk Quarter, Kanchipuram, TN - 631501</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>concierge@vasra.ai</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gold-500/10 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-400 gap-4">
          <p>© {new Date().getFullYear()} VASRĀ AI / Sree Ram Silks. All Rights Reserved. Powered by 3D WebGL & Autonomous Commerce.</p>
          <div className="flex items-center gap-6">
            <span>Handloom Mark Certified</span>
            <span>Silk Mark Authorized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
