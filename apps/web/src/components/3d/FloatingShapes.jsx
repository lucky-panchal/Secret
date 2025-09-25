'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';

const FloatingShape = ({ position, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color={color} transparent opacity={0.6} />
        </Sphere>
      </mesh>
    </Float>
  );
};

const FloatingShapes = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingShape position={[-2, 1, 0]} color="#ffffff" />
        <FloatingShape position={[2, -1, -1]} color="#666666" />
        <FloatingShape position={[0, 2, -2]} color="#cccccc" />
      </Canvas>
    </div>
  );
};

export default FloatingShapes;