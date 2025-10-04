'use client';
import { useEffect } from 'react';

const AgentInteractiveEffects = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes agentGlow {
        0%, 100% { box-shadow: 0 0 5px rgba(0, 188, 212, 0.05); }
        50% { box-shadow: 0 0 10px rgba(0, 188, 212, 0.1); }
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
        box-shadow: 0 0 10px rgba(0, 188, 212, 0.15) !important;
      }
      
      .MuiButton-root {
        transition: all 0.3s ease;
      }
      
      .MuiButton-root:hover {
        box-shadow: 0 4px 12px rgba(0, 188, 212, 0.1);
      }
      
      .MuiPaper-root {
        transition: all 0.3s ease;
      }
      
      .MuiPaper-root:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 188, 212, 0.05);
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