'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, Box } from '@react-three/drei';

const FloatingBook = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        <Box args={[0.8, 1, 0.1]}>
          <meshStandardMaterial color="#4a90e2" />
        </Box>
        <Box args={[0.7, 0.9, 0.12]} position={[0, 0, 0.06]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    </Float>
  );
};

const BrainNeuron = ({ position }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.emissive.setHex(
        Math.sin(state.clock.elapsedTime * 2) > 0 ? 0x00ff88 : 0x004422
      );
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.1]} position={position}>
      <meshStandardMaterial color="#00ff88" emissive="#004422" />
    </Sphere>
  );
};

const LearningAnimation = () => {
  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4a90e2" />
        
        <FloatingBook position={[-4, 2, 0]} />
        <FloatingBook position={[4, -1, -2]} />
        <FloatingBook position={[0, 3, -1]} />
        <FloatingBook position={[-2, -2, 1]} />
        
        <BrainNeuron position={[-3, 0, 1]} />
        <BrainNeuron position={[3, 1, 0]} />
        <BrainNeuron position={[0, -3, 2]} />
        <BrainNeuron position={[2, 3, -1]} />
        <BrainNeuron position={[-1, 1, 2]} />
        
        <Text
          position={[0, -4, -2]}
          fontSize={0.3}
          color="rgba(255,255,255,0.3)"
          anchorX="center"
          anchorY="middle"
        >
          LEARN • GROW • SUCCEED
        </Text>
      </Canvas>
    </div>
  );
};

export default LearningAnimation;