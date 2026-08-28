import React from 'react';
import { useApp } from '../context/AppContext';

export const Hero = () => {
  const { setAuthModalOpen, setAuthMode, loginWithGoogleProfile } = useApp();

  const handleGoogleClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  return (
    <section style={{
      padding: '2.5rem 0 2rem 0',
      marginBottom: '1rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: '2.5rem',
        alignItems: 'center'
      }} className="hero-split-grid">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          {/* Capsule Pill Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.45rem 1.1rem',
            borderRadius: '9999px',
            background: '#2563eb',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.02em',
            marginBottom: '1.5rem',
            fontFamily: 'monospace, var(--font-sans)',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            Premium Academic Resources
          </div>

          {/* Main Title */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text-main)',
            marginBottom: '1.25rem',
            letterSpacing: '-0.025em',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Your Gateway to<br />
            Academic Excellence
          </h1>

          {/* Subtitle Body Text */}
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '2rem',
            maxWidth: '500px'
          }}>
            Access meticulously curated study materials, interactive notes, and comprehensive guides designed for Class 10 and 12 students aiming for top-tier results.
          </p>

          {/* Google Auth Button */}
          <button
            onClick={handleGoogleClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              border: '1px solid rgba(203, 213, 225, 0.8)',
              background: '#ffffff',
              color: '#1e293b',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
              fontFamily: 'monospace, var(--font-sans)'
            }}
            className="hover-lift"
          >
            {/* Google Icon */}
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Right Showcase Image Column */}
        <div style={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--border-color)',
          maxHeight: '380px'
        }}>
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80"
            alt="Modern University Library Study Room"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
};
