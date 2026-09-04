import { useState, useEffect } from 'react';

export function useWebGLSupport() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [tier, setTier] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        setTier('low');
        return;
      }

      // Check mobile / DPR
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const dpr = window.devicePixelRatio || 1;

      if (isMobile || dpr < 1.5) {
        setTier('medium');
      } else {
        setTier('high');
      }

      // Check prefers reduced motion
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setTier('low');
      }
    } catch (e) {
      setHasWebGL(false);
      setTier('low');
    }
  }, []);

  return { hasWebGL, tier, isLowTier: tier === 'low' };
}
