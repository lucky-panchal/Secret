'use client';
import { motion } from 'framer-motion';

const AgentInteractiveEffects = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-cyan-400 rounded-full opacity-30"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-20"
        animate={{
          x: [0, 15, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-25"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.25, 0.5, 0.25]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </div>
  );
};

export default AgentInteractiveEffects;