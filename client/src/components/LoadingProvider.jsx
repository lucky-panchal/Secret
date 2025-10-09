'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NProgress from 'nprogress';

// Custom NProgress styles
const nprogressStyles = `
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: linear-gradient(90deg, #00F5FF 0%, #A855F7 50%, #FBBF24 100%);
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    box-shadow: 0 0 10px #00F5FF80;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #00F5FF, 0 0 5px #00F5FF;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #00F5FF;
    border-left-color: #00F5FF;
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  @keyframes nprogress-spinner {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Inject custom styles
    const style = document.createElement('style');
    style.textContent = nprogressStyles;
    document.head.appendChild(style);

    // Configure NProgress
    NProgress.configure({ 
      showSpinner: true,
      speed: 500,
      minimum: 0.3,
      trickleSpeed: 200
    });

    // Start NProgress on route change
    const handleStart = () => NProgress.start();
    const handleComplete = () => NProgress.done();

    // Listen to route changes
    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);

    return () => {
      // Cleanup
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
      document.head.removeChild(style);
    };
  }, [router]);

  return children;
};

export default LoadingProvider;