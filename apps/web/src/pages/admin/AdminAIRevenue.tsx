import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { TrendingUp, Sparkles, DollarSign, Users, ShoppingBag, ArrowRight, Lightbulb, Share2, Copy, CheckCircle2, Loader2, BarChart3, PieChart } from 'lucide-react';
import { api } from '../../lib/api';
import { RevenueMetrics, FunnelStage, MerchantInsight, CostAnalytics } from '../../types';

export function AdminAIRevenue() {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [funnel, setFunnel] = useState<FunnelStage[]>([]);
  const [insights, setInsights] = useState<MerchantInsight[]>([]);
  const [costs, setCosts] = useState<CostAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Campaign Assistant State
  const [campaignPrompt, setCampaignPrompt] = useState('I added 10 new Kanchipuram wedding silk sarees under ₹10,000. Prepare a marketing launch campaign.');
  const [isGeneratingCampaign, setIsGeneratingCampaign] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [m, f, ins, c] = await Promise.all([
          api.getRevenueMetrics(),
          api.getConversionFunnel(),
          api.getMerchantInsights(),
          api.getCostAnalytics(),
        ]);
        setMetrics(m);
        setFunnel(f);
        setInsights(ins);
        setCosts(c);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleGenerateCampaign = async () => {
    setIsGeneratingCampaign(true);
    try {
      const res = await api.generateCampaign({ prompt: campaignPrompt });
      setGeneratedCampaign(res);
    } catch (err: any) {
      alert(err.message || 'Campaign generation failed');
    } finally {
      setIsGeneratingCampaign(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                Merchant AI Revenue & Funnel Analytics
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                Agentic Commerce Telemetry
              </span>
            </div>
            <p className="text-xs text-ivory-400">
              Measure AI-assisted discovery, virtual try-on conversions, GMV attribution, and unit economics
            </p>
          </div>
        </div>

        {/* KPI Summary Cards (PRD Section 36) */}
        {metrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
              <div className="flex items-center justify-between text-gold-400">
                <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI-Assisted GMV</span>
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="block font-cinzel text-3xl font-extrabold text-gold-400">
                ₹{metrics.aiAssistedGMV.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-400">Attributed directly to AI Stylist flows</span>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
              <div className="flex items-center justify-between text-gold-400">
                <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI Sessions</span>
                <Users className="w-5 h-5" />
              </div>
              <span className="block font-cinzel text-3xl font-extrabold text-ivory-100">{metrics.aiSessions}</span>
              <span className="text-[11px] text-ivory-400">{metrics.aiQueries} shopping intents parsed</span>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
              <div className="flex items-center justify-between text-gold-400">
                <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">Try-Ons Rendered</span>
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="block font-cinzel text-3xl font-extrabold text-ivory-100">{metrics.tryOnsCompleted}</span>
              <span className="text-[11px] text-emerald-400">96% avg. garment fidelity</span>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
              <div className="flex items-center justify-between text-gold-400">
                <span className="text-xs font-cinzel font-semibold uppercase tracking-wider">AI Conversion Rate</span>
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="block font-cinzel text-3xl font-extrabold text-emerald-400">{metrics.aiConversionRate}%</span>
              <span className="text-[11px] text-ivory-400">Discovery to paid transaction</span>
            </div>

          </div>
        )}

        {/* SECTION: CONVERSION FUNNEL & MERCHANT INSIGHTS (PRD Section 37, 38) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual Funnel */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-base font-bold text-ivory-100">
                  AI Commerce Conversion Funnel
                </h3>
                <p className="text-xs text-ivory-400">Tracking customer journey from conversational discovery to paid order</p>
              </div>
              <BarChart3 className="w-5 h-5 text-gold-400" />
            </div>

            <div className="space-y-3">
              {funnel.map((step, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ivory-200">{step.stage}</span>
                    <span className="font-mono text-gold-400">{step.count} users</span>
                  </div>
                  <div className="w-full bg-obsidian-950 rounded-full h-3 overflow-hidden border border-gold-500/10 flex">
                    <div
                      className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(12, (step.count / (funnel[0]?.count || 1)) * 100)}%` }}
                    />
                  </div>
                  {idx > 0 && (
                    <span className="text-[10px] text-ivory-400 block text-right">
                      {step.dropoffRate}% drop-off from previous stage
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: AI Merchant Insights */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 space-y-6">
            <div className="flex items-center gap-2 text-gold-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="font-cinzel text-base font-bold text-ivory-100">
                AI Merchant Insights
              </h3>
            </div>

            <div className="space-y-3">
              {insights.map((ins) => (
                <div key={ins.id} className="p-4 rounded-2xl bg-obsidian-950 border border-gold-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-gold-400">{ins.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/10 text-[10px] font-mono text-emerald-400">
                      {ins.metric}
                    </span>
                  </div>
                  <p className="text-ivory-300 leading-relaxed">{ins.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SECTION: AI CAMPAIGN ASSISTANT & COST TRACKER (PRD Section 39, 86) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: AI Campaign Assistant */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-base font-bold text-ivory-100">
                  AI Campaign Assistant
                </h3>
                <p className="text-xs text-ivory-400">Admin prompt to multi-channel WhatsApp and Instagram campaign copy</p>
              </div>
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={campaignPrompt}
                  onChange={(e) => setCampaignPrompt(e.target.value)}
                  className="flex-1 bg-obsidian-950 border border-gold-500/30 rounded-xl px-4 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  placeholder="Describe your collection or campaign goal..."
                />
                <button
                  onClick={handleGenerateCampaign}
                  disabled={isGeneratingCampaign}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow transition disabled:opacity-50"
                >
                  {isGeneratingCampaign ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Generate</span>
                </button>
              </div>

              {generatedCampaign && (
                <div className="p-5 rounded-2xl bg-obsidian-950 border border-gold-500/20 space-y-4 text-xs animate-in fade-in duration-300">
                  <div>
                    <h4 className="font-cinzel text-sm font-bold text-gold-400">{generatedCampaign.title}</h4>
                    <p className="text-ivory-300 mt-1">{generatedCampaign.description}</p>
                  </div>

                  {/* WhatsApp Copy */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-400">WhatsApp Broadcast Copy:</span>
                      <button
                        onClick={() => copyToClipboard(generatedCampaign.whatsAppCopy)}
                        className="text-[11px] text-gold-400 hover:underline flex items-center gap-1"
                      >
                        {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied!' : 'Copy Copy'}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded-xl bg-obsidian-900 border border-gold-500/10 text-ivory-300 font-sans text-xs whitespace-pre-wrap">
                      {generatedCampaign.whatsAppCopy}
                    </pre>
                  </div>

                  {/* Instagram Copy */}
                  <div className="space-y-1.5">
                    <span className="font-semibold text-gold-400 block">Instagram Caption & Hashtags:</span>
                    <pre className="p-3 rounded-xl bg-obsidian-900 border border-gold-500/10 text-ivory-300 font-sans text-xs whitespace-pre-wrap">
                      {generatedCampaign.instagramCaption}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: AI Cost Economics */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-obsidian-900 border border-gold-500/20 space-y-6">
            <div>
              <h3 className="font-cinzel text-base font-bold text-ivory-100">
                AI Usage & Cost Breakdown
              </h3>
              <p className="text-xs text-ivory-400">Tracking unit economics per successful conversion</p>
            </div>

            {costs && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10 flex justify-between items-center">
                  <span className="text-ivory-400">Today's Estimated Cost:</span>
                  <span className="font-mono font-bold text-gold-400">${costs.todayEstimatedCost.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10 flex justify-between items-center">
                  <span className="text-ivory-400">Monthly AI Spend:</span>
                  <span className="font-mono font-bold text-ivory-100">${costs.monthEstimatedCost.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10 flex justify-between items-center">
                  <span className="text-ivory-400">Cost / Successful Try-On:</span>
                  <span className="font-mono font-bold text-emerald-400">${costs.costPerTryOn}</span>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10 flex justify-between items-center">
                  <span className="text-ivory-400">Cost / AI-Assisted Order:</span>
                  <span className="font-mono font-bold text-emerald-400">${costs.costPerOrder}</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
