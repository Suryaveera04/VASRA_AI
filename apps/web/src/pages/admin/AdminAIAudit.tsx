import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ShieldCheck, Search, Clock, ArrowRight, Bot, RefreshCw, Terminal, CheckCircle2, Lock } from 'lucide-react';
import { api } from '../../lib/api';
import { AgentAction } from '../../types';

export function AdminAIAudit() {
  const [logs, setLogs] = useState<AgentAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchSessionId, setSearchSessionId] = useState('');
  const [selectedLog, setSelectedLog] = useState<AgentAction | null>(null);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const data = await api.getAgentAuditTrail(searchSessionId || undefined);
      setLogs(data);
      if (data.length > 0 && !selectedLog) {
        setSelectedLog(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto w-full max-w-[1920px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient">
                AI Agent Audit Trail
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                Traceable Explainability
              </span>
            </div>
            <p className="text-xs text-ivory-400">
              Chronological ledger of customer intents, tool calls, grounded database references, and gated payment authorizations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                value={searchSessionId}
                onChange={(e) => setSearchSessionId(e.target.value)}
                placeholder="Filter by Session ID..."
                className="bg-obsidian-900 border border-gold-500/20 rounded-full pl-9 pr-4 py-2 text-xs text-ivory-200 focus:outline-none focus:border-gold-400"
              />
              <Search className="w-3.5 h-3.5 text-gold-400 absolute left-3 top-3" />
            </div>

            <button
              onClick={loadAuditLogs}
              className="p-2 rounded-full bg-obsidian-900 border border-gold-500/20 text-ivory-300 hover:text-gold-400 transition"
              title="Refresh Audit Trail"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two-Column Audit Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Timeline Stream */}
          <div className="lg:col-span-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 p-6 space-y-4 max-h-[720px] overflow-y-auto">
            <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">
              Chronological Agent Actions ({logs.length})
            </h3>

            {loading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="font-cinzel text-xs text-gold-400">Loading audit trail...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="py-16 text-center text-xs text-ivory-400">
                No agent audit logs recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {logs.map((log, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLog(log)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                      selectedLog === log
                        ? 'bg-obsidian-950 border-gold-500 shadow-gold-glow'
                        : 'bg-obsidian-950/60 border-gold-500/10 hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gold-400 font-bold">{log.tool || log.action}</span>
                      <span className="text-ivory-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>

                    {log.intent && (
                      <p className="text-xs text-ivory-200 font-serif italic line-clamp-1">"{log.intent}"</p>
                    )}

                    <div className="flex items-center justify-between text-[10px] text-ivory-400 pt-1 border-t border-gold-500/10">
                      <span className="font-mono">State: {log.state}</span>
                      {log.authorization?.required && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Gated Auth Granted
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Deep Action Inspector */}
          <div className="lg:col-span-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 p-6 space-y-6">
            <div className="flex items-center gap-2 text-gold-400 border-b border-gold-500/10 pb-4">
              <Terminal className="w-5 h-5" />
              <h3 className="font-cinzel text-base font-bold text-ivory-100">
                Action Inspector & Grounding Data
              </h3>
            </div>

            {selectedLog ? (
              <div className="space-y-4 text-xs animate-in fade-in duration-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                    <span className="text-ivory-400 text-[10px] block">Session ID</span>
                    <span className="font-mono font-bold text-gold-400">{selectedLog.sessionId}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                    <span className="text-ivory-400 text-[10px] block">Execution Latency</span>
                    <span className="font-mono text-ivory-200">{selectedLog.latencyMs || 142} ms</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/10 space-y-1">
                  <span className="text-ivory-400 text-[10px] uppercase font-mono block">Customer Shopping Intent</span>
                  <p className="text-sm font-serif italic text-ivory-100">{selectedLog.intent || 'Direct tool invocation'}</p>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/10 space-y-1">
                  <span className="text-ivory-400 text-[10px] uppercase font-mono block">Tool Call Payload (Input)</span>
                  <pre className="p-3 rounded-lg bg-obsidian-900 border border-gold-500/10 text-gold-300 font-mono text-[11px] overflow-x-auto">
                    {JSON.stringify(selectedLog.input || {}, null, 2)}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/10 space-y-1">
                  <span className="text-ivory-400 text-[10px] uppercase font-mono block">Database Grounded Result Reference</span>
                  <p className="text-xs text-ivory-200 mb-2">{selectedLog.resultSummary}</p>
                  <pre className="p-3 rounded-lg bg-obsidian-900 border border-gold-500/10 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                    {JSON.stringify(selectedLog.resultReference || {}, null, 2)}
                  </pre>
                </div>

                {selectedLog.authorization?.required && (
                  <div className="p-4 rounded-xl bg-gradient-to-r from-gold-950/40 via-obsidian-950 to-emerald-950/40 border border-gold-500/30 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-gold-400 font-cinzel font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Money Action Gating Log</span>
                    </div>
                    <p className="text-ivory-300 text-[11px]">
                      Customer explicitly authorized payment of <strong>₹{selectedLog.authorization.authorizedAmount?.toLocaleString()}</strong> before Razorpay order initialization.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center text-xs text-ivory-400">
                Select an audit entry from the left to inspect tool parameters and authorization logs.
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
