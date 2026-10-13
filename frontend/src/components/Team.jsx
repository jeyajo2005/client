import React from 'react';
import { Award, CheckCircle2, UserCheck, Shield, Clock, Briefcase } from 'lucide-react';
import { partners } from '../data/portfolioData';

export default function Team() {
  return (
    <section 
      id="partners" 
      className="section" 
      style={{ 
        backgroundColor: '#090D14', 
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
              [ 04 // LEADERSHIP & PARTNER PROFILES ]
            </div>
            <h2 className="section-title" style={{ margin: 0 }}>
              Hands-On Engineering Leadership <br />
              <span style={{ color: 'var(--orange-primary)' }}>& Decades of Field Mastery</span>
            </h2>
          </div>

          <p style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            lineHeight: 1.7,
            margin: 0
          }}>
            Every industrial project undertaken by THIRUPATHI ENGINEERS is directly planned, supervised, and executed under the personal on-site stewardship of our founding partners.
          </p>
        </div>

        {/* 2 Partners Profile Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
            gap: '2.5rem'
          }}
          className="partners-grid"
        >
          {partners.map((partner) => (
            <div 
              key={partner.id}
              className="tech-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: '#0E131C'
              }}
            >
              <div>
                {/* Top Badge & Experience Counter */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.5rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <span className="tech-badge orange">
                    {partner.badge}
                  </span>

                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Clock size={13} style={{ color: 'var(--orange-primary)' }} />
                    {partner.experience}
                  </span>
                </div>

                {/* Partner Name & Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '0.35rem'
                }}>
                  {partner.name}
                </h3>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--orange-primary)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase'
                }}>
                  {partner.role} • THIRUPATHI ENGINEERS
                </div>

                {/* Professional Bio */}
                <p style={{
                  fontSize: '0.92rem',
                  color: '#C7D1DE',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem'
                }}>
                  {partner.bio}
                </p>

                {/* Key Milestones List */}
                <div style={{
                  borderTop: '1px solid var(--border-hairline)',
                  paddingTop: '1.5rem',
                  marginBottom: '1.75rem'
                }}>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.85rem'
                  }}>
                    CAREER MILESTONES & CONTRIBUTIONS
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {partner.milestones.map((m, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--orange-primary)', flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Specialization Tags */}
              <div style={{
                borderTop: '1px solid var(--border-hairline)',
                paddingTop: '1.25rem'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {partner.expertise.map((exp, eIdx) => (
                    <span 
                      key={eIdx}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '0.35rem 0.65rem',
                        borderRadius: '0.25rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--border-hairline)',
                        color: '#FFFFFF'
                      }}
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
