import React, { useState, useEffect } from 'react';
import { Sparkles, X, Upload, CheckCircle2, ShieldCheck, ArrowRight, Loader2, RefreshCw, Layers, CreditCard, AlertCircle, Sliders, Check, User, Heart, Star, Sparkle } from 'lucide-react';
import { useAIStylistStore } from '../../store/useAIStylistStore';
import { useCartStore } from '../../store/useCartStore';
import { api } from '../../lib/api';
import { Product } from '../../types';

export function VirtualTryOnModal() {
  const { activeTryOnModal, closeTryOn, tryOnProduct, openStylist } = useAIStylistStore();
  const { addItem, openCart } = useCartStore();

  const samplePortraits = [
    { id: 'p1', name: 'Portrait 1 (Classic)', url: '/images/customers/customer_portrait_1.png' },
    { id: 'p2', name: 'Portrait 2 (Studio)', url: '/images/customers/customer_portrait_2.png' },
  ];

  const [customerPhoto, setCustomerPhoto] = useState<string>('/images/customers/customer_portrait_1.png');
  const [selectedDrape, setSelectedDrape] = useState<string>('Nivi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressStage, setProgressStage] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [tryOnResult, setTryOnResult] = useState<any>(null);
  const [validationInfo, setValidationInfo] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'comparison' | 'draped' | 'original'>('comparison');
  const [sliderPos, setSliderPos] = useState<number>(50);

  const drapes = ['Nivi', 'Bengali', 'Gujarati', 'Seedha Pallu', 'Maharashtrian', 'Modern'];

  if (!activeTryOnModal || !tryOnProduct) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomerPhoto(event.target.result as string);
          setTryOnResult(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startTryOnGeneration = async () => {
    setIsProcessing(true);
    setTryOnResult(null);
    setProgressPercent(15);
    setProgressStage('Analyzing posture, shoulder curvature & lighting...');

    try {
      const res = await api.requestVirtualTryOn({
        customerPhotoUrl: customerPhoto,
        sareeImageUrl: tryOnProduct.images[0]?.url || '',
        sareeName: tryOnProduct.name,
        drapeStyle: selectedDrape,
      });

      setValidationInfo(res.validation);
      const jobId = res.jobId;

      // Poll job progress
      const pollInterval = setInterval(async () => {
        try {
          const job = await api.getAIJobStatus(jobId);
          if (job) {
            setProgressPercent(job.progress);
            setProgressStage(job.currentStage);

            if (job.status === 'COMPLETED') {
              clearInterval(pollInterval);
              setTryOnResult(job.result);
              setIsProcessing(false);
            } else if (job.status === 'FAILED') {
              clearInterval(pollInterval);
              setIsProcessing(false);
              alert(job.error || 'Try-On generation could not be completed.');
            }
          }
        } catch {
          clearInterval(pollInterval);
          setIsProcessing(false);
        }
      }, 350);
    } catch (err: any) {
      setIsProcessing(false);
      alert(err.message || 'Photo upload failed validation.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian-950/85 backdrop-blur-xl" onClick={closeTryOn} />

      <div className="relative w-full max-w-5xl max-h-[94vh] bg-obsidian-950 border border-gold-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gold-500/20 bg-obsidian-900/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient">
                  VASRĀ AI Virtual Try-On Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                  FLUX.1-dev & Drape Synthesis
                </span>
              </div>
              <span className="text-xs text-ivory-400">
                Trying On: <span className="text-gold-400 font-semibold">{tryOnProduct.name}</span> (₹{tryOnProduct.price.toLocaleString()})
              </span>
            </div>
          </div>

          <button onClick={closeTryOn} className="p-2 rounded-full bg-obsidian-800 text-ivory-400 hover:text-gold-400 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Photo & Drape Selection */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Step 1: Customer Photo Upload / Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Select or Upload Your Photo</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Face Preserved</span>
              </div>

              {/* Sample Portrait Selection Chips */}
              <div className="grid grid-cols-2 gap-2">
                {samplePortraits.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setCustomerPhoto(p.url);
                      setTryOnResult(null);
                    }}
                    className={`p-1.5 rounded-xl border flex items-center gap-2 transition text-left ${
                      customerPhoto === p.url
                        ? 'bg-gold-500/20 border-gold-500 text-gold-300'
                        : 'bg-obsidian-900 border-gold-500/20 text-ivory-300 hover:border-gold-500/40'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-9 h-11 object-cover rounded-lg shrink-0" />
                    <span className="text-[11px] font-semibold leading-tight">{p.name}</span>
                  </button>
                ))}
              </div>

              {/* Photo Display & Custom Upload Area */}
              <div className="relative aspect-[3/4] max-h-56 rounded-2xl overflow-hidden bg-obsidian-900 border-2 border-dashed border-gold-500/30 group flex flex-col items-center justify-center p-3 text-center">
                {customerPhoto ? (
                  <>
                    <img src={customerPhoto} alt="Customer Preview" className="w-full h-full object-cover rounded-xl" />
                    <label className="absolute inset-0 bg-obsidian-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-ivory-100 cursor-pointer text-xs p-4">
                      <Upload className="w-6 h-6 text-gold-400 mb-1.5" />
                      <span className="font-semibold">Upload Your Own Photo</span>
                      <span className="text-[10px] text-ivory-400 mt-1">Accepts JPG, PNG, WEBP</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center text-ivory-400 hover:text-gold-400 transition p-4">
                    <Upload className="w-8 h-8 text-gold-400 mb-2" />
                    <span className="text-xs font-semibold">Upload Photo from Device</span>
                    <span className="text-[10px] text-ivory-400 mt-1">Accepts JPG, PNG, WEBP</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                )}
              </div>
            </div>

            {/* Step 2: Drape Selection */}
            <div className="space-y-2.5">
              <span className="font-cinzel text-xs uppercase tracking-wider text-gold-400 font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>2. Select Drape Geometry</span>
              </span>

              <div className="grid grid-cols-3 gap-1.5">
                {drapes.map((drape) => (
                  <button
                    key={drape}
                    type="button"
                    onClick={() => setSelectedDrape(drape)}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                      selectedDrape === drape
                        ? 'bg-gold-500 text-obsidian-950 border-gold-500 shadow-gold-glow font-bold'
                        : 'bg-obsidian-900 text-ivory-300 border-gold-500/20 hover:border-gold-500/40'
                    }`}
                  >
                    {drape}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={startTryOnGeneration}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Drape on Your Photo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Virtual Try-On</span>
                </>
              )}
            </button>

            {/* Privacy Note */}
            <div className="p-2.5 rounded-xl bg-obsidian-900/60 border border-gold-500/10 text-[11px] text-ivory-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
              <span>Face & privacy safe: Photos are processed in real-time and never used for public AI training.</span>
            </div>

          </div>

          {/* Right Column: AI Try-On Visualization & Suitability Analysis */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            <div className="flex-1 rounded-2xl bg-obsidian-900 border border-gold-500/20 overflow-hidden relative flex flex-col min-h-[380px]">
              {isProcessing ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 max-w-md mx-auto animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-gold-500/20 border-2 border-gold-500 flex items-center justify-center text-gold-400 animate-spin">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5 w-full">
                    <h3 className="font-cinzel text-base font-bold text-ivory-100">{progressStage}</h3>
                    <div className="w-full bg-obsidian-950 rounded-full h-2 overflow-hidden border border-gold-500/20">
                      <div
                        className="bg-gradient-to-r from-gold-600 to-gold-400 h-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-gold-400 font-mono">{progressPercent}% complete</span>
                  </div>
                </div>
              ) : tryOnResult ? (
                <div className="w-full flex-1 flex flex-col">
                  
                  {/* View Mode Switcher Header */}
                  <div className="p-3 bg-obsidian-950 border-b border-gold-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setViewMode('comparison')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          viewMode === 'comparison'
                            ? 'bg-gold-500 text-obsidian-950'
                            : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
                        }`}
                      >
                        Split Comparison
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('draped')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          viewMode === 'draped'
                            ? 'bg-gold-500 text-obsidian-950'
                            : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
                        }`}
                      >
                        AI Draped Saree
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('original')}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                          viewMode === 'original'
                            ? 'bg-gold-500 text-obsidian-950'
                            : 'bg-obsidian-900 text-ivory-300 hover:text-gold-400'
                        }`}
                      >
                        Original Photo
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gold-400 font-mono">
                      <Star className="w-3.5 h-3.5 fill-gold-400" />
                      <span>{tryOnResult.suitabilityScore}% Suitability</span>
                    </div>
                  </div>

                  {/* Visual Render Canvas */}
                  <div className="relative aspect-[3/4] max-h-[360px] w-full bg-obsidian-950 overflow-hidden flex items-center justify-center">
                    {viewMode === 'comparison' ? (
                      <div className="relative w-full h-full select-none overflow-hidden">
                        {/* Draped Image (Base) */}
                        <img
                          src={tryOnResult.previewUrl}
                          alt="AI Draped"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Original Image (Clipped Overlay) */}
                        <div
                          className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-gold-400"
                          style={{ width: `${sliderPos}%` }}
                        >
                          <img
                            src={customerPhoto}
                            alt="Original Customer"
                            className="absolute inset-0 w-full h-full object-cover max-w-none"
                            style={{ width: '100%' }}
                          />
                          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-obsidian-950/80 text-[10px] font-mono text-ivory-200 border border-gold-500/20">
                            Original Photo
                          </span>
                        </div>

                        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-gold-500/90 text-obsidian-950 font-bold text-[10px] font-mono">
                          AI Draped ({tryOnResult.drapeApplied})
                        </span>

                        {/* Interactive Range Slider */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={sliderPos}
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                          title="Slide to compare before and after"
                        />
                      </div>
                    ) : viewMode === 'draped' ? (
                      <div className="relative w-full h-full">
                        <img src={tryOnResult.previewUrl} alt="Draped Saree" className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-obsidian-950/80 backdrop-blur-md border border-gold-500/30 text-gold-400 text-[10px] font-mono">
                          Drape: {tryOnResult.drapeApplied} • {tryOnResult.fidelityScore}% Garment Fidelity
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img src={customerPhoto} alt="Original Photo" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  {/* AI Suitability & Color Harmony Card */}
                  <div className="p-3.5 bg-obsidian-950 border-t border-gold-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gold-300 font-cinzel font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      <span>Stylist Suitability Assessment</span>
                    </div>
                    <p className="text-xs text-ivory-200 leading-relaxed">
                      {tryOnResult.suitabilityVerdict}
                    </p>
                    <div className="p-2 rounded-xl bg-gold-500/10 border border-gold-500/20 text-[11px] text-gold-300 flex items-start gap-1.5">
                      <Sparkle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span><strong>Stylist Advice:</strong> {tryOnResult.styleAdvice}</span>
                    </div>
                  </div>

                  {/* Fidelity Scorecard */}
                  <div className="p-3 bg-obsidian-900/60 border-t border-gold-500/10 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-1.5 rounded-lg bg-obsidian-950 border border-gold-500/10">
                      <span className="text-ivory-400 text-[10px] block">Color Harmony</span>
                      <span className="font-bold text-gold-400">{tryOnResult.colorPreservationRate}%</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-obsidian-950 border border-gold-500/10">
                      <span className="text-ivory-400 text-[10px] block">Border Alignment</span>
                      <span className="font-bold text-gold-400">{tryOnResult.borderFidelityRate}%</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-obsidian-950 border border-gold-500/10">
                      <span className="text-ivory-400 text-[10px] block">Pallu Geometry</span>
                      <span className="font-bold text-gold-400">{tryOnResult.palluFidelityRate}%</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 text-ivory-400">
                  <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-cinzel text-base text-ivory-200">AI Virtual Try-On Ready</h3>
                  <p className="text-xs max-w-sm mx-auto">
                    Select a customer portrait or upload your photo on the left, pick a drape style, and click Generate to see how this saree suits you with full before/after comparison.
                  </p>
                </div>
              )}
            </div>

            {/* CTAs */}
            {tryOnResult && (
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    addItem(tryOnProduct, 1, selectedDrape, 'AI_AGENT');
                    closeTryOn();
                    openCart();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Saree (₹{tryOnProduct.price.toLocaleString()})</span>
                </button>

                <button
                  onClick={() => {
                    closeTryOn();
                    openStylist(`I tried ${tryOnProduct.name} with ${selectedDrape} drape. Give me more styling tips and tell me what blouse designs will look best.`);
                  }}
                  className="px-5 py-3.5 rounded-full bg-obsidian-900 hover:bg-obsidian-800 border border-gold-500/30 text-gold-400 text-xs font-semibold transition"
                >
                  Ask AI Stylist
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
