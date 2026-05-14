import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const CharacterModel = ({ parts }: { parts: any }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Head */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color={parts.Head ? "#f59e0b" : "#475569"} roughness={0.1} metalness={0.8} />
          {parts.Head && (
            <mesh position={[0, 0, 0.21]}>
              <planeGeometry args={[0.3, 0.1]} />
              <meshBasicMaterial color="#f59e0b" transparent opacity={0.6} />
            </mesh>
          )}
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[0.7, 1, 0.4]} />
          <meshStandardMaterial color={parts.Torso ? "#1e293b" : "#334155"} roughness={0.2} metalness={0.9} />
          {/* Grav Core Glow */}
          {parts.Torso && (
            <mesh position={[0, 0, 0.21]}>
              <circleGeometry args={[0.15, 32]} />
              <MeshDistortMaterial color="#f59e0b" speed={1.5} distort={0.3} />
            </mesh>
          )}
        </mesh>

        {/* Arms */}
        <group position={[-0.5, 0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.7, 0.2]} />
            <meshStandardMaterial color={parts['Left Arm'] ? "#22d3ee" : "#334155"} roughness={0.3} metalness={0.7} />
          </mesh>
        </group>

        <group position={[0.5, 0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.7, 0.2]} />
            <meshStandardMaterial color={parts['Right Arm'] ? "#e11d48" : "#334155"} roughness={0.3} metalness={0.7} />
          </mesh>
          {parts['Right Arm'] && (
            <mesh position={[0, -0.4, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshBasicMaterial color="#e11d48" wireframe />
            </mesh>
          )}
        </group>

        {/* Legs */}
        <group position={[-0.2, -0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color={parts.Legs ? "#94a3b8" : "#334155"} />
          </mesh>
          {parts.Legs && (
             <mesh position={[0, -0.4, 0.1]}>
               <boxGeometry args={[0.25, 0.1, 0.3]} />
               <meshBasicMaterial color="#f59e0b" />
             </mesh>
          )}
        </group>

        <group position={[0.2, -0.6, 0]}>
          <mesh>
            <boxGeometry args={[0.2, 0.8, 0.2]} />
            <meshStandardMaterial color={parts.Legs ? "#94a3b8" : "#334155"} />
          </mesh>
          {parts.Legs && (
             <mesh position={[0, -0.4, 0.1]}>
               <boxGeometry args={[0.25, 0.1, 0.3]} />
               <meshBasicMaterial color="#f59e0b" />
             </mesh>
          )}
        </group>
      </Float>

      {/* Ground shadows/glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#020617" />
      </mesh>
      
      <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -1.15, 0]} />
    </group>
  );
};
