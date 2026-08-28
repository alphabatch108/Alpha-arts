import React from 'react';
import { AdBanner } from './AdBanner';
import { ShieldCheck, Mail, Lock, BookOpen } from 'lucide-react';

export const PrivacyPolicyView = () => {
  return (
    <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem 0' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.9rem',
          borderRadius: '9999px',
          background: 'rgba(37, 99, 235, 0.1)',
          color: '#2563eb',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          <ShieldCheck size={16} />
          <span>Privacy & Data Governance</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 800,
          color: 'var(--text-main)',
          marginBottom: '0.5rem',
          fontFamily: "'Outfit', sans-serif"
        }}>
          Privacy Policy
        </h1>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Last Updated: October 24, 2023
        </p>
      </div>

      {/* Main Glass Content Box */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        borderRadius: '20px',
        marginBottom: '2.5rem',
        border: '1px solid var(--border-color)',
        lineHeight: 1.75
      }}>
        
        {/* Intro */}
        <p style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: 500, marginBottom: '2rem' }}>
          Welcome to Alpha Arts. This Privacy Policy explains how we handle information when you use our website, which provides educational resources and exam-preparation materials for Class 10 and Class 12 students.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Section 1 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              1. Information We Collect
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Our website provides Google Sign-In as the only login option.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              When you sign in using Google, Google may provide us with basic account information such as your name, email address, and profile information, depending on the permissions associated with the Google Sign-In service.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              We do not intentionally collect or store unnecessary personal information from users.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              2. How We Use Information
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Any information received through Google Sign-In is used only for purposes such as:
            </p>
            <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.5rem', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Allowing you to log in to the website.</li>
              <li>Maintaining your account/session.</li>
              <li>Providing access to website features and educational content.</li>
              <li>Improving the functionality and security of the website.</li>
            </ul>
            <p style={{ color: 'var(--text-muted)' }}>
              We do not use your personal information for purposes unrelated to providing our website services.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              3. We Do Not Sell Your Personal Information
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              We do not sell, rent, or trade your personal information to other companies or organizations.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              We do not intentionally share your personal information with third parties for their own marketing or advertising purposes.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              4. Educational Content
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Alpha Arts provides educational and exam-preparation resources for Class 10 and Class 12 students, including notes, study materials, and other educational content.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              The website is intended to help students with their studies and examination preparation.
            </p>
          </section>

          {/* Section 5 Callout Box */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            background: 'rgba(37, 99, 235, 0.08)',
            border: '1px solid rgba(37, 99, 235, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2563eb', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif", display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lock size={18} />
              5. Google Sign-In
            </h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Our website uses Google's authentication services to allow users to sign in.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Your use of Google Sign-In is also subject to Google's own privacy policies and terms. We recommend reviewing Google's privacy practices to understand how Google handles information associated with your Google Account.
            </p>
          </div>

          {/* Section 6 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              6. Cookies and Similar Technologies
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              The website may use cookies or similar technologies that are necessary for login, authentication, security, or basic website functionality.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              If advertising or analytics services are added to the website in the future, this Privacy Policy may be updated to explain their use.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              7. Third-Party Services
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Our website may use third-party services to provide certain functionality, such as authentication, hosting, analytics, advertising, or file storage.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              These services may process information according to their own privacy policies. We do not sell your personal information to these services.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              8. Data Security
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              We take reasonable steps to protect information associated with users of our website. However, no website or online service can guarantee complete security of information.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              9. Children's Privacy
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Alpha Arts is an educational website that may be used by school students, including students under the age of 18.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              We do not intentionally collect unnecessary personal information from students. If you believe that a child has provided personal information to us that should not have been provided, please contact us so that we can review and, where appropriate, delete it.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              10. Changes to This Privacy Policy
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              We may update this Privacy Policy from time to time if our website, services, or data practices change.
            </p>
            <p style={{ color: 'var(--text-muted)' }}>
              Any updated version will be posted on this page with a revised Last Updated date.
            </p>
          </section>

          {/* Section 11 & Contact Box */}
          <section style={{
            padding: '1.75rem',
            borderRadius: '14px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.65rem', fontFamily: "'Outfit', sans-serif" }}>
              11. Contact Us
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              If you have questions or concerns about this Privacy Policy or how information is handled on Alpha Arts, please contact us through the contact information provided on the website.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              fontSize: '0.925rem',
              marginBottom: '1rem'
            }}>
              <span>Alpha Arts</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Educational Resources for Class 10 & Class 12 Students
              </span>
            </div>

            <div style={{
              padding: '0.65rem 1.15rem',
              borderRadius: '8px',
              background: 'rgba(37, 99, 235, 0.12)',
              color: '#2563eb',
              fontWeight: 700,
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Mail size={16} />
              <span>Email: alphabatch108@gmail.com</span>
            </div>
          </section>

        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner slot="footer" type="728x90" label="Advertisement Banner (728x90)" />

    </div>
  );
};
