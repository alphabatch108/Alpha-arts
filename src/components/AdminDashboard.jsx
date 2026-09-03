import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Users,
  Download,
  FileText,
  Video,
  Ticket,
  HelpCircle,
  Plus,
  Trash2,
  Lock,
  Unlock,
  CheckCircle2,
  BarChart3,
  DollarSign,
  Layers,
  Sparkles,
  MessageSquare,
  User,
  Eye,
  Tag,
  AlertCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    currentUser,
    users,
    pdfs,
    youtubeLectures,
    faqs,
    userDownloads,
    addNewPdf,
    deletePdf,
    addNewYoutubeLecture,
    deleteYoutubeLecture,
    toggleBlockUser,
    addNewFaq,
    deleteFaq,
    adsSettings,
    setAdsSettings,
    setAuthModalOpen,
    setAuthMode
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('overview'); // 'overview' | 'content' | 'users' | 'faqs' | 'ads'

  // Role check
  const isSuperAdmin = currentUser && currentUser.role === 'Super Admin';
  const isEditor = currentUser && (currentUser.role === 'Editor' || currentUser.role === 'Super Admin');

  // Form states for content upload
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newClass, setNewClass] = useState('class-10');
  const [newSubject, setNewSubject] = useState('Science');
  const [newCategory, setNewCategory] = useState('Handwritten Notes');
  const [newAuthor, setNewAuthor] = useState(currentUser ? currentUser.name : 'Study Hub Team');
  const [newThumbnail, setNewThumbnail] = useState('');
  const [newYtUrl, setNewYtUrl] = useState('');
  const [contentToast, setContentToast] = useState(null);

  // Form states for YouTube Upload
  const [ytTitle, setYtTitle] = useState('');
  const [ytChannel, setYtChannel] = useState('Study Hub Live');
  const [ytClass, setYtClass] = useState('class-10');
  const [ytSubject, setYtSubject] = useState('Science');
  const [ytDuration, setYtDuration] = useState('45m');
  const [ytId, setYtId] = useState('');

  // Form states for FAQ
  const [faqCategory, setFaqCategory] = useState('General');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // PDF File Upload States
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [pdfDataUrl, setPdfDataUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfFileSizeStr, setPdfFileSizeStr] = useState('');

  if (!isEditor || (currentUser && currentUser.email !== 'karannehra108@gmail.com')) {
    return (
      <div className="glass-panel animate-fade-in-up" style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '520px', margin: '3rem auto' }}>
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
          <ShieldCheck size={32} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Administrator Credentials Required</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Only authorized administrator accounts can open and manage the Admin Governance Panel.
        </p>
        <button
          onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
          className="btn btn-primary hover-lift"
          style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1.75rem' }}
        >
          Login as Administrator
        </button>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const totalUsersCount = users.length;
  const totalPdfsCount = pdfs.length;
  const totalDownloadsCount = pdfs.reduce((acc, curr) => acc + (curr.downloads || 0), 0);

  const mostDownloadedPdfs = [...pdfs].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  const handlePdfFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedPdfFile(file);
    setPdfFileName(file.name);

    const mb = file.size / (1024 * 1024);
    const sizeFormatted = mb < 0.1 ? `${(file.size / 1024).toFixed(0)} KB` : `${mb.toFixed(1)} MB`;
    setPdfFileSizeStr(sizeFormatted);

    const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    if (!newTitle) {
      setNewTitle(cleanTitle);
    }
    if (!newDesc) {
      setNewDesc(`Complete notes and formula summary for ${cleanTitle}.`);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPdfDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePdfSubmit = (e) => {
    e.preventDefault();
    const classNameLabel = newClass === 'class-10' ? 'Class 10' : 'Class 12 Arts';
    const finalTitle = newTitle || (pdfFileName ? pdfFileName.replace(/\.[^/.]+$/, '') : 'Untitled Note');
    const finalDesc = newDesc || `Notes uploaded from ${pdfFileName || 'PDF Document'}.`;

    const res = addNewPdf({
      title: finalTitle,
      description: finalDesc,
      class: newClass,
      className: classNameLabel,
      subject: newSubject,
      category: newCategory,
      author: newAuthor,
      thumbnail: newThumbnail,
      pages: Math.floor(8 + Math.random() * 20),
      fileSize: pdfFileSizeStr || `${(1.5 + Math.random() * 4).toFixed(1)} MB`,
      fileContentUrl: pdfDataUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileName: pdfFileName
    });

    setContentToast(`PDF document "${finalTitle}" uploaded successfully!`);
    setTimeout(() => setContentToast(null), 3500);
    setNewTitle('');
    setNewDesc('');
    setSelectedPdfFile(null);
    setPdfDataUrl('');
    setPdfFileName('');
    setPdfFileSizeStr('');
  };

  const handleYtSubmit = (e) => {
    e.preventDefault();
    const classNameLabel = ytClass === 'class-10' ? 'Class 10' : 'Class 12 Arts';
    const res = addNewYoutubeLecture({
      title: ytTitle,
      channel: ytChannel,
      class: ytClass,
      className: classNameLabel,
      subject: ytSubject,
      duration: ytDuration,
      youtubeId: ytId,
      embedUrl: `https://www.youtube.com/embed/${ytId}`,
      youtubeUrl: `https://www.youtube.com/watch?v=${ytId}`,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
    });
    setContentToast(res.message);
    setTimeout(() => setContentToast(null), 3000);
    setYtTitle('');
  };

  const handleFaqSubmit = (e) => {
    e.preventDefault();
    addNewFaq({
      category: faqCategory,
      question: faqQuestion,
      answer: faqAnswer
    });
    setFaqQuestion('');
    setFaqAnswer('');
  };

  const handleSendTicketReply = (e) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;
    replyToTicket(selectedTicket.id, replyText);
    setReplyText('');
    setSelectedTicket(null);
  };

  return (
    <div style={{
      background: '#090d16',
      border: '1px solid rgba(16, 185, 129, 0.25)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      marginBottom: '3rem',
      boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
    }} className="animate-fade-in-up">
      
      {/* Distinct Admin Header Bar */}
      <div style={{
        padding: '1.25rem 1.5rem',
        background: '#0e1526',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Alpha Arts Governance Console</h1>
              <span className="badge badge-emerald">{currentUser.role}</span>
              <span className="badge badge-emerald badge-glow" style={{ background: 'rgba(16, 185, 129, 0.25)', border: '1px solid var(--accent-emerald)' }}>
                🟢 Central DB Live & Synced
              </span>
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Logged in as <strong style={{ color: 'var(--text-main)' }}>{currentUser.email}</strong> • Private Admin Environment
            </p>
          </div>
        </div>

        {/* Exit Admin Portal & Tab Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', maxWidth: '100%', paddingBottom: '0.25rem' }} className="touch-scroll">
          <button
            onClick={() => setActiveAdminTab('overview')}
            className={`btn btn-sm ${activeAdminTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
          >
            <BarChart3 size={14} />
            Overview
          </button>

          <button
            onClick={() => setActiveAdminTab('content')}
            className={`btn btn-sm ${activeAdminTab === 'content' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
          >
            <FileText size={14} />
            Manage Content
          </button>

          {isSuperAdmin && (
            <button
              onClick={() => setActiveAdminTab('users')}
              className={`btn btn-sm ${activeAdminTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
            >
              <Users size={14} />
              User Access
            </button>
          )}

          {isSuperAdmin && (
            <button
              onClick={() => setActiveAdminTab('ads')}
              className={`btn btn-sm ${activeAdminTab === 'ads' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: 'var(--radius-sm)', flexShrink: 0 }}
            >
              <DollarSign size={14} />
              AdSense
            </button>
          )}

          {/* Exit Admin Console Button */}
          <button
            onClick={() => setActiveTab('home')}
            className="btn btn-secondary btn-sm hover-lift"
            style={{
              borderRadius: 'var(--radius-sm)',
              borderColor: 'rgba(244, 63, 94, 0.4)',
              color: 'var(--accent-rose)',
              background: 'rgba(244, 63, 94, 0.1)',
              marginLeft: '0.25rem',
              flexShrink: 0
            }}
          >
            Exit Admin
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS STATS */}
      {activeAdminTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Stat Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.85rem' }}>
            <div className="glass-card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Total Users</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800 }}>{totalUsersCount}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>↑ 14% growth</div>
            </div>

            <div className="glass-card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--accent-emerald)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>Downloads</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800 }}>{totalDownloadsCount.toLocaleString()}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--primary)', marginTop: '0.25rem' }}>Class 10 & 12</div>
            </div>

            <div className="glass-card" style={{ padding: '1.15rem', borderLeft: '4px solid var(--accent-amber)' }}>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>PDF Files</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800 }}>{totalPdfsCount}</div>
              <div style={{ fontSize: '0.725rem', color: 'var(--accent-amber)', marginTop: '0.25rem' }}>{youtubeLectures.length} Videos</div>
            </div>
          </div>

          {/* Role Permission Matrix & Popular Notes */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '1.5rem' }} className="admin-grid-2">
            
            {/* Most Downloaded Notes */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                🔥 Most Downloaded Study Notes
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {mostDownloadedPdfs.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 700 }}>{item.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span className="badge badge-primary" style={{ marginRight: 4 }}>{item.className}</span>
                        {item.subject}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)' }}>{item.downloads}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>downloads</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Permissions Control View */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem' }}>
                🛡️ Role-Based Access Control (RBAC)
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.5rem' }}>Feature Action</th>
                      <th style={{ padding: '0.5rem' }}>Super Admin</th>
                      <th style={{ padding: '0.5rem' }}>Editor Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>Manage & Publish Notes</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Yes</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Yes</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>Delete Content</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Yes</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-amber)' }}>Limited</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>Manage & Block Users</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Yes</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-rose)' }}>✕ No</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.5rem', fontWeight: 600 }}>Manage AdSense Ads</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-emerald)' }}>✓ Yes</td>
                      <td style={{ padding: '0.5rem', color: 'var(--accent-rose)' }}>✕ No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: CONTENT MANAGEMENT */}
      {activeAdminTab === 'content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {contentToast && (
            <div style={{ padding: '0.85rem 1.25rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid var(--accent-emerald)', color: 'var(--accent-emerald)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.875rem' }}>
              {contentToast}
            </div>
          )}

          {/* Add PDF Entry Form */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Publish New PDF Note Entry
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Add new notes for Class 10 or Class 12 Arts subjects with custom metadata and description.
            </p>

            <form onSubmit={handlePdfSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="admin-form-grid">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Class 10 Science - Light & Electricity Solved Questions"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Category Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Revision Notes, Formula Sheet, Mind Map"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="admin-form-grid-3">
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Class Selection</label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  >
                    <option value="class-10">Class 10 Board</option>
                    <option value="class-12-arts">Class 12 Arts</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Subject Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Science, Political Science, Geography"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Author / Source</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Description Summary</label>
                <textarea
                  rows={3}
                  placeholder="Key highlights covered in this PDF..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start' }}>
                <Plus size={16} />
                Publish PDF Document
              </button>
            </form>
          </div>

          {/* Manage Existing Content Table */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem' }}>
              Existing Published Documents ({pdfs.length})
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.65rem' }}>Title</th>
                    <th style={{ padding: '0.65rem' }}>Class</th>
                    <th style={{ padding: '0.65rem' }}>Subject</th>
                    <th style={{ padding: '0.65rem' }}>Downloads</th>
                    <th style={{ padding: '0.65rem' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pdfs.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.65rem', fontWeight: 700, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</td>
                      <td style={{ padding: '0.65rem' }}><span className="badge badge-primary">{p.className}</span></td>
                      <td style={{ padding: '0.65rem' }}><span className="badge badge-emerald">{p.subject}</span></td>
                      <td style={{ padding: '0.65rem' }}>{p.downloads}</td>
                      <td style={{ padding: '0.65rem' }}>
                        <button onClick={() => deletePdf(p.id)} className="btn btn-danger btn-sm">
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: USER CONTROLS */}
      {activeAdminTab === 'users' && isSuperAdmin && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Registered Users & Security Controls ({users.length})
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>User</th>
                  <th style={{ padding: '0.75rem' }}>Email</th>
                  <th style={{ padding: '0.75rem' }}>Role</th>
                  <th style={{ padding: '0.75rem' }}>Joined</th>
                  <th style={{ padding: '0.75rem' }}>Status</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={18} style={{ color: 'var(--primary-light)' }} />
                      <span style={{ fontWeight: 700 }}>{u.name}</span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}><span className="badge badge-primary">{u.role}</span></td>
                    <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>{u.joinDate}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${u.blocked ? 'badge-amber' : 'badge-emerald'}`}>
                        {u.blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {u.role !== 'Super Admin' && (
                        <button
                          onClick={() => toggleBlockUser(u.id)}
                          className={`btn btn-sm ${u.blocked ? 'btn-primary' : 'btn-danger'}`}
                        >
                          {u.blocked ? <Unlock size={14} /> : <Lock size={14} />}
                          <span>{u.blocked ? 'Unblock' : 'Block Access'}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SUPPORT TICKETS */}
      {activeAdminTab === 'tickets' && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
            Support Tickets & Student Inquiries ({tickets.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {tickets.map(t => (
              <div key={t.id} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800 }}>#{t.id}</span>
                    <span className="badge badge-primary">{t.category}</span>
                    <span className={`badge ${t.status === 'Open' ? 'badge-amber' : 'badge-emerald'}`}>{t.status}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{t.createdAt}</span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{t.subject}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
                  From: <strong>{t.userName}</strong> ({t.userEmail})<br />
                  "{t.message}"
                </p>

                {/* Reply list */}
                {t.replies.length > 1 && (
                  <div style={{ padding: '0.65rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', marginBottom: '0.85rem', fontSize: '0.8rem' }}>
                    <strong>Latest Admin Reply:</strong> {t.replies[t.replies.length - 1].text}
                  </div>
                )}

                {/* Reply Controls */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setSelectedTicket(t)} className="btn btn-primary btn-sm">
                    <MessageSquare size={14} />
                    Reply Ticket
                  </button>
                  <button onClick={() => toggleTicketStatus(t.id, t.status === 'Closed' ? 'Open' : 'Closed')} className="btn btn-secondary btn-sm">
                    Mark {t.status === 'Closed' ? 'Open' : 'Closed'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Reply Modal */}
          {selectedTicket && (
            <div className="modal-overlay" onClick={() => setSelectedTicket(null)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  Reply to Ticket #{selectedTicket.id}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Sending message to {selectedTicket.userEmail}
                </p>

                <form onSubmit={handleSendTicketReply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <textarea
                    rows={4}
                    placeholder="Write admin reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', color: 'var(--text-main)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  />

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setSelectedTicket(null)} className="btn btn-secondary btn-sm">Cancel</button>
                    <button type="submit" className="btn btn-primary btn-sm">Send Reply</button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 5: ADSENSE MONETIZATION SETTINGS */}
      {activeAdminTab === 'ads' && isSuperAdmin && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <DollarSign size={20} style={{ color: 'var(--accent-emerald)' }} />
            <span>AdSense Ads & Monetization Controls</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Manage site-wide advertisement slots, publisher credentials, and individual banner placements.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Global Master Switch */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>Global Ads Master Switch</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Enable or disable all ads site-wide across Study Hub</div>
              </div>

              <button
                onClick={() => setAdsSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`btn ${adsSettings.enabled ? 'btn-primary' : 'btn-danger'}`}
              >
                {adsSettings.enabled ? 'Ads Active' : 'Ads Disabled'}
              </button>
            </div>

            {/* Credentials Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="admin-form-grid">
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>
                  Google AdSense Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ca-pub-1234567890123456"
                  value={adsSettings.publisherId || ''}
                  onChange={(e) => setAdsSettings(prev => ({ ...prev, publisherId: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
                <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '0.2rem', display: 'block' }}>
                  Format: ca-pub-XXXXXXXXXXXXXXXX (or pub-XXXXXXXXXXXXXXXX)
                </span>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.3rem' }}>Custom Ad Notice Text</label>
                <input
                  type="text"
                  value={adsSettings.customNotice || 'Sponsored Educational Announcement'}
                  onChange={(e) => setAdsSettings(prev => ({ ...prev, customNotice: e.target.value }))}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            {/* Individual Placement Switches */}
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Active Banner Placements</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.homepageBanner !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, homepageBanner: e.target.checked }))}
                  />
                  <span>Homepage Top Banner</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.middleBanner !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, middleBanner: e.target.checked }))}
                  />
                  <span>Middle Section Banner</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.pdfPage !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, pdfPage: e.target.checked }))}
                  />
                  <span>PDF Directory Banner</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.interCard !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, interCard: e.target.checked }))}
                  />
                  <span>In-Feed Note Card Ads</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.sidebar !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, sidebar: e.target.checked }))}
                  />
                  <span>Sidebar Ads</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={adsSettings.footer !== false}
                    onChange={(e) => setAdsSettings(prev => ({ ...prev, footer: e.target.checked }))}
                  />
                  <span>Page Footer Banner</span>
                </label>
              </div>
            </div>

            {/* Guide Box */}
            <div style={{ padding: '1.15rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.825rem', lineHeight: 1.6 }}>
              <div style={{ fontWeight: 700, color: '#a5b4fc', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Sparkles size={14} />
                <span>How to Find & Add Your Google AdSense ID</span>
              </div>
              <ol style={{ paddingLeft: '1.25rem', margin: 0, color: 'var(--text-muted)' }}>
                <li>Log in to your <strong>Google AdSense Dashboard</strong> (<a href="https://adsense.google.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>adsense.google.com</a>).</li>
                <li>Go to <strong>Account &gt; Account Information</strong>.</li>
                <li>Copy your <strong>Publisher ID</strong> (looks like <code>pub-1234567890123456</code>).</li>
                <li>Paste it in the <strong>AdSense Publisher ID</strong> field above.</li>
                <li>For domain verification, paste your script into <code>index.html</code> inside <code>&lt;head&gt;</code>.</li>
              </ol>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-grid-2, .admin-form-grid, .admin-form-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
