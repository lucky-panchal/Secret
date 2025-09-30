'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export default function Register() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUp = () => {
      requestAnimationFrame(() => {
        container.classList.add('right-panel-active');
        setIsRightPanelActive(true);
      });
    };

    const handleSignIn = () => {
      requestAnimationFrame(() => {
        container.classList.remove('right-panel-active');
        setIsRightPanelActive(false);
      });
    };

    if (signUpButton && signInButton) {
      signUpButton.addEventListener('click', handleSignUp);
      signInButton.addEventListener('click', handleSignIn);
    }

    return () => {
      if (signUpButton && signInButton) {
        signUpButton.removeEventListener('click', handleSignUp);
        signInButton.removeEventListener('click', handleSignIn);
      }
    };
  }, []);

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        * {
          box-sizing: border-box;
        }

        * {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        body {
          background: var(--background);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* Theme Variables */
        :root {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --border: rgba(148, 163, 184, 0.2);
          --border-light: rgba(148, 163, 184, 0.1);
        }

        [data-theme="light"] {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --text-muted: #64748b;
          --border: rgba(15, 23, 42, 0.2);
          --border-light: rgba(15, 23, 42, 0.1);
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }

        [data-theme="light"] body::before {
          background: 
            radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.03) 0%, transparent 50%);
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border);
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
          display: inline-block;
        }

        .back-button:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .back-button {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(15, 23, 42, 0.1);
        }

        .container {
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          width: 900px;
          max-width: 100%;
          min-height: 600px;
          position: relative;
          overflow: hidden;
        }

        [data-theme="light"] .container {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.1);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
          will-change: transform, opacity;
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
          transform: translateX(100%);
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
        }

        form {
          background: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          padding: 0 50px;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
        }

        [data-theme="light"] form {
          background: rgba(255, 255, 255, 0.95);
        }

        h1 {
          font-weight: 700;
          margin: 0 0 30px;
          color: var(--text-primary);
          font-size: 2rem;
          letter-spacing: -0.025em;
        }

        input {
          background: var(--bg-tertiary);
          border: 2px solid var(--border);
          border-radius: 12px;
          padding: 15px 20px;
          margin: 10px 0;
          width: 100%;
          font-size: 14px;
          color: var(--text-primary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        [data-theme="light"] input {
          background: rgba(248, 250, 252, 0.8);
          border: 2px solid rgba(15, 23, 42, 0.1);
        }

        input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        input::placeholder {
          color: var(--text-muted);
        }

        button {
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          padding: 15px 50px;
          letter-spacing: 0.5px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: none;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        button.ghost {
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          color: var(--text-primary);
          backdrop-filter: blur(20px);
        }

        button.ghost:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] button.ghost {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(15, 23, 42, 0.2);
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #f8fafc;
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
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
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
          padding: 0 40px;
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
          color: #f8fafc;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: -0.025em;
        }

        .overlay p {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          margin: 20px 0 30px;
          color: rgba(248, 250, 252, 0.9);
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid var(--border);
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          text-decoration: none;
          color: var(--text-secondary);
          background: var(--bg-tertiary);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-container a:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366f1;
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }

        [data-theme="light"] .social-container a {
          background: rgba(248, 250, 252, 0.8);
          border: 1px solid rgba(15, 23, 42, 0.1);
        }

        @media (max-width: 768px) {
          .container {
            width: 95%;
            min-height: 500px;
          }
          
          form {
            padding: 0 30px;
          }
          
          .overlay-panel {
            padding: 0 20px;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .overlay h1 {
            font-size: 2rem;
          }
        }
      `}</style>

      <Link href="/" className="back-button">
        ← Back to Home
      </Link>

      <div className="container" id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>

            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>

            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#" style={{color: '#6366f1', textDecoration: 'none', margin: '16px 0', fontWeight: 500}}>Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}