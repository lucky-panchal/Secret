'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, Box, Torus } from '@react-three/drei';

const CodeParticle = ({ position, text, color }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.005;
      meshRef.current.position.x += Math.cos(state.clock.elapsedTime * 0.3 + position[1]) * 0.003;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      const pulse = Math.sin(state.clock.elapsedTime * 1) * 0.1 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <Text
        ref={meshRef}
        position={position}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
};

const ProgressOrb = ({ position, progress }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const pulse = Math.sin(state.clock.elapsedTime * 0.8) * 0.05 + 0.9;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Sphere args={[0.2]}>
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.1} />
      </Sphere>
      <Text
        position={[0, 0, 0.3]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {progress}%
      </Text>
    </group>
  );
};

const SkillBadge = ({ position, skill }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        <Box args={[1.2, 0.4, 0.1]}>
          <meshStandardMaterial color="rgba(212,165,116,0.5)" />
        </Box>
        <Text
          position={[0, 0, 0.06]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {skill}
        </Text>
      </group>
    </Float>
  );
};

const MotivationalBackground = () => {
  const codeSnippets = ['React', 'Python', 'AI/ML', 'Cloud', 'DevOps', 'Data'];
  const skills = ['JavaScript', 'AWS', 'Docker', 'MongoDB'];
  
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
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#ffd700" />
        <pointLight position={[-10, -10, 5]} intensity={0.4} color="#ffd700" />
        <pointLight position={[0, 15, 0]} intensity={0.3} color="#ffd700" />
        
        {/* Top Elements */}
        <ProgressOrb position={[-5, 5, -4]} progress="85" />
        <ProgressOrb position={[5, 5, -4]} progress="92" />
        

      </Canvas>
    </div>
  );
};

export default MotivationalBackground;