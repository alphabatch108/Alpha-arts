import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, X, FileText, CheckCircle2, AlertCircle, Lock, KeyRound, ShieldCheck, Trash2, Cloud, Ticket, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const UploadNotesModal = () => {
  const {
    uploadModalOpen,
    setUploadModalOpen,
    addNewPdf,
    deletePdf,
    pdfs,
    tickets,
    replyToTicket,
    toggleTicketStatus,
    currentUser,
    isOwnerUnlocked,
    unlockOwnerMode,
    lockOwnerMode
  } = useApp();

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'manage' | 'tickets'
  const [passcode, setPasscode] = useState('');
  const [replyTextMap, setReplyTextMap] = useState({});
  const [selectedClass, setSelectedClass] = useState('class-12');
  const [selectedSubject, setSelectedSubject] = useState('Political Science');
  const [category, setCategory] = useState('Handwritten Notes');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState(currentUser ? currentUser.name : 'Alpha Arts Owner');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDataUrl, setPdfDataUrl] = useState('');
  const [pageCount, setPageCount] = useState(12);
  const [fileSizeStr, setFileSizeStr] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  if (!uploadModalOpen) return null;

  const subjectOptionsMap = {
    'class-10': ['Science', 'Mathematics', 'Social Science', 'IT (Information Tech)', 'English', 'Hindi'],
    'class-12': ['Political Science', 'History', 'Geography', 'Economics', 'Psychology', 'English Core', 'Hindi Elective'],
    'class-9': ['Science', 'Mathematics', 'Social Science', 'English', 'Hindi'],
    'class-11': ['Political Science', 'History', 'Geography', 'Economics', 'Sociology', 'English', 'Hindi']
  };

  const handleVerifyOwner = (e) => {
    e.preventDefault();
    const res = unlockOwnerMode(passcode);
    if (!res.success) {
      setToastMsg({ type: 'error', text: res.message });
    } else {
      setToastMsg({ type: 'success', text: 'Owner verified successfully! Upload form unlocked.' });
      setTimeout(() => setToastMsg(null), 2500);
    }
  };

  const handleClassChange = (e) => {
    const cls = e.target.value;
    setSelectedClass(cls);
    const availableSubjects = subjectOptionsMap[cls] || [];
    if (availableSubjects.length > 0) {
      setSelectedSubject(availableSubjects[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setToastMsg({ type: 'error', text: 'Please select a valid .pdf document file!' });
      return;
    }

    setPdfFile(file);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setFileSizeStr(`${sizeInMb} MB`);

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setPdfDataUrl(uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setToastMsg({ type: 'error', text: 'Please enter a title for your notes!' });
      return;
    }

    setIsUploading(true);

    const classNameDisplay = selectedClass === 'class-10' ? 'Class 10' :
                             selectedClass === 'class-12' ? 'Class 12' :
                             selectedClass === 'class-9' ? 'Class 9' : 'Class 11';

    const newNoteObj = {
      id: `pdf-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || `Complete high-yielding revision notes for ${classNameDisplay} ${selectedSubject}.`,
      class: selectedClass,
      className: classNameDisplay,
      subject: selectedSubject,
      category: category,
      fileSize: fileSizeStr || '3.2 MB',
      pages: pageCount || 15,
      downloads: 1,
      views: 10,
      rating: 5.0,
      author: author.trim() || 'Alpha Arts Owner',
      thumbnail: '',
      tags: [classNameDisplay, selectedSubject, category],
      uploadDate: new Date().toISOString().split('T')[0],
      featured: true,
      fileContentUrl: pdfDataUrl || ''
    };

    setTimeout(() => {
      addNewPdf(newNoteObj);
      setIsUploading(false);
      
      try {
        confetti({ particleCount: 85, spread: 75, origin: { y: 0.6 } });
      } catch (err) {}

      setToastMsg({ type: 'success', text: `Success! "${title}" is published under ${classNameDisplay} ${selectedSubject}.` });

      setTimeout(() => {
        setUploadModalOpen(false);
        setTitle('');
        setDescription('');
        setPdfFile(null);
        setPdfDataUrl('');
        setToastMsg(null);
      }, 1800);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={() => setUploadModalOpen(false)}>
      <div 
        className="modal-content glass-panel upload-modal-content animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          width: '94%',
          maxHeight: '90dvh',
          overflowY: 'auto',
          padding: '2rem'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}>
              <Upload size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800 }}>Owner PDF Control Portal</h2>
                <span className={`badge ${isOwnerUnlocked ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.7rem' }}>
                  {isOwnerUnlocked ? 'Owner Verified' : 'Owner Locked'}
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Publish notes & review support tickets live from all devices
              </p>
            </div>
          </div>

          <button
            onClick={() => setUploadModalOpen(false)}
            className="hover-lift"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: 'none',
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

        {/* Feedback Alert Toast */}
        {toastMsg && (
          <div className="animate-fade-in-up" style={{
            padding: '0.85rem 1.15rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: toastMsg.type === 'error' ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            border: toastMsg.type === 'error' ? '1px solid var(--accent-rose)' : '1px solid var(--accent-emerald)',
            color: toastMsg.type === 'error' ? 'var(--accent-rose)' : 'var(--accent-emerald)'
          }}>
            {toastMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{toastMsg.text}</span>
          </div>
        )}

        {/* OWNER VERIFICATION GATE: Prompt if owner mode is locked */}
        {!isOwnerUnlocked ? (
          <form onSubmit={handleVerifyOwner} style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto',
              color: 'var(--primary)'
            }}>
              <Lock size={30} />
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem' }}>
              Owner Security Passcode Required
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.5rem auto', lineHeight: 1.6 }}>
              Note uploading, deletion, and support ticket management are strictly restricted to the verified site owner. Enter your passcode to unlock.
            </p>

            <div style={{ maxWidth: '340px', margin: '0 auto 1.25rem auto', position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="Enter Owner Passcode (••••••••)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-glass)',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary hover-lift"
              style={{ borderRadius: 'var(--radius-full)', padding: '0.8rem 2rem', fontWeight: 800 }}
            >
              Verify & Unlock Control Portal
            </button>
          </form>
        ) : (
          /* UNLOCKED OWNER CONTROL PORTAL */
          <div>
            {/* Header Tabs & Lock Session Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`btn ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'} btn-sm hover-lift`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <Upload size={15} />
                  <span>+ Upload Note</span>
                </button>

                <button
                  onClick={() => setActiveTab('manage')}
                  className={`btn ${activeTab === 'manage' ? 'btn-primary' : 'btn-secondary'} btn-sm hover-lift`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <Trash2 size={15} style={{ color: 'var(--accent-rose)' }} />
                  <span>Delete Notes ({pdfs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`btn ${activeTab === 'tickets' ? 'btn-primary' : 'btn-secondary'} btn-sm hover-lift`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <Ticket size={15} style={{ color: 'var(--accent-amber)' }} />
                  <span>Support Tickets ({tickets.length})</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="badge badge-emerald hide-on-mobile" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.2)' }}>
                  <Cloud size={14} />
                  Multi-Device Cloud Sync Active
                </span>

                <button
                  type="button"
                  onClick={lockOwnerMode}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                >
                  <Lock size={12} />
                  <span>Lock Session</span>
                </button>
              </div>
            </div>

            {/* TAB 1: UPLOAD FORM */}
            {activeTab === 'upload' && (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Class & Subject Selector Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.15rem' }}>
                  <div>
                    <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                      Select Class *
                    </label>
                    <select
                      value={selectedClass}
                      onChange={handleClassChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-glass)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    >
                      <option value="class-12">Class 12 (Arts & Humanities)</option>
                      <option value="class-10">Class 10 (Board Exam)</option>
                      <option value="class-11">Class 11 (Arts)</option>
                      <option value="class-9">Class 9</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                      Select Subject *
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-glass)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: 'var(--text-main)',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    >
                      {(subjectOptionsMap[selectedClass] || []).map((sub, idx) => (
                        <option key={idx} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    Note Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'rgba(15, 23, 42, 0.8)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Handwritten Notes">Handwritten Notes</option>
                    <option value="Formula Sheet">Formula Sheet / Timelines</option>
                    <option value="Mind Maps & Notes">Mind Maps & Chapter Summary</option>
                    <option value="Question Bank">Question Bank & Past Papers</option>
                    <option value="Practical & Theory">Practical & Theory Guide</option>
                  </select>
                </div>

                {/* Title Input */}
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    Note Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Class 12 Political Science - Cold War Era & Bipolarity Notes"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'rgba(15, 23, 42, 0.8)',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    Description & Highlights
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of topics covered, 5-mark answer tips..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-glass)',
                      background: 'rgba(15, 23, 42, 0.8)',
                      color: 'var(--text-main)',
                      fontSize: '0.875rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* PDF File Picker Box */}
                <div>
                  <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                    Select PDF Document File (.pdf)
                  </label>
                  <div style={{
                    border: '2px dashed var(--border-glass)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'rgba(15, 23, 42, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileSelect}
                      id="pdf-file-picker"
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="pdf-file-picker" style={{ cursor: 'pointer', display: 'block' }}>
                      <FileText size={36} style={{ color: 'var(--primary)', marginBottom: '0.5rem' }} />
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {pdfFile ? pdfFile.name : 'Click to select or drag PDF file here'}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {pdfFile ? `File Size: ${fileSizeStr} • Ready for Instant GitHub Download` : 'Supports standard PDF documents up to 25MB'}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Author & Pages Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                      Author / Uploader
                    </label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.95rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-glass)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.825rem', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                      Total Pages Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={pageCount}
                      onChange={(e) => setPageCount(parseInt(e.target.value) || 10)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.95rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-glass)',
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem'
                      }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className="btn btn-primary hover-lift"
                  style={{ padding: '0.9rem', borderRadius: 'var(--radius-full)', marginTop: '0.5rem', fontWeight: 800 }}
                >
                  {isUploading ? 'Publishing Note...' : `Publish PDF under ${selectedClass === 'class-10' ? 'Class 10' : 'Class 12'} ${selectedSubject}`}
                </button>
              </form>
            )}

            {/* TAB 2: MANAGE & DELETE NOTES LIST */}
            {activeTab === 'manage' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Click <strong>Delete</strong> on any uploaded PDF note below to remove it permanently from the directory across all devices:
                </div>

                {pdfs.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No notes in directory.
                  </div>
                ) : (
                  pdfs.map(pdf => (
                    <div 
                      key={pdf.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        padding: '0.85rem 1rem',
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {pdf.title}
                        </div>
                        <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginRight: 6 }}>{pdf.className}</span>
                          <span>{pdf.subject}</span> • <span>{pdf.downloads} downloads</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete "${pdf.title}" permanently?`)) {
                            deletePdf(pdf.id);
                          }
                        }}
                        className="btn btn-secondary btn-sm hover-lift"
                        style={{
                          border: '1px solid rgba(244, 63, 94, 0.4)',
                          background: 'rgba(244, 63, 94, 0.15)',
                          color: 'var(--accent-rose)',
                          gap: '0.35rem',
                          flexShrink: 0
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: SUPPORT TICKETS FROM ALL DEVICES */}
            {activeTab === 'tickets' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Live Multi-Device Support Tickets submitted by students across all devices:
                </div>

                {tickets.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    No support tickets submitted yet.
                  </div>
                ) : (
                  tickets.map(ticket => (
                    <div 
                      key={ticket.id}
                      style={{
                        padding: '1.15rem',
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>#{ticket.id}</span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 800 }}>{ticket.subject}</span>
                            <span className={`badge ${ticket.status === 'Replied' ? 'badge-emerald' : ticket.status === 'Closed' ? 'badge-secondary' : 'badge-amber'}`}>
                              {ticket.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                            From: <strong>{ticket.userName}</strong> ({ticket.userEmail}) • {ticket.createdAt}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleTicketStatus(ticket.id)}
                          className="btn btn-secondary btn-sm"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {ticket.status === 'Closed' ? 'Reopen Ticket' : 'Mark as Closed'}
                        </button>
                      </div>

                      {/* Reply Thread */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(9, 13, 22, 0.5)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                        {ticket.replies && ticket.replies.map((r, idx) => (
                          <div key={idx} style={{ fontSize: '0.825rem', borderBottom: idx < ticket.replies.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none', paddingBottom: '0.4rem' }}>
                            <div style={{ fontWeight: 700, color: r.role === 'Admin' ? 'var(--accent-emerald)' : 'var(--primary)' }}>
                              {r.sender} ({r.role}):
                            </div>
                            <div style={{ color: 'var(--text-main)', marginTop: '0.15rem' }}>{r.text}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{r.date}</div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Box */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const text = replyTextMap[ticket.id];
                          if (text && text.trim()) {
                            replyToTicket(ticket.id, text.trim());
                            setReplyTextMap(prev => ({ ...prev, [ticket.id]: '' }));
                          }
                        }}
                        style={{ display: 'flex', gap: '0.5rem' }}
                      >
                        <input
                          type="text"
                          placeholder="Type reply to student..."
                          value={replyTextMap[ticket.id] || ''}
                          onChange={(e) => setReplyTextMap(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                          style={{
                            flex: 1,
                            padding: '0.55rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-glass)',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: 'var(--text-main)',
                            fontSize: '0.825rem'
                          }}
                        />
                        <button type="submit" className="btn btn-primary btn-sm hover-lift" style={{ gap: '0.3rem' }}>
                          <Send size={13} />
                          <span>Reply</span>
                        </button>
                      </form>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 480px) {
          .upload-modal-content {
            padding: 1.15rem 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
};
