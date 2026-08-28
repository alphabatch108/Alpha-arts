import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const AdBanner = ({ 
  slot = 'homepageBanner', 
  type = '728x90', // '728x90' | '300x600' | '300x250' | 'responsive'
  label = null,
  style = {} 
}) => {
  const { adsSettings } = useApp();

  const rawPublisherId = adsSettings?.publisherId || '';

  const formattedPublisherId = React.useMemo(() => {
    if (!rawPublisherId) return '';
    const clean = rawPublisherId.trim();
    if (clean.startsWith('ca-pub-')) return clean;
    if (clean.startsWith('pub-')) return `ca-${clean}`;
    return `ca-pub-${clean}`;
  }, [rawPublisherId]);

  useEffect(() => {
    if (!adsSettings?.enabled || !adsSettings[slot] || !formattedPublisherId) return;
    
    const timer = setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {}
    }, 150);

    return () => clearTimeout(timer);
  }, [slot, formattedPublisherId, adsSettings]);

  if (!adsSettings?.enabled) {
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

  return (
    <aside 
      className="ad-banner-wrapper"
      style={{
        width: '100%',
        maxWidth: bannerMaxWidth,
        height: hasAdSenseId ? 'auto' : bannerHeight,
        minHeight: bannerHeight,
        margin: '1.5rem auto',
        borderRadius: '12px',
        background: 'var(--bg-card)',
        border: '1px dashed var(--border-glass-bright)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
        ...style
      }}
    >
      {hasAdSenseId ? (
        <div style={{ width: '100%', overflow: 'hidden', minHeight: bannerHeight, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ins
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
          color: 'var(--text-dim)',
          fontSize: '0.8rem',
          fontWeight: 600,
          textAlign: 'center',
          padding: '0.75rem 1rem',
          userSelect: 'none'
        }}>
          <span style={{
            fontSize: '0.675rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#2563eb',
            background: 'rgba(37, 99, 235, 0.12)',
            padding: '0.15rem 0.65rem',
            borderRadius: '9999px',
            fontWeight: 700
          }}>
            GOOGLE ADSENSE AD SLOT
          </span>
          <span>{displayLabel}</span>
        </div>
      )}
    </aside>
  );
};
