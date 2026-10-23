"use client";

import {
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  Sparkles,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/** Clamp large frame gaps (tab switches, hitches) so motion never jumps. */
const MAX_DELTA = 1 / 30;
const ENABLE_BLOOM = false;
const GLASS_BACKGROUND = new THREE.Color("#050810");

function OrbitRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, MAX_DELTA);
    group.current.rotation.z += step * 0.035;
    group.current.rotation.x = Math.sin(performance.now() * 0.00012) * 0.14;
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.35, 0.2, 0]}>
        <torusGeometry args={[1.86, 0.008, 8, 240]} />
        <meshBasicMaterial
          color="#92b1ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 1.75, -0.35, 0.6]}>
        <torusGeometry args={[2.14, 0.006, 8, 240]} />
        <meshBasicMaterial
          color="#bda3ff"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3.2, 0.9, -0.4]}>
        <torusGeometry args={[1.58, 0.005, 8, 200]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Deterministic pseudo-random so renders stay pure and stable. */
function seeded(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function Particles({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 2.25 + seeded(i * 3 + 1) * 2.1;
      const theta = seeded(i * 3 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i * 3 + 3) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.78;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += Math.min(delta, MAX_DELTA) * 0.022;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.018}
        color="#bdd0ff"
        transparent
        opacity={0.52}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlassSculpture({ lowPower }: { lowPower: boolean }) {
  const glass = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreRing = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const step = Math.min(delta, MAX_DELTA);
    if (glass.current) glass.current.rotation.y -= step * 0.012;
    if (core.current) {
      core.current.rotation.y += step * 0.11;
      core.current.rotation.x = Math.sin(performance.now() * 0.00016) * 0.1;
    }
    if (coreRing.current) coreRing.current.rotation.z += step * 0.07;
  });

  return (
    <group>
      <mesh ref={glass} renderOrder={2}>
        <sphereGeometry args={[1.3, lowPower ? 48 : 96, lowPower ? 48 : 96]} />
        <MeshTransmissionMaterial
          samples={lowPower ? 2 : 4}
          resolution={lowPower ? 128 : 256}
          transmission={1}
          thickness={0.9}
          roughness={0.035}
          ior={1.45}
          chromaticAberration={0.02}
          anisotropicBlur={0.3}
          distortion={0.08}
          distortionScale={0.35}
          temporalDistortion={0.04}
          clearcoat={1}
          clearcoatRoughness={0.08}
          attenuationColor="#a9c4ff"
          attenuationDistance={6}
          color="#f1f6ff"
          envMapIntensity={1.1}
          background={GLASS_BACKGROUND}
        />
      </mesh>

      <mesh ref={core} scale={0.44}>
        <torusKnotGeometry args={[1, 0.3, lowPower ? 80 : 150, lowPower ? 10 : 22]} />
        <meshStandardMaterial
          color="#c9d6f2"
          metalness={0.9}
          roughness={0.28}
          envMapIntensity={1.2}
          emissive="#2a4cff"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh scale={0.62}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#6f8dff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={coreRing} rotation={[Math.PI / 2.4, 0.2, 0]} scale={0.95}>
        <torusGeometry args={[0.75, 0.008, 8, 200]} />
        <meshBasicMaterial
          color="#a9c4ff"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.012}>
        <sphereGeometry args={[1.3, lowPower ? 36 : 64, lowPower ? 36 : 64]} />
        <meshBasicMaterial
          color="#9dbaff"
          wireframe
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Shard({
  position,
  rotation,
  scale,
  color,
  speed,
  drift,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  drift: number;
}) {
  const shard = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!shard.current) return;
    const step = Math.min(delta, MAX_DELTA);
    shard.current.rotation.x += step * drift;
    shard.current.rotation.y += step * drift * 0.7;
  });

  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.75}>
      <mesh ref={shard} position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.35}
          envMapIntensity={1.7}
          emissive={color}
          emissiveIntensity={0.07}
        />
      </mesh>
    </Float>
  );
}

function Sculpture({ lowPower }: { lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const step = Math.min(delta, MAX_DELTA);
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * 0.3, 1.8, step);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * 0.2, 1.8, step);
    if (halo.current) halo.current.rotation.z += step * 0.018;
  });

  return (
    <group ref={group}>
      <Float
        speed={0.85}
        rotationIntensity={0.14}
        floatIntensity={0.6}
        floatingRange={[-0.06, 0.06]}
      >
        <GlassSculpture lowPower={lowPower} />
      </Float>

      <Float speed={0.62} rotationIntensity={0.4} floatIntensity={0.85}>
        <OrbitRings />
      </Float>

      <mesh ref={halo} rotation={[Math.PI / 2.6, 0.1, 0.3]}>
        <torusGeometry args={[2.46, 0.0035, 6, 260]} />
        <meshBasicMaterial
          color="#dfe9ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <Sparkles
        count={lowPower ? 24 : 58}
        scale={7}
        size={1.7}
        speed={0.22}
        opacity={0.42}
        color="#a9c4ff"
      />

      <Shard
        position={[2.1, 1.25, -0.55]}
        rotation={[0.4, 0.2, 0.1]}
        scale={0.15}
        color="#7dd3fc"
        speed={0.5}
        drift={0.11}
      />
      {!lowPower ? (
        <Shard
          position={[-2.2, -1.05, 0.35]}
          rotation={[0.2, -0.4, 0.5]}
          scale={0.11}
          color="#c4b5fd"
          speed={0.42}
          drift={-0.09}
        />
      ) : null}

      <Particles count={lowPower ? 90 : 240} />
    </group>
  );
}

export function HeroScene({ lowPower = false }: { lowPower?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [dpr, setDpr] = useState<number | [number, number]>(lowPower ? 1 : [1, 1.5]);

  // Stop WebGL work while the hero is offscreen or the tab is hidden.
  // This keeps scrolling the rest of the page smooth and saves battery.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
        sync();
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={hostRef} className="h-full w-full" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={dpr}
        camera={{ position: [0, 0, 6.4], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMappingExposure = 1.12;
        }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[5, 6, 5]} intensity={1.2} color="#c5d7ff" />
        <pointLight position={[0, 0, 2.4]} intensity={2} color="#8fb4ff" distance={5} decay={2} />
        <pointLight position={[-4, -2, 3]} intensity={6} color="#8b6dff" distance={14} decay={2} />
        <pointLight position={[4, 2.5, -2]} intensity={5} color="#22d3ee" distance={16} decay={2} />

        <Environment resolution={lowPower ? 128 : 256} frames={1} background={false}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[0, 4.5, -6]}
            scale={[12, 7, 1]}
            color="#dbe6ff"
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            position={[-5, -0.5, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[7, 8, 1]}
            color="#8fb4ff"
          />
          <Lightformer
            form="rect"
            intensity={1.8}
            position={[5, 1.5, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[7, 8, 1]}
            color="#d8ccff"
          />
          <Lightformer
            form="circle"
            intensity={1}
            position={[0, -4.5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={5}
            color="#4f6dff"
          />
        </Environment>

        <PerformanceMonitor
          onDecline={() => setDpr((current) => (current === 1 ? current : 1))}
          onIncline={() =>
            setDpr((current) => (Array.isArray(current) || lowPower ? current : [1, 1.5]))
          }
        />

        <Suspense fallback={null}>
          <Sculpture lowPower={lowPower} />
        </Suspense>

        {ENABLE_BLOOM ? (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.62}
              luminanceThreshold={0.58}
              luminanceSmoothing={0.25}
              mipmapBlur
              radius={0.72}
            />
          </EffectComposer>
        ) : null}
      </Canvas>
    </div>
  );
}
