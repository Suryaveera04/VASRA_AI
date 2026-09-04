import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, ArrowLeft } from 'lucide-react';

export function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-obsidian-950 text-ivory-100">
      <div className="w-full max-w-md bg-obsidian-900 border border-gold-500/30 rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-3">
          <Shield className="w-8 h-8 text-gold-400 mx-auto" />
          <h1 className="font-cinzel text-xl font-bold text-gold-400">Reset Admin Password</h1>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-gold-300 text-center space-y-2">
            <p>If an account exists for {email}, reset instructions have been dispatched securely.</p>
            <Link to="/admin/login" className="inline-block pt-2 text-ivory-100 font-semibold underline">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                Registered Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-4 py-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider"
            >
              Send Reset Token
            </button>
          </form>
        )}

        <div className="text-center">
          <Link to="/admin/login" className="text-xs text-ivory-400 hover:text-gold-400 flex items-center justify-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
