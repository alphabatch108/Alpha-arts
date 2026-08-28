import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ChevronUp, Bot, LifeBuoy, Sparkles } from 'lucide-react';
import { AdBanner } from './AdBanner';

export const SupportSection = () => {
  const { faqs, setAiChatbotOpen } = useApp();
  const [activeFaqTab, setActiveFaqTab] = useState('All');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [faqQuery, setFaqQuery] = useState('');

  // FAQ categories
  const faqCategories = ['All', 'Downloads & Access', 'Curriculum & Boards', 'YouTube Lectures', 'Account & Security'];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = activeFaqTab === 'All' || faq.category === activeFaqTab;
    const matchesQuery = faq.question.toLowerCase().includes(faqQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(faqQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section style={{ marginBottom: '3.5rem' }}>
      
      {/* Top Support Ad Space Banner */}
      <AdBanner slot="sidebar" />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem', letterSpacing: '0.04em' }}>
          <LifeBuoy size={16} />
          <span>Help Center & FAQs</span>
        </div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.3rem)', fontWeight: 800, marginBottom: '0.6rem' }}>
          How Can We Help You Today?
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          Browse our frequently asked questions or ask our instant AI Assistant!
        </p>

        {/* AI Chatbot Launcher Banner */}
        <div 
          onClick={() => setAiChatbotOpen(true)}
          className="hover-lift support-ai-banner"
          style={{
            marginTop: '1.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.95rem',
            padding: '0.9rem 1.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.22) 0%, rgba(99, 102, 241, 0.22) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 182, 212, 0.5)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-cyan-glow), 0 8px 30px rgba(0, 0, 0, 0.35)'
          }} 
        >
          <Bot size={26} style={{ color: 'var(--accent-cyan)' }} className="float-slow" />
          <span style={{ fontWeight: 800, fontSize: '0.975rem', color: '#fff' }}>Need Quick Help? Launch AI Student Assistant</span>
          <span className="badge badge-emerald badge-glow">24/7 Active</span>
        </div>
      </div>

      {/* FAQ Accordion Box Container */}
      <div style={{ maxWidth: '920px', margin: '0 auto' }}>
        
        {/* FAQ Accordion Box */}
        <div className="glass-card-luminous" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem' }}>
              Frequently Asked Questions
            </h3>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {faqCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFaqTab(cat)}
                  className={`btn btn-sm ${activeFaqTab === cat ? 'btn-primary btn-glow' : 'btn-secondary'} filter-pill`}
                  style={{ borderRadius: 'var(--radius-full)', fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Filter FAQs by keyword..."
                value={faqQuery}
                onChange={(e) => setFaqQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-glass-bright)',
                  background: 'rgba(12, 18, 34, 0.65)',
                  color: 'var(--text-main)',
                  fontSize: '0.875rem'
                }}
              />
            </div>
          </div>

          {/* Accordion Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
            {filteredFaqs.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glass-bright)',
                    background: isOpen ? 'rgba(26, 38, 64, 0.75)' : 'rgba(12, 18, 34, 0.5)',
                    overflow: 'hidden',
                    transition: 'all var(--transition-smooth)'
                  }}
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-main)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={20} style={{ color: 'var(--accent-cyan)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.25rem 1.25rem 1.25rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      borderTop: '1px dashed var(--border-glass-bright)',
                      paddingTop: '0.95rem'
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 500px) {
          .support-ai-banner {
            flex-direction: column !important;
            border-radius: var(--radius-lg) !important;
            padding: 0.9rem 1.15rem !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
};


