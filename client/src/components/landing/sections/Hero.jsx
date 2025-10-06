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
        justifyContent: 'space-between', 
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ color: 'var(--white)', fontFamily: 'Jost', fontWeight: 600, fontSize: '1.2rem' }}>
          Kaushal X
        </div>
        <div style={{ 
          backgroundColor: 'var(--white)', 
          color: 'var(--deep-black)', 
          padding: '0.5rem 1rem', 
          borderRadius: '2rem', 
          fontSize: '0.8rem',
          fontFamily: 'Jost',
          fontWeight: 500,
          textAlign: 'center'
        }}>
          AI Platform #1
        </div>
      </header>

      {/* Main Content */}
      <main className="landing-container">
        <h1 className="landing-title">
          Future-Proof Your<br />
          <span style={{ color: 'var(--secondary-text)' }}>Career</span>
        </h1>
        
        <h2 className="landing-subtitle">
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

      {/* Side Sticky Badge */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: 'var(--white)',
        color: 'var(--deep-black)',
        padding: '2rem 0.5rem',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        fontSize: '0.9rem',
        fontFamily: 'Jost',
        fontWeight: 500,
        borderRadius: '1rem 0 0 1rem',
        zIndex: 10
      }}>
        AI Honors
      </div>

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