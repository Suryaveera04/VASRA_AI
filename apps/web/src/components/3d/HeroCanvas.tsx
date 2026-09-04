import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGLSupport } from './useWebGLSupport';

function SilkWaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime() * 0.4;
    const position = meshRef.current.geometry.attributes['position'] as THREE.BufferAttribute;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const waveX = Math.sin(x * 1.5 + time) * 0.35;
      const waveY = Math.cos(y * 1.8 + time * 1.2) * 0.25;
      const mouseEffect = (mouse.x * x + mouse.y * y) * 0.05;
      position.setZ(i, waveX + waveY + mouseEffect);
    }
    position.needsUpdate = true;
    meshRef.current.rotation.z = Math.sin(time * 0.2) * 0.05 + mouse.x * 0.05;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, Math.PI / 8]} position={[0, -0.5, 0]}>
      <planeGeometry args={[12, 10, 48, 48]} />
      <meshStandardMaterial
        color="#58111A"
        roughness={0.25}
        metalness={0.6}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingGoldParticles({ count = 80 }: { count?: number }) {
  const particlesRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color('#D4AF37');
    const roseColor = new THREE.Color('#F5E4A8');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = Math.random() > 0.5 ? goldColor : roseColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    const time = clock.getElapsedTime() * 0.3;
    particlesRef.current.rotation.y = time * 0.1;
    particlesRef.current.rotation.x = Math.sin(time * 0.15) * 0.05;
  });

  const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);
  const colorAttr = useMemo(() => new THREE.BufferAttribute(colors, 3), [colors]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttr} />
        <primitive attach="attributes-color" object={colorAttr} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function HeroCanvas() {
  const { hasWebGL, tier, isLowTier } = useWebGLSupport();

  if (!hasWebGL || isLowTier) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-maroon-900/60 via-obsidian-950 to-obsidian-950 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent opacity-60 animate-pulse-slow" />
      </div>
    );
  }

  const particleCount = tier === 'high' ? 120 : 60;

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas
        dpr={tier === 'high' ? [1, 2] : [1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.5]} fov={50} />
        <ambientLight intensity={0.4} />
        <spotLight position={[6, 8, 5]} intensity={1.8} color="#D4AF37" angle={0.6} penumbra={0.8} />
        <pointLight position={[-6, -4, 2]} intensity={1.2} color="#7D1A25" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
          <SilkWaveMesh />
        </Float>

        <FloatingGoldParticles count={particleCount} />
        <Sparkles count={40} scale={10} size={2.5} speed={0.4} color="#F5E4A8" />
      </Canvas>
    </div>
  );
}
