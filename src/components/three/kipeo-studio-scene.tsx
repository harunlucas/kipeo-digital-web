"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import type { HotspotId } from "./studio-hotspots";

const COLOR = {
  ink: "#0d1117",
  inkElevated: "#161b22",
  teal: "#14b8a6",
  tealStrong: "#0f766e",
  violet: "#6c63e0",
  warm: "#5b5348",
  cream: "#f5f2ea",
};

type SceneProps = {
  active: HotspotId | null;
  onSelect: (id: HotspotId) => void;
  reduceMotion: boolean;
  simplified: boolean;
};

type CanvasProps = SceneProps & { paused?: boolean };

function Monitor({
  position,
  rotationY = 0,
  tone,
  active,
  onClick,
}: {
  position: [number, number, number];
  rotationY?: number;
  tone: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0.24, 0]} onClick={(e) => (e.stopPropagation(), onClick())}>
        <boxGeometry args={[0.62, 0.4, 0.03]} />
        <meshStandardMaterial
          color={COLOR.ink}
          emissive={tone}
          emissiveIntensity={active ? 0.85 : 0.4}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.05, 0.12, 0.05]} />
        <meshStandardMaterial color={COLOR.inkElevated} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.14]} />
        <meshStandardMaterial color={COLOR.inkElevated} />
      </mesh>
    </group>
  );
}

function DataCluster({ active, onClick }: { active: boolean; onClick: () => void }) {
  const dots: [number, number, number][] = [
    [0, 0, 0],
    [0.12, 0.08, 0.05],
    [-0.1, 0.1, -0.03],
    [0.04, -0.1, 0.08],
  ];
  return (
    <group position={[0.75, 1.02, 0.12]} onClick={(e) => (e.stopPropagation(), onClick())}>
      {dots.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={COLOR.violet}
            emissive={COLOR.violet}
            emissiveIntensity={active ? 1 : 0.5}
          />
        </mesh>
      ))}
      {dots.slice(1).map((p, i) => (
        <Line key={i} points={[[0, 0, 0], p]} color={COLOR.violet} opacity={0.5} transparent lineWidth={1} />
      ))}
    </group>
  );
}

function StudioContents({ active, onSelect, simplified }: SceneProps) {
  return (
    <group position={[0, -1.1, 0]}>
      {/* floor platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[1.9, 6]} />
        <meshStandardMaterial
          color={COLOR.inkElevated}
          emissive={COLOR.inkElevated}
          emissiveIntensity={0.4}
          roughness={0.9}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <ringGeometry args={[1.85, 1.9, 6]} />
        <meshStandardMaterial color={COLOR.teal} emissive={COLOR.teal} emissiveIntensity={0.5} />
      </mesh>

      {/* desk */}
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.7]} />
        <meshStandardMaterial color={COLOR.warm} roughness={0.6} />
      </mesh>
      {[
        [-0.68, 0.36, -0.28],
        [0.68, 0.36, -0.28],
        [-0.68, 0.36, 0.28],
        [0.68, 0.36, 0.28],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <boxGeometry args={[0.04, 0.72, 0.04]} />
          <meshStandardMaterial color={COLOR.inkElevated} />
        </mesh>
      ))}

      {/* three monitors: interface / backend / operations, held in a flat
          parallel row so no orbit angle causes them to overlap or foreshorten
          into each other */}
      <Monitor
        position={[-0.44, 0.75, -0.18]}
        tone={COLOR.teal}
        active={active === "interface"}
        onClick={() => onSelect("interface")}
      />
      <Monitor
        position={[0, 0.75, -0.22]}
        tone={COLOR.violet}
        active={active === "backend"}
        onClick={() => onSelect("backend")}
      />
      <Monitor
        position={[0.44, 0.75, -0.18]}
        tone={COLOR.tealStrong}
        active={active === "operations"}
        onClick={() => onSelect("operations")}
      />

      {/* commerce / CMS panel, propped on the desk */}
      <mesh position={[-0.55, 0.79, 0.18]} rotation={[-0.5, 0.3, 0]}>
        <boxGeometry args={[0.22, 0.16, 0.015]} />
        <meshStandardMaterial color={COLOR.ink} emissive={COLOR.teal} emissiveIntensity={0.3} />
      </mesh>

      {/* data / integrations cluster */}
      <DataCluster active={active === "data"} onClick={() => onSelect("data")} />

      {/* deployment / server status */}
      <group
        position={[0.72, 0.85, 0.25]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect("deployment");
        }}
      >
        <mesh>
          <boxGeometry args={[0.14, 0.28, 0.14]} />
          <meshStandardMaterial color={COLOR.inkElevated} />
        </mesh>
        <mesh position={[0, 0.17, 0.075]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial
            color={COLOR.teal}
            emissive={COLOR.teal}
            emissiveIntensity={active === "deployment" ? 1.4 : 0.9}
          />
        </mesh>
      </group>

      {/* desk lamp */}
      <mesh position={[-0.62, 0.75, -0.3]}>
        <cylinderGeometry args={[0.05, 0.06, 0.02, 10]} />
        <meshStandardMaterial color={COLOR.inkElevated} />
      </mesh>
      <mesh position={[-0.65, 0.98, -0.24]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.008, 0.008, 0.42, 6]} />
        <meshStandardMaterial color={COLOR.tealStrong} />
      </mesh>
      <mesh position={[-0.78, 1.15, -0.14]} rotation={[0.7, 0, 0.4]}>
        <coneGeometry args={[0.05, 0.09, 10]} />
        <meshStandardMaterial color={COLOR.cream} emissive={COLOR.cream} emissiveIntensity={0.4} />
      </mesh>
      {!simplified && <pointLight position={[-0.78, 1.1, -0.1]} color={COLOR.cream} intensity={0.5} distance={1} />}

      {/* restrained plant */}
      {!simplified && (
        <group position={[0.62, 0.78, 0.32]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.06, 0.09, 8]} />
            <meshStandardMaterial color={COLOR.inkElevated} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[Math.sin(i) * 0.03, 0.11 + i * 0.02, Math.cos(i) * 0.03]} rotation={[0, i, 0.3]}>
              <coneGeometry args={[0.03, 0.13, 6]} />
              <meshStandardMaterial color={COLOR.tealStrong} />
            </mesh>
          ))}
        </group>
      )}

      {/* Kipeo geometric brand object */}
      <mesh position={[0, 1.45, -0.4]} rotation={[0.4, 0.6, 0]}>
        <icosahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial color={COLOR.teal} emissive={COLOR.teal} emissiveIntensity={0.5} flatShading />
      </mesh>
    </group>
  );
}

