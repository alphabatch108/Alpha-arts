import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const LegalModal = ({ isOpen, onClose, activeSection = 'privacy' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content glass-panel" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '750px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              {activeSection === 'privacy' && 'Privacy Policy & Cookie Disclosure'}
              {activeSection === 'terms' && 'Terms of Service & User Agreement'}
              {activeSection === 'disclaimer' && 'Educational Disclaimer & Copyright Notice'}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
          
          {activeSection === 'privacy' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 700, marginBottom: '0.75rem' }}>
                <CheckCircle2 size={16} />
                <span>Google AdSense Compliant Privacy Disclosure</span>
              </div>

              <p style={{ marginBottom: '1.15rem' }}>
                At <strong>Alpha Arts (Study Hub)</strong>, accessible from our official website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Alpha Arts and how we use it.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                1. Google AdSense & DoubleClick DART Cookies
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>https://policies.google.com/technologies/ads</a>.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                2. Advertising Partners Privacy Policies
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Alpha Arts, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                3. CCPA & GDPR Data Protection Rights
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to request copies of their personal data, request data erasure, or object to processing. If you make a request, we have one month to respond to you.
              </p>
            </div>
          )}

          {activeSection === 'terms' && (
            <div>
              <p style={{ marginBottom: '1.15rem' }}>
                Welcome to <strong>Alpha Arts (Study Hub)</strong>. By accessing or using our website, notes directory, and educational services, you agree to be bound by these Terms of Service.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                1. Free Educational Access
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                All revision notes, formula sheets, sample papers, and mind maps provided on Alpha Arts are 100% free for students, teachers, and self-learners for non-commercial personal study purposes.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                2. Intellectual Property & Fair Use
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                All trademarks, logos, brand names, and educational board names (CBSE, NCERT, ICSE) mentioned belong to their respective owners. Content on Alpha Arts is compiled under fair use guidelines for educational enrichment.
              </p>
            </div>
          )}

          {activeSection === 'disclaimer' && (
            <div>
              <p style={{ marginBottom: '1.15rem' }}>
                The information provided by <strong>Alpha Arts</strong> is for general educational and exam preparation purposes only. All information on the site is provided in good faith.
              </p>

              <h4 style={{ color: 'var(--text-main)', fontSize: '1rem', marginTop: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                Board Examination Disclaimer
              </h4>
              <p style={{ marginBottom: '1.15rem' }}>
                Alpha Arts is an independent educational platform and is not officially affiliated with CBSE, NCERT, or any state educational board. Sample papers and formula sheets are created by experienced educators to aid board exam preparation.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'rgba(15, 23, 42, 0.7)'
        }}>
          <button onClick={onClose} className="btn btn-primary btn-sm">
            Close Disclosures
          </button>
        </div>
      </div>
    </div>
  );
};
