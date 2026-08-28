import React from 'react';
import { useApp } from '../context/AppContext';
import { Download, Eye, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { createNoteDocumentBlob } from '../utils/documentGenerator';

export const PDFCard = ({ pdf }) => {
  const { setViewingPdf, incrementPdfView } = useApp();

  const handlePreview = () => {
    incrementPdfView(pdf.id);
    setViewingPdf(pdf);
  };

  const handleDownload = (e) => {
    e.stopPropagation();

    // Trigger festive celebration confetti effect
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // Fallback
    }

    if (pdf.fileContentUrl && pdf.fileContentUrl.includes('drive.google.com')) {
      window.open(pdf.fileContentUrl, '_blank');
      return;
    }

    // Download exact uploaded PDF file or formatted note document
    const isDataUri = pdf.fileContentUrl && (pdf.fileContentUrl.startsWith('data:') || pdf.fileContentUrl.startsWith('http'));
    const link = document.createElement('a');
    link.href = isDataUri ? pdf.fileContentUrl : createNoteDocumentBlob(pdf);
    link.target = '_blank';
    link.download = isDataUri ? `${pdf.title.replace(/[^a-zA-Z0-9\s]/g, '')}.pdf` : `${pdf.title.replace(/[^a-zA-Z0-9\s]/g, '')}_Notes.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card pdf-card-hover card-shine" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(12, 18, 34, 0.65)',
      border: '1px solid var(--border-glass-bright)'
    }}>
      {/* Sleek Vector Card Header */}
      <div 
        onClick={handlePreview} 
        style={{
          position: 'relative',
          padding: '1.25rem 1.25rem 0.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        {/* Top Badges */}
        <div style={{
          display: 'flex',
          gap: '0.4rem',
          flexWrap: 'wrap',
          zIndex: 2
        }}>
          <span className="badge badge-primary" style={{ background: '#4f46e5', color: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {pdf.className}
          </span>
          <span className="badge badge-emerald" style={{ background: '#059669', color: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.3)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {pdf.subject}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: '1.35rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category Pill */}
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.45rem', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <FileText size={13} />
            <span>{pdf.category || 'Board Notes'} • {pdf.pages} Pages ({pdf.fileSize})</span>
          </div>

          {/* Title */}
          <h3 
            onClick={handlePreview}
            style={{
              fontSize: '1.08rem',
              fontWeight: 800,
              lineHeight: 1.4,
              marginBottom: '0.55rem',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color var(--transition-fast)'
            }}
            className="pdf-card-title"
          >
            {pdf.title}
          </h3>

          {/* Description */}
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            lineHeight: 1.55,
            marginBottom: '1.1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {pdf.description}
          </p>

          {/* Author info */}
          <div style={{ fontSize: '0.785rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
            By <strong style={{ color: 'var(--text-muted)' }}>{pdf.author}</strong>
          </div>
        </div>

        {/* Card Footer: Action Buttons */}
        <div style={{ paddingTop: '0.9rem', borderTop: '1px solid var(--border-glass-bright)' }}>
          {/* Buttons Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '0.5rem' }}>
            <button
              onClick={handlePreview}
              className="btn btn-secondary btn-sm hover-lift"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', padding: '0.5rem 0.6rem' }}
            >
              <Eye size={14} />
              <span>Preview</span>
            </button>

            <button
              onClick={handleDownload}
              className="btn btn-primary btn-sm btn-glow hover-lift"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', gap: '0.35rem', padding: '0.5rem 0.6rem' }}
            >
              <Download size={14} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .glass-card:hover .pdf-card-img {
          transform: scale(1.07);
        }
        .glass-card:hover .card-hover-overlay {
          opacity: 1;
        }
        .pdf-card-title:hover {
          color: var(--accent-cyan) !important;
        }
      `}</style>
    </div>
  );
};


