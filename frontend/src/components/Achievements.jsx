import React from 'react';
import { civilOutcomes } from '../data/portfolioData';

export default function Achievements() {
  return (
    <section id="outcomes" className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div className="section-eyebrow">
              [ 03 // MEASURABLE TRACK RECORD ]
            </div>
            <h2 className="serif-title" style={{
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              maxWidth: '620px'
            }}>
              Proven performance across strict building codes
            </h2>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            maxWidth: '380px',
            lineHeight: 1.6,
            marginBottom: '0.5rem'
          }}>
            Every calculation is stamped by licensed Professional Engineers and optimized to prevent field delays.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div style={{
          backgroundColor: 'var(--bg-canvas)',
          borderRadius: '1.25rem',
          border: '1px solid var(--border-hairline)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          padding: '3rem 2rem',
          boxShadow: '0 4px 20px -2px rgba(0,0,0,0.03)'
        }}>
          {civilOutcomes.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem 2rem',
                borderRight: idx < civilOutcomes.length - 1 ? '1px solid var(--border-hairline)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              className="metric-column"
            >
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(2.5rem, 3.8vw, 3.4rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  marginBottom: '1rem'
                }}>
                  {item.number}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {item.label}
                </h3>
              </div>

              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55
              }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .metric-column {
            border-right: none !important;
            border-bottom: 1px solid var(--border-hairline);
            padding: 2rem 0 !important;
          }
          .metric-column:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
