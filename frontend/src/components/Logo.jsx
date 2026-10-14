import React from 'react';

/**
 * ThirupathiENGINEERINGLogo / Wordmark
 * Clean typographic brand representation for THIRUPATHI ENGINEERING.
 * Rendered without any icon/emblem as requested ("logo vea vendam").
 */
export default function Logo({
  size = 'md',
  showIcon = false, // Icon disabled - pure typography wordmark
  variant = 'light', // 'light' (white text on dark bg) or 'dark' (dark text on white bg)
  subtitle = 'Partnership Firm • Industrial Erection'
}) {
  const dimensions = {
    sm: { titleSize: '1.15rem', subSize: '0.62rem' },
    md: { titleSize: '1.35rem', subSize: '0.68rem' },
    lg: { titleSize: '1.65rem', subSize: '0.75rem' }
  };

  const dim = dimensions[size] || dimensions.md;
  const isDarkText = variant === 'dark';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1.15, userSelect: 'none' }}>
      <div style={{
        fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
        fontSize: dim.titleSize,
        fontWeight: 800,
        letterSpacing: '0.04em',
        color: isDarkText ? '#0F172A' : '#FFFFFF',
        whiteSpace: 'nowrap'
      }}>
        THIRUPATHI <span style={{ color: '#FF5500' }}>ENGINEERING</span>
      </div>

      {subtitle && (
        <div style={{
          fontSize: dim.subSize,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isDarkText ? '#64748B' : 'rgba(255, 255, 255, 0.65)',
          fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
          marginTop: '4px',
          whiteSpace: 'nowrap'
        }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
