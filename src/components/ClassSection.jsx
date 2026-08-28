import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export const ClassSection = () => {
  const { setSelectedClass, setSelectedSubject, setActiveTab } = useApp();

  const handleClassClick = (targetTab, classId) => {
    setActiveTab(targetTab, classId, 'all');
  };

  return (
    <section style={{ marginBottom: '3rem' }}>
      
      {/* 2-Grid Cards Section Matching Reference Design Image 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem'
      }} className="class-cards-grid">
        
        {/* Class 10 Card */}
        <div 
          onClick={() => handleClassClick('class-10', 'class-10')}
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transition: 'all 0.25s ease',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer'
          }} 
          className="hover-lift"
        >
          
          {/* Blue Icon Graphic Circle with "school" text/symbol */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#2563eb',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            fontWeight: 800,
            fontSize: '0.85rem',
            fontFamily: 'monospace, var(--font-sans)',
            userSelect: 'none'
          }}>
            school
          </div>

          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Class 10
          </h3>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            flex: '1'
          }}>
            Foundation builder. Access core subject notes, previous year papers, and conceptual breakdowns for board exam preparation.
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); handleClassClick('class-10', 'class-10'); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#3b82f6',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 0,
              fontFamily: 'monospace, var(--font-sans)'
            }}
          >
            <span>Explore Resources</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Class 12 Arts Card */}
        <div 
          onClick={() => handleClassClick('class-12', 'class-12-arts')}
          style={{
            padding: '2.5rem 2rem',
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            transition: 'all 0.25s ease',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            cursor: 'pointer'
          }} 
          className="hover-lift"
        >
          
          {/* Teal/Emerald Icon Graphic Circle with "school" text/symbol */}
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#10b981',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            fontWeight: 800,
            fontSize: '0.85rem',
            fontFamily: 'monospace, var(--font-sans)',
            userSelect: 'none'
          }}>
            school
          </div>

          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Class 12 Arts
          </h3>

          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            flex: '1'
          }}>
            Comprehensive curriculum for Arts. Access detailed notes for History, Geography, Political Science, and Sociology designed for board excellence.
          </p>

          <button
            onClick={(e) => { e.stopPropagation(); handleClassClick('class-12', 'class-12-arts'); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#10b981',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: 0,
              fontFamily: 'monospace, var(--font-sans)'
            }}
          >
            <span>Explore Resources</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
};
