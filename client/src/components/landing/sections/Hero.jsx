'use client';
import { useRouter } from 'next/navigation';
import '../../../styles/landing-color-scheme.css';

const Hero = () => {
  const router = useRouter();

  return (
    <div style={{ backgroundColor: 'var(--deep-black)', minHeight: '100vh', position: 'relative' }}>
      {/* Header */}
      <header style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        padding: '2rem 5vw', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 10
      }}>


      </header>

      {/* Main Content */}
      <main className="landing-container">
        <div style={{ 
          color: 'var(--primary-text)', 
          fontFamily: 'Oswald', 
          fontWeight: 700, 
          fontSize: '4rem',
          letterSpacing: '0.1em',
          marginBottom: '1rem', marginTop: '-2rem',
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
          Join the world's first AI-driven reskilling platform. Transform from vulnerable to future-proof with personalized learning paths, blockchain certifications, and guaranteed job placement.
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
      </main>



      {/* Bottom Navigation */}
      <nav style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          width: '24px',
          height: '24px'
        }}>
          {[...Array(9)].map((_, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--secondary-text)',
              width: '6px',
              height: '6px',
              borderRadius: '1px'
            }}></div>
          ))}
        </div>
        <a href="#" style={{ color: 'var(--secondary-text)', textDecoration: 'none', fontFamily: 'Jost', fontSize: '0.9rem' }}>Brand</a>
        <a href="#" style={{ color: 'var(--secondary-text)', textDecoration: 'none', fontFamily: 'Jost', fontSize: '0.9rem' }}>Product</a>
        <a href="#" style={{ color: 'var(--secondary-text)', textDecoration: 'none', fontFamily: 'Jost', fontSize: '0.9rem' }}>Partner</a>
      </nav>
    </div>
  );
};

export default Hero;