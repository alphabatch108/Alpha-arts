import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Download, Eye, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { AdBanner } from './AdBanner';
import confetti from 'canvas-confetti';
import { createNoteDocumentBlob } from '../utils/documentGenerator';

export const PDFViewerModal = () => {
  const { viewingPdf, setViewingPdf, pdfs = [] } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const iframeRef = React.useRef(null);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [viewingPdf]);

  React.useEffect(() => {
    if (!viewingPdf) return;

    // Send GOTO_PAGE event to iframe for multi-page document scrolling
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({ type: 'GOTO_PAGE', page: currentPage }, '*');
      } catch (e) {}
    }
  }, [currentPage, viewingPdf]);

  if (!viewingPdf) return null;

  const totalPages = viewingPdf.pages || 12;

  // Extract Google Drive Embed / Preview URL
  const getEmbedUrl = (pdf) => {
    if (!pdf || !pdf.fileContentUrl) return '';
    const url = pdf.fileContentUrl;
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^\&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
      return url.replace(/\/view(\?.*)?$/, '/preview');
    }
    if (url.startsWith('data:application/pdf') || url.startsWith('http')) {
      return url;
    }
    return '';
  };

  // Extract Google Drive Direct Download URL
  const getDownloadUrl = (pdf) => {
    if (pdf.downloadUrl) return pdf.downloadUrl;
    if (!pdf || !pdf.fileContentUrl) return '';
    const url = pdf.fileContentUrl;
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/file\/d\/([^\/]+)/) || url.match(/id=([^\&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/uc?export=download&id=${match[1]}`;
      }
      return url;
    }
    return url;
  };

  const isDriveUrl = viewingPdf.fileContentUrl && viewingPdf.fileContentUrl.includes('drive.google.com');

  const handleDownload = () => {
    try {
      confetti({ particleCount: 75, spread: 85, origin: { y: 0.6 } });
    } catch (e) {}

    const dlUrl = getDownloadUrl(viewingPdf);

    if (isDriveUrl || (dlUrl && dlUrl.startsWith('http'))) {
      window.open(dlUrl || viewingPdf.fileContentUrl, '_blank');
      return;
    }

    const isDataUri = viewingPdf.fileContentUrl && (viewingPdf.fileContentUrl.startsWith('data:') || viewingPdf.fileContentUrl.startsWith('http'));
    const link = document.createElement('a');
    link.href = isDataUri ? viewingPdf.fileContentUrl : createNoteDocumentBlob(viewingPdf);
    link.target = '_blank';
    link.download = isDataUri ? `${viewingPdf.title.replace(/[^a-zA-Z0-9\s]/g, '')}.pdf` : `${viewingPdf.title.replace(/[^a-zA-Z0-9\s]/g, '')}_Notes.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const relatedPdfs = pdfs
    .filter(p => p.id !== viewingPdf.id && (p.class === viewingPdf.class || p.subject === viewingPdf.subject))
    .slice(0, 3);

  const embedSrc = getEmbedUrl(viewingPdf);

  return (
    <div className="modal-overlay" onClick={() => setViewingPdf(null)}>
      <div 
        className="modal-content glass-panel"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '960px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          padding: '1.15rem 1.5rem',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-primary">{viewingPdf.className}</span>
            <span className="badge badge-emerald">{viewingPdf.subject}</span>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{viewingPdf.category}</span>
          </div>

          <button
            onClick={() => setViewingPdf(null)}
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
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          
          {/* Top PDF Reader Ad Space Banner */}
          <AdBanner slot="pdfPage" style={{ margin: '0 0 1.25rem 0' }} />

          {/* PDF Metadata Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.6rem', lineHeight: 1.3 }}>
              {viewingPdf.title}
            </h2>

            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', marginBottom: '1.15rem', lineHeight: 1.6 }}>
              {viewingPdf.description}
            </p>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.85rem',
              padding: '0.95rem 1.15rem',
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem'
            }}>
              <div>
                Author: <strong style={{ color: 'var(--text-main)' }}>{viewingPdf.author || 'Alpha Arts Academic Team'}</strong> • Uploaded: <strong style={{ color: 'var(--text-main)' }}>{viewingPdf.uploadDate || '2026-08-25'}</strong>
              </div>

              {isDriveUrl && (
                <a
                  href={viewingPdf.fileContentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: '0.825rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  className="hover-lift"
                >
                  <span>Open in Google Drive</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Interactive Document Reader Canvas Container */}
          <div style={{
            background: '#090d16',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Toolbar Top */}
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              color: '#94a3b8',
              borderBottom: '1px solid var(--border-glass)',
              paddingBottom: '0.75rem'
            }}>
              <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={16} style={{ color: '#2563eb' }} />
                <span>PDF Document Reader</span>
              </span>

              {isDriveUrl ? (
                <a
                  href={viewingPdf.fileContentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(37, 99, 235, 0.15)',
                    color: '#2563eb',
                    border: '1px solid rgba(37, 99, 235, 0.3)',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.775rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                  className="hover-lift"
                >
                  <span>Open Full PDF in Drive</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="btn btn-secondary btn-sm hover-lift"
                    style={{ padding: '0.25rem 0.75rem' }}
                  >
                    <ChevronLeft size={14} />
                    Prev
                  </button>

                  <span style={{ fontWeight: 700, color: '#f8fafc' }}>Page {currentPage} of {totalPages}</span>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="btn btn-secondary btn-sm hover-lift"
                    style={{ padding: '0.25rem 0.75rem' }}
                  >
                    Next
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Document Rendered Preview: Real Document Iframe */}
            {embedSrc ? (
              <iframe
                ref={iframeRef}
                src={embedSrc}
                title={viewingPdf.title}
                className="pdf-iframe-viewer"
                style={{
                  width: '100%',
                  height: 'clamp(420px, 65vh, 650px)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                  background: '#ffffff'
                }}
                allow="autoplay; encrypted-media"
              />
            ) : (
              <iframe
                ref={iframeRef}
                srcDoc={createNoteDocumentBlob(viewingPdf)}
                title={viewingPdf.title}
                className="pdf-iframe-viewer"
                style={{
                  width: '100%',
                  height: 'clamp(420px, 65vh, 650px)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                  background: '#ffffff'
                }}
              />
            )}

          </div>

          {/* Action Download Buttons Box */}
          <div className="pdf-download-box" style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.25rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.2rem' }}>
                Download Full PDF Package
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Format: PDF • Includes verified chapter notes and solutions
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={handleDownload}
                className="btn btn-primary hover-lift"
                style={{ padding: '0.7rem 1.6rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Download size={18} />
                <span>Download PDF Notes</span>
              </button>
            </div>
          </div>

          {/* Related PDFs */}
          {relatedPdfs.length > 0 && (
            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
                Related {viewingPdf.className} Notes & Formula Sheets
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {relatedPdfs.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => setViewingPdf(rel)}
                    className="glass-panel hover-lift"
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-glass)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>{rel.subject}</span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', lineHeight: 1.3 }}>
                      {rel.title}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                      {rel.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
