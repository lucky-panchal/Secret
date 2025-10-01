'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

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
    router.push('/profile');
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signUpData.fullName) newErrors.fullName = 'Full name is required';
    if (!signUpData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(signUpData.email)) newErrors.email = 'Invalid email format';
    if (!signUpData.password) newErrors.password = 'Password is required';
    else if (signUpData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!signUpData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (signUpData.password !== signUpData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('userData', JSON.stringify(signUpData));
      setPopupType('success');
      setPopupMessage('Account created successfully! You can now sign in.');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsRightPanelActive(false);
        document.getElementById('container').classList.remove('right-panel-active');
      }, 2000);
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const storedUser = JSON.parse(localStorage.getItem('userData'));

    if (!signInData.email) newErrors.email = 'Email is required';
    if (!signInData.password) newErrors.password = 'Password is required';

    if (!storedUser) {
      newErrors.general = 'You must sign up first.';
    } else if (storedUser.email !== signInData.email || storedUser.password !== signInData.password) {
      newErrors.general = 'Invalid email or password.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem('currentUser', JSON.stringify({ email: signInData.email, fullName: storedUser.fullName }));
      setPopupType('signin-success');
      setPopupMessage(`Welcome back, ${storedUser.fullName}!`);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        setShowSuccessOptions(true);
      }, 2000);
    }
  };

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

        /* AI/ML Blockchain Theme Variables */
        :root {
          /* Core AI/ML Colors */
          --ai-cyan: #00D4FF;
          --ml-purple: #A855F7;
          --blockchain-gold: #FBBF24;
          --quantum-violet: #8B5CF6;
          --neural-pink: #EC4899;
          --data-emerald: #10B981;
          --tech-blue: #3B82F6;
          
          /* Simple Gradients */
          --gradient-primary: linear-gradient(135deg, #00D4FF 0%, #A855F7 100%);
          --gradient-secondary: linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%);
        }

        /* Dark Mode AI/ML Theme */
        [data-theme="dark"] {
          --bg-primary: #0f172a;
          --bg-secondary: #1e293b;
          --bg-tertiary: #334155;
          --text-primary: #f8fafc;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --border: rgba(0, 212, 255, 0.3);
          --border-light: rgba(0, 212, 255, 0.1);
        }

        /* Light Mode AI/ML Theme */
        [data-theme="light"] {
          --bg-primary: #ffffff;
          --bg-secondary: #f8fafc;
          --bg-tertiary: #f1f5f9;
          --text-primary: #0f172a;
          --text-secondary: #334155;
          --text-muted: #64748b;
          --border: rgba(0, 153, 204, 0.3);
          --border-light: rgba(0, 153, 204, 0.1);
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
          pointer-events: none;
          z-index: -1;
        }

        [data-theme="light"] body::before {
          background: 
            radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.02) 0%, transparent 50%);
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
          background: rgba(0, 212, 255, 0.1);
          border-color: var(--ai-cyan);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
        }

        [data-theme="light"] .back-button {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid var(--border);
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
          border: 1px solid var(--border);
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
          border: 2px solid var(--border);
        }

        input:focus {
          outline: none;
          border-color: var(--ai-cyan);
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transform: translateY(-2px);
        }

        input::placeholder {
          color: var(--text-muted);
        }

        button {
          border-radius: 12px;
          border: none;
          background: var(--gradient-primary);
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
          background: rgba(0, 212, 255, 0.1);
          border-color: var(--ai-cyan);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
        }

        [data-theme="light"] button.ghost {
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid var(--border);
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
          background: var(--gradient-primary);
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
          background: rgba(0, 212, 255, 0.1);
          border-color: var(--ai-cyan);
          color: var(--text-primary);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 212, 255, 0.15);
        }

        [data-theme="light"] .social-container a {
          background: rgba(248, 250, 252, 0.8);
          border: 1px solid var(--border);
        }

        /* AI/ML Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          backdrop-filter: blur(10px);
        }

        .popup {
          background: var(--gradient-primary);
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          color: white;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          min-width: 350px;
          animation: popupSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .popup::before {
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

        .popup-content {
          position: relative;
          z-index: 1;
        }

        .popup h2 {
          margin: 0 0 20px;
          font-size: 1.8rem;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .popup p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.5;
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
          backdrop-filter: blur(15px);
        }

        .success-card {
          background: var(--gradient-primary);
          border-radius: 25px;
          padding: 50px;
          text-align: center;
          color: white;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
          border: 3px solid rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          min-width: 400px;
          animation: successSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .success-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .success-content {
          position: relative;
          z-index: 1;
        }

        .success-card h2 {
          margin: 0 0 30px;
          font-size: 2.2rem;
          font-weight: 800;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
          color: white;
        }

        .success-buttons {
          display: flex;
          gap: 20px;
          margin-top: 30px;
          justify-content: center;
        }

        .success-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .continue-btn {
          background: rgba(255, 255, 255, 0.9);
          color: var(--ai-cyan);
          border: 2px solid rgba(255, 255, 255, 0.9);
        }

        .continue-btn:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes successSlideIn {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(100px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
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

          .popup, .success-card {
            min-width: 300px;
            padding: 30px;
          }

          .success-buttons {
            flex-direction: column;
            gap: 15px;
          }

          .back-button {
            padding: 10px 20px;
            font-size: 14px;
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
            <button type="submit" onClick={handleSignUpSubmit}>Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>

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
            <a href="#" style={{color: 'var(--ai-cyan)', textDecoration: 'none', margin: '16px 0', fontWeight: 500}}>Forgot your password?</a>
            <button type="submit" onClick={handleSignInSubmit}>Sign In</button>
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

      {/* Popup Messages */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>{popupType === 'success' ? '🎉 Success!' : '✨ Welcome!'}</h2>
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
              <h2>🚀 Login Successful!</h2>
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