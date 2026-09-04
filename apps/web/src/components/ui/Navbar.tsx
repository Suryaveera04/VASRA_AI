import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sparkles, SlidersHorizontal, Menu, X, Shield, MessageCircle, ShoppingBag, Camera } from 'lucide-react';
import { useCatalogStore } from '../../store/useCatalogStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';
import { useAIStylistStore } from '../../store/useAIStylistStore';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSearch, toggleFilterDrawer } = useCatalogStore();
  const { isAuthenticated } = useAuthStore();
  const { toggleCart, getTotalItems } = useCartStore();
  const { openStylist, openVisualSearch } = useAIStylistStore();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Showroom Home', path: '/' },
    { name: 'Full Catalog', path: '/catalog' },
    { name: 'Heritage Story', path: '/about' },
  ];

  const totalCartItems = getTotalItems();

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello VASRĀ AI / Sree Ram Silks, I would like to inquire about your luxury saree collection.');
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian-950/90 backdrop-blur-xl border-b border-gold-500/20 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-obsidian-950/90 via-obsidian-950/40 to-transparent py-4'
      }`}
    >
      {/* Full-width container using complete space */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-700 via-gold-500 to-gold-300 p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient">
                VASRĀ AI
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-[9px] font-mono text-gold-400 uppercase">
                3D Digital Twin
              </span>
            </div>
            <span className="text-[9px] tracking-[0.25em] text-ivory-400 font-sans uppercase">
              Sree Ram Silks • Imperial 3D Showroom
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs sm:text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 tracking-wide transition-colors ${
                  isActive ? 'text-gold-400 font-bold' : 'text-ivory-300 hover:text-gold-400'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & AI Features */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Ask AI Stylist Button */}
          <button
            onClick={() => openStylist()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs shadow-gold-glow hover:scale-105 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI Stylist</span>
          </button>

          {/* Visual Search Trigger */}
          <button
            onClick={openVisualSearch}
            title="Search by Saree Image"
            className="p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => toggleSearch(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-obsidian-900/80 border border-gold-500/20 text-ivory-300 hover:text-gold-400 hover:border-gold-500/40 transition text-xs"
          >
            <Search className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden md:inline">Search Sarees...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 text-[9px] bg-obsidian-800 text-ivory-400 rounded border border-gold-500/20">⌘K</kbd>
          </button>

          {/* Cart Drawer Trigger with Badge */}
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-200 hover:text-gold-400 transition"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-obsidian-950 font-bold text-[10px] flex items-center justify-center shadow-gold-glow animate-pulse">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Catalog Filter Button (Mobile) */}
          {location.pathname.startsWith('/catalog') && (
            <button
              onClick={() => toggleFilterDrawer(true)}
              className="lg:hidden p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-gold-400 hover:bg-gold-500/10 transition"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          {/* Admin Link Indicator */}
          {isAuthenticated ? (
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-500/20 border border-gold-500 text-gold-400 text-xs font-semibold hover:bg-gold-500 hover:text-obsidian-950 transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-400 hover:text-gold-400 transition"
              title="Admin Login"
            >
              <Shield className="w-4 h-4" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-obsidian-900 border border-gold-500/20 text-ivory-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-950/95 border-b border-gold-500/20 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-serif text-ivory-200 hover:text-gold-400"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-gold-500/20 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); openStylist(); }}
              className="w-full py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Saree Stylist</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); handleWhatsAppClick(); }}
              className="w-full py-2.5 rounded-xl bg-maroon-800 text-gold-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
