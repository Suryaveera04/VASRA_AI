import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { api } from '../../lib/api';

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getSubtotal, clearCart, sessionId, source } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Ananya Sharma',
    email: 'ananya@example.com',
    phone: '+91 98765 43210',
    city: 'Bengaluru',
  });

  if (!isOpen) return null;

  const subtotal = getSubtotal();

  const handleRazorpayCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);

    try {
      // 1. Create Order on Backend
      const orderRes = await api.createRazorpayOrder({
        sessionId,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, selectedDrape: i.selectedDrape })),
        customer: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: {
            line1: '45 Heritage Boulevard',
            city: customerInfo.city,
            state: 'Karnataka',
            postalCode: '560001',
            country: 'India',
          },
        },
        source,
        aiExplanation: source === 'AI_AGENT' ? 'Discovered and curated through VASRĀ AI Stylist' : 'Direct catalog purchase',
      });

      // 2. Simulate Razorpay Payment verification
      await new Promise((resolve) => setTimeout(resolve, 900));

      const verificationRes = await api.verifyPayment({
        razorpayOrderId: orderRes.razorpayOrderId,
        razorpayPaymentId: `pay_${Date.now()}_test`,
        razorpaySignature: 'sig_test_verified',
        sessionId,
      });

      setConfirmedOrder(verificationRes.order);
      setPaymentSuccess(true);
      clearCart();
    } catch (err: any) {
      alert(err.message || 'Payment initiation failed');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-obsidian-950/80 backdrop-blur-md transition-opacity" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-gold-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-gold-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-gold-400" />
              </div>
              <div>
                <h2 className="font-cinzel text-lg font-bold text-ivory-100">Your Luxury Cart</h2>
                <span className="text-[10px] text-gold-400 font-mono">
                  {source === 'AI_AGENT' ? '✨ AI-Curated Selection' : 'Direct Showroom'}
                </span>
              </div>
            </div>
            <button onClick={closeCart} className="p-2 rounded-full text-ivory-400 hover:text-gold-400 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {paymentSuccess ? (
              <div className="text-center py-12 space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-cinzel text-2xl font-bold text-ivory-100">Payment Successful!</h3>
                  <p className="text-xs text-ivory-300">
                    Order <span className="font-mono text-gold-400">#{confirmedOrder?.orderNumber || 'SRS-2026'}</span> confirmed via Razorpay.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-[11px] font-mono mt-2">
                    Verified on Server • Silk Mark Certified
                  </span>
                </div>
                <button
                  onClick={() => { setPaymentSuccess(false); closeCart(); }}
                  className="px-6 py-3 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider"
                >
                  Continue Exploring
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-gold-500/40 mx-auto" />
                <h3 className="font-cinzel text-base text-ivory-300">Your cart is currently empty.</h3>
                <p className="text-xs text-ivory-400">Ask the AI Stylist or explore our 3D Showroom to select sarees.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-4 p-3.5 rounded-2xl bg-obsidian-900 border border-gold-500/20">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-ivory-100 line-clamp-1">{item.name}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-ivory-400 mt-0.5">
                          <span>{item.fabric || 'Pure Silk'}</span>
                          {item.selectedDrape && <span className="text-gold-400">• Drape: {item.selectedDrape}</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-cinzel text-sm font-bold text-gold-400">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2 bg-obsidian-950 rounded-full border border-gold-500/20 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="text-xs text-ivory-400 hover:text-gold-400 px-1"
                          >
                            -
                          </button>
                          <span className="text-xs text-ivory-200 font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="text-xs text-ivory-400 hover:text-gold-400 px-1"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-rose-400 hover:text-rose-300 ml-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Customer Delivery Details Form */}
                <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-gold-500/20 space-y-3 text-xs">
                  <span className="font-cinzel text-gold-400 font-semibold uppercase tracking-wider block">
                    Express Shipping Details
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      placeholder="Full Name"
                      className="bg-obsidian-950 border border-gold-500/20 rounded-lg p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                    />
                    <input
                      type="text"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      placeholder="City"
                      className="bg-obsidian-950 border border-gold-500/20 rounded-lg p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                  <input
                    type="text"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-lg p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {!paymentSuccess && items.length > 0 && (
            <div className="p-6 border-t border-gold-500/20 space-y-4 bg-obsidian-900/80">
              <div className="space-y-1.5 text-xs text-ivory-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Insured Express Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between font-cinzel text-base font-bold text-gold-400 pt-2 border-t border-gold-500/10">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleRazorpayCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:scale-[1.02] active:scale-[0.98] text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Razorpay Authorization...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{subtotal.toLocaleString()} via Razorpay</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-ivory-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-gold-400" /> Razorpay Test Mode</span>
                <span>•</span>
                <span>100% Authentic Handloom</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
