import { useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

export const usePerformance = () => {
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect device performance capabilities
  useEffect(() => {
    const checkPerformance = () => {
      // Check for low-end devices
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        navigator.deviceMemory <= 2 || // Low RAM
        /Android.*Chrome\/[0-5]/.test(navigator.userAgent) || // Old Android Chrome
        /iPhone.*OS [0-9]_/.test(navigator.userAgent); // Old iOS

      setIsLowPerformance(isLowEnd);
    };

    checkPerformance();
  }, []);

  // Optimized animation config based on device capabilities
  const getAnimationConfig = useCallback((baseConfig) => {
    if (shouldReduceMotion || isLowPerformance) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.2 }
      };
    }
    return baseConfig;
  }, [shouldReduceMotion, isLowPerformance]);

  // Performance-aware transition duration
  const getDuration = useCallback((normalDuration = 0.5) => {
    if (shouldReduceMotion) return 0.1;
    if (isLowPerformance) return normalDuration * 0.5;
    return normalDuration;
  }, [shouldReduceMotion, isLowPerformance]);

  // Check if complex animations should be disabled
  const shouldDisableComplexAnimations = useCallback(() => {
    return shouldReduceMotion || isLowPerformance;
  }, [shouldReduceMotion, isLowPerformance]);

  // Optimized viewport config
  const getViewportConfig = useCallback(() => {
    return {
      once: true,
      margin: isLowPerformance ? "-50px" : "-100px",
      amount: isLowPerformance ? 0.1 : 0.3
    };
  }, [isLowPerformance]);

  return {
    isLowPerformance,
    shouldReduceMotion,
    getAnimationConfig,
    getDuration,
    shouldDisableComplexAnimations,
    getViewportConfig
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const [isThrottled, setIsThrottled] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFps(currentFPS);
        setIsThrottled(currentFPS < 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return { fps, isThrottled };
};