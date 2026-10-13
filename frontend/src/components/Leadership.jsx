import React from 'react';
import { Award, Briefcase, CheckCircle2, User } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Leadership() {
  const { data } = usePortfolio();
  const team = data.team || [];

  return (
    <section id="leadership" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            SENIOR INDUSTRIAL LEADERSHIP
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: '0 0 1rem 0' }}>
            Partners & Key Engineering Directors
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
            Active on-site engineering leadership ensuring direct partner supervision across every critical lift and structural alignment.
          </p>
        </div>

        {/* Partners Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
          {team.map((member, idx) => (
            <div
              key={member._id || idx}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Partner Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#0F172A',
                  border: '2px solid #C5A059',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#C5A059',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {member.initials || 'TE'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {member.shortRole || member.role}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                    {member.experienceDisplay}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1.5rem 0', flex: 1 }}>
                {member.description}
              </p>

              {/* Key Disciplines */}
              {member.keyDisciplines && member.keyDisciplines.length > 0 && (
                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.625rem' }}>
                    Key Focus Areas:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {member.keyDisciplines.map((d, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#1E293B', fontWeight: 600 }}>
                        <span style={{ width: '4px', height: '4px', backgroundColor: '#C5A059', borderRadius: '50%' }}></span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
