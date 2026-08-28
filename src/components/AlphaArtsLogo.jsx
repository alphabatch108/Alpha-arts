import React from 'react';

const getLogoUrl = () => `${import.meta.env.BASE_URL}logo.png`;

export const AlphaArtsLogo = ({ 
  showText = true, 
  layout = 'horizontal', // 'horizontal' | 'vertical'
  iconSize = 42, 
  textSize = '1.35rem',
  className = '',
  style = {}
}) => {
  const logoSrc = getLogoUrl();

  if (layout === 'vertical') {
    return (
      <div 
        className={`alpha-arts-logo ${className}`}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          userSelect: 'none',
          ...style
        }}
      >
        <img 
          src={logoSrc} 
          alt="Alpha Arts Logo" 
          style={{ width: `${iconSize * 3.8}px`, height: 'auto', display: 'block', borderRadius: '8px' }} 
        />
      </div>
    );
  }

  return (
    <div 
      className={`alpha-arts-logo ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.65rem',
        userSelect: 'none',
        ...style
      }}
    >
      <img 
        src={logoSrc} 
        alt="Alpha Arts Logo" 
        style={{ 
          height: `${iconSize * 1.1}px`, 
          width: 'auto', 
          objectFit: 'contain', 
          display: 'block',
          borderRadius: '4px'
        }} 
      />
    </div>
  );
};

export const AlphaArtsIcon = ({ size = 42, className = '', style = {} }) => {
  return (
    <img 
      src={getLogoUrl()} 
      alt="Alpha Arts Icon" 
      className={className}
      style={{ 
        height: `${size}px`, 
        width: 'auto', 
        objectFit: 'contain', 
        display: 'block',
        borderRadius: '4px',
        ...style 
      }} 
    />
  );
};

export default AlphaArtsLogo;
