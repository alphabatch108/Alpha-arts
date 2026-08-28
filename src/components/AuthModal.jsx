import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Mail, ArrowRight, CheckCircle2, User } from 'lucide-react';

export const AuthModal = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    loginWithGoogleProfile,
    loginUser
  } = useApp();

  const [googleEmailInput, setGoogleEmailInput] = useState('');
  const [googleNameInput, setGoogleNameInput] = useState('');
  const [showCustomEmailStep, setShowCustomEmailStep] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const GOOGLE_CLIENT_ID = (typeof window !== 'undefined' && window.GOOGLE_CLIENT_ID) || import.meta.env.VITE_GOOGLE_CLIENT_ID || '921200467070-djn651tah3a6ai3vbeo820q1oqsd84lh.apps.googleusercontent.com';

  useEffect(() => {
    if (!authModalOpen) {
      setFeedback(null);
      setShowCustomEmailStep(false);
      setGoogleEmailInput('');
      setGoogleNameInput('');
      return;
    }

    // Try rendering GIS button if Google SDK is loaded
    /* global google */
    if (typeof window !== 'undefined' && window.google && window.google.accounts && window.google.accounts.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            if (response && response.credential) {
              const profile = parseJwt(response.credential);
              if (profile && profile.email) {
                const res = loginWithGoogleProfile({
                  name: profile.name || profile.email.split('@')[0],
                  email: profile.email,
                  picture: profile.picture,
                  sub: profile.sub
                });
                if (res && res.message) {
                  setFeedback({ type: 'success', text: res.message });
                  setTimeout(() => {
                    setAuthModalOpen(false);
                  }, 400);
                }
              }
            }
          }
        });
      } catch (e) {}
    }
  }, [authModalOpen]);

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleNativeGoogleGIS = () => {
    setFeedback(null);

    // Try GIS Token Client Flow
    if (typeof window !== 'undefined' && window.google && window.google.accounts && window.google.accounts.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
              fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              })
                .then(res => res.json())
                .then(data => {
                  if (data && data.email) {
                    const res = loginWithGoogleProfile({
                      name: data.name || data.email.split('@')[0],
                      email: data.email,
                      picture: data.picture,
                      sub: data.sub
                    });
                    if (res && res.message) {
                      setFeedback({ type: res.success ? 'success' : 'error', text: res.message });
                      if (res.success) {
                        setTimeout(() => {
                          setAuthModalOpen(false);
                        }, 400);
                      }
                    }
                  }
                })
                .catch(() => {
                  setShowCustomEmailStep(true);
                });
              return;
            }
            setShowCustomEmailStep(true);
          }
        });
        tokenClient.requestAccessToken();
        return;
      } catch (err) {}
    }

    // Show Google Email Sign In Form
    setShowCustomEmailStep(true);
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!googleEmailInput || !googleEmailInput.includes('@')) {
      setFeedback({ type: 'error', text: 'Please enter a valid Google email address.' });
      return;
    }

    const cleanEmail = googleEmailInput.trim().toLowerCase();
    const name = googleNameInput.trim() || cleanEmail.split('@')[0].toUpperCase();

    const res = loginWithGoogleProfile({
      name: cleanEmail === 'karannehra108@gmail.com' ? 'Karan Nehra (Owner)' : name,
      email: cleanEmail,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
      sub: `google-${Date.now()}`
    });

    if (res && res.success) {
      setFeedback({ type: 'success', text: res.message });
      setTimeout(() => {
        setAuthModalOpen(false);
      }, 800);
    } else if (res) {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  const handleQuickProfileSelect = (email, name) => {
    const res = loginWithGoogleProfile({
      name,
      email,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      sub: `google-${Date.now()}`
    });
    if (res && res.success) {
      setAuthModalOpen(false);
    }
  };

  if (!authModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '2rem', textAlign: 'center' }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} style={{ color: '#2563eb' }} />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Google Sign In
            </h2>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="hover-lift"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              borderRadius: '50%',
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

        {/* Feedback Alert */}
        {feedback && (
          <div className="animate-fade-in-up" style={{
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            background: feedback.type === 'error' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            color: feedback.type === 'error' ? 'var(--accent-rose)' : '#10b981',
            border: `1px solid ${feedback.type === 'error' ? 'var(--accent-rose)' : '#10b981'}`,
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <X size={16} />}
            <span>{feedback.text}</span>
          </div>
        )}

        {!showCustomEmailStep ? (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Sign in with your Google Account to download PDF notes, access formula sheets, and save your study progress.
            </p>

            {/* Google Authentication Button */}
            <button
              type="button"
              onClick={handleNativeGoogleGIS}
              className="btn btn-secondary hover-lift"
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '8px',
                gap: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                background: '#ffffff',
                color: '#1f2937',
                border: '1px solid rgba(0, 0, 0, 0.15)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                cursor: 'pointer',
                marginBottom: '1.5rem',
                fontFamily: 'monospace, var(--font-sans)'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

          </>
        ) : (
          /* Custom Google Email Form Step */
          <form onSubmit={handleCustomGoogleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              Enter your Google Account email to complete authentication:
            </p>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Google Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={googleEmailInput}
                  onChange={(e) => setGoogleEmailInput(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Display Name (Optional)
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={googleNameInput}
                  onChange={(e) => setGoogleNameInput(e.target.value)}
                  style={{ paddingLeft: '2.4rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowCustomEmailStep(false)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, borderRadius: '8px' }}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                style={{ flex: 1.5, borderRadius: '8px' }}
              >
                <span>Authenticate</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        )}

        <div style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </div>
      </div>
    </div>
  );
};
