import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExternalLink, Play, Clock, Eye, Search, Tv } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const YouTubeSection = () => {
  const { youtubeLectures, setActiveTab } = useApp();
  const [activeVideo, setActiveVideo] = useState(youtubeLectures[0] || null);
  const [ytSearch, setYtSearch] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  // Keep active video in sync if new lectures are uploaded
  React.useEffect(() => {
    if (!activeVideo && youtubeLectures.length > 0) {
      setActiveVideo(youtubeLectures[0]);
    }
  }, [youtubeLectures, activeVideo]);

  const filteredLectures = youtubeLectures.filter(lecture => {
    const matchesClass = classFilter === 'all' || lecture.class === classFilter;
    const matchesSearch = lecture.title.toLowerCase().includes(ytSearch.toLowerCase()) ||
                          lecture.subject.toLowerCase().includes(ytSearch.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <section style={{ marginBottom: '3rem' }}>
      
      {/* Top Ad Space Banner */}
      <AdBanner slot="sidebar" />

      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-rose)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            <Tv size={16} />
            <span>HD Video Classroom</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.35rem, 3.5vw, 1.75rem)', fontWeight: 800 }}>
            Curated YouTube Lectures & Board Playlists
          </h2>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setClassFilter('all')}
            className={`btn btn-sm ${classFilter === 'all' ? 'btn-primary' : 'btn-secondary'} filter-pill`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            All Lectures
          </button>
          <button
            onClick={() => setClassFilter('class-10')}
            className={`btn btn-sm ${classFilter === 'class-10' ? 'btn-primary' : 'btn-secondary'} filter-pill`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Class 10
          </button>
          <button
            onClick={() => setClassFilter('class-12-arts')}
            className={`btn btn-sm ${classFilter === 'class-12-arts' ? 'btn-primary' : 'btn-secondary'} filter-pill`}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            Class 12 Arts
          </button>
        </div>
      </div>

      {/* Empty State when no videos uploaded yet */}
      {youtubeLectures.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            color: 'var(--accent-rose)'
          }}>
            <Tv size={32} />
          </div>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.5rem' }}>No Video Lectures Uploaded Yet</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Check back soon for new video lectures and board exam playlists.
          </p>
        </div>
      ) : (
        /* Embedded Player + Video Playlist Layout */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: '1.5rem' }} className="yt-grid-layout">
          
          {/* Main Video Screen Box */}
          {activeVideo && (
            <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              {/* Aspect Ratio 16:9 Video Frame */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                marginBottom: '1.25rem'
              }}>
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              </div>

              {/* Video Meta Info */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span className="badge badge-primary">{activeVideo.className}</span>
                  <span className="badge badge-emerald">{activeVideo.subject}</span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                  <span><Clock size={13} style={{ display: 'inline', marginRight: 4 }} />{activeVideo.duration}</span>
                  <span><Eye size={13} style={{ display: 'inline', marginRight: 4 }} />{activeVideo.views} views</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem', lineHeight: 1.35 }}>
                {activeVideo.title}
              </h3>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Channel: <strong style={{ color: 'var(--text-main)' }}>{activeVideo.channel}</strong>
              </p>

              <a
                href={activeVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm hover-lift"
                style={{
                  alignSelf: 'flex-start',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--accent-rose)',
                  borderColor: 'rgba(244, 63, 94, 0.35)'
                }}
              >
                <ExternalLink size={14} />
                <span>Watch on YouTube</span>
              </a>
            </div>
          )}

          {/* Video Playlist Sidebar List */}
          <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                Lecture Playlist ({filteredLectures.length})
              </h3>

              {/* Search Input inside playlist */}
              <div className="search-input-wrapper" style={{ position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search lectures..."
                  value={ytSearch}
                  onChange={(e) => setYtSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem 0.55rem 2.2rem',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-glass)',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: 'var(--text-main)',
                    fontSize: '0.825rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Scrollable Playlist Cards */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', paddingRight: '0.25rem' }}>
              {filteredLectures.map(lec => (
                <div
                  key={lec.id}
                  onClick={() => setActiveVideo(lec)}
                  className="hover-lift"
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: activeVideo?.id === lec.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(23, 32, 54, 0.5)',
                    border: activeVideo?.id === lec.id ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {/* Vector Play Icon Box */}
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(99, 102, 241, 0.2)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}>
                    <Play size={18} fill="currentColor" />
                  </div>

                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <h4 style={{ fontSize: '0.825rem', fontWeight: 700, margin: '0 0 0.2rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {lec.title}
                    </h4>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>{lec.channel}</span>
                    <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{lec.className}</span>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>{lec.subject}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      <style>{`
        .playlist-item:hover {
          background: var(--bg-card-hover) !important;
          border-color: var(--border-glow) !important;
          transform: translateX(3px);
        }
        @media (max-width: 900px) {
          .yt-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

