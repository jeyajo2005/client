import React from 'react';
import { clientLogos } from '../data/portfolioData';

export default function ClientBar() {
  return (
    <section 
      style={{
        backgroundColor: '#0A0E15',
        borderBottom: '1px solid var(--border-hairline)',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase'
          }}>
            [ INDUSTRIAL CLIENTS & ASSOCIATED PROJECT ORGANIZATIONS ]
          </div>
          
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--orange-primary)',
            letterSpacing: '0.08em'
          }}>
            PROVEN TRACK RECORD ACROSS HEAVY INDUSTRY
          </div>
        </div>

        {/* Client Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          {clientLogos.map((client, idx) => (
            <div 
              key={idx}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-hairline)',
                borderRadius: '0.5rem',
                padding: '1.15rem 1rem',
                textAlign: 'center',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 85, 0, 0.4)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 85, 0, 0.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hairline)';
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.92rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                color: '#FFFFFF',
                marginBottom: '0.25rem'
              }}>
                {client.name}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em'
              }}>
                {client.type}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
