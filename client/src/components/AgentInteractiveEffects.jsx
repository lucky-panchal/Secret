'use client';
import { useEffect } from 'react';

const AgentInteractiveEffects = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes agentGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(0, 188, 212, 0.1); }
        50% { box-shadow: 0 0 40px rgba(0, 188, 212, 0.3); }
      }
      
      @keyframes agentPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      .agent-interactive {
        transition: all 0.3s ease;
        animation: agentGlow 4s infinite ease-in-out;
      }
      
      .agent-interactive:hover {
        animation: agentPulse 0.6s ease-in-out;
        box-shadow: 0 0 30px rgba(0, 188, 212, 0.4) !important;
      }
      
      .MuiButton-root {
        transition: all 0.3s ease;
      }
      
      .MuiButton-root:hover {
        box-shadow: 0 8px 25px rgba(0, 188, 212, 0.2);
      }
      
      .MuiPaper-root {
        transition: all 0.3s ease;
      }
      
      .MuiPaper-root:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 188, 212, 0.1);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default AgentInteractiveEffects;