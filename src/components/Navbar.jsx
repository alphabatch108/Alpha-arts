import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlphaArtsIcon } from './AlphaArtsLogo';
import {
  Sun,
  Moon,
  User,
  LogOut,
  ShieldCheck,
  Bot,
  Menu,
  X,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';

export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    activeTab,
    setActiveTab,
    selectedClass,
    setSelectedClass,
    currentUser,
    logoutUser,
    setAuthModalOpen,
    setAuthMode,
    setAiChatbotOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab, classId = null) => {
    setActiveTab(tab, classId || (tab === 'home' ? 'all' : null));
    setMobileMenuOpen(false);
  };

  const isHomeActive = activeTab === 'home' && selectedClass === 'all';
  const isClass10Active = activeTab === 'class-10' || (activeTab === 'classes' && selectedClass === 'class-10');
  const isClass12Active = activeTab === 'class-12' || (activeTab === 'classes' && selectedClass === 'class-12-arts');
  const isAboutActive = activeTab === 'about';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'var(--bg-glass-heavy)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0.85rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', userSelect: 'none' }}
        >
          <AlphaArtsIcon size={32} color="#2563eb" />
          <span style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            fontFamily: "'Outfit', sans-serif"
          }}>
            Alpha Arts
          </span>
        </div>

        {/* Center Navigation Links (Home, Class 10, Class 12, About) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav-links">
          
          {/* Home */}
          <button
            onClick={() => handleNavClick('home')}
            style={{
              background: 'transparent',
              border: 'none',
              color: isHomeActive ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: isHomeActive ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.4rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <span>Home</span>
            {isHomeActive && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px'
              }} />
            )}
          </button>

          {/* Class 10 */}
          <button
            onClick={() => handleNavClick('class-10', 'class-10')}
            style={{
              background: 'transparent',
              border: 'none',
              color: isClass10Active ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: isClass10Active ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.4rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <span>Class 10</span>
            {isClass10Active && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px'
              }} />
            )}
          </button>

          {/* Class 12 */}
          <button
            onClick={() => handleNavClick('class-12', 'class-12-arts')}
            style={{
              background: 'transparent',
              border: 'none',
              color: isClass12Active ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: isClass12Active ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.4rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <span>Class 12</span>
            {isClass12Active && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px'
              }} />
            )}
          </button>

          {/* About */}
          <button
            onClick={() => handleNavClick('about')}
            style={{
              background: 'transparent',
              border: 'none',
              color: isAboutActive ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: isAboutActive ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.4rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <span>About</span>
            {isAboutActive && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px'
              }} />
            )}
          </button>

          {/* All PDF Directory Link */}
          <button
            onClick={() => handleNavClick('notes')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'notes' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'notes' ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.4rem 0',
              transition: 'color 0.2s ease'
            }}
          >
            <span>All Notes</span>
            {activeTab === 'notes' && (
              <span style={{
                position: 'absolute',
                bottom: -2,
                left: 0,
                right: 0,
                height: '2px',
                background: '#2563eb',
                borderRadius: '2px'
              }} />
            )}
          </button>
        </nav>

        {/* Action Controls & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          {/* AI Helper Button */}
          <button
            onClick={() => setAiChatbotOpen(true)}
            title="AI Study Companion"
            className="btn btn-secondary btn-sm hide-on-mobile"
            style={{ borderRadius: '9999px', gap: '0.35rem', padding: '0.45rem 0.85rem' }}
          >
            <Bot size={16} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>AI Help</span>
          </button>

          {/* Sun / Moon Theme Toggle Icon */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle theme"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            className="hover-lift"
          >
            {theme === 'dark' ? (
              <Sun size={18} style={{ color: '#fbbf24' }} />
            ) : (
              <Moon size={18} style={{ color: '#2563eb' }} />
            )}
          </button>

          {/* Auth Button or User Profile */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '9999px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <User size={16} style={{ color: '#2563eb' }} />
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="hide-on-mobile">
                  {currentUser.name}
                </span>
              </button>

              <button
                onClick={logoutUser}
                title="Logout"
                style={{
                  padding: '0.45rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'rgba(244, 63, 94, 0.1)',
                  color: 'var(--accent-rose)',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '9999px', padding: '0.45rem 1rem' }}
            >
              <User size={15} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-hamburger"
            style={{
              display: 'flex',
              padding: '0.45rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-main)',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="glass-panel animate-fade-in-up" style={{
          padding: '1.25rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => handleNavClick('home')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'flex-start' }}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('class-10', 'class-10')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'flex-start' }}
          >
            Class 10
          </button>
          <button
            onClick={() => handleNavClick('class-12', 'class-12-arts')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'flex-start' }}
          >
            Class 12
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'flex-start' }}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('notes')}
            className="btn btn-secondary btn-sm"
            style={{ justifyContent: 'flex-start' }}
          >
            All Notes & PDFs
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
