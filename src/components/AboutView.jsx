import React from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import { GraduationCap, Award, BookOpen, Target, Users, ShieldCheck, Heart } from 'lucide-react';

export const AboutView = () => {
  const { setActiveTab, setSelectedClass } = useApp();

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 1.1rem',
          borderRadius: '9999px',
          background: 'rgba(37, 99, 235, 0.12)',
          color: '#2563eb',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '1.25rem'
        }}>
          <GraduationCap size={16} />
          <span>About Alpha Arts</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginBottom: '1rem',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Empowering Board Exam Success
        </h1>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          maxWidth: '680px',
          margin: '0 auto',
          lineHeight: 1.65
        }}>
          Alpha Arts is a dedicated educational platform crafting high-yield study materials, comprehensive revision notes, and chapter breakdowns for <strong>Class 10</strong> and <strong>Class 12 Arts</strong> students.
        </p>
      </div>

      {/* Top Banner */}
      <AdBanner slot="homepageBanner" type="728x90" label="Advertisement Banner (728x90)" />

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        margin: '2.5rem 0'
      }}>
        <div style={{
          padding: '2rem 1.5rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)'
        }} className="hover-lift">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.12)',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Target size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>
            NCERT Aligned Content
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Every chapter summary and formula sheet is meticulously aligned with official CBSE and state board guidelines.
          </p>
        </div>

        <div style={{
          padding: '2rem 1.5rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)'
        }} className="hover-lift">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Award size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>
            Excellence & Quality
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Handwritten diagrams, key concept breakdowns, and previous year question banks curated by top educators.
          </p>
        </div>

        <div style={{
          padding: '2rem 1.5rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)'
        }} className="hover-lift">
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}>
            <Heart size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>
            100% Free Access
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            We believe high quality educational resources should be freely accessible to every student nationwide.
          </p>
        </div>
      </div>

      {/* Grade Exploration CTA */}
      <div style={{
        padding: '2.5rem',
        borderRadius: '16px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        margin: '2rem 0'
      }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.75rem', fontFamily: "'Outfit', sans-serif" }}>
          Ready to Start Studying?
        </h2>
        <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Select your academic grade below to explore curated notes and resources.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setSelectedClass('class-10'); setActiveTab('class-10'); }}
            className="btn btn-primary"
            style={{ borderRadius: '8px' }}
          >
            Explore Class 10
          </button>
          <button
            onClick={() => { setSelectedClass('class-12-arts'); setActiveTab('class-12'); }}
            className="btn btn-secondary"
            style={{ borderRadius: '8px' }}
          >
            Explore Class 12 Arts
          </button>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="footer" type="728x90" label="Advertisement Banner (728x90)" />

    </div>
  );
};
