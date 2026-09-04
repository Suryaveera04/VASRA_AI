import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, RotateCcw, Bot, User, ArrowRight, ShieldCheck, CreditCard, Loader2, CheckCircle2, SlidersHorizontal, Eye } from 'lucide-react';
import { useAIStylistStore } from '../../store/useAIStylistStore';
import { useCartStore } from '../../store/useCartStore';
import { useCatalogStore } from '../../store/useCatalogStore';
import { Product } from '../../types';

export function AIStylistModal() {
  const {
    isOpen,
    closeStylist,
    messages,
    sendMessage,
    isLoading,
    openTryOn,
    openCompare,
    resetConversation,
  } = useAIStylistStore();

  const { addItem, openCart } = useCartStore();
  const { setQuickViewProduct } = useCatalogStore();
  const [inputPrompt, setInputPrompt] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputPrompt.trim() || isLoading) return;
    sendMessage(inputPrompt);
    setInputPrompt('');
  };

  const handleActionClick = (action: string, payload: any) => {
    if (action === 'SEND_PROMPT' && payload?.prompt) {
      sendMessage(payload.prompt);
    } else if (action === 'OPEN_TRY_ON_MODAL' && payload?.productId) {
      const found = messages
        .flatMap((m) => m.products || [])
        .find((p) => p._id === payload.productId);
      if (found) openTryOn(found);
    } else if (action === 'COMPARE') {
      const allProds = messages.flatMap((m) => m.products || m.comparedProducts || []);
      if (allProds.length >= 2) {
        openCompare(allProds.slice(0, 3));
      }
    } else if (action === 'CONFIRM_PAYMENT') {
      const prod = messages
        .flatMap((m) => [m.selectedProduct, ...(m.products || [])])
        .find((p) => p && p._id === payload.productId);
      if (prod) {
        addItem(prod, 1, 'Nivi', 'AI_AGENT');
        closeStylist();
        openCart();
      }
    } else if (action === 'SELECT_PRODUCT' && payload?.productId) {
      sendMessage(`Tell me more about this drape (ID: ${payload.productId})`);
    } else if (action === 'REFINE_SEARCH') {
      sendMessage(`Show me sarees under ₹${payload.maxPrice?.toLocaleString() || '15,000'}`);
    }
  };

  const quickPrompts = [
    { label: '🔴 Crimson Bridal Kanchipuram', query: 'Show me royal crimson bridal Kanchipuram sarees with pure gold zari' },
    { label: '💜 Paithani Peacock Pallu', query: 'I want a Maharashtrian Paithani silk with royal peacock gold pallu' },
    { label: '💛 Mustard Gadwal for Haldi', query: 'Show me mustard yellow and emerald green Gadwal silk under ₹20,000' },
    { label: '🌸 Pastel Banarasi Rangkat', query: 'Show me pastel Banarasi rangkat and katan georgette for daytime reception' },
    { label: '✨ Lavender Organza < ₹10k', query: 'Show me lightweight lavender sheer organza sarees under ₹10,000' },
    { label: '🍷 Maroon Mysore Crepe', query: 'Show me pure Mysore crepe silk sarees with solid gold borders' },
    { label: '🔷 Pochampally Double Ikat', query: 'Show me geometric double ikat Pochampally sarees under ₹15,000' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {/* Immersive backdrop */}
      <div className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-xl transition-opacity" onClick={closeStylist} />

      {/* Main Expansive Modal Container */}
      <div className="relative w-full max-w-5xl h-[92vh] bg-obsidian-950 border border-gold-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-gold-500/20 bg-obsidian-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-300 p-0.5 shadow-gold-glow">
              <div className="w-full h-full bg-obsidian-950 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient">
                  VASRĀ AI Saree Stylist
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                  NVIDIA Nemotron-70B & SareeDNA
                </span>
              </div>
              <p className="text-xs text-ivory-400">
                Grounded in active handloom showroom inventory • 6 Draping styles • Razorpay Verified
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetConversation}
              title="Reset conversation"
              className="p-2 rounded-full bg-obsidian-800 text-ivory-400 hover:text-gold-400 hover:bg-obsidian-700 transition text-xs flex items-center gap-1.5 px-3"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Session</span>
            </button>

            <button
              onClick={closeStylist}
              className="p-2 rounded-full bg-obsidian-800 text-ivory-400 hover:text-gold-400 hover:bg-obsidian-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  msg.sender === 'user'
                    ? 'bg-maroon-800 text-gold-300 border border-gold-500/30'
                    : 'bg-gold-500 text-obsidian-950 shadow-gold-glow'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Content */}
              <div className="space-y-3 flex-1">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-maroon-900/80 text-ivory-100 border border-gold-500/20 ml-auto'
                      : 'bg-obsidian-900 border border-gold-500/20 text-ivory-200'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Explainability Badge */}
                  {msg.explainabilityBadge && (
                    <div className="mt-3 pt-2 border-t border-gold-500/10 flex items-center gap-1.5 text-[11px] text-gold-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{msg.explainabilityBadge}</span>
                    </div>
                  )}
                </div>

                {/* Product Recommendations Grid */}
                {msg.products && msg.products.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                    {msg.products.map((prod) => (
                      <div
                        key={prod._id}
                        className="rounded-2xl bg-obsidian-900/90 border border-gold-500/30 p-3 space-y-2 group hover:border-gold-400 transition"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-950">
                          <img
                            src={prod.images[0]?.url || '/images/products/kanchipuram_bridal_crimson.png'}
                            alt={prod.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-obsidian-950/85 backdrop-blur-md text-[10px] font-mono text-gold-400 border border-gold-500/30 font-bold">
                            ₹{prod.price.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-serif text-xs font-bold text-ivory-100 line-clamp-1">{prod.name}</h4>
                          <span className="text-[10px] text-ivory-400">{prod.attributes?.fabric || 'Pure Handloom Silk'}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-1 pt-1">
                          <button
                            onClick={() => {
                              setQuickViewProduct(prod);
                            }}
                            className="py-1.5 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 text-ivory-300 text-[10px] font-semibold flex items-center justify-center gap-1 transition"
                            title="Quick View Saree"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() => openTryOn(prod)}
                            className="py-1.5 rounded-lg bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 text-gold-400 text-[10px] font-semibold flex items-center justify-center gap-1 transition"
                            title="Virtual Try-On Drape"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Try On</span>
                          </button>

                          <button
                            onClick={() => {
                              addItem(prod, 1, 'Nivi', 'AI_AGENT');
                              closeStylist();
                              openCart();
                            }}
                            className="py-1.5 rounded-lg bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center gap-1 shadow-gold-glow hover:bg-gold-400 transition"
                            title="Instant Checkout"
                          >
                            <CreditCard className="w-3 h-3" />
                            <span>Buy</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gated Money Confirmation Banner */}
                {msg.gatedConfirmationRequired && msg.selectedProduct && (
                  <div className="rounded-2xl bg-gradient-to-r from-gold-950/40 via-obsidian-900 to-maroon-950/40 border-2 border-gold-500 p-4 space-y-3 shadow-gold-glow">
                    <div className="flex items-center gap-2 text-gold-400 font-cinzel text-xs font-bold">
                      <CreditCard className="w-4 h-4" />
                      <span>Explicit Authorization Required</span>
                    </div>
                    <p className="text-xs text-ivory-200">
                      You are about to authorize an order for <strong>{msg.selectedProduct.name}</strong> at the database verified price of <strong>₹{msg.selectedProduct.price.toLocaleString()}</strong>.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => {
                          if (msg.selectedProduct) {
                            addItem(msg.selectedProduct, 1, 'Nivi', 'AI_AGENT');
                            closeStylist();
                            openCart();
                          }
                        }}
                        className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
                      >
                        <span>Authorize & Pay ₹{msg.selectedProduct.price.toLocaleString()}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Interactive Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.suggestedActions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleActionClick(act.action, act.payload)}
                        className="px-3 py-1.5 rounded-full bg-obsidian-800 hover:bg-gold-500/20 border border-gold-500/20 hover:border-gold-500/40 text-ivory-300 hover:text-gold-400 text-xs transition flex items-center gap-1.5"
                      >
                        <span>{act.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-xs text-gold-400 bg-obsidian-900/60 p-3 rounded-2xl border border-gold-500/20 max-w-sm">
              <Loader2 className="w-4 h-4 animate-spin text-gold-400" />
              <span>Analyzing catalog with NVIDIA Nemotron reasoning...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 sm:p-6 border-t border-gold-500/20 bg-obsidian-900/90 space-y-3">
          <form onSubmit={handleSend} className="flex gap-2 items-center">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask anything: 'Show me wedding silk under ₹20k', 'Paithani with peacock pallu'..."
              className="flex-1 bg-obsidian-950 border border-gold-500/30 rounded-full px-5 py-3.5 text-xs sm:text-sm text-ivory-100 placeholder:text-ivory-400 focus:outline-none focus:border-gold-400 transition"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isLoading}
              className="p-3.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 shadow-gold-glow hover:scale-105 transition disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Query Starters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-ivory-400">
            <span className="shrink-0 text-gold-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Try asking:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(p.query)}
                className="px-3 py-1 rounded-full bg-obsidian-950 border border-gold-500/20 hover:border-gold-500/50 text-ivory-300 hover:text-gold-400 shrink-0 transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
