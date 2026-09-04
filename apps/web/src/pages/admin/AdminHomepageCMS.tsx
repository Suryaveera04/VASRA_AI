import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Save, LayoutTemplate, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { api } from '../../lib/api';
import { HomepageConfig, HomepageSection } from '../../types';

export function AdminHomepageCMS() {
  const [config, setConfig] = useState<HomepageConfig | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await api.getHomepageConfig();
        setConfig(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadConfig();
  }, []);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!config) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= config.sections.length) return;

    const updated = [...config.sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    updated.forEach((sec, idx) => { sec.order = (idx + 1) * 100; });

    setConfig({ ...config, sections: updated });
  };

  const toggleSection = (id: string) => {
    if (!config) return;
    const updated = config.sections.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s);
    setConfig({ ...config, sections: updated });
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await api.updateHomepageConfig(config);
      alert('Homepage layout saved successfully!');
    } catch (err: any) {
      alert('Failed to save homepage layout.');
    } finally {
      setSaving(false);
    }
  };

  if (!config) return <div className="min-h-screen bg-obsidian-950 p-8 text-gold-400">Loading CMS...</div>;

  return (
    <div className="min-h-screen bg-obsidian-950 flex">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-cinzel text-2xl font-bold text-ivory-100">Homepage Layout CMS</h1>
            <p className="text-xs text-ivory-400">Reorder and toggle homepage sections without writing code</p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save CMS Config'}</span>
          </button>
        </div>

        {/* Hero Form */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
          <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Hero Section Content</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ivory-300 mb-1">Brand Title</label>
              <input
                type="text"
                value={config.hero.title}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-ivory-300 mb-1">Badge Tagline</label>
              <input
                type="text"
                value={config.hero.badgeText || ''}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badgeText: e.target.value } })}
                className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ivory-300 mb-1">Hero Subtitle Narrative</label>
            <input
              type="text"
              value={config.hero.subtitle}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subtitle: e.target.value } })}
              className="w-full bg-obsidian-800 border border-gold-500/20 rounded-xl px-3.5 py-2 text-xs text-ivory-100"
            />
          </div>
        </div>

        {/* Modular Sections Manager */}
        <div className="bg-obsidian-900 border border-gold-500/20 rounded-2xl p-6 space-y-4">
          <h3 className="font-cinzel text-sm font-bold text-gold-400 uppercase tracking-wider">Modular Section Hierarchy</h3>

          <div className="space-y-3">
            {config.sections.map((section, idx) => (
              <div key={section.id} className="flex items-center justify-between p-4 rounded-xl bg-obsidian-800/60 border border-gold-500/10">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="text-ivory-400 hover:text-gold-400 disabled:opacity-20">
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => moveSection(idx, 'down')} disabled={idx === config.sections.length - 1} className="text-ivory-400 hover:text-gold-400 disabled:opacity-20">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-ivory-100">{section.title}</h4>
                    <span className="text-[10px] text-ivory-400 uppercase font-mono">{section.type}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSection(section.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
                    section.enabled
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                  }`}
                >
                  {section.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{section.enabled ? 'Enabled' : 'Disabled'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
