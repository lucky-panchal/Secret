// Motion configuration for performance optimization
export const motionConfig = {
  // Reduced motion variants for accessibility
  reducedMotion: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },

  // Standard motion variants
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  fadeInScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.4, ease: "easeOut" }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // Hover animations
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  hoverLift: {
    whileHover: { y: -5, scale: 1.02 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Performance optimization settings
export const performanceConfig = {
  // Hardware acceleration
  hardwareAcceleration: {
    transform: 'translateZ(0)',
    willChange: 'transform'
  },

  // Optimized transform properties
  optimizedTransform: {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    perspective: 1000
  },

  // Smooth scrolling
  smoothScroll: {
    behavior: 'smooth',
    block: 'start'
  }
};

// Viewport configuration for intersection observer
export const viewportConfig = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

// Animation duration based on user preferences
export const getDuration = (shouldReduceMotion, normalDuration = 0.5) => {
  return shouldReduceMotion ? 0.2 : normalDuration;
};

// Easing functions
export const easings = {
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55]
};