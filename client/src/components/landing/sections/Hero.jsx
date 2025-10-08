'use client';
import { useRouter } from 'next/navigation';
import '../../../styles/landing-color-scheme.css';

const Hero = () => {
  const router = useRouter();

  return (
    <div id="home" style={{ backgroundColor: 'var(--deep-black)', minHeight: '100vh', position: 'relative' }}>
      {/* Main Content - Split Layout */}
      <main style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
        {/* Left Side - Content */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          padding: '0 5vw',
          textAlign: 'center'
        }}>
          <div style={{ 
            color: 'var(--primary-text)', 
            fontFamily: 'Oswald', 
            fontWeight: 700, 
            fontSize: '4rem',
            letterSpacing: 'normal',
            marginBottom: '1rem',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            const shine = document.createElement('div');
            shine.style.cssText = `
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
              animation: shine 0.6s ease-out;
              pointer-events: none;
            `;
            e.target.appendChild(shine);
            setTimeout(() => shine.remove(), 600);
          }}>
            KaushalX
          </div>
          
          <h1 className="landing-title" style={{ fontSize: '2.2rem', opacity: 0.8 }}>
            Future-Proof Your <span style={{ color: 'var(--secondary-text)' }}>Career</span>
          </h1>
          
          <h2 className="landing-subtitle" style={{ opacity: 0.7 }}>
            Join the world's first AI-driven reskilling platform.<br/>
            Transform from vulnerable to future-proof with personalized learning paths,<br/>
            blockchain certifications, and guaranteed job placement.
          </h2>
          
          <div className="landing-cta-container">
            <button 
              className="landing-btn-primary"
              onClick={() => router.push('/register')}
              role="button"
              aria-label="Get Started with AI Career Platform"
            >
              Get Started
            </button>
            <button 
              className="landing-btn-secondary"
              onClick={() => router.push('/demo')}
              role="button"
              aria-label="View Demo"
            >
              Demo
            </button>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh'
        }}>
          <img 
            src="/images/multiskill-bw.png" 
            alt="Multiskill Platform" 
            style={{ 
              width: '80%',
              height: '80vh',
              objectFit: 'contain',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.src = '/images/multiskill.png';
            }}
            onMouseLeave={(e) => {
              e.target.src = '/images/multiskill-bw.png';
            }}
          />
        </div>
        

      </main>
    </div>
  );
};

export default Hero;