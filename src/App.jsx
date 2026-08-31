import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AlphaArtsIcon } from './components/AlphaArtsLogo';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Hero } from './components/Hero';
import { AdBanner } from './components/AdBanner';
import { ClassSection } from './components/ClassSection';
import { Class10View } from './components/Class10View';
import { Class12View } from './components/Class12View';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { PDFCard } from './components/PDFCard';
import { PDFViewerModal } from './components/PDFViewerModal';
import { SupportSection } from './components/SupportSection';
import { AIChatbotModal } from './components/AIChatbotModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { MySQLSchemaModal } from './components/MySQLSchemaModal';
import { LegalModal } from './components/LegalModal';
import { AdminDashboard } from './components/AdminDashboard';
import { UploadNotesModal } from './components/UploadNotesModal';
import { YouTubeSection } from './components/YouTubeSection';
import {
  Search,
  FileText,
  ShieldCheck
} from 'lucide-react';

const MainAppContent = () => {
  const {
    activeTab,
    setActiveTab,
    selectedClass,
    setSelectedClass,
    selectedSubject,
    setSelectedSubject,
    searchQuery,
    setSearchQuery,
    pdfs,
    currentUser,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [legalModalOpen, setLegalModalOpen] = React.useState(false);
  const [legalSection, setLegalSection] = React.useState('privacy');

  // Filter logic for PDF notes directory
  const filteredPdfs = pdfs.filter(pdf => {
    const matchesClass = selectedClass === 'all' || pdf.class === selectedClass;
    
    let matchesSubject = selectedSubject === 'all';
    if (!matchesSubject) {
      const pSub = (pdf.subject || '').toLowerCase();
      const sSub = (selectedSubject || '').toLowerCase();
      if (pSub === sSub) {
        matchesSubject = true;
      } else if ((pSub.includes('it') || pSub.includes('information')) && (sSub.includes('it') || sSub.includes('information'))) {
        matchesSubject = true;
      }
    }

    const matchesSearch = pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pdf.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <div className="app-container">
      
      {/* Top Header Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* VIEW 1: HOME PAGE (Matches Reference Image 2) */}
        {activeTab === 'home' && (
          <>
            <AdBanner slot="homepageBanner" type="728x90" label="Advertisement Banner (728x90)" />
            <Hero />
            <AdBanner slot="middleBanner" type="728x90" label="Advertisement Banner (728x90)" />
            <ClassSection />
          </>
        )}

        {/* VIEW 2: CLASS 10 PAGE (Matches Reference Image 3) */}
        {(activeTab === 'class-10' || (activeTab === 'classes' && selectedClass === 'class-10')) && (
          <Class10View />
        )}

        {/* VIEW 3: CLASS 12 PAGE (Matches Reference Image 4) */}
        {(activeTab === 'class-12' || (activeTab === 'classes' && selectedClass === 'class-12-arts')) && (
          <Class12View />
        )}

        {/* VIEW 4: PRIVACY POLICY PAGE (Matches Reference Image 5) */}
        {activeTab === 'privacy' && (
          <PrivacyPolicyView />
        )}

        {/* VIEW 5: ABOUT US PAGE */}
        {activeTab === 'about' && (
          <AboutView />
        )}

        {/* VIEW 6: CONTACT US PAGE */}
        {activeTab === 'contact' && (
          <ContactView />
        )}

        {/* VIEW 7: PDF NOTES DIRECTORY PAGE */}
        {activeTab === 'notes' && (
          <section style={{ marginBottom: '2.5rem' }}>
            <AdBanner slot="pdfPage" type="728x90" label="Advertisement Banner (728x90)" />

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem', fontFamily: "'Outfit', sans-serif" }}>
                PDF Notes & Formula Directory
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', maxWidth: '650px', margin: '0 auto', lineHeight: 1.6 }}>
                Browse chapter-wise notes for <strong>Class 10</strong> and <strong>Class 12 Arts</strong> with instant preview and download.
              </p>
            </div>

            {/* Toolbar Search & Filters */}
            <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1fr) auto',
                gap: '0.85rem',
                alignItems: 'center'
              }} className="listing-toolbar-grid">
                
                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by title, subject, chapter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.6rem 0.85rem 0.6rem 2.4rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Class Filter */}
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="all">All Classes</option>
                  <option value="class-10">Class 10 Board</option>
                  <option value="class-12-arts">Class 12 Arts</option>
                </select>

                {/* Subject Filter */}
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="all">All Subjects</option>
                  <option value="History">History</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Geography">Geography</option>
                  <option value="Science">Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Social Science">Social Science</option>
                  <option value="Economics">Economics</option>
                  <option value="Psychology">Psychology</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Information Technology (IT)">IT</option>
                  <option value="Computer Science">Computer Science</option>
                </select>

                {/* Reset Button */}
                <button
                  onClick={() => { setSelectedClass('all'); setSelectedSubject('all'); setSearchQuery(''); }}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* PDF Grid Feed */}
            {filteredPdfs.length === 0 ? (
              <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(37, 99, 235, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem auto',
                  color: '#2563eb'
                }}>
                  <FileText size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  No Notes Found
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Try clearing your search query or choosing another subject filter.
                </p>
                <button onClick={() => { setSelectedClass('all'); setSelectedSubject('all'); setSearchQuery(''); }} className="btn btn-primary btn-sm">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.25rem'
              }} className="pdf-feed-grid">
                {filteredPdfs.map((pdf, idx) => (
                  <React.Fragment key={pdf.id}>
                    <PDFCard pdf={pdf} />
                    {(idx + 1) % 4 === 0 && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <AdBanner slot="interCard" type="responsive" label="Advertisement (Responsive)" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </section>
        )}

        {/* VIEW 8: YOUTUBE LECTURES SECTION */}
        {activeTab === 'youtube' && <YouTubeSection />}

        {/* VIEW 9: SUPPORT & FAQS SECTION */}
        {activeTab === 'support' && <SupportSection />}

        {/* VIEW 10: USER PROFILE PAGE */}
        {activeTab === 'profile' && <UserProfileModal />}

      </main>

      {/* Floating Modals */}
      <PDFViewerModal />
      <AuthModal />
      <AIChatbotModal />
      <UploadNotesModal />
      <LegalModal isOpen={legalModalOpen} onClose={() => setLegalModalOpen(false)} activeSection={legalSection} />

      {/* Footer matching reference design screenshots */}
      <footer style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: '3rem 1rem 2.5rem 1rem',
        marginTop: 'auto',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          
          {/* Brand Link */}
          <div 
            onClick={() => { setActiveTab('home'); setSelectedClass('all'); }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '1.5rem', 
              fontWeight: 800, 
              color: '#3b82f6', 
              cursor: 'pointer', 
              letterSpacing: '-0.02em',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            <AlphaArtsIcon size={32} />
            <span>Alpha Arts</span>
          </div>

          {/* Footer Nav Links matching screenshots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.875rem' }}>
            <span
              onClick={() => setActiveTab('privacy')}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s ease' }}
              className="hover-lift"
            >
              Privacy Policy
            </span>
            <span
              onClick={() => setActiveTab('about')}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s ease' }}
              className="hover-lift"
            >
              About Us
            </span>
            <span
              onClick={() => setActiveTab('contact')}
              style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.2s ease' }}
              className="hover-lift"
            >
              Contact Us
            </span>
          </div>

          {/* Copyright Line */}
          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.5rem' }}>
            © 2026 Alpha Arts. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      <style>{`
        @media (max-width: 900px) {
          .listing-toolbar-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .listing-toolbar-grid {
            grid-template-columns: 1fr !important;
          }
          .pdf-feed-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