export function KipeoStudioCanvas({ active, onSelect, reduceMotion, simplified, paused = false }: CanvasProps) {
  const [autoRotate, setAutoRotate] = useState(!reduceMotion);
  const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIdleTimer = useCallback(() => {
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
  }, []);

  useEffect(() => clearIdleTimer, [clearIdleTimer]);

  function handleStart() {
    if (reduceMotion) return;
    setAutoRotate(false);
    clearIdleTimer();
  }

  function handleEnd() {
    if (reduceMotion) return;
    clearIdleTimer();
    idleTimeout.current = setTimeout(() => setAutoRotate(true), 3500);
  }

  return (
    <Canvas
      dpr={[1, simplified ? 1.25 : 1.75]}
      gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
      camera={{ position: [0, 0.55, simplified ? 3.4 : 2.9], fov: 42 }}
      shadows={false}
      frameloop={paused ? "never" : "always"}
      aria-label="Interactive Kipeo Systems Studio: a low-poly 3D workspace"
    >
      <color attach="background" args={[COLOR.ink]} />
      <fog attach="fog" args={[COLOR.ink, 4, 8]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[1.4, 1.8, 1.4]} color={COLOR.teal} intensity={1.3} distance={7} />
      {!simplified && <pointLight position={[-1.6, 1.3, -0.6]} color={COLOR.violet} intensity={0.8} distance={7} />}
      <pointLight position={[0, 1.6, 1.8]} color={COLOR.cream} intensity={0.35} distance={6} />
      <hemisphereLight args={[COLOR.cream, COLOR.ink, 0.3]} />

      <StudioContents active={active} onSelect={onSelect} reduceMotion={reduceMotion} simplified={simplified} />

      <OrbitControls
        enablePan={false}
        enableDamping={!reduceMotion}
        dampingFactor={0.08}
        minDistance={simplified ? 3.2 : 2.8}
        maxDistance={simplified ? 3.9 : 4.2}
        minPolarAngle={Math.PI / 3.6}
        maxPolarAngle={Math.PI / 2.7}
        minAzimuthAngle={-Math.PI / 12}
        maxAzimuthAngle={Math.PI / 12}
        autoRotate={autoRotate}
        autoRotateSpeed={0.22}
        onStart={handleStart}
        onEnd={handleEnd}
        makeDefault
      />
    </Canvas>
  );
}
