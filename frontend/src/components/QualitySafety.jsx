import React from 'react';
import { ShieldCheck, HardHat, AlertTriangle, CheckCircle2, FileCheck2, Activity } from 'lucide-react';
import { qualitySafety } from '../data/portfolioData';

export default function QualitySafety() {
  return (
    <section 
      id="safety" 
      className="section" 
      style={{ 
        backgroundColor: '#090D14', 
        borderBottom: '1px solid var(--border-hairline)' 
      }}
    >
      <div className="container">
        
        {/* Quality & Safety Banner Card */}
        <div 
          style={{
            backgroundColor: '#0E131C',
            border: '1px solid rgba(255, 85, 0, 0.3)',
            borderRadius: '1rem',
            padding: '3.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="safety-box"
        >
          {/* Subtle Background Glow */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 85, 0, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }} className="safety-grid">
            
            {/* Left Column: HSE Philosophy */}
            <div>
              <div className="section-eyebrow">
                [ 06 // QUALITY, SAFETY & WORKMANSHIP ]
              </div>

              <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', marginBottom: '1.25rem' }}>
                Safety First. Zero Incident. <br />
                <span style={{ color: 'var(--orange-primary)' }}>Certified HSE Workmanship.</span>
              </h2>

              <p style={{
                fontSize: '0.96rem',
                color: '#C7D1DE',
                lineHeight: 1.75,
                marginBottom: '2rem'
              }}>
                {qualitySafety.safetyDesc}
              </p>

              {/* Status Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span className="tech-badge orange">
                  <HardHat size={14} /> 100% PPE COMPLIANCE
                </span>
                <span className="tech-badge">
                  <FileCheck2 size={14} /> DAILY TOOLBOX TALKS
                </span>
                <span className="tech-badge">
                  <ShieldCheck size={14} /> CERTIFIED RIGGING HARDWARE
                </span>
              </div>
            </div>

            {/* Right Column: 6 Safety Protocols Checklist */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-hairline)',
              borderRadius: '0.75rem',
              padding: '2rem'
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--orange-primary)',
                letterSpacing: '0.1em',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Activity size={15} />
                <span>ON-SITE SAFETY & QC BENCHMARKS</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {qualitySafety.protocols.map((protocol, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 85, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <CheckCircle2 size={13} style={{ color: 'var(--orange-primary)' }} />
                    </div>
                    <span style={{ fontSize: '0.9rem', color: '#F0F6FC', fontWeight: 500, lineHeight: 1.4 }}>
                      {protocol}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .safety-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .safety-box {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
