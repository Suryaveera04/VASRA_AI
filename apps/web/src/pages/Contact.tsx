import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';

import { SITE_CONFIG } from '../config/siteConfig';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', occasion: 'Bridal Consultation' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = `Hello ${SITE_CONFIG.ownerName} / ${SITE_CONFIG.shopName}, I would like to book a private saree styling consultation.`;
    window.open(SITE_CONFIG.getWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="w-full min-h-screen pt-28 pb-20 space-y-12">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-10">
        
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-cinzel text-gold-400 font-semibold uppercase tracking-widest">
            Concierge Services
          </span>
          <h1 className="font-cinzel text-4xl sm:text-5xl font-bold text-ivory-100">
            Private Handloom Consultations
          </h1>
          <p className="text-sm text-ivory-300 font-light">
            Connect directly with {SITE_CONFIG.ownerName} and our master drapers for customized wedding trousseau curation, bespoke color dyeing, or international shipping assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-obsidian-900 border border-gold-500/20 space-y-6 shadow-xl">
              <h3 className="font-cinzel text-xl font-bold text-ivory-100">Showroom Concierge</h3>
              
              <div className="space-y-5 text-sm text-ivory-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ivory-100 block">Flagship Showroom</span>
                    <p className="text-xs text-ivory-400 mt-0.5 leading-relaxed">
                      108 Imperial Heritage Lane, Silk Quarter, Kanchipuram, Tamil Nadu - 631501
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ivory-100 block">Direct Telephone / WhatsApp</span>
                    <p className="text-xs text-ivory-400 mt-0.5">{SITE_CONFIG.phoneDisplay} (Mon - Sun, 9 AM - 9 PM IST)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ivory-100 block">Email Concierge</span>
                    <p className="text-xs text-ivory-400 mt-0.5">concierge@vasra.ai</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold-500/10">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-4 rounded-full bg-maroon-800 hover:bg-maroon-700 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-obsidian-900 border border-gold-500/20 shadow-2xl">
              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="font-cinzel text-2xl font-bold text-ivory-100">Inquiry Received</h3>
                  <p className="text-xs text-ivory-300 max-w-md mx-auto">
                    Thank you for reaching out. Our chief silk draper will review your bespoke requirements and contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <h3 className="font-cinzel text-xl font-bold text-ivory-100 mb-6">Schedule Consultation</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-ivory-400">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ananya Sharma"
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-3 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-ivory-400">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-3 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-ivory-400">Phone Number (with WhatsApp)</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-3 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-ivory-400">Occasion Type</label>
                      <select
                        value={formData.occasion}
                        onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                        className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-3 text-ivory-100 focus:outline-none focus:border-gold-400"
                      >
                        <option value="Bridal Consultation">Bridal Trousseau Curation</option>
                        <option value="Wedding Guest">Wedding Guest Styling</option>
                        <option value="Festival Celebrations">Festive Wardrobe</option>
                        <option value="Bespoke Dyeing">Custom Weave & Color Dyeing</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-ivory-400">Message / Saree Specifications</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your preferred color palette, budget, or event date..."
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-3 text-ivory-100 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.01] transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Consultation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
