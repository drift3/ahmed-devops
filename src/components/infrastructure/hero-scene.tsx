"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

/**
 * HeroScene — abstract infrastructure environment.
 * - A central rotating wireframe icosahedron (cluster core)
 * - Orbiting node-cubes representing services/pods
 * - A horizontal "data plane" of vertical bars
 * - Subtle particle field
 * Reacts to pointer position via parallax.
 */

function ClusterCore() {
  const ref = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += delta * 0.02;
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.18;
      inner.current.rotation.z += delta * 0.06;
    }
  });

  return (
    <group ref={ref}>
      {/* outer wireframe icosahedron */}
      <mesh>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.35} />
      </mesh>
      {/* inner solid icosahedron */}
      <mesh ref={inner} scale={0.62}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#5eead4" wireframe transparent opacity={0.55} />
      </mesh>
      {/* core sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function Node({ radius, speed, offset, color, size = 0.12 }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 1.4) * radius * 0.35,
      Math.sin(t) * radius
    );
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.013;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[size, size, size]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.85} />
    </mesh>
  );
}

function OrbitingNodes() {
  const nodes = useMemo(() => {
    const arr = [];
    const palette = ["#5eead4", "#38bdf8", "#5eead4", "#5eead4", "#38bdf8", "#5eead4"];
    for (let i = 0; i < 9; i++) {
      arr.push({
        radius: 1.8 + (i % 3) * 0.8,
        speed: 0.18 + (i % 4) * 0.05,
        offset: (i / 9) * Math.PI * 2,
        color: palette[i % palette.length],
        size: 0.1 + (i % 3) * 0.04,
      });
    }
    return arr;
  }, []);
  return (
    <group>
      {nodes.map((n, i) => (
        <Node key={i} {...n} />
      ))}
    </group>
  );
}

function DataPlane() {
  const ref = useRef<THREE.Group>(null);
  const bars = useMemo(() => {
    const arr = [];
    const cols = 24;
    const spacing = 0.28;
    for (let i = 0; i < cols; i++) {
      arr.push({
        x: (i - cols / 2) * spacing,
        h: 0.3 + Math.sin(i * 0.5) * 0.4 + 0.3,
      });
    }
    return arr;
  }, []);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.z = -3;
    ref.current.position.y = -1.6;
    // shift bar heights in a wave
    bars.forEach((b, i) => {
      const m = ref.current?.children[i] as THREE.Mesh | undefined;
      if (m) {
        const s = 0.3 + (Math.sin(state.clock.elapsedTime * 1.4 + i * 0.4) + 1) * 0.4;
        m.scale.y = s;
      }
    });
  });
  return (
    <group ref={ref}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2, 0]}>
          <boxGeometry args={[0.06, 1, 0.06]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.32} />
        </mesh>
      ))}
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const count = 220;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial color="#5eead4" size={0.04} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame(() => {
    target.current.x = pointer.x * 2.4;
    target.current.y = -pointer.y * 1.5;
    camera.position.lerp(target.current, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface HeroSceneProps {
  reduced?: boolean;
}

export function HeroScene({ reduced }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <ClusterCore />
        {!reduced && <OrbitingNodes />}
        {!reduced && <DataPlane />}
        {!reduced && <ParticleField />}
        <Rig />
      </Suspense>
    </Canvas>
  );
}
