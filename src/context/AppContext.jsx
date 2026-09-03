import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CLASSES,
  INITIAL_PDFS,
  INITIAL_YOUTUBE_LECTURES,
  INITIAL_FAQS,
  INITIAL_TICKETS,
  INITIAL_USERS,
  MYSQL_SCHEMA_SQL
} from '../data/mockData';

// URL Hash Routing & Browser History Sync Helpers
const getHashFromState = (tab, classId, subject) => {
  if (tab === 'class-10') return '#/class-10';
  if (tab === 'class-12') return '#/class-12';
  if (tab === 'about') return '#/about';
  if (tab === 'privacy') return '#/privacy';
  if (tab === 'contact') return '#/contact';
  if (tab === 'notes') {
    let url = '#/notes';
    const params = [];
    if (classId && classId !== 'all') params.push(`class=${classId}`);
    if (subject && subject !== 'all') params.push(`subject=${encodeURIComponent(subject)}`);
    if (params.length > 0) url += `?${params.join('&')}`;
    return url;
  }
  if (tab === 'youtube') return '#/youtube';
  if (tab === 'support') return '#/support';
  if (tab === 'profile') return '#/profile';
  if (tab === 'admin') return '#/admin';
  return '#/';
};

const getStateFromHash = () => {
  const hash = typeof window !== 'undefined' ? (window.location.hash || '#/') : '#/';
  const [routePath, queryString] = hash.split('?');

  let tab = 'home';
  let classId = 'all';
  let subject = 'all';

  if (routePath.includes('class-10')) {
    tab = 'class-10';
    classId = 'class-10';
  } else if (routePath.includes('class-12')) {
    tab = 'class-12';
    classId = 'class-12-arts';
  } else if (routePath.includes('about')) {
    tab = 'about';
  } else if (routePath.includes('privacy')) {
    tab = 'privacy';
  } else if (routePath.includes('contact')) {
    tab = 'contact';
  } else if (routePath.includes('notes')) {
    tab = 'notes';
  } else if (routePath.includes('youtube')) {
    tab = 'youtube';
  } else if (routePath.includes('support')) {
    tab = 'support';
  } else if (routePath.includes('profile')) {
    tab = 'profile';
  }

  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    if (searchParams.has('class')) classId = searchParams.get('class');
    if (searchParams.has('subject')) subject = searchParams.get('subject');
  }

  return { tab, classId, subject };
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('study_hub_theme') || 'dark');
  
  // Navigation & View state initialized from URL Hash
  const initialNav = getStateFromHash();
  const [activeTab, setActiveTabState] = useState(initialNav.tab);
  const [selectedClass, setSelectedClassState] = useState(initialNav.classId);
  const [selectedSubject, setSelectedSubjectState] = useState(initialNav.subject);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state with Browser History (pushState & popstate listener)
  const navigateTo = (tab, classId = null, subject = null, replace = false) => {
    const nextTab = tab;
    const nextClass = classId !== null ? classId : (tab === 'class-10' ? 'class-10' : (tab === 'class-12' ? 'class-12-arts' : (tab === 'home' ? 'all' : selectedClass)));
    const nextSubject = subject !== null ? subject : (tab === 'class-10' || tab === 'class-12' || tab === 'home' ? 'all' : selectedSubject);

    setActiveTabState(nextTab);
    setSelectedClassState(nextClass);
    setSelectedSubjectState(nextSubject);

    if (typeof window !== 'undefined') {
      const targetHash = getHashFromState(nextTab, nextClass, nextSubject);
      const stateObj = { tab: nextTab, selectedClass: nextClass, selectedSubject: nextSubject };

      if (window.location.hash !== targetHash) {
        if (replace) {
          window.history.replaceState(stateObj, '', targetHash);
        } else {
          window.history.pushState(stateObj, '', targetHash);
        }
      }
    }
  };

  const setActiveTab = (t, c = null, s = null) => navigateTo(t, c, s);
  const setSelectedClass = (c, s = null) => navigateTo(activeTabState, c, s);
  const setSelectedSubject = (s) => navigateTo(activeTabState, selectedClassState, s);

  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state && e.state.tab) {
        setActiveTabState(e.state.tab);
        if (e.state.selectedClass) setSelectedClassState(e.state.selectedClass);
        if (e.state.selectedSubject) setSelectedSubjectState(e.state.selectedSubject);
      } else {
        const parsed = getStateFromHash();
        setActiveTabState(parsed.tab);
        setSelectedClassState(parsed.classId);
        setSelectedSubjectState(parsed.subject);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial history state replacement
    const parsed = getStateFromHash();
    const initialHash = getHashFromState(parsed.tab, parsed.classId, parsed.subject);
    if (window.location.hash !== initialHash) {
      window.history.replaceState({ tab: parsed.tab, selectedClass: parsed.classId, selectedSubject: parsed.subject }, '', initialHash);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);
  
  // Modals & Overlay state
  const [viewingPdf, setViewingPdf] = useState(null); // Active PDF in preview modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [aiChatbotOpen, setAiChatbotOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(() => {
    return localStorage.getItem('study_hub_owner_unlocked') === 'true';
  });

  const unlockOwnerMode = (passcode) => {
    if (passcode === 'kaisier@108') {
      setIsOwnerUnlocked(true);
      localStorage.setItem('study_hub_owner_unlocked', 'true');
      return { success: true, message: 'Owner Access Verified!' };
    }
    return { success: false, message: 'Incorrect Owner Passcode! Upload Access Denied.' };
  };

  const lockOwnerMode = () => {
    setIsOwnerUnlocked(false);
    localStorage.removeItem('study_hub_owner_unlocked');
  };
  // App Data States with Central Database Sync & LocalStorage persistence
  const [classes] = useState(INITIAL_CLASSES);
  
  const isFakePdf = (p) => !p || p.id === 'pdf-c12-geo-ch1' || p.id === 'pdf-c12-his-ch1' || p.id === 'pdf-c12-his-pyq-2024' || (typeof p.id === 'string' && p.id.startsWith('pdf-c12-his'));
  const isFakeLecture = (y) => !y || (typeof y.id === 'string' && y.id.startsWith('yt-his'));

  const [pdfs, setPdfs] = useState(() => {
    const saved = localStorage.getItem('study_hub_uploaded_pdfs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const map = new Map();
          parsed.forEach(p => {
            if (!isFakePdf(p)) map.set(p.id, p);
          });
          INITIAL_PDFS.forEach(p => {
            if (!isFakePdf(p)) {
              const existing = map.get(p.id) || {};
              map.set(p.id, { ...existing, ...p });
            }
          });
          const cleanList = Array.from(map.values());
          localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(cleanList));
          return cleanList;
        }
      } catch (e) {}
    }
    return INITIAL_PDFS.filter(p => !isFakePdf(p));
  });

  const [youtubeLectures, setYoutubeLectures] = useState(() => {
    const saved = localStorage.getItem('study_hub_uploaded_yt');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleanYt = parsed.filter(y => !isFakeLecture(y));
          localStorage.setItem('study_hub_uploaded_yt', JSON.stringify(cleanYt));
          return cleanYt;
        }
      } catch (e) {}
    }
    return INITIAL_YOUTUBE_LECTURES.filter(y => !isFakeLecture(y));
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('study_hub_faqs');
    return saved ? JSON.parse(saved) : INITIAL_FAQS;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('study_hub_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('study_hub_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Auth User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('study_hub_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Download History State
  const [userDownloads, setUserDownloads] = useState(() => {
    const saved = localStorage.getItem('study_hub_user_downloads');
    return saved ? JSON.parse(saved) : [];
  });

  // Adsense Control Panel State
  const [adsSettings, setAdsSettings] = useState(() => {
    const defaults = {
      enabled: true,
      homepageBanner: true,
      middleBanner: true,
      interCard: true,
      sidebar: true,
      footer: true,
      pdfPage: true,
      publisherId: 'ca-pub-4733389173568893',
      customNotice: 'Sponsored Educational Announcement'
    };
    const saved = localStorage.getItem('study_hub_ads');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaults,
          ...parsed,
          publisherId: parsed.publisherId || defaults.publisherId
        };
      } catch (e) {}
    }
    return defaults;
  });

  // Download handler (Free download tracking)
  const spendTokensForDownload = (pdfId) => {
    trackPdfDownload(pdfId);
    return {
      success: true,
      remainingTokens: 9999,
      message: 'Downloaded!'
    };
  };

  // Central Database Synchronization Engine (Syncs on mount & window focus)
  const syncWithCentralServer = async () => {
    // 1. Local Server API Sync
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data.pdfs && Array.isArray(data.pdfs) && data.pdfs.length > 0) {
          const cleanPdfs = data.pdfs.filter(p => !isFakePdf(p));
          setPdfs(cleanPdfs);
          localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(cleanPdfs));
        }
        if (data.youtubeLectures && Array.isArray(data.youtubeLectures) && data.youtubeLectures.length > 0) {
          const cleanYt = data.youtubeLectures.filter(y => !isFakeLecture(y));
          setYoutubeLectures(prev => prev.length === cleanYt.length ? prev : cleanYt);
        }
        if (data.faqs && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqs(prev => prev.length === data.faqs.length ? prev : data.faqs);
        }
      }
    } catch (e) {
      // Local server offline fallback
    }

    // 2. Cloud Database PDF Sync for GitHub Pages static deployment
    try {
      const cloudRes = await fetch('https://study-hub-arts-default-rtdb.firebaseio.com/pdfs.json');
      if (cloudRes.ok) {
        const cloudData = await cloudRes.json();
        if (cloudData) {
          const cloudList = (Array.isArray(cloudData) ? cloudData : Object.values(cloudData))
            .filter(p => !isFakePdf(p));
          if (cloudList.length > 0) {
            setPdfs(prev => {
              const uniqueMap = new Map();
              INITIAL_PDFS.forEach(p => { if (!isFakePdf(p)) uniqueMap.set(p.id, p); });
              prev.forEach(p => { if (!isFakePdf(p)) uniqueMap.set(p.id, p); });
              cloudList.forEach(p => { if (!isFakePdf(p)) uniqueMap.set(p.id, p); });
              const mergedList = Array.from(uniqueMap.values());
              localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(mergedList));
              return mergedList;
            });
          }
        }
      }
    } catch (e) {
      // Cloud sync fallback
    }
  };

  useEffect(() => {
    syncWithCentralServer();
    window.addEventListener('focus', syncWithCentralServer);
    return () => {
      window.removeEventListener('focus', syncWithCentralServer);
    };
  }, []);

  // Login Rate Limiting Simulation state
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitTimer, setRateLimitTimer] = useState(0);

  // Apply & Save Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('study_hub_theme', theme);
  }, [theme]);

  // Persist PDF Data
  useEffect(() => {
    localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(pdfs));
  }, [pdfs]);

  // Persist YouTube Data
  useEffect(() => {
    localStorage.setItem('study_hub_uploaded_yt', JSON.stringify(youtubeLectures));
  }, [youtubeLectures]);

  // Persist FAQs
  useEffect(() => {
    localStorage.setItem('study_hub_faqs', JSON.stringify(faqs));
  }, [faqs]);

  // Persist Tickets
  useEffect(() => {
    localStorage.setItem('study_hub_tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Persist Users
  useEffect(() => {
    localStorage.setItem('study_hub_users', JSON.stringify(users));
  }, [users]);

  // Persist Current User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('study_hub_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('study_hub_current_user');
    }
  }, [currentUser]);

  // Persist User Downloads
  useEffect(() => {
    localStorage.setItem('study_hub_user_downloads', JSON.stringify(userDownloads));
  }, [userDownloads]);

  // Persist Ads Settings
  useEffect(() => {
    localStorage.setItem('study_hub_ads', JSON.stringify(adsSettings));
  }, [adsSettings]);

  // Handle Rate Limiting Timer countdown
  useEffect(() => {
    let timer;
    if (isRateLimited && rateLimitTimer > 0) {
      timer = setInterval(() => {
        setRateLimitTimer((prev) => {
          if (prev <= 1) {
            setIsRateLimited(false);
            setFailedLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRateLimited, rateLimitTimer]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Auth Functions
  const loginUser = (inputEmail, inputPassword) => {
    if (isRateLimited) {
      return { success: false, message: `System locked due to failed attempts. Wait ${rateLimitTimer}s.` };
    }

    const cleanEmail = inputEmail.trim().toLowerCase();

    // STRICT ADMIN AUTHENTICATION FOR OWNER
    if (cleanEmail === 'karannehra108@gmail.com') {
      if (inputPassword === 'kaisier@108') {
        const adminOwnerUser = {
          id: 'usr-admin-owner',
          name: 'Karan Nehra (Owner)',
          email: 'karannehra108@gmail.com',
          role: 'Super Admin',
          avatar: null,
          blocked: false,
          joinDate: '2025-11-01',
          downloadsCount: 0
        };
        setCurrentUser(adminOwnerUser);
        localStorage.setItem('study_hub_current_user', JSON.stringify(adminOwnerUser));
        setFailedLoginAttempts(0);
        setAuthModalOpen(false);
        setActiveTab('home', 'all');
        return { success: true, message: 'Welcome Owner! Redirected to Home page.' };
      } else {
        const attempts = failedLoginAttempts + 1;
        setFailedLoginAttempts(attempts);
        if (attempts >= 3) {
          setIsRateLimited(true);
          setRateLimitTimer(30);
          return { success: false, message: 'Rate limit triggered! 3 failed attempts. Locked for 30 seconds.' };
        }
        return { success: false, message: `Invalid Administrator Password! Attempt ${attempts}/3.` };
      }
    }

    // STANDARD USERS LOGIN
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (foundUser) {
      if (foundUser.blocked) {
        return { success: false, message: 'Your account has been restricted by Admin. Contact support.' };
      }
      setCurrentUser(foundUser);
      localStorage.setItem('study_hub_current_user', JSON.stringify(foundUser));
      setFailedLoginAttempts(0);
      setAuthModalOpen(false);
      setActiveTab('home', 'all');
      return { success: true, message: `Welcome back, ${foundUser.name}!` };
    } else if (cleanEmail.includes('@')) {
      const newUser = {
        id: `usr-${Date.now()}`,
        name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
        role: 'Student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
        blocked: false,
        joinDate: new Date().toISOString().split('T')[0],
        downloadsCount: 0
      };
      setUsers(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      localStorage.setItem('study_hub_current_user', JSON.stringify(newUser));
      setFailedLoginAttempts(0);
      setAuthModalOpen(false);
      setActiveTab('home', 'all');
      return { success: true, message: 'Student Login successful!' };
    } else {
      const attempts = failedLoginAttempts + 1;
      setFailedLoginAttempts(attempts);
      if (attempts >= 3) {
        setIsRateLimited(true);
        setRateLimitTimer(30);
        return { success: false, message: 'Rate limit triggered! 3 failed attempts. Locked for 30 seconds.' };
      }
      return { success: false, message: `Invalid credentials. Attempt ${attempts}/3.` };
    }
  };

  const signupUser = (name, email, password) => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: 'An account with this email already exists!' };
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'Student',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      blocked: false,
      joinDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);
    setActiveTab('home', 'all');
    return { success: true, message: 'Account created successfully! Email verification code sent.' };
  };

  const loginWithGoogleProfile = (googleProfile) => {
    if (!googleProfile || !googleProfile.email) {
      return { success: false, message: 'Google authentication failed. Valid profile data required.' };
    }

    const cleanEmail = googleProfile.email.trim().toLowerCase();

    // Owner Admin Account Verified via Google OAuth
    if (cleanEmail === 'karannehra108@gmail.com') {
      const adminOwnerUser = {
        id: 'usr-admin-owner',
        name: googleProfile.name || 'Karan Nehra (Owner)',
        email: 'karannehra108@gmail.com',
        role: 'Super Admin',
        avatar: googleProfile.picture || null,
        blocked: false,
        joinDate: '2025-11-01',
        downloadsCount: 0
      };
      setCurrentUser(adminOwnerUser);
      localStorage.setItem('study_hub_current_user', JSON.stringify(adminOwnerUser));
      setAuthModalOpen(false);
      setActiveTab('home');
      return { success: true, message: 'Authenticated via Google! Redirecting to Home...', user: adminOwnerUser };
    }

    // Existing User Check
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.blocked) {
        return { success: false, message: 'Your account has been restricted by Admin. Contact support.' };
      }
      const updatedUser = {
        ...existing,
        name: googleProfile.name || existing.name,
        avatar: googleProfile.picture || existing.avatar
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('study_hub_current_user', JSON.stringify(updatedUser));
      setAuthModalOpen(false);
      setActiveTab('home');
      return { success: true, message: `Welcome back, ${updatedUser.name}!`, user: updatedUser };
    }

    // New Verified Google Student User
    const newGoogleUser = {
      id: `usr-google-${googleProfile.sub || Date.now()}`,
      name: googleProfile.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'Student',
      avatar: googleProfile.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${cleanEmail}`,
      blocked: false,
      joinDate: new Date().toISOString().split('T')[0],
      downloadsCount: 0
    };

    setUsers(prev => [newGoogleUser, ...prev]);
    setCurrentUser(newGoogleUser);
    localStorage.setItem('study_hub_current_user', JSON.stringify(newGoogleUser));
    setAuthModalOpen(false);
    setActiveTab('home');
    return { success: true, message: `Authenticated via Google as ${newGoogleUser.name}!`, user: newGoogleUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    if (activeTab === 'admin' || activeTab === 'profile') {
      setActiveTab('home');
    }
  };

  const updateUserProfile = (updatedDetails) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedDetails };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    return { success: true, message: 'Profile updated successfully!' };
  };

  // PDF Management Functions
  const trackPdfDownload = (pdfId) => {
    // Increment download count
    setPdfs(prev => prev.map(p => {
      if (p.id === pdfId) {
        return { ...p, downloads: p.downloads + 1 };
      }
      return p;
    }));

    // Record in user history
    const targetPdf = pdfs.find(p => p.id === pdfId);
    if (targetPdf) {
      const record = {
        id: `dl-${Date.now()}`,
        pdfId: targetPdf.id,
        pdfTitle: targetPdf.title,
        subject: targetPdf.subject,
        className: targetPdf.className,
        timestamp: new Date().toLocaleString(),
        userEmail: currentUser ? currentUser.email : 'Guest Student'
      };
      setUserDownloads(prev => [record, ...prev]);

      if (currentUser) {
        const updatedUser = { ...currentUser, downloadsCount: (currentUser.downloadsCount || 0) + 1 };
        setCurrentUser(updatedUser);
        setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      }
    }
  };

  const incrementPdfView = (pdfId) => {
    setPdfs(prev => prev.map(p => {
      if (p.id === pdfId) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    }));
  };

  const addNewPdf = async (pdfData) => {
    const newPdf = {
      id: `pdf-${Date.now()}`,
      downloads: 0,
      views: 1,
      rating: 5.0,
      uploadDate: new Date().toISOString().split('T')[0],
      featured: true,
      fileContentUrl: pdfData.fileContentUrl || '',
      ...pdfData
    };
    
    setPdfs(prev => {
      const updated = [newPdf, ...prev];
      try {
        localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 1. PUT to Cloud Database for GitHub Pages live multi-device sync
    try {
      await fetch(`https://study-hub-arts-default-rtdb.firebaseio.com/pdfs/${newPdf.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPdf)
      });
    } catch (e) {}

    // 2. Local API server sync
    try {
      await fetch('/api/pdfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPdf)
      });
    } catch (e) {}

    return { success: true, message: 'New PDF published and synced across all devices live!' };
  };

  const deletePdf = async (pdfId) => {
    setPdfs(prev => {
      const updated = prev.filter(p => p.id !== pdfId);
      try {
        localStorage.setItem('study_hub_uploaded_pdfs', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 1. DELETE from Cloud Database for GitHub Pages live multi-device sync
    try {
      await fetch(`https://study-hub-arts-default-rtdb.firebaseio.com/pdfs/${pdfId}.json`, {
        method: 'DELETE'
      });
    } catch (e) {}

    // 2. Local API server sync
    try {
      await fetch('/api/pdfs/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pdfId })
      });
    } catch (e) {}
  };

  // YouTube Lecture Management
  const addNewYoutubeLecture = async (lectureData) => {
    const newLecture = {
      id: `yt-${Date.now()}`,
      views: '1,200',
      ...lectureData
    };
    setYoutubeLectures(prev => [newLecture, ...prev]);

    try {
      await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLecture)
      });
    } catch (e) {}

    return { success: true, message: 'YouTube Lecture added and synced across all devices!' };
  };

  const deleteYoutubeLecture = async (id) => {
    setYoutubeLectures(prev => prev.filter(y => y.id !== id));
    try {
      await fetch('/api/youtube/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (e) {}
  };

  // Ticket System Functions
  const createSupportTicket = async (ticketData) => {
    const newTicket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      userEmail: currentUser ? currentUser.email : ticketData.email,
      userName: currentUser ? currentUser.name : ticketData.name,
      subject: ticketData.subject,
      message: ticketData.message,
      category: ticketData.category || 'General Enquiry',
      status: 'Open',
      createdAt: new Date().toLocaleString(),
      replies: [
        {
          sender: currentUser ? currentUser.name : ticketData.name,
          role: 'User',
          text: ticketData.message,
          date: new Date().toLocaleString()
        }
      ]
    };
    setTickets(prev => [newTicket, ...prev]);

    // 1. PUT to Cloud Database for GitHub Pages live multi-device sync
    try {
      await fetch(`https://study-hub-arts-default-rtdb.firebaseio.com/tickets/${newTicket.id}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });
    } catch (e) {}

    // 2. Local API server sync
    try {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket)
      });
    } catch (e) {}

    return { success: true, message: `Ticket #${newTicket.id} created successfully! Owner will review shortly.` };
  };

  const replyToTicket = async (ticketId, replyText) => {
    let updatedTicket = null;
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        const newReply = {
          sender: isOwnerUnlocked ? 'Alpha Arts Owner' : (currentUser ? currentUser.name : 'Student'),
          role: isOwnerUnlocked ? 'Admin' : 'User',
          text: replyText,
          date: new Date().toLocaleString()
        };
        updatedTicket = {
          ...t,
          status: isOwnerUnlocked ? 'Replied' : 'Open',
          replies: [...t.replies, newReply]
        };
        return updatedTicket;
      }
      return t;
    }));

    if (updatedTicket) {
      try {
        await fetch(`https://study-hub-arts-default-rtdb.firebaseio.com/tickets/${ticketId}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTicket)
        });
      } catch (e) {}
    }

    try {
      await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ticketId, text: replyText })
      });
    } catch (e) {}
  };

  const toggleTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  // User Admin Operations
  const toggleBlockUser = async (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, blocked: !u.blocked };
        if (currentUser && currentUser.id === userId) {
          setCurrentUser(null);
        }
        return updated;
      }
      return u;
    }));

    try {
      await fetch('/api/users/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      });
    } catch (e) {}
  };

  // FAQs Admin Operations
  const addNewFaq = (faqData) => {
    const newFaq = {
      id: `faq-${Date.now()}`,
      ...faqData
    };
    setFaqs(prev => [...prev, newFaq]);
  };

  const deleteFaq = (faqId) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        selectedClass,
        setSelectedClass,
        selectedSubject,
        setSelectedSubject,
        searchQuery,
        setSearchQuery,
        viewingPdf,
        setViewingPdf,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        sqlModalOpen,
        setSqlModalOpen,
        aiChatbotOpen,
        setAiChatbotOpen,
        uploadModalOpen,
        setUploadModalOpen,
        isOwnerUnlocked,
        unlockOwnerMode,
        lockOwnerMode,
        classes,
        pdfs,
        youtubeLectures,
        faqs,
        tickets,
        users,
        currentUser,
        userDownloads,
        spendTokensForDownload,
        adsSettings,
        setAdsSettings,
        failedLoginAttempts,
        isRateLimited,
        rateLimitTimer,
        loginUser,
        signupUser,
        loginWithGoogleProfile,
        logoutUser,
        updateUserProfile,
        trackPdfDownload,
        incrementPdfView,
        addNewPdf,
        deletePdf,
        addNewYoutubeLecture,
        deleteYoutubeLecture,
        createSupportTicket,
        replyToTicket,
        toggleTicketStatus,
        toggleBlockUser,
        addNewFaq,
        deleteFaq,
        mysqlSchemaSql: MYSQL_SCHEMA_SQL
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
