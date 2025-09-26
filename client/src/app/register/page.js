'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Register() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const handleSignUp = () => {
      container.classList.add('right-panel-active');
      setIsRightPanelActive(true);
    };

    const handleSignIn = () => {
      container.classList.remove('right-panel-active');
      setIsRightPanelActive(false);
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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

        * {
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          overflow: hidden;
        }

        .back-button {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .container {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.22);
          width: 900px;
          max-width: 100%;
          min-height: 600px;
          position: relative;
          overflow: hidden;
        }

        .form-container {
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
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
          animation: show 0.6s;
        }

        @keyframes show {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }

        form {
          background: #fff;
          display: flex;
          flex-direction: column;
          padding: 0 50px;
          justify-content: center;
          align-items: center;
          height: 100%;
          text-align: center;
        }

        h1 {
          font-weight: 800;
          margin: 0 0 30px;
          color: #333;
          font-size: 2rem;
        }

        input {
          background: #f6f5f7;
          border: none;
          border-radius: 25px;
          padding: 15px 20px;
          margin: 10px 0;
          width: 100%;
          font-size: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        input:focus {
          outline: none;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }

        button {
          border-radius: 25px;
          border: 1px solid #667eea;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          padding: 15px 50px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        button.ghost {
          background: transparent;
          border: 2px solid #fff;
          color: #fff;
        }

        button.ghost:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .overlay-container {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: transform 0.6s ease-in-out;
          z-index: 100;
        }

        .container.right-panel-active .overlay-container {
          transform: translateX(-100%);
        }

        .overlay {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 0 0;
          color: #fff;
          position: relative;
          left: -100%;
          height: 100%;
          width: 200%;
          transform: translateX(0);
          transition: transform 0.6s ease-in-out;
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
          transition: transform 0.6s ease-in-out;
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
          color: #fff;
          font-size: 2.5rem;
          margin-bottom: 20px;
        }

        .overlay p {
          font-size: 16px;
          font-weight: 300;
          line-height: 1.6;
          margin: 20px 0 30px;
          opacity: 0.9;
        }

        .social-container {
          margin: 20px 0;
        }

        .social-container a {
          border: 1px solid #ddd;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 40px;
          width: 40px;
          text-decoration: none;
          color: #333;
          transition: all 0.3s ease;
        }

        .social-container a:hover {
          background: #667eea;
          color: #fff;
          transform: translateY(-2px);
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
            <div className="social-container">
              <a href="#" className="social">📧</a>
              <a href="#" className="social">📱</a>
              <a href="#" className="social">🔗</a>
            </div>
            <span>or use your email for registration</span>
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
            <div className="social-container">
              <a href="#" className="social">📧</a>
              <a href="#" className="social">📱</a>
              <a href="#" className="social">🔗</a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
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
    </>
  );
}