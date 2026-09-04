import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Save, Settings, Sparkles, Key, CheckCircle2, AlertCircle, RefreshCw, Cpu, Image, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';

export function AdminSettings() {
  const [shopName, setShopName] = useState('Sree Ram Silks');
  const [whatsappNumber, setWhatsappNumber] = useState('+919876543210');
  const [email, setEmail] = useState('concierge@sreeramsilks.com');
  const [address, setAddress] = useState('108 Imperial Heritage Lane, Silk Quarter, Kanchipuram, TN - 631501');
  const [savedShop, setSavedShop] = useState(false);

  // NVIDIA NIM & AI Settings State
  const [nvidiaKey, setNvidiaKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [selectedLlm, setSelectedLlm] = useState('nvidia/nemotron-3-ultra-550b-a55b');
  const [selectedImageModel, setSelectedImageModel] = useState('black-forest-labs/flux-1-dev');
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [maskedKey, setMaskedKey] = useState('');
  const [loadingAi, setLoadingAi] = useState(true);
  const [savingAi, setSavingAi] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const loadSettings = async () => {
    setLoadingAi(true);
    try {
      const data = await api.getAISettings();
      setHasExistingKey(data.hasNvidiaKey);
      setMaskedKey(data.maskedKey || '');
      if (data.nvidiaLlmModel) setSelectedLlm(data.nvidiaLlmModel);
      if (data.nvidiaImageModel) setSelectedImageModel(data.nvidiaImageModel);
    } catch (err) {
      console.error('Error fetching AI settings:', err);
    } finally {
      setLoadingAi(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveShop = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedShop(true);
    setTimeout(() => setSavedShop(false), 2500);
  };

  const handleSaveAIConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAi(true);
    setAiTestResult(null);
    try {
      const payload: any = {
        nvidiaLlmModel: selectedLlm,
        nvidiaImageModel: selectedImageModel,
      };
      if (nvidiaKey.trim()) {
        payload.nvidiaApiKey = nvidiaKey.trim();
      }
      const res = await api.updateAISettings(payload);
      setHasExistingKey(res.hasNvidiaKey);
      setAiTestResult({ success: true, message: 'AI configuration saved and activated successfully!' });
      if (nvidiaKey.trim()) {
        setNvidiaKey('');
        loadSettings();
      }
    } catch (err: any) {
      setAiTestResult({ success: false, message: err.message || 'Failed to save AI settings' });
    } finally {
      setSavingAi(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingAi(true);
    setAiTestResult(null);
    try {
      const res = await api.testAIConnection({
        apiKey: nvidiaKey.trim() || undefined,
        model: selectedLlm,
      });
      setAiTestResult({
        success: true,
        message: `${res.message} (Model: ${res.model})`,
      });
    } catch (err: any) {
      setAiTestResult({
        success: false,
        message: err.message || 'Connection test failed',
      });
    } finally {
      setTestingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 overflow-y-auto max-w-[1920px]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
          <div>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient">
              Showroom & AI Engine Settings
            </h1>
            <p className="text-xs text-ivory-400">
              Configure showroom concierge details and connect open-source NVIDIA NIM AI models
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 border ${
                hasExistingKey
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-gold-500/10 text-gold-400 border-gold-500/30'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              {hasExistingKey ? '⚡ NVIDIA NIM Active' : '🔄 SareeDNA Engine Active'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left Column: NVIDIA NIM & Open Source AI Card */}
          <div className="xl:col-span-7 space-y-6">
            <div className="bg-obsidian-900 border border-gold-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-cinzel text-lg font-bold text-ivory-100">
                      NVIDIA NIM & Open Source AI Studio
                    </h2>
                    <p className="text-xs text-ivory-400">
                      Empower the Ask AI Stylist and Virtual Try-On with high-reasoning models
                    </p>
                  </div>
                </div>

                <a
                  href="https://build.nvidia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-gold-400 hover:text-gold-300 font-mono underline"
                >
                  <span>Get NVIDIA API Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {aiTestResult && (
                <div
                  className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 border ${
                    aiTestResult.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {aiTestResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{aiTestResult.message}</span>
                </div>
              )}

              <form onSubmit={handleSaveAIConfig} className="space-y-5">
                {/* NVIDIA API Key Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider">
                      NVIDIA API Key (Build / NIM)
                    </label>
                    {hasExistingKey && (
                      <span className="text-[10px] text-emerald-400 font-mono">
                        Saved: {maskedKey}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={nvidiaKey}
                      onChange={(e) => setNvidiaKey(e.target.value)}
                      placeholder={hasExistingKey ? 'Enter new nvapi-... key to replace' : 'nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'}
                      className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl pl-4 pr-10 py-3 text-xs text-ivory-100 font-mono focus:outline-none focus:border-gold-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-3 text-ivory-400 hover:text-gold-400 transition"
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-ivory-400 mt-1">
                    Free credits available at NVIDIA Build. Key is stored securely in environment and used for live catalog grounding.
                  </p>
                </div>

                {/* LLM Model Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    AI Chatbot & Stylist Reasoning Model
                  </label>
                  <select
                    value={selectedLlm}
                    onChange={(e) => setSelectedLlm(e.target.value)}
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-3 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="nvidia/nemotron-3-ultra-550b-a55b">
                      NVIDIA Nemotron-3-Ultra-550B (Recommended — Ultra Deep Styling Reasoning)
                    </option>
                    <option value="nvidia/llama-3.1-nemotron-70b-instruct">
                      NVIDIA Nemotron-70B Instruct (High Precision Saree Curation)
                    </option>
                    <option value="nvidia/nemotron-3-super-120b-a12b">
                      NVIDIA Nemotron-3-Super-120B (High Speed & Fidelity)
                    </option>
                    <option value="mistralai/mistral-large-2-instruct">
                      Mistral Large 2 (Multi-lingual Draping Recommendations)
                    </option>
                  </select>
                </div>

                {/* Image Generation Model Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Image className="w-3.5 h-3.5" />
                    Virtual Try-On & Image Generation Engine
                  </label>
                  <select
                    value={selectedImageModel}
                    onChange={(e) => setSelectedImageModel(e.target.value)}
                    className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-3 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  >
                    <option value="black-forest-labs/flux-1-dev">
                      Black Forest Labs FLUX.1-dev (Ultra-Fine Zari & Silk Textures)
                    </option>
                    <option value="stabilityai/stable-diffusion-xl-base-1.0">
                      Stability AI SDXL 1.0 (Studio Photography Renders)
                    </option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={savingAi}
                    className="w-full sm:flex-1 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition disabled:opacity-50"
                  >
                    {savingAi ? 'Activating AI Configuration...' : 'Save AI Configuration'}
                  </button>

                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testingAi}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-obsidian-950 border border-gold-500/30 text-gold-300 hover:text-gold-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingAi ? 'animate-spin' : ''}`} />
                    <span>{testingAi ? 'Testing...' : 'Test Connection'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Showroom Business Info Card */}
          <div className="xl:col-span-5 space-y-6">
            <form onSubmit={handleSaveShop} className="bg-obsidian-900 border border-gold-500/20 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-cinzel text-lg font-bold text-ivory-100">Showroom Details</h2>
                  <p className="text-xs text-ivory-400">Concierge & contact information</p>
                </div>
              </div>

              {savedShop && (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-400 text-center font-bold">
                  Showroom details updated!
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Showroom Name
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  WhatsApp Order Concierge
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-2.5 text-xs text-ivory-100 font-mono focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Support Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl px-4 py-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-400 uppercase tracking-wider mb-1.5">
                  Showroom Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-2xl p-3.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-obsidian-950 border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-obsidian-950 font-bold text-xs uppercase tracking-wider transition"
              >
                Save Showroom Details
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
