import React from 'react';
import { AdBanner } from './AdBanner';
import { Mail, MessageSquare, Clock, ShieldCheck, MapPin } from 'lucide-react';

export const ContactView = () => {
  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginBottom: '0.5rem',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Have a question about our study materials or need assistance? Reach out to our administrative team directly.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        
        {/* Card 1: Email Support */}
        <div style={{
          padding: '1.75rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.12)',
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Mail size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: '0.4rem' }}>
            Email Support
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: 600, marginBottom: '0.6rem' }}>
            alphabatch108@gmail.com
          </p>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Send us an email for general inquiries, feedback, or content verification requests.
          </p>
        </div>

        {/* Card 2: Educator Submissions */}
        <div style={{
          padding: '1.75rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <MessageSquare size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: '0.4rem' }}>
            Teacher Submissions
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: 600, marginBottom: '0.6rem' }}>
            alphabatch108@gmail.com
          </p>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Are you an educator wanting to contribute notes or sample papers? Contact our academic department.
          </p>
        </div>

        {/* Card 3: Response Time & Working Hours */}
        <div style={{
          padding: '1.75rem',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            color: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Clock size={22} />
          </div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", marginBottom: '0.4rem' }}>
            Response Time
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.6rem' }}>
            24 – 48 Business Hours
          </p>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Our support desk is active Monday to Saturday, 9:00 AM – 6:00 PM IST.
          </p>
        </div>

      </div>

      {/* Office & Policy Banner */}
      <div style={{
        padding: '1.75rem 2rem',
        borderRadius: '16px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
              Official Administrative Office
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: 0 }}>
              Alpha Arts Free Academic Portal • Educational Support Desk
            </p>
          </div>
        </div>

        <span className="badge badge-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
          Verified Portal
        </span>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="footer" type="728x90" label="Advertisement Banner (728x90)" />

    </div>
  );
};
