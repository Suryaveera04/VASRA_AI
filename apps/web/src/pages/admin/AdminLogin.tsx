import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('admin@sreeramsilks.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-obsidian-950 text-ivory-100">
      <div className="w-full max-w-md bg-obsidian-900 border border-gold-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center mx-auto shadow-gold-glow">
            <Shield className="w-6 h-6 text-gold-400" />
          </div>
          <h1 className="font-cinzel text-2xl font-bold text-gold-gradient">
            Showroom Admin Portal
          </h1>
          <p className="text-xs text-ivory-400">
            Authorized catalog management for Sree Ram Silks
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-maroon-900/60 border border-maroon-700 text-xs text-rose-300 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ivory-100 placeholder-ivory-400 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                Password
              </label>
              <Link to="/admin/forgot-password" className="text-xs text-ivory-400 hover:text-gold-400 transition">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-sm uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gold-500/10">
          <p className="text-[11px] text-ivory-400">
            Demo Credentials Pre-filled: <span className="text-gold-400 font-mono">admin@sreeramsilks.com / admin123</span>
          </p>
        </div>

      </div>
    </div>
  );
}
