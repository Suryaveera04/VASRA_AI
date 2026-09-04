import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ShoppingBag, Sparkles, CheckCircle2, Clock, AlertCircle, ExternalLink, RefreshCw, Filter } from 'lucide-react';
import { api } from '../../lib/api';
import { Order } from '../../types';

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders({ status: statusFilter, source: sourceFilter });
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [statusFilter, sourceFilter]);

  const handleStatusUpdate = async (orderId: string, status: string) => {
    try {
      await api.updateOrderStatus(orderId, { status });
      loadOrders();
    } catch (err: any) {
      alert(err.message || 'Status update failed');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto w-full max-w-[1920px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient">
                Orders & Commerce Hub
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                Razorpay Agentic Transactions
              </span>
            </div>
            <p className="text-xs text-ivory-400">
              Track customer purchases, fulfillment status, and AI Stylist source conversion attribution
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-obsidian-900 border border-gold-500/20 rounded-full px-3 py-2 text-xs text-ivory-200 focus:outline-none focus:border-gold-400"
            >
              <option value="">All Sources</option>
              <option value="AI_AGENT">✨ AI Agent Assisted</option>
              <option value="DIRECT">Direct Storefront</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-obsidian-900 border border-gold-500/20 rounded-full px-3 py-2 text-xs text-ivory-200 focus:outline-none focus:border-gold-400"
            >
              <option value="">All Statuses</option>
              <option value="PAID">Paid / Captured</option>
              <option value="PENDING_PAYMENT">Pending Payment</option>
              <option value="FULFILLED">Fulfilled / Shipped</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <button
              onClick={loadOrders}
              className="p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-300 hover:text-gold-400 transition"
              title="Refresh Orders"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-3xl bg-obsidian-900 border border-gold-500/20 overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-cinzel text-xs text-gold-400 uppercase tracking-widest">Loading order records...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-20 text-center space-y-3 text-ivory-400">
              <ShoppingBag className="w-12 h-12 text-gold-500/30 mx-auto" />
              <h3 className="font-cinzel text-base text-ivory-200">No orders found matching filter</h3>
              <p className="text-xs">New Razorpay transactions placed by customers or the AI Stylist will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-ivory-300">
                <thead className="bg-obsidian-800 text-gold-400 font-cinzel uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Order #</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items / Drape</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Source</th>
                    <th className="p-4">Payment & Order Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold-500/10">
                  {orders.map((ord) => (
                    <tr key={ord._id} className="hover:bg-obsidian-800/40 transition">
                      <td className="p-4 font-mono">
                        <span className="font-bold text-ivory-100 block">{ord.orderNumber}</span>
                        {ord.razorpayOrderId && (
                          <span className="text-[10px] text-ivory-400">{ord.razorpayOrderId}</span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-ivory-100 block">{ord.customer?.name || 'Customer'}</span>
                        <span className="text-[10px] text-ivory-400 block">{ord.customer?.phone}</span>
                        <span className="text-[10px] text-ivory-400 block">{ord.customer?.address?.city}</span>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              {it.image && <img src={it.image} alt="" className="w-6 h-6 object-cover rounded" />}
                              <span className="line-clamp-1">{it.name} (x{it.quantity})</span>
                              {it.selectedDrape && (
                                <span className="text-[10px] text-gold-400 font-mono">[{it.selectedDrape}]</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="p-4 font-cinzel font-bold text-gold-400 text-sm">
                        ₹{ord.total?.toLocaleString()}
                      </td>

                      <td className="p-4">
                        {ord.source === 'AI_AGENT' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-semibold border border-gold-500/30">
                            <Sparkles className="w-3 h-3" /> AI Stylist
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-obsidian-800 text-ivory-400 text-[10px]">
                            Direct Store
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          ord.status === 'PAID' || ord.paymentStatus === 'CAPTURED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : ord.status === 'FULFILLED'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {ord.status === 'PAID' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          <span>{ord.status}</span>
                        </span>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        {ord.status === 'PAID' && (
                          <button
                            onClick={() => handleStatusUpdate(ord._id, 'FULFILLED')}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-obsidian-950 text-[11px] font-semibold transition"
                          >
                            Mark Fulfilled
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
