import React from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import { 
  FlaskConical, 
  BookOpen, 
  Languages, 
  Globe2, 
  Monitor, 
  Cpu, 
  Activity 
} from 'lucide-react';

export const Class10View = () => {
  const { setActiveTab, setSelectedClass, setSelectedSubject, pdfs, setPdfViewerOpen, setSelectedPdf } = useApp();

  const c10Pyqs = (pdfs || []).filter(pdf => pdf.class === 'class-10' && (pdf.category?.includes('PYQ') || pdf.title?.toLowerCase().includes('pyq')));

  const handleSubjectClick = (subjName) => {
    setActiveTab('notes', 'class-10', subjName);
  };

  const c10Subjects = [
    {
      id: 'sci',
      name: 'Science',
      desc: 'Physics, Chemistry, and Biology.',
      icon: FlaskConical,
      color: '#0d9488',
      bgColor: '#ccfbf1'
    },
    {
      id: 'eng',
      name: 'English',
      desc: 'Literature, Grammar, and Writing Skills.',
      icon: BookOpen,
      color: '#475569',
      bgColor: '#e2e8f0'
    },
    {
      id: 'hin',
      name: 'Hindi',
      desc: 'Course A & B, Grammar.',
      icon: Languages,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      id: 'sst',
      name: 'Social Science',
      desc: 'History, Geography, Civics, Economics.',
      icon: Globe2,
      color: '#0d9488',
      bgColor: '#ccfbf1'
    },
    {
      id: 'cs',
      name: 'Computer Science',
      desc: 'Programming fundamentals.',
      icon: Monitor,
      color: '#475569',
      bgColor: '#e2e8f0'
    },
    {
      id: 'it',
      name: 'Information Technology (IT)',
      desc: 'Digital literacy and applications.',
      icon: Cpu,
      color: '#3b82f6',
      bgColor: '#dbeafe'
    },
    {
      id: 'pe',
      name: 'Physical Education',
      desc: 'Health, fitness, and sports theory.',
      icon: Activity,
      color: '#0d9488',
      bgColor: '#ccfbf1'
    }
  ];

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <AdBanner slot="homepageBanner" type="728x90" label="Advertisement Banner (728x90)" />

      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '1rem'
      }}>
        <span 
          onClick={() => { setSelectedClass('all'); setActiveTab('home'); }} 
          style={{ cursor: 'pointer' }}
          className="hover-lift"
        >
          Home
        </span>
        <span>&gt;</span>
        <span style={{ color: '#2563eb', fontWeight: 600 }}>Class 10</span>
      </div>

      {/* Page Heading & Subtitle */}
      <h1 style={{
        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 800,
        color: 'var(--text-main)',
        marginBottom: '0.5rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        Class 10 Subjects
      </h1>
      <p style={{
        fontSize: '0.925rem',
        color: 'var(--text-muted)',
        maxWidth: '750px',
        lineHeight: 1.6,
        marginBottom: '2rem'
      }}>
        Explore comprehensive study materials, detailed notes, and past year question papers for all Class 10 subjects. Designed to streamline your academic preparation.
      </p>

      {/* Banner Image matching Image 3 */}
      <div style={{
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        marginBottom: '2.5rem',
        maxHeight: '340px',
        border: '1px solid var(--border-color)'
      }}>
        <img
          src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
          alt="Class 10 Workspace Desk with iPad Notes & Drawing"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* 2-Column Main Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1.15fr)',
        gap: '2rem',
        alignItems: 'start'
      }} className="class10-layout-grid">
        
        {/* Main Content (Left) */}
        <div>
          {/* Subject Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2.5rem'
          }}>
            {c10Subjects.map((subj) => {
              const IconComp = subj.icon;
              return (
                <div
                  key={subj.id}
                  onClick={() => handleSubjectClick(subj.name)}
                  style={{
                    padding: '1.5rem 1.25rem',
                    borderRadius: '12px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                  className="hover-lift"
                >
                  {/* Square Icon Container */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: subj.bgColor,
                    color: subj.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.15rem'
                  }}>
                    <IconComp size={22} />
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {subj.name}
                  </h3>

                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {subj.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Class 10 PYQ (Previous Year Question Papers) Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 10 PYQs (Previous Year Question Papers)
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Official solved CBSE Class 10 Previous Year Papers with marking scheme.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c10Pyqs.length > 0 ? (
                c10Pyqs.map((pdf) => (
                  <div 
                    key={pdf.id}
                    className="glass-card hover-lift"
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          background: 'rgba(37, 99, 235, 0.15)',
                          color: '#2563eb',
                          textTransform: 'uppercase'
                        }}>
                          PYQ {pdf.year || '2024'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {pdf.subject}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        lineHeight: 1.4,
                        marginBottom: '0.5rem',
                        fontFamily: "'Outfit', sans-serif"
                      }}>
                        {pdf.title}
                      </h3>

                      <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        marginBottom: '1rem'
                      }}>
                        {pdf.description}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <button
                        onClick={() => { setSelectedPdf(pdf); setPdfViewerOpen(true); }}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}
                      >
                        Preview PYQ
                      </button>
                      <a
                        href={pdf.downloadUrl || pdf.fileContentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none' }}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
                  No PYQs uploaded yet for Class 10. Check back soon!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar (Right) */}
        <div>
          <AdBanner slot="sidebar" type="300x600" label="Advertisement Placeholder (300x600)" />
        </div>
      </div>

      {/* Bottom Banner */}
      <AdBanner slot="footer" type="728x90" label="Advertisement Banner (728x90)" />

      <style>{`
        @media (max-width: 900px) {
          .class10-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
