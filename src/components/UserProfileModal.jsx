import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Calendar, ShieldCheck, User } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const UserProfileModal = () => {
  const { currentUser, updateUserProfile, userDownloads, setActiveTab } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [toastMsg, setToastMsg] = useState(null);

  if (!currentUser) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    const res = updateUserProfile({
      name,
      email,
      avatar
    });
    setToastMsg(res.message);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const myDownloads = userDownloads.filter(d => d.userEmail.toLowerCase() === currentUser.email.toLowerCase());

  return (
    <section style={{ maxWidth: '840px', margin: '0 auto 3rem auto' }} className="animate-fade-in-up">
      
      {/* Profile Page Top Ad Space */}
      <AdBanner slot="sidebar" />

      {/* Top Banner Header */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
          
          {/* Avatar Photo Container */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '2px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-light)'
          }}>
            <User size={40} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{currentUser.name}</h2>
              <span className={`badge ${currentUser.role === 'Student' ? 'badge-primary' : 'badge-emerald'}`}>
                {currentUser.role}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              {currentUser.email}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
              <span><Calendar size={14} style={{ display: 'inline', marginRight: 4, color: 'var(--primary)' }} />Joined: {currentUser.joinDate}</span>
              <span><Download size={14} style={{ display: 'inline', marginRight: 4, color: 'var(--accent-emerald)' }} />Downloads: {currentUser.downloadsCount || myDownloads.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form & Avatar Selector */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.15rem' }}>
          Account Settings & Security
        </h3>

        {toastMsg && (
          <div className="animate-fade-in-up" style={{
            padding: '0.85rem 1.15rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.18)',
            color: 'var(--accent-emerald)',
            border: '1px solid var(--accent-emerald)',
            fontWeight: 700,
            fontSize: '0.875rem',
            marginBottom: '1.25rem'
          }}>
            {toastMsg}
          </div>
        )}

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.15rem' }} className="profile-form-grid">
            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.65rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
              Change Password (Optional)
            </label>
            <input
              type="password"
              placeholder="Leave blank to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                background: 'rgba(15, 23, 42, 0.6)',
                color: 'var(--text-main)',
                fontSize: '0.875rem'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary hover-lift"
            style={{ borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start', padding: '0.75rem 1.75rem' }}
          >
            Save Profile Changes
          </button>
        </form>
      </div>

      {/* Download History Section */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.15rem' }}>
          My Download History ({myDownloads.length})
        </h3>

        {myDownloads.length === 0 ? (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            No PDF downloads recorded yet. Explore our Class 10 and Class 12 Arts notes to download free study files!
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Document Title</th>
                  <th style={{ padding: '0.75rem' }}>Class</th>
                  <th style={{ padding: '0.75rem' }}>Subject</th>
                  <th style={{ padding: '0.75rem' }}>Downloaded On</th>
                </tr>
              </thead>
              <tbody>
                {myDownloads.map(d => (
                  <tr key={d.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>{d.pdfTitle}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-primary">{d.className}</span></td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-emerald">{d.subject}</span></td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>{d.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 650px) {
          .profile-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
