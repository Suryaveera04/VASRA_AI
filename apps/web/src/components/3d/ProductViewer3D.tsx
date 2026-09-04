import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Sun, RotateCcw, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { useWebGLSupport } from './useWebGLSupport';

interface ProductViewer3DProps {
  imageUrl: string;
  productName: string;
}

function SareeCloth3DModel({ imageUrl }: { imageUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const texture = useState(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(imageUrl);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  })[0];

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* 3D Saree Mannequin Drape Geometry */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 1.2, 3.2, 32, 16, true]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.3}
          metalness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Decorative Pallu Gold Accent Fold */}
      <mesh position={[0.4, 0.5, 0.3]} rotation={[0.2, -0.4, -0.2]}>
        <planeGeometry args={[0.9, 1.8, 16, 16]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function ProductViewer3D({ imageUrl, productName }: ProductViewer3DProps) {
  const { hasWebGL } = useWebGLSupport();
  const [lightPreset, setLightPreset] = useState<'studio' | 'gold' | 'sunset'>('gold');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  if (!hasWebGL) {
    return (
      <div className="w-full h-80 rounded-2xl bg-obsidian-900 flex items-center justify-center border border-gold-500/20">
        <p className="text-ivory-300 text-sm">3D WebGL viewer is not supported on this browser device.</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-2xl bg-obsidian-950 border border-gold-500/20 overflow-hidden shadow-2xl transition-all ${isFullscreen ? 'fixed inset-4 z-50 h-[92vh]' : 'h-96 lg:h-[460px]'}`}>
      
      {/* 3D Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-obsidian-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold-500/20 text-xs text-gold-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive 3D Showroom</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Light Preset Selector */}
          <div className="flex items-center bg-obsidian-900/80 backdrop-blur-md rounded-full border border-gold-500/20 p-1 text-xs text-ivory-300">
            <button
              onClick={() => setLightPreset('gold')}
              className={`px-2.5 py-1 rounded-full transition ${lightPreset === 'gold' ? 'bg-gold-500 text-obsidian-950 font-semibold' : 'hover:text-gold-400'}`}
            >
              Warm Gold
            </button>
            <button
              onClick={() => setLightPreset('studio')}
              className={`px-2.5 py-1 rounded-full transition ${lightPreset === 'studio' ? 'bg-gold-500 text-obsidian-950 font-semibold' : 'hover:text-gold-400'}`}
            >
              Studio White
            </button>
          </div>

          <button
            onClick={resetCamera}
            title="Reset Camera"
            className="p-2 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-gold-500/20 text-ivory-200 hover:text-gold-400 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="Toggle Fullscreen"
            className="p-2 rounded-full bg-obsidian-900/80 backdrop-blur-md border border-gold-500/20 text-ivory-200 hover:text-gold-400 transition"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* R3F Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />
        
        {lightPreset === 'gold' && (
          <>
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 6, 4]} intensity={2.2} color="#D4AF37" angle={0.6} penumbra={0.7} castShadow />
            <pointLight position={[-4, -3, -2]} intensity={0.8} color="#7D1A25" />
          </>
        )}

        {lightPreset === 'studio' && (
          <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 8, 4]} intensity={1.5} color="#FFFFFF" castShadow />
          </>
        )}

        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
          <SareeCloth3DModel imageUrl={imageUrl} />
        </Float>

        <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={6} blur={2.5} far={4} color="#000000" />
        <OrbitControls ref={controlsRef} enablePan={true} enableZoom={true} minDistance={3} maxDistance={7} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>

      {/* Footer Instructions */}
      <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] text-ivory-400 pointer-events-none">
        <span>Drag to rotate 360° • Scroll to zoom</span>
        <span className="flex items-center gap-1 text-gold-400">
          <ShieldCheck className="w-3.5 h-3.5" /> 3D Digital Twin Verified
        </span>
      </div>
    </div>
  );
}
