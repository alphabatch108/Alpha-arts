import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { INITIAL_CLASSES } from './data/mockData';
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

  // Dynamically populate available subjects from INITIAL_CLASSES and uploaded PDFs
  const availableSubjects = React.useMemo(() => {
    const subjectsSet = new Set([
      'History',
      'Political Science',
      'Geography',
      'Economics',
      'Psychology',
      'Science',
      'Mathematics',
      'Social Science',
      'English',
      'Hindi',
      'Information Technology (IT)',
      'Computer Science',
      'Physical Education',
      'Sanskrit'
    ]);
    (INITIAL_CLASSES || []).forEach(cls => {
      cls.subjects?.forEach(subj => {
        if (subj && subj.name) subjectsSet.add(subj.name);
      });
    });
    (pdfs || []).forEach(pdf => {
      if (pdf && pdf.subject) subjectsSet.add(pdf.subject);
    });
    return Array.from(subjectsSet).sort();
  }, [pdfs]);

  const currentSelectClass = React.useMemo(() => {
    if (!selectedClass || selectedClass === 'all') return 'all';
    if (selectedClass === 'class-12' || selectedClass === 'class-12-arts') return 'class-12-arts';
    if (selectedClass === 'class-10' || selectedClass === 'class-10-board') return 'class-10';
    if (selectedClass === 'class-11' || selectedClass === 'class-11-arts') return 'class-11';
    return selectedClass;
  }, [selectedClass]);

  const currentSelectSubject = React.useMemo(() => {
    if (!selectedSubject || selectedSubject === 'all') return 'all';
    const found = availableSubjects.find(s => {
      if (s === selectedSubject) return true;
      const normalize = (str) => (str || '').toLowerCase()
        .replace(/information technology|it \(information tech\)/g, 'it')
        .replace(/political science|pol sci|polsci/g, 'polsci')
        .replace(/computer science|cs/g, 'cs')
        .replace(/physical education|pe/g, 'pe');
      return normalize(s) === normalize(selectedSubject);
    });
    return found || selectedSubject;
  }, [selectedSubject, availableSubjects]);

  // Robust Filter logic for PDF notes directory
  const filteredPdfs = (pdfs || []).filter(pdf => {
    // 1. Class filter matching
    let matchesClass = selectedClass === 'all';
    if (!matchesClass) {
      const pClass = (pdf.class || '').toLowerCase().trim();
      const sClass = (selectedClass || '').toLowerCase().trim();
      if (pClass === sClass) {
        matchesClass = true;
      } else if ((sClass === 'class-12-arts' || sClass === 'class-12') && (pClass === 'class-12-arts' || pClass === 'class-12')) {
        matchesClass = true;
      } else if ((sClass === 'class-11' || sClass === 'class-11-arts') && (pClass === 'class-11' || pClass === 'class-11-arts')) {
        matchesClass = true;
      } else if (pClass.includes(sClass) || sClass.includes(pClass)) {
        matchesClass = true;
      }
    }

    // 2. Subject filter matching
    let matchesSubject = selectedSubject === 'all';
    if (!matchesSubject) {
      const pSub = (pdf.subject || '').toLowerCase().trim();
      const sSub = (selectedSubject || '').toLowerCase().trim();

      const normalize = (str) => {
        return str
          .replace(/information technology|it/g, 'it')
          .replace(/political science|pol sci|polsci/g, 'polsci')
          .replace(/computer science|cs/g, 'cs')
          .replace(/physical education|pe/g, 'pe')
          .replace(/social science|sst|social studies/g, 'sst')
          .replace(/mathematics|maths|math/g, 'math');
      };

      const normP = normalize(pSub);
      const normS = normalize(sSub);

      if (pSub === sSub || normP === normS) {
        matchesSubject = true;
      } else if (normP.includes(normS) || normS.includes(normP)) {
        matchesSubject = true;
      } else if (pSub.includes(sSub) || sSub.includes(pSub)) {
        matchesSubject = true;
      }
    }

    // 3. Search query matching
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      (pdf.title || '').toLowerCase().includes(query) ||
      (pdf.description || '').toLowerCase().includes(query) ||
      (pdf.subject || '').toLowerCase().includes(query) ||
      (pdf.category || '').toLowerCase().includes(query);

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

                {/* Class Filter Dropdown */}
                <select
                  value={currentSelectClass}
                  onChange={(e) => {
                    const newClass = e.target.value;
                    setSelectedClass(newClass, 'all');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Classes</option>
                  <option value="class-10">Class 10 Board</option>
                  <option value="class-12-arts">Class 12 Arts</option>
                  <option value="class-11">Class 11 Arts</option>
                </select>

                {/* Subject Filter Dropdown */}
                <select
                  value={currentSelectSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Subjects</option>
                  {availableSubjects.map(subj => (
                    <option key={subj} value={subj}>{subj}</option>
                  ))}
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
