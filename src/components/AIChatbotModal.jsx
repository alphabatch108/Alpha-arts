import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Zap, Sparkles, Key } from 'lucide-react';

export const AIChatbotModal = () => {
  const { aiChatbotOpen, setAiChatbotOpen } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [geminiKey, setGeminiKey] = useState(() => localStorage.getItem('study_hub_gemini_key') || '');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your Alpha Arts AI Study Assistant powered by Google Gemini. Ask me anything about Class 10 Science, Maths, Social Science, or Class 12 Arts (Pol Sci, History, Eco, Geography, Psychology)! How can I help you excel today?'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (aiChatbotOpen) {
      scrollToBottom();
    }
  }, [messages, aiChatbotOpen, isLoading]);

  if (!aiChatbotOpen) return null;

  const quickPrompts = [
    'How to score 95%+ in Class 10 Board Exams?',
    'Top Political Science topics for Class 12 Arts',
    'Where to download free NCERT revision notes?',
    'Class 10 Science formula shortcuts'
  ];

  const handleSaveKey = (e) => {
    e.preventDefault();
    localStorage.setItem('study_hub_gemini_key', geminiKey.trim());
    setShowKeyConfig(false);
  };

  const getFallbackAiResponse = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes('10') || lower.includes('class 10') || lower.includes('science')) {
      return 'For Class 10 Board Exams: Focus on Chemical Reactions balancing, Light Reflection/Refraction ray diagrams, and NCERT exemplars. Visit our "PDF Notes" tab and filter by Class 10 for complete chapter-wise formula sheets!';
    } else if (lower.includes('12') || lower.includes('arts') || lower.includes('political') || lower.includes('geography') || lower.includes('history')) {
      return 'For Class 12 Arts (Humanities): Focus on Cold War timelines, UN reforms in Political Science, map practice in Geography, and National Income calculations in Economics. We have comprehensive Class 12 Arts notes ready under the "Classes" tab!';
    } else if (lower.includes('download') || lower.includes('pdf') || lower.includes('free') || lower.includes('token')) {
      return 'All PDF study notes, formula sheets, and chapter summaries are 100% free to preview and download instantly for all students!';
    } else if (lower.includes('score') || lower.includes('board') || lower.includes('tips')) {
      return '✨ Top Board Exam Tips: 1) Solve last 5 years past papers. 2) Practice NCERT line-by-line questions. 3) Revise formula sheets every morning. 4) Watch our YouTube one-shot live lectures for fast clarity!';
    }
    return `Alpha Arts AI Assistant Guide for "${query}": 1) Focus on NCERT textbook key concepts. 2) Access our free PDF downloads for structured chapter summaries. 3) Check our HD Video Classroom for chapter marathons!`;
  };

  const fetchGeminiApi = async (userQuery) => {
    const apiKey = geminiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return getFallbackAiResponse(userQuery);
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      const payload = {
        systemInstruction: {
          parts: [{
            text: "You are Alpha Arts AI Study Assistant created by Google DeepMind team, an expert tutor for Class 10 (Science, Maths, Social Science, English, IT) and Class 12 Arts (Political Science, History, Geography, Economics, Psychology). Provide clear, encouraging, educational answers with step-by-step guidance."
          }]
        },
        contents: [
          {
            parts: [{ text: userQuery }]
          }
        ]
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Gemini status ${res.status}`);
      }

      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer) return answer;
    } catch (e) {
      console.warn('Gemini API fetch error:', e);
    }

    return getFallbackAiResponse(userQuery);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || isLoading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    setIsLoading(true);

    const aiResponseText = await fetchGeminiApi(query);

    setIsLoading(false);
    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponseText }]);
  };

  return (
    <div className="modal-overlay" onClick={() => setAiChatbotOpen(false)}>
      <div 
        className="modal-content glass-panel ai-chatbot-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          height: 'min(640px, 88dvh)',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.15rem 1.35rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(6, 182, 212, 0.95) 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Alpha Arts AI Assistant</h3>
                <span className="badge badge-emerald" style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.3)', border: '1px solid #fff' }}>Gemini AI</span>
              </div>
              <span style={{ fontSize: '0.75rem', opacity: 0.92, fontWeight: 500 }}>Google Gemini 1.5 Flash Connected</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              title="Configure Google Gemini API Key"
              className="hover-lift"
              style={{
                background: geminiKey ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                color: '#fff',
                cursor: 'pointer',
                padding: '0.35rem 0.65rem',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Key size={14} />
              <span>{geminiKey ? 'API Key Saved' : 'Set Gemini Key'}</span>
            </button>

            <button
              onClick={() => setAiChatbotOpen(false)}
              className="hover-lift"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                color: '#fff',
                cursor: 'pointer',
                padding: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Optional Gemini API Key Drawer */}
        {showKeyConfig && (
          <form onSubmit={handleSaveKey} style={{ padding: '0.85rem 1.15rem', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid var(--border-glass)', display: 'flex', gap: '0.6rem' }}>
            <input
              type="password"
              placeholder="Paste Google Gemini API Key (AIzaSy...)"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              style={{
                flex: 1,
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-glass)',
                background: 'rgba(9, 13, 22, 0.8)',
                color: 'var(--text-main)',
                fontSize: '0.8rem'
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm hover-lift" style={{ borderRadius: 'var(--radius-sm)' }}>
              Save Key
            </button>
          </form>
        )}

        {/* Chat Messages Body */}
        <div style={{
          flex: 1,
          padding: '1.15rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.95rem',
          background: 'rgba(9, 13, 22, 0.6)'
        }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justify: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                gap: '0.6rem'
              }}
              className="animate-fade-in-up"
            >
              {msg.sender === 'ai' && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <Bot size={16} />
                </div>
              )}

              <div style={{
                maxWidth: '82%',
                padding: '0.85rem 1.15rem',
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)' : 'rgba(23, 32, 54, 0.8)',
                color: msg.sender === 'user' ? '#fff' : 'var(--text-main)',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-glass)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(99, 102, 241, 0.35)' : 'var(--shadow-sm)',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading Dots */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} className="animate-spin" />
              </div>
              <div style={{ padding: '0.6rem 1rem', background: 'rgba(23, 32, 54, 0.8)', borderRadius: '20px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Gemini AI is thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Chips */}
        <div style={{ padding: '0.6rem 1.15rem', background: 'rgba(15, 23, 42, 0.7)', borderTop: '1px solid var(--border-glass)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp)}
              className="hover-lift"
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-glass)',
                background: 'rgba(23, 32, 54, 0.7)',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Zap size={12} style={{ display: 'inline', marginRight: 4, color: '#fbbf24' }} />
              {qp}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="search-input-wrapper"
          style={{
            padding: '0.95rem 1.15rem',
            background: 'rgba(15, 23, 42, 0.85)',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          <input
            type="text"
            placeholder="Ask Gemini AI about Class 10/12 notes, concepts..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={{
              flex: 1,
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-glass)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary hover-lift"
            style={{ borderRadius: 'var(--radius-full)', width: '40px', height: '40px', padding: 0 }}
          >
            <Send size={17} />
          </button>
        </form>

      </div>
    </div>
  );
};
