import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const AdBanner = ({ 
  slot = 'homepageBanner', 
  type = '728x90', // '728x90' | '300x600' | '300x250' | 'responsive'
  label = null,
  style = {} 
}) => {
  const { adsSettings } = useApp();
  const adRef = useRef(null);

  // Ensure ads are enabled by default unless explicitly turned off
  const isEnabled = adsSettings?.enabled !== false;
  const isSlotEnabled = !slot || adsSettings?.[slot] !== false;

  // Default to official verified site Publisher ID if none is set in context
  const rawPublisherId = adsSettings?.publisherId || 'ca-pub-4733389173568893';

  const formattedPublisherId = React.useMemo(() => {
    if (!rawPublisherId) return '';
    const clean = rawPublisherId.trim();
    if (clean.startsWith('ca-pub-')) return clean;
    if (clean.startsWith('pub-')) return `ca-${clean}`;
    return `ca-pub-${clean}`;
  }, [rawPublisherId]);

  useEffect(() => {
    if (!isEnabled || !isSlotEnabled || !formattedPublisherId) return;
    
    // Inject Google AdSense script dynamically if publisher ID is configured and script is not yet added
    if (typeof window !== 'undefined') {
      const scriptId = 'google-adsense-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${formattedPublisherId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    }

    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && adRef.current) {
          // Verify element has not already been filled by Google AdSense
          if (!adRef.current.getAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (e) {
        console.warn('AdSense push notice:', e);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [slot, formattedPublisherId, isEnabled, isSlotEnabled]);

  if (!isEnabled || !isSlotEnabled) {
    return null;
  }

  const hasAdSenseId = Boolean(formattedPublisherId);

  // Compute exact Google AdSense official IAB dimensions & format attributes
  let bannerMaxWidth = '728px';
  let bannerHeight = '90px';
  let adFormat = 'horizontal';
  let bannerTitle = '728x90 Leaderboard Banner';

  if (type === '300x600') {
    bannerMaxWidth = '300px';
    bannerHeight = '600px';
    adFormat = 'vertical';
    bannerTitle = '300x600 Half-Page Skyscraper';
  } else if (type === '300x250') {
    bannerMaxWidth = '300px';
    bannerHeight = '250px';
    adFormat = 'rectangle';
    bannerTitle = '300x250 Medium Rectangle';
  } else if (type === 'responsive') {
    bannerMaxWidth = '100%';
    bannerHeight = '90px';
    adFormat = 'auto';
    bannerTitle = 'Responsive Auto-Ad Banner';
  }

  const displayLabel = label || `Google AdSense — ${bannerTitle}`;
  const customNotice = adsSettings?.customNotice || 'Sponsored Educational Announcement';

  return (
    <aside 
      className="ad-banner-wrapper animate-fade-in-up"
      style={{
        width: '100%',
        maxWidth: bannerMaxWidth,
        minHeight: bannerHeight,
        margin: '1.5rem auto',
        borderRadius: '12px',
        background: 'rgba(15, 23, 42, 0.75)',
        border: '1.5px dashed rgba(37, 99, 235, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        padding: '0.5rem',
        ...style
      }}
    >
      {hasAdSenseId ? (
        <div style={{ width: '100%', overflow: 'hidden', minHeight: bannerHeight, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
            {customNotice}
          </div>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', textAlign: 'center', width: '100%', minHeight: bannerHeight }}
            data-ad-client={formattedPublisherId}
            data-ad-slot="auto"
            data-ad-format={adFormat}
            data-full-width-responsive={type === 'responsive' ? 'true' : 'false'}
          />
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          color: '#94a3b8',
          fontSize: '0.825rem',
          fontWeight: 600,
          textAlign: 'center',
          padding: '0.85rem 1.25rem',
          userSelect: 'none'
        }}>
          <span style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            background: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            padding: '0.2rem 0.75rem',
            borderRadius: '9999px',
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}>
            📢 {customNotice}
          </span>
          <span style={{ color: '#f8fafc', fontWeight: 700 }}>{displayLabel}</span>
          <span style={{ fontSize: '0.725rem', color: '#64748b' }}>
            (To show live Google Ads: Enter your Publisher ID in Admin Governance Console ⚙️)
          </span>
        </div>
      )}
    </aside>
  );
};

