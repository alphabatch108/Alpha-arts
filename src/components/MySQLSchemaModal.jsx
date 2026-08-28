import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Database, Copy, CheckCircle2 } from 'lucide-react';

export const MySQLSchemaModal = () => {
  const { sqlModalOpen, setSqlModalOpen, mysqlSchemaSql } = useApp();
  const [copied, setCopied] = useState(false);

  if (!sqlModalOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(mysqlSchemaSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const tables = [
    { name: 'Users', fields: ['id (INT PK)', 'name (VARCHAR)', 'email (VARCHAR UNIQUE)', 'password (VARCHAR)', 'role (ENUM)', 'blocked (BOOL)', 'created_at'] },
    { name: 'PDFs', fields: ['id (INT PK)', 'title (VARCHAR)', 'description (TEXT)', 'file_url (VARCHAR)', 'thumbnail', 'class', 'subject', 'downloads', 'views', 'created_at'] },
    { name: 'Categories', fields: ['id (INT PK)', 'name (VARCHAR)', 'class (VARCHAR)', 'created_at'] },
    { name: 'Downloads', fields: ['id (INT PK)', 'user_id (FK)', 'pdf_id (FK)', 'timestamp'] },
    { name: 'FAQs', fields: ['id (INT PK)', 'category', 'question (TEXT)', 'answer (TEXT)', 'created_at'] },
    { name: 'YouTube Lectures', fields: ['id (INT PK)', 'title', 'video_url', 'youtube_id', 'subject', 'class', 'created_at'] }
  ];

  return (
    <div className="modal-overlay" onClick={() => setSqlModalOpen(false)}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-amber)'
            }}>
              <Database size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>MySQL Database Planning & Schema</h2>
              <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>MySQL 8.0+ Normalized Relational Schema for Study Hub</span>
            </div>
          </div>

          <button
            onClick={() => setSqlModalOpen(false)}
            className="hover-lift"
            style={{
              background: 'rgba(255,255,255,0.05)',
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

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Top Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.35rem' }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              7 Core Normalized Tables ready for deployment on MySQL / MariaDB backend.
            </div>

            <button
              onClick={handleCopySql}
              className="btn btn-primary btn-sm hover-lift"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              <span>{copied ? 'SQL Copied!' : 'Copy DDL Script'}</span>
            </button>
          </div>

          {/* Table Cards Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.75rem' }}>
            {tables.map((t, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '0.95rem', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-glass)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.925rem', marginBottom: '0.6rem', color: 'var(--primary)' }}>
                  <Table size={16} />
                  <span>{t.name}</span>
                </div>

                <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {t.fields.map((f, fIdx) => (
                    <div key={fIdx}>• {f}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Code Viewer */}
          <div style={{
            background: '#090d16',
            color: '#c9d1d9',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.825rem',
            fontFamily: 'monospace',
            maxHeight: '320px',
            overflowY: 'auto',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            border: '1px solid var(--border-glass)',
            boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.6)'
          }}>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0, lineHeight: 1.55 }}>
              {mysqlSchemaSql}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};

