import React from 'react';
import { Anchor, Cpu, Compass, Layers, CheckCircle2, ShieldCheck, Gauge } from 'lucide-react';
import { capabilities } from '../data/portfolioData';

export default function Capabilities() {
  const capabilityIcons = [Anchor, Compass, Layers, Gauge];

  return (
    <section 
      id="capabilities" 
      className="section" 
      style={{ 
        backgroundColor: 'var(--bg-canvas)', 
        borderBottom: '1px solid var(--border-hairline)' 
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '4.5rem'
        }}>
          <div>
            <div className="section-eyebrow">
              [ 05 // CONSTRUCTION CAPABILITIES ]
            </div>
            <h2 className="section-title" style={{ margin: 0 }}>
              Heavy Erection Engineering <br />
              <span style={{ color: 'var(--orange-primary)' }}>& On-Site Capabilities</span>
            </h2>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            maxWidth: '460px',
            lineHeight: 1.7,
            margin: 0
          }}>
            Combining high-capacity crane coordination, optical laser alignment, and calibrated mechanical assembly to execute critical-path shutdown jobs with zero delay.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {capabilities.map((cap, idx) => {
            const Icon = capabilityIcons[idx % capabilityIcons.length] || Layers;

            return (
              <div 
                key={idx}
                className="tech-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.25rem'
                }}
              >
                <div>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 85, 0, 0.1)',
                    border: '1px solid rgba(255, 85, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--orange-primary)',
                    marginBottom: '1.5rem'
                  }}>
                    <Icon size={22} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: 1.35,
                    marginBottom: '1rem'
                  }}>
                    {cap.title}
                  </h3>

                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0
                  }}>
                    {cap.description}
                  </p>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '1rem',
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <ShieldCheck size={14} style={{ color: 'var(--orange-primary)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    RIGOROUS QC VERIFIED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
