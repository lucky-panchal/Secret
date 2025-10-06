'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export default function Register() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [signUpData, setSignUpData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showSuccessOptions, setShowSuccessOptions] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter(); 

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setShowSuccessOptions(false);
    setSignInData({ email: '', password: '' });
  };

  const handleContinueToAssessment = () => {
    router.push('/assessment');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newErrors = {};
    let existingUser = null;
    
    try {
      const userData = localStorage.getItem('userData');
      existingUser = userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }

    if (!signUpData.fullName) newErrors.fullName = 'Full name is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(signUpData.email)) newErrors.email = 'Invalid email format';
    else if (existingUser && existingUser.email === signUpData.email) {
      newErrors.email = 'Email already exists. Please use a different email address.';
    }
    if (!signUpData.password) newErrors.password = 'Password is required';
    else if (signUpData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!signUpData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (signUpData.password !== signUpData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        localStorage.setItem('userData', JSON.stringify(signUpData));
        setPopupType('success');
        setPopupMessage('Account created successfully! You can now sign in.');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setIsRightPanelActive(false);
          const container = document.getElementById('container');
          if (container) {
            container.classList.remove('right-panel-active');
          }
        }, 2000);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        setPopupType('error');
        setPopupMessage('Registration failed. Please try again.');
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } else {
      setPopupType('error');
      setPopupMessage('Please fix the errors and try again.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newErrors = {};
    let storedUser = null;
    
    try {
      const userData = localStorage.getItem('userData');
      storedUser = userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
    }

    if (!signInData.email) newErrors.email = 'Email is required';
    if (!signInData.password) newErrors.password = 'Password is required';

    if (!storedUser) {
      setPopupType('error');
      setPopupMessage('No account found. Please sign up first.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    
    if (storedUser.email !== signInData.email || storedUser.password !== signInData.password) {
      setPopupType('error');
      setPopupMessage('Invalid email or password. Please try again.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }

    // Successful login - show success options
    try {
      localStorage.setItem('currentUser', JSON.stringify({ email: signInData.email, fullName: storedUser.fullName }));
      setPopupType('signin-success');
      setPopupMessage(`Welcome back, ${storedUser.fullName}!`);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowSuccessOptions(true);
      }, 1000);
    } catch (error) {
      console.error('Error saving current user:', error);
      setPopupType('error');
      setPopupMessage('Login failed. Please try again.');
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleOverlaySignUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = document.getElementById('container');
    if (container) {
      requestAnimationFrame(() => {
        container.classList.add('right-panel-active');
        setIsRightPanelActive(true);
      });
    }
  };

  const handleOverlaySignIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const container = document.getElementById('container');
    if (container) {
      requestAnimationFrame(() => {
        container.classList.remove('right-panel-active');
        setIsRightPanelActive(false);
      });
    }
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        * {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        body {
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          overflow: hidden;
          position: relative;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }

        /* AI/ML Dashboard Theme Variables */
        :root {
          /* Core Colors */
          --ai-cyan: #00f5ff;
          --ai-purple: #a855f7;
          --ai-gold: #fbbf24;
          --success-green: #10b981;
          --error-red: #ef4444;
          --text-light: #ffffff;
          --text-dark: #0f0f23;
        }

        /* AI/ML Dark Theme */
        [data-theme="dark"] {
          --bg-primary: #0f0f23;
          --bg-secondary: #1a1a2e;
          --bg-tertiary: #16213e;
          --text-primary: #ffffff;
          --text-secondary: #00f5ff;
          --text-muted: #94a3b8;
          --border: rgba(0, 245, 255, 0.2);
          --shadow: rgba(0, 245, 255, 0.3);
        }

        /* AI/ML Light Theme */
        [data-theme="light"] {
          --bg-primary: #ffffff;
          --bg-secondary: #f9f9f9;
          --bg-tertiary: #f1f5f9;
          --text-primary: #0f0f23;
          --text-secondary: #00f5ff;
          --text-muted: #64748b;
          --border: rgba(0, 245, 255, 0.3);
          --shadow: rgba(0, 245, 255, 0.2);
        }

        [data-theme="light"] body {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
        }

        [data-theme="light"] body::before {
          background: 
            radial-gradient(circle at 20% 20%, rgba(0, 245, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(251, 191, 36, 0.03) 0%, transparent 50%);
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 9999;
          background: rgba(255, 255, 255, 0.9);
          color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 12px;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none !important;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .back-button:hover {
          background: rgba(30, 30, 30, 0.9);
          color: #ffffff;
          border-color: rgba(30, 30, 30, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          text-decoration: none !important;
        }

        [data-theme="light"] .back-button {
          background: rgba(30, 30, 30, 0.9);
          color: #ffffff;
          border: 1px solid rgba(30, 30, 30, 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        [data-theme="light"] .back-button:hover {
          background: rgba(255, 255, 255, 0.9);
          color: #000000;
          border-color: rgba(255, 255, 255, 0.8);
        }

        .container {
          background: rgba(26, 26, 46, 0.8);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 8px 16px rgba(0, 245, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          width: 800px;
          max-width: 90vw;
          min-height: 480px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        [data-theme="light"] .container {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 245, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }



        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          will-change: transform, opacity, border-radius, filter;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%) scale(0.3) rotateY(180deg);
          border-radius: 50% 20% 80% 30%;
          filter: blur(8px) hue-rotate(90deg);
          opacity: 0;
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%) scale(1) rotateY(0deg);
          border-radius: 0;
          filter: blur(0px) hue-rotate(0deg);
          opacity: 1;
          z-index: 5;
        }

        .sign-in-container {
          border-radius: 0;
          filter: blur(0px) hue-rotate(0deg);
        }

        .sign-up-container {
          border-radius: 50% 20% 80% 30%;
          filter: blur(8px) hue-rotate(90deg);
          transform: scale(0.3) rotateY(180deg);
        }

        form {
          background: transparent;
          display: flex;
          flex-direction: column;
          padding: 32px 40px;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
          transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          transform-style: preserve-3d;
          position: relative;
        }



        h1 {
          font-family: 'Merriweather', 'Lora', serif;
          font-weight: 600;
          margin: 0 0 24px;
          color: var(--text-primary);
          font-size: 1.6rem;
          letter-spacing: -0.01em;
        }

        input {
          background: var(--bg-tertiary);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 12px 16px;
          margin: 6px 0;
          width: 100%;
          max-width: 280px;
          font-size: 13px;
          font-weight: 400;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: var(--text-secondary);
          box-shadow: 0 0 0 2px var(--shadow);
        }

        input::placeholder {
          color: var(--text-muted);
          font-weight: 300;
          font-size: 12px;
        }

        button {
          border-radius: 8px;
          border: none;
          background: linear-gradient(135deg, var(--ai-cyan) 0%, var(--ai-purple) 100%);
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          padding: 12px 32px;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 16px;
          box-shadow: 0 4px 12px rgba(0, 245, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        button:hover::before {
          left: 100%;
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 245, 255, 0.4);
        }

        button.ghost {
          background: rgba(15, 15, 35, 0.9);
          border: 1px solid var(--border);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        button.ghost::before {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        }

        button.ghost:hover {
          background: rgba(15, 15, 35, 1);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 245, 255, 0.3);
        }

        [data-theme="light"] button.ghost {
          background: rgba(15, 15, 35, 0.9);
          color: #ffffff;
          border: 1px solid rgba(0, 245, 255, 0.3);
        }

        [data-theme="light"] button.ghost:hover {
          background: rgba(15, 15, 35, 1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
          will-change: transform;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: linear-gradient(135deg, var(--ai-cyan) 0%, var(--ai-purple) 100%);
          color: #ffffff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(251, 191, 36, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .container.right-panel-active .overlay {
          transform: translateX(50%);
        }

        .overlay-panel {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 32px;
          height: 100%;
          width: 50%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }

        .overlay-left {
          transform: translateX(-20%);
          left: 0;
        }

        .overlay-right {
          right: 0;
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-left {
          transform: translateX(0);
        }

        .container.right-panel-active .overlay-right {
          transform: translateX(20%);
        }

        .overlay h1 {
          color: #ffffff;
          font-family: 'Merriweather', 'Lora', serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .overlay p {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          margin: 16px auto 20px;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          max-width: 280px;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          text-align: center;
        }

        .google-btn {
          background: #ffffff;
          color: #374151;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 12px;
          font-weight: 500;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 12px auto;
          text-transform: none;
          letter-spacing: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: fit-content;
        }

        .google-btn:hover {
          background: #f9fafb;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .google-btn::before {
          display: none;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .floating-icon {
          position: absolute;
          color: rgba(0, 245, 255, 0.3);
          font-size: 24px;
        }

        .neural-network {
          position: absolute;
          width: 200px;
          height: 200px;
          top: 10%;
          right: 5%;
          opacity: 0.1;
        }

        .blockchain-chain {
          position: absolute;
          width: 150px;
          height: 150px;
          bottom: 10%;
          left: 5%;
          opacity: 0.1;
        }

        .ai-brain {
          position: absolute;
          width: 100px;
          height: 100px;
          top: 50%;
          right: 10%;
          opacity: 0.15;
        }

        .social-container {
          margin: 16px 0;
        }

        .social-container a {
          border: 1px solid var(--border);
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 4px;
          height: 32px;
          width: 32px;
          text-decoration: none;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          transition: all 0.3s ease;
          font-size: 12px;
        }

        .social-container a:hover {
          background: var(--text-secondary);
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* Simple Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }

        .popup {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 24px 32px;
          text-align: center;
          color: var(--text-primary);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          min-width: 300px;
          max-width: 400px;
          animation: popupSlideIn 0.3s ease;
        }

        .popup h2 {
          margin: 0 0 16px;
          font-family: 'Merriweather', 'Lora', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .popup p {
          margin: 0;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
          color: var(--text-muted);
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
        }

        .success-options {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
        }

        .success-card {
          background: var(--bg-secondary);
          border: 1px solid var(--success-green);
          border-radius: 12px;
          padding: 32px 40px;
          text-align: center;
          color: var(--text-primary);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          min-width: 360px;
          max-width: 480px;
          animation: successSlideIn 0.4s ease;
        }

        .success-card h2 {
          margin: 0 0 20px;
          font-family: 'Merriweather', 'Lora', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--success-green);
        }

        .success-buttons {
          display: flex;
          gap: 16px;
          margin-top: 24px;
          justify-content: center;
        }

        .success-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-family: 'Inter', 'Roboto', 'Helvetica', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 120px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .logout-btn {
          background: var(--error-red);
          color: white;
        }

        .logout-btn:hover {
          background: #ff6666;
          transform: translateY(-1px);
        }

        .continue-btn {
          background: var(--success-green);
          color: white;
        }

        .continue-btn:hover {
          background: #33ff99;
          transform: translateY(-1px);
        }

        @keyframes popupSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(40px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes successSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .container {
            width: 95%;
            min-height: 420px;
            border-radius: 10px;
          }
          
          form {
            padding: 24px 20px;
          }
          
          .overlay-panel {
            padding: 0 20px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .overlay h1 {
            font-size: 1.6rem;
          }

          .overlay p {
            font-size: 12px;
            max-width: 200px;
          }

          input {
            padding: 10px 14px;
            font-size: 12px;
            max-width: 240px;
          }

          button {
            padding: 10px 24px;
            font-size: 12px;
          }

          .popup, .success-card {
            min-width: 280px;
            padding: 20px 16px;
            border-radius: 10px;
          }

          .popup h2, .success-card h2 {
            font-size: 1.2rem;
          }

          .success-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .success-btn {
            padding: 10px 20px;
            font-size: 12px;
          }

          .back-button {
            top: 16px;
            left: 16px;
            padding: 6px 12px;
            font-size: 11px;
            border-radius: 6px;
          }
        }

        @media (max-width: 480px) {
          .container {
            width: 98%;
            min-height: 380px;
          }

          form {
            padding: 20px 16px;
          }

          h1 {
            font-size: 1.3rem;
          }

          .overlay h1 {
            font-size: 1.4rem;
          }

          input {
            padding: 8px 12px;
            margin: 4px 0;
            max-width: 200px;
          }

          button {
            padding: 8px 20px;
          }

          .popup, .success-card {
            min-width: 260px;
            padding: 16px 12px;
          }
        }
      `}</style>

      <Link href="/" className="back-button">
        ← Back to Home
      </Link>



      <div className="container" id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignUpSubmit}>
            <h1>Start Your Reskilling Journey</h1>

            {errors.general && <div style={{color: '#ef4444', marginBottom: '10px', fontSize: '14px'}}>{errors.general}</div>}
            <input 
              type="text" 
              placeholder="Full Name" 
              value={signUpData.fullName}
              onChange={(e) => setSignUpData({...signUpData, fullName: e.target.value})}
            />
            {errors.fullName && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.fullName}</div>}
            <input 
              type="email" 
              placeholder="Email" 
              value={signUpData.email}
              onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
            />
            {errors.email && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.email}</div>}
            <input 
              type="password" 
              placeholder="Password" 
              value={signUpData.password}
              onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
            />
            {errors.password && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.password}</div>}
            <input 
              type="password" 
              placeholder="Confirm Password" 
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
            />
            {errors.confirmPassword && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.confirmPassword}</div>}
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleSignInSubmit}>
            <h1>Welcome Back</h1>

            {errors.general && <div style={{color: '#ef4444', marginBottom: '10px', fontSize: '14px'}}>{errors.general}</div>}
            <input 
              type="email" 
              placeholder="Email" 
              value={signInData.email}
              onChange={(e) => setSignInData({...signInData, email: e.target.value})}
            />
            {errors.email && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.email}</div>}
            <input 
              type="password" 
              placeholder="Password" 
              value={signInData.password}
              onChange={(e) => setSignInData({...signInData, password: e.target.value})}
            />
            {errors.password && <div style={{color: '#ef4444', fontSize: '12px', marginTop: '-8px'}}>{errors.password}</div>}
            <a href="#" style={{color: 'var(--primary-green)', textDecoration: 'none', margin: '16px 0', fontWeight: 500}}>Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div>
                <h1>Welcome Back!</h1>
                <p>Continue your career transformation journey with AI-powered learning</p>
                <button 
                  className="google-btn"
                  onClick={() => console.log('Google Sign In')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  type="button"
                  className="ghost" 
                  onClick={handleOverlaySignIn}
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="overlay-panel overlay-right">
              <div>
                <h1>Future-Proof Your Career</h1>
                <p>Join the world's first AI-driven reskilling platform with blockchain certifications</p>
                <button 
                  className="google-btn"
                  onClick={() => console.log('Google Sign Up')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button 
                  type="button"
                  className="ghost" 
                  onClick={handleOverlaySignUp}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Messages */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>{popupType === 'success' ? 'Success' : popupType === 'error' ? 'Error' : 'Welcome'}</h2>
              <p>{popupMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Options */}
      {showSuccessOptions && (
        <div className="success-options">
          <div className="success-card">
            <div className="success-content">
              <h2>Login Successful</h2>
              <p>Choose your next action:</p>
              <div className="success-buttons">
                <button className="success-btn logout-btn" onClick={handleLogout}>
                  Logout
                </button>
                <button className="success-btn continue-btn" onClick={handleContinueToAssessment}>
                  Continue to Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}