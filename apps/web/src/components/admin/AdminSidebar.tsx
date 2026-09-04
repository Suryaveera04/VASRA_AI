import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Wand2,
  Package,
  TrendingUp,
  Terminal,
  FolderTree,
  LayoutTemplate,
  Image,
  LogOut,
  Sparkles,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { api } from '../../lib/api';

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [resetting, setResetting] = useState(false);

  const menu = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'AI Saree Studio', path: '/admin/ai-studio', icon: Wand2, badge: 'V2 AI' },
    { name: 'Orders Hub', path: '/admin/orders', icon: Package },
    { name: 'AI Revenue & Funnel', path: '/admin/ai-revenue', icon: TrendingUp, badge: 'Telemetry' },
    { name: 'AI Agent Audit', path: '/admin/ai-audit', icon: Terminal, badge: 'Audit' },
    { name: 'Products Catalog', path: '/admin/products', icon: ShoppingBag },
    { name: 'Category CMS', path: '/admin/categories', icon: FolderTree },
    { name: 'Homepage Builder', path: '/admin/homepage', icon: LayoutTemplate },
    { name: 'Media Library', path: '/admin/media', icon: Image },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleDemoReset = async () => {
    if (confirm('Are you sure you want to reset demo orders, carts, and AI sessions back to pristine state? Product catalog will be preserved.')) {
      setResetting(true);
      try {
        await api.resetDemoData();
        alert('Demo environment reset successfully.');
        window.location.reload();
      } catch (err: any) {
        alert(err.message || 'Demo reset failed');
      } finally {
        setResetting(false);
      }
    }
  };

  return (
    <aside className="w-64 bg-obsidian-900 border-r border-gold-500/20 flex flex-col justify-between min-h-screen p-5 sticky top-0 h-screen shrink-0">
      
      <div className="space-y-6 overflow-y-auto pr-1">
        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-gold-500/20">
          <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-gold-400" />
          </div>
          <div>
            <h2 className="font-cinzel text-sm font-bold text-gold-gradient">
              VASRĀ Admin
            </h2>
            <span className="text-[9px] text-ivory-400 uppercase tracking-wider">Merchant AI Hub</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-xs font-semibold">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                  isActive
                    ? 'bg-gold-500 text-obsidian-950 shadow-gold-glow font-bold'
                    : 'text-ivory-300 hover:bg-obsidian-800 hover:text-gold-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                    isActive ? 'bg-obsidian-950 text-gold-400' : 'bg-gold-500/20 text-gold-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div className="pt-4 border-t border-gold-500/20 space-y-2">
        <button
          onClick={handleDemoReset}
          disabled={resetting}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-obsidian-800/80 text-gold-400 hover:bg-obsidian-800 text-[11px] font-semibold transition"
          title="Reset test transactions while keeping catalog sarees"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </div>
          <span className="text-[9px] text-ivory-400">Pristine</span>
        </button>

        <Link
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-xl bg-obsidian-800/60 text-ivory-300 hover:text-gold-400 text-xs font-medium transition"
        >
          <span>Public Showroom</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}
