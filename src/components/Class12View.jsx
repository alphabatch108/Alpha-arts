import React from 'react';
import { useApp } from '../context/AppContext';
import { AdBanner } from './AdBanner';
import { 
  Languages, 
  BookOpen, 
  Globe2, 
  Landmark, 
  Monitor, 
  Code, 
  Brain, 
  Activity, 
  Calendar, 
  FileText, 
  HelpCircle,
  FileCheck2,
  Download,
  ExternalLink,
  ScrollText,
  TrendingUp
} from 'lucide-react';

export const Class12View = () => {
  const { setActiveTab, setSelectedClass, setSelectedSubject, pdfs, setPdfViewerOpen, setSelectedPdf, setViewingPdf } = useApp();

  const c12Pyqs = (pdfs || []).filter(pdf => pdf.class === 'class-12-arts' && (pdf.category?.includes('PYQ') || pdf.title?.toLowerCase().includes('pyq')));

  const c12ItPdfs = (pdfs || []).filter(pdf => 
    pdf.class === 'class-12-arts' && 
    (pdf.subject?.toLowerCase().includes('it') || pdf.subject?.toLowerCase().includes('information'))
  );

  const c12GeoPdfs = (pdfs || []).filter(pdf => 
    pdf.class === 'class-12-arts' && 
    (pdf.subject?.toLowerCase().includes('geo') || pdf.subject?.toLowerCase().includes('भूगोल'))
  );

  const c12PolPdfs = (pdfs || []).filter(pdf => 
    pdf.class === 'class-12-arts' && 
    (pdf.subject?.toLowerCase().includes('pol') || pdf.subject?.toLowerCase().includes('राजनीति') || pdf.title?.toLowerCase().includes('political'))
  );

  const c12HinPdfs = (pdfs || []).filter(pdf => 
    pdf.class === 'class-12-arts' && 
    (pdf.subject?.toLowerCase().includes('hin') || pdf.subject?.toLowerCase().includes('हिंदी') || pdf.title?.toLowerCase().includes('hindi') || pdf.title?.includes('आरोह'))
  );


  const itDbmsPdf = pdfs.find(p => p.id === 'pdf-c12-it-dbms-30q') || {
    id: 'pdf-c12-it-dbms-30q',
    title: 'Class 12 IT — Database Management System: 30 Most Important 1 Mark Questions',
    description: 'Top 30 expected 1-mark objective questions, MCQs, fill-in-the-blanks, and one-word answers for Class 12 IT (Information Technology) Database Management System (DBMS) CBSE Board Exam.',
    class: 'class-12-arts',
    className: 'Class 12 Arts',
    subject: 'Information Technology (IT)',
    category: 'Top 30 1-Mark Questions',
    fileSize: '3.2 MB',
    pages: 10,
    downloads: 380,
    views: 1120,
    rating: 5.0,
    author: 'Alpha Arts Editorial Team',
    uploadDate: '2026-08-31',
    featured: true,
    fileContentUrl: 'https://drive.google.com/file/d/1X0aU0ckyZtkbVRMUIeKWhH8uaUk8xc3w/view?usp=drive_link',
    driveUrl: 'https://drive.google.com/file/d/1X0aU0ckyZtkbVRMUIeKWhH8uaUk8xc3w/view?usp=drive_link',
    downloadUrl: 'https://drive.google.com/uc?export=download&id=1X0aU0ckyZtkbVRMUIeKWhH8uaUk8xc3w'
  };

  const handleSubjectClick = (subjName) => {
    setActiveTab('notes', 'class-12-arts', subjName);
  };

  const c12Subjects = [
    {
      id: 'his',
      name: 'History',
      desc: 'Themes in Indian History Parts I, II & III with timeline & maps.',
      icon: ScrollText
    },
    {
      id: 'pol',
      name: 'Political Science',
      desc: 'Contemporary World Politics and Politics in India.',
      icon: Landmark
    },
    {
      id: 'geo',
      name: 'Geography',
      desc: 'Human Geography and India: People and Economy.',
      icon: Globe2
    },
    {
      id: 'eco',
      name: 'Economics',
      desc: 'Introductory Macroeconomics and Indian Economic Development.',
      icon: TrendingUp
    },
    {
      id: 'hin',
      name: 'Hindi',
      desc: 'Vitan, Aroh, Antra, and Antral detailed study materials.',
      icon: Languages
    },
    {
      id: 'eng',
      name: 'English',
      desc: 'Flamingo and Vistas chapters, summaries, and grammar.',
      icon: BookOpen
    },
    {
      id: 'psy',
      name: 'Psychology',
      desc: 'Understanding human behavior, cognition, and emotions.',
      icon: Brain
    },
    {
      id: 'it',
      name: 'Information Technology (IT)',
      desc: 'Database management, web applications, and security.',
      icon: Monitor
    },
    {
      id: 'cs',
      name: 'Computer Science',
      desc: 'Python programming, networking, and SQL basics.',
      icon: Code
    },
    {
      id: 'pe',
      name: 'Physical Education',
      desc: 'Sports management, physiology, and training methods.',
      icon: Activity
    }
  ];

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '1rem'
      }}>
        <span 
          onClick={() => { setSelectedClass('all'); setActiveTab('home'); }} 
          style={{ cursor: 'pointer' }}
          className="hover-lift"
        >
          Home
        </span>
        <span>&gt;</span>
        <span style={{ color: '#2563eb', fontWeight: 600 }}>Class 12</span>
      </div>

      {/* Page Heading & Subtitle */}
      <h1 style={{
        fontSize: 'clamp(2rem, 4vw, 2.75rem)',
        fontWeight: 800,
        color: 'var(--text-main)',
        marginBottom: '0.5rem',
        fontFamily: "'Outfit', sans-serif"
      }}>
        Class 12 Subjects
      </h1>
      <p style={{
        fontSize: '0.925rem',
        color: 'var(--text-muted)',
        maxWidth: '750px',
        lineHeight: 1.6,
        marginBottom: '1.5rem'
      }}>
        Comprehensive study materials, notes, and resources for Class 12 Arts stream.
      </p>

      {/* Top Banner in Main Area */}
      <AdBanner slot="homepageBanner" type="728x90" label="Advertisement (728x90)" />

      {/* 2-Column Main Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1.1fr)',
        gap: '2rem',
        alignItems: 'start',
        marginTop: '1.5rem'
      }} className="class12-layout-grid">
        
        {/* Main Content Column (Left) */}
        <div>
          {/* Subject Cards Grid (8 cards with uniform blue icons matching Image 4) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '1.25rem',
            marginBottom: '2rem'
          }}>
            {c12Subjects.map((subj) => {
              const IconComp = subj.icon;
              return (
                <div
                  key={subj.id}
                  onClick={() => handleSubjectClick(subj.name)}
                  style={{
                    padding: '1.5rem 1.25rem',
                    borderRadius: '12px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                  }}
                  className="hover-lift"
                >
                  {/* Square Blue Icon Container matching Image 4 */}
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#2563eb',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.15rem'
                  }}>
                    <IconComp size={22} />
                  </div>

                  <h3 style={{
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '0.4rem',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {subj.name}
                  </h3>

                  <p style={{
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    margin: 0
                  }}>
                    {subj.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Middle Banner (Responsive) matching Image 4 */}
          <AdBanner slot="middleBanner" type="responsive" label="Advertisement (Responsive)" />


          {/* Featured Notes Section: Class 12 IT Database Management System (DBMS) 30 1 Mark Questions */}
          <div style={{
            padding: '1.75rem 2rem',
            borderRadius: '16px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            marginTop: '1.5rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-emerald">Featured Resource</span>
              <span className="badge badge-primary" style={{ background: '#0891b2', color: '#fff' }}>IT (Information Tech)</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class 12 • DBMS Topic</span>
            </div>

            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginBottom: '0.5rem',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Class 12 IT — Database Management System: 30 Most Important 1 Mark Questions
            </h3>

            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}>
              Top 30 expected 1-mark objective questions, MCQs, fill-in-the-blanks, and key concepts for Class 12 IT Database Management System (DBMS) CBSE board exam preparation.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem' }}>
              {/* Direct Download Button */}
              <a
                href={itDbmsPdf.downloadUrl || "https://drive.google.com/uc?export=download&id=1X0aU0ckyZtkbVRMUIeKWhH8uaUk8xc3w"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary hover-lift"
                style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', fontSize: '0.875rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0891b2', borderColor: '#0891b2' }}
              >
                <Download size={16} />
                <span>Download PDF</span>
              </a>

              {/* View PDF Modal Button */}
              <button
                onClick={() => setViewingPdf(itDbmsPdf)}
                className="btn btn-secondary hover-lift"
                style={{ padding: '0.65rem 1.4rem', borderRadius: '8px', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <FileText size={16} />
                <span>Preview Notes</span>
              </button>

              {/* Open Google Drive Link Button */}
              <a
                href={itDbmsPdf.fileContentUrl || "https://drive.google.com/file/d/1X0aU0ckyZtkbVRMUIeKWhH8uaUk8xc3w/view?usp=drive_link"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#0891b2',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  marginLeft: '0.5rem'
                }}
                className="hover-lift"
              >
                <span>Open in Google Drive</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Class 12 IT (Information Technology) Dedicated Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 12 IT (Information Technology) Study Materials
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Important question banks, DBMS chapter notes, and objective 1-mark question sets for Class 12 IT board prep.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c12ItPdfs.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '1.35rem',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(8, 145, 178, 0.15)',
                        color: '#0891b2',
                        textTransform: 'uppercase'
                      }}>
                        {pdf.category || 'Important Questions'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {pdf.subject}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      {pdf.title}
                    </h3>

                    <p style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      {pdf.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <button
                      onClick={() => setViewingPdf(pdf)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <FileText size={14} />
                      <span>Preview</span>
                    </button>
                    <a
                      href={pdf.downloadUrl || pdf.fileContentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', textDecoration: 'none', background: '#0891b2', borderColor: '#0891b2', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Class 12 Geography Dedicated Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 12 Geography (भूगोल) Study Materials
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  अध्याय - 1: मानव भूगोल : प्रकृति एवं विषय क्षेत्र, अति लघुउत्तरीय एवं लघुउत्तरीय प्रश्नोत्तर तथा महत्वपूर्ण स्टडी मैटेरियल।
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c12GeoPdfs.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '1.35rem',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(245, 158, 11, 0.15)',
                        color: '#d97706',
                        textTransform: 'uppercase'
                      }}>
                        {pdf.category || 'Short Q&A'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {pdf.subject}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      {pdf.title}
                    </h3>

                    <p style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      {pdf.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <button
                      onClick={() => setViewingPdf(pdf)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <FileText size={14} />
                      <span>Preview</span>
                    </button>
                    <a
                      href={pdf.downloadUrl || pdf.fileContentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', textDecoration: 'none', background: '#d97706', borderColor: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Class 12 Political Science Dedicated Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 12 Political Science (राजनीति विज्ञान) Study Materials
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  अध्याय 1 — द्विध्रुवीयता का अंत, महत्वपूर्ण अति लघुउत्तरीय एवं लघुउत्तरीय प्रश्नोत्तर (Most Important Short Question Answer) तथा बोर्ड परीक्षा नोट्स।
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c12PolPdfs.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '1.35rem',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        color: '#ef4444',
                        textTransform: 'uppercase'
                      }}>
                        {pdf.category || 'Short Q&A'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {pdf.subject}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      {pdf.title}
                    </h3>

                    <p style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      {pdf.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <button
                      onClick={() => setViewingPdf(pdf)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <FileText size={14} />
                      <span>Preview</span>
                    </button>
                    <a
                      href={pdf.downloadUrl || pdf.fileContentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', textDecoration: 'none', background: '#ef4444', borderColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Class 12 Hindi Dedicated Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 12 Hindi (हिंदी) Study Materials
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  आरोह, वितान एवं काव्य खंड के सभी अध्यायों के सारांश, व्याख्या, प्रश्नोत्तर तथा महत्वपूर्ण नोट्स।
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c12HinPdfs.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="glass-card hover-lift"
                  style={{
                    padding: '1.35rem',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.65rem',
                        borderRadius: '9999px',
                        background: 'rgba(249, 115, 22, 0.15)',
                        color: '#f97316',
                        textTransform: 'uppercase'
                      }}>
                        {pdf.category || 'सारांश एवं व्याख्या'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {pdf.subject}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      lineHeight: 1.4,
                      marginBottom: '0.5rem',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      {pdf.title}
                    </h3>

                    <p style={{
                      fontSize: '0.825rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1rem'
                    }}>
                      {pdf.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <button
                      onClick={() => setViewingPdf(pdf)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <FileText size={14} />
                      <span>Preview</span>
                    </button>
                    <a
                      href={pdf.downloadUrl || pdf.fileContentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.825rem', borderRadius: '8px', textDecoration: 'none', background: '#f97316', borderColor: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Class 12 Arts PYQ (Previous Year Question Papers) Section */}
          <section style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  fontFamily: "'Outfit', sans-serif"
                }}>
                  Class 12 Arts PYQs (Previous Year Papers)
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Official CBSE Class 12 Humanities & Arts Previous Year Papers with answer keys.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}>
              {c12Pyqs.length > 0 ? (
                c12Pyqs.map((pdf) => (
                  <div 
                    key={pdf.id}
                    className="glass-card hover-lift"
                    style={{
                      padding: '1.25rem',
                      borderRadius: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '9999px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: '#10b981',
                          textTransform: 'uppercase'
                        }}>
                          PYQ {pdf.year || '2024'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                          {pdf.subject}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: 'var(--text-main)',
                        lineHeight: 1.4,
                        marginBottom: '0.5rem',
                        fontFamily: "'Outfit', sans-serif"
                      }}>
                        {pdf.title}
                      </h3>

                      <p style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        marginBottom: '1rem'
                      }}>
                        {pdf.description}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      paddingTop: '0.85rem',
                      borderTop: '1px solid var(--border-color)'
                    }}>
                      <button
                        onClick={() => { setSelectedPdf(pdf); setPdfViewerOpen(true); }}
                        className="btn btn-primary btn-sm"
                        style={{ flex: 1, padding: '0.45rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px' }}
                      >
                        Preview PYQ
                      </button>
                      <a
                        href={pdf.downloadUrl || pdf.fileContentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', borderRadius: '6px', textDecoration: 'none' }}
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card" style={{ padding: '1.75rem', textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1 / -1' }}>
                  No PYQs uploaded yet for Class 12 Arts. Check back soon!
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Column (Right) */}
        <div>
          {/* Square Ad Banner matching Image 4 */}
          <AdBanner slot="sidebar" type="300x250" label="Advertisement (300x250)" />

          {/* Quick Links Card matching Image 4 */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '12px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            marginTop: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: 'var(--text-main)',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-color)',
              fontFamily: "'Outfit', sans-serif"
            }}>
              Quick Links
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <button
                onClick={() => { setSelectedClass('class-12-arts'); setActiveTab('notes'); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  textAlign: 'left',
                  padding: '0.2rem 0'
                }}
                className="hover-lift"
              >
                <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
                <span>Exam Syllabus 2026</span>
              </button>

              <button
                onClick={() => { setSelectedClass('class-12-arts'); setActiveTab('notes'); }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  textAlign: 'left',
                  padding: '0.2rem 0'
                }}
                className="hover-lift"
              >
                <FileText size={16} style={{ color: 'var(--text-muted)' }} />
                <span>Previous Year Papers</span>
              </button>

              <button
                onClick={() => setActiveTab('support')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  textAlign: 'left',
                  padding: '0.2rem 0'
                }}
                className="hover-lift"
              >
                <HelpCircle size={16} style={{ color: 'var(--text-muted)' }} />
                <span>Mock Tests</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .class12-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
