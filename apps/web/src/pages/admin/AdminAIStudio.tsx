import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Sparkles, Upload, CheckCircle2, RefreshCw, Wand2, ShieldCheck, Camera, Layers, Check, Loader2, FileText, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api';

export function AdminAIStudio() {
  const [activeTab, setActiveTab] = useState<'GARMENT_ANALYSIS' | 'MODEL_PHOTO' | 'QUALITY_SCORE' | 'TRYON_MONITOR'>('GARMENT_ANALYSIS');

  // Garment Analysis State
  const [garmentImage, setGarmentImage] = useState<string>('/images/products/kanchipuram_red_gold.png');
  const [sareeName, setSareeName] = useState('Crimson Gold Zari Kanchipuram Saree');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [approved, setApproved] = useState(false);

  // Model Photography State
  const [modelProfile, setModelProfile] = useState<'Model A (Modern Regal)' | 'Model B (Heritage Classic)' | 'Model C (Contemporary Chic)'>('Model A (Modern Regal)');
  const [pose, setPose] = useState('Front Formal');
  const [background, setBackground] = useState('Royal Palace Archway');
  const [lighting, setLighting] = useState('Warm Gold');
  const [cameraFraming, setCameraFraming] = useState('Full Body');
  const [isGeneratingPhotos, setIsGeneratingPhotos] = useState(false);
  const [photoCandidates, setPhotoCandidates] = useState<any[]>([]);

  // Quality Score State
  const [qualityScore, setQualityScore] = useState<any>({
    imageQuality: 96,
    metadataCompleteness: 94,
    sareeVisibility: 98,
    garmentFidelity: 92,
    seoCompleteness: 90,
    overall: 94,
  });

  const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setGarmentImage(event.target.result as string);
          setAnalysisResult(null);
          setApproved(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const runGarmentAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await api.analyzeGarment({ imageUrl: garmentImage, sareeName });
      setAnalysisResult(res);
      if (res.aiQualityScore) {
        setQualityScore(res.aiQualityScore);
      }
    } catch (err: any) {
      alert(err.message || 'Garment analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModelPhotoGeneration = async () => {
    setIsGeneratingPhotos(true);
    setPhotoCandidates([]);
    try {
      const res = await api.generateModelPhotos({
        sareeImageUrl: garmentImage,
        sareeName,
        modelProfile,
        pose,
        background,
        lighting,
        cameraFraming,
      });

      // Poll job progress
      const pollInterval = setInterval(async () => {
        try {
          const job = await api.getAIJobStatus(res.jobId);
          if (job && job.status === 'COMPLETED') {
            clearInterval(pollInterval);
            setPhotoCandidates(job.result?.candidates || []);
            setIsGeneratingPhotos(false);
          } else if (job && job.status === 'FAILED') {
            clearInterval(pollInterval);
            setIsGeneratingPhotos(false);
            alert('Model photography generation failed');
          }
        } catch {
          clearInterval(pollInterval);
          setIsGeneratingPhotos(false);
        }
      }, 500);
    } catch (err: any) {
      setIsGeneratingPhotos(false);
      alert(err.message || 'Generation failed');
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
                AI Saree Studio
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-mono border border-gold-500/30">
                Merchant Intelligence Layer
              </span>
            </div>
            <p className="text-xs text-ivory-400">
              Auto-extract Saree DNA, generate multi-angle model photography, and validate catalog readiness
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 bg-obsidian-900 border border-gold-500/20 rounded-full p-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('GARMENT_ANALYSIS')}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === 'GARMENT_ANALYSIS'
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-glow'
                  : 'text-ivory-300 hover:text-gold-400'
              }`}
            >
              Garment Analysis
            </button>
            <button
              onClick={() => setActiveTab('MODEL_PHOTO')}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === 'MODEL_PHOTO'
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-glow'
                  : 'text-ivory-300 hover:text-gold-400'
              }`}
            >
              Model Photography
            </button>
            <button
              onClick={() => setActiveTab('QUALITY_SCORE')}
              className={`px-4 py-2 rounded-full transition ${
                activeTab === 'QUALITY_SCORE'
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-glow'
                  : 'text-ivory-300 hover:text-gold-400'
              }`}
            >
              Catalog Quality
            </button>
          </div>
        </div>

        {/* TAB 1: GARMENT ANALYSIS & SAREE DNA (PRD Section 20, 76) */}
        {activeTab === 'GARMENT_ANALYSIS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Raw Saree Photo Upload */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-4">
                <span className="font-cinzel text-xs font-bold text-gold-400 uppercase tracking-wider block">
                  1. Raw Saree Photograph
                </span>

                <div className="relative aspect-[3/4] max-h-[380px] rounded-xl overflow-hidden bg-obsidian-950 border border-gold-500/30">
                  <img src={garmentImage} alt="Raw Saree" className="w-full h-full object-cover" />
                  <label className="absolute inset-0 bg-obsidian-950/70 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-ivory-100 cursor-pointer text-xs">
                    <Upload className="w-6 h-6 text-gold-400 mb-2" />
                    <span>Upload New Saree Photo</span>
                    <input type="file" accept="image/*" onChange={handleGarmentUpload} className="hidden" />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-ivory-400">Saree Title / Working Name</label>
                  <input
                    type="text"
                    value={sareeName}
                    onChange={(e) => setSareeName(e.target.value)}
                    className="w-full bg-obsidian-950 border border-gold-500/30 rounded-xl px-4 py-2 text-xs text-ivory-100 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <button
                  onClick={runGarmentAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow hover:scale-[1.02] active:scale-[0.98] transition disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Extracting Saree DNA...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" />
                      <span>Analyze Garment with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Detected Attributes & Human Approval (PRD Section 20, 77, 79) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-6">
                
                <div className="flex items-center justify-between border-b border-gold-500/10 pb-4">
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-ivory-100">
                      Detected Saree DNA & Metadata
                    </h3>
                    <p className="text-xs text-ivory-400">
                      Human-in-the-Loop validation: nothing is published to catalog without admin approval.
                    </p>
                  </div>

                  {approved ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/40">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approved & AI Ready
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-semibold border border-gold-500/30">
                      Pending Admin Review
                    </span>
                  )}
                </div>

                {analysisResult ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Detected Fabric</span>
                        <span className="font-bold text-ivory-100">{analysisResult.detectedAttributes.fabric}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Primary Color</span>
                        <span className="font-bold text-gold-400">{analysisResult.detectedAttributes.colors.join(', ')}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Pattern / Weave</span>
                        <span className="font-bold text-ivory-100">{analysisResult.detectedAttributes.pattern}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Border Type</span>
                        <span className="font-bold text-ivory-100">{analysisResult.detectedAttributes.border.type}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Zari Specification</span>
                        <span className="font-bold text-gold-400">{analysisResult.detectedAttributes.zariType}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-obsidian-950 border border-gold-500/10">
                        <span className="text-ivory-400 text-[10px] block">Suggested Category</span>
                        <span className="font-bold text-ivory-100 uppercase">{analysisResult.detectedAttributes.suggestedCategory}</span>
                      </div>
                    </div>

                    {/* AI Generated Narrative */}
                    <div className="p-4 rounded-xl bg-obsidian-950 border border-gold-500/20 text-xs space-y-1.5">
                      <span className="font-cinzel text-gold-400 font-semibold uppercase tracking-wider block">
                        AI Generated Product Story & SEO Tags
                      </span>
                      <p className="text-ivory-300 leading-relaxed">{analysisResult.aiGeneratedStory}</p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {analysisResult.detectedAttributes.suggestedTags.map((t: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-obsidian-900 border border-gold-500/20 text-[10px] text-ivory-300">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => setApproved(true)}
                        className="flex-1 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve Saree DNA & Publish</span>
                      </button>

                      <button
                        onClick={() => runGarmentAnalysis()}
                        className="px-5 py-3.5 rounded-full bg-obsidian-950 border border-gold-500/30 text-ivory-300 hover:text-gold-400 text-xs font-semibold transition"
                      >
                        Re-Analyze
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center space-y-3 text-ivory-400">
                    <Sparkles className="w-10 h-10 text-gold-500/40 mx-auto" />
                    <h4 className="font-cinzel text-base text-ivory-200">Awaiting Garment Upload</h4>
                    <p className="text-xs max-w-sm mx-auto">
                      Upload a raw saree photo and click 'Analyze Garment with AI' to automatically detect motifs, zari type, colors, and fabric structure.
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* TAB 2: AI MODEL PHOTOGRAPHY (PRD Section 21, 22) */}
        {activeTab === 'MODEL_PHOTO' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-6 rounded-2xl bg-obsidian-900 border border-gold-500/20 text-xs">
              
              {/* Model Profile */}
              <div className="space-y-1.5">
                <label className="text-gold-400 font-cinzel font-semibold uppercase tracking-wider block">
                  Model Profile
                </label>
                <select
                  value={modelProfile}
                  onChange={(e: any) => setModelProfile(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                >
                  <option value="Model A (Modern Regal)">Model A (Modern Regal)</option>
                  <option value="Model B (Heritage Classic)">Model B (Heritage Classic)</option>
                  <option value="Model C (Contemporary Chic)">Model C (Contemporary Chic)</option>
                </select>
              </div>

              {/* Pose */}
              <div className="space-y-1.5">
                <label className="text-gold-400 font-cinzel font-semibold uppercase tracking-wider block">
                  Pose & Angle
                </label>
                <select
                  value={pose}
                  onChange={(e) => setPose(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                >
                  <option value="Front Formal">Front Formal</option>
                  <option value="3/4 Angle">3/4 Angle Drape</option>
                  <option value="Editorial Drape">Editorial High-Fashion</option>
                  <option value="Pallu Focus">Pallu Zari Close-up</option>
                </select>
              </div>

              {/* Background */}
              <div className="space-y-1.5">
                <label className="text-gold-400 font-cinzel font-semibold uppercase tracking-wider block">
                  Background
                </label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                >
                  <option value="Royal Palace Archway">Royal Palace Archway</option>
                  <option value="Luxury Studio Minimal">Luxury Studio Minimal</option>
                  <option value="Wedding Mandap">Wedding Mandap</option>
                  <option value="Botanical Courtyard">Botanical Courtyard</option>
                </select>
              </div>

              {/* Lighting */}
              <div className="space-y-1.5">
                <label className="text-gold-400 font-cinzel font-semibold uppercase tracking-wider block">
                  Lighting
                </label>
                <select
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full bg-obsidian-950 border border-gold-500/20 rounded-xl p-2 text-ivory-200 focus:outline-none focus:border-gold-400"
                >
                  <option value="Warm Gold">Warm Gold Sunset</option>
                  <option value="Studio Soft White">Studio Soft White</option>
                  <option value="Sunset Ambient">Sunset Dramatic</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="flex items-end">
                <button
                  onClick={handleModelPhotoGeneration}
                  disabled={isGeneratingPhotos}
                  className="w-full py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow transition disabled:opacity-50"
                >
                  {isGeneratingPhotos ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Rendering...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-3.5 h-3.5" />
                      <span>Generate Candidates</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Candidate Photos Grid */}
            {photoCandidates.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-cinzel text-base font-bold text-ivory-100">
                  Candidate Model Photos (4 Renderings Generated)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {photoCandidates.map((cand, idx) => (
                    <div key={idx} className="rounded-2xl bg-obsidian-900 border border-gold-500/20 overflow-hidden p-3 space-y-3">
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-obsidian-950">
                        <img src={cand.url} alt="Candidate" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-obsidian-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-400">
                          {cand.fidelityScore}% Fidelity
                        </div>
                      </div>
                      <div className="text-[11px] text-ivory-400 space-y-0.5">
                        <p className="font-semibold text-ivory-200">{cand.pose}</p>
                        <p>{cand.background}</p>
                      </div>
                      <button
                        onClick={() => alert(`Selected Candidate ${idx + 1} as Catalog Hero image!`)}
                        className="w-full py-2 rounded-lg bg-gold-500/20 hover:bg-gold-500 text-gold-400 hover:text-obsidian-950 text-xs font-semibold transition"
                      >
                        Set as Catalog Hero
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-3 bg-obsidian-900/60 rounded-3xl border border-gold-500/20">
                <Camera className="w-12 h-12 text-gold-500/40 mx-auto" />
                <h4 className="font-cinzel text-base text-ivory-200">No Model Renderings in Session</h4>
                <p className="text-xs text-ivory-400 max-w-md mx-auto">
                  Configure the model profile, pose, background, and lighting presets above to render 4 editorial catalog candidates.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CATALOG QUALITY SCORE (PRD Section 23) */}
        {activeTab === 'QUALITY_SCORE' && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-maroon-950/40 border border-gold-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-gold-400 font-semibold">
                  Catalog Readiness Heuristic Score
                </span>
                <h2 className="font-cinzel text-3xl font-extrabold text-ivory-100">
                  Overall Quality Score: {qualityScore.overall}/100
                </h2>
                <p className="text-xs text-ivory-300 max-w-lg">
                  Every product is evaluated across 5 dimensions before publication to ensure high conversion and search discoverability.
                </p>
              </div>

              <div className="w-28 h-28 rounded-full bg-gold-500/20 border-4 border-gold-500 flex flex-col items-center justify-center text-gold-400 shadow-gold-glow">
                <span className="font-cinzel text-3xl font-black">{qualityScore.overall}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider">Ready</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
                <span className="text-xs text-ivory-400 block">Image Quality</span>
                <span className="font-cinzel text-2xl font-bold text-emerald-400">{qualityScore.imageQuality}%</span>
                <p className="text-[11px] text-ivory-400">High-resolution textures and lighting balance verified.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
                <span className="text-xs text-ivory-400 block">Metadata Completeness</span>
                <span className="font-cinzel text-2xl font-bold text-emerald-400">{qualityScore.metadataCompleteness}%</span>
                <p className="text-[11px] text-ivory-400">Fabric, motifs, zari, and length fully populated.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
                <span className="text-xs text-ivory-400 block">Saree Visibility</span>
                <span className="font-cinzel text-2xl font-bold text-emerald-400">{qualityScore.sareeVisibility}%</span>
                <p className="text-[11px] text-ivory-400">Clear pallu fall and full-length border framing.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
                <span className="text-xs text-ivory-400 block">Garment Fidelity</span>
                <span className="font-cinzel text-2xl font-bold text-emerald-400">{qualityScore.garmentFidelity}%</span>
                <p className="text-[11px] text-ivory-400">Color harmony and texture preservation approved.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-gold-500/20 space-y-2">
                <span className="text-xs text-ivory-400 block">SEO Completeness</span>
                <span className="font-cinzel text-2xl font-bold text-emerald-400">{qualityScore.seoCompleteness}%</span>
                <p className="text-[11px] text-ivory-400">Keywords, meta title, and OpenGraph tags configured.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
