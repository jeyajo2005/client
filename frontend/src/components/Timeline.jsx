import React from 'react';
import { Calendar, Building, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Timeline() {
  const { data } = usePortfolio();
  const experiences = (data.timeline && data.timeline.length > 0) ? data.timeline : (data.experience || []);

  return (
    <section id="track-record" style={{ padding: '5.5rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            UNBROKEN INDUSTRY LINEAGE
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: '0 0 1rem 0' }}>
            50+ Year Track Record & Milestones
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
            Traceable lineage from early steel plant construction in 1985, to modern 20 MW power plants and clinker silo superstructures.
          </p>
        </div>

        {/* Timeline Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {experiences.map((item, idx) => (
            <div
              key={item._id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Year Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', backgroundColor: '#0F172A', color: '#C5A059', padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', width: 'fit-content', marginBottom: '1.25rem' }}>
                <Calendar size={12} />
                <span>{item.period || item.year || item.value || 'Milestone'}</span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, margin: '0 0 0.5rem 0' }}>
                {item.title || item.label || 'Engineering Milestone'}
              </h3>

              {(item.company || item.client) && (
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C5A059', marginBottom: '1rem' }}>
     1             {item.company || item.client}
                </div>
              )}

              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.55, margin: '0 0 1.25rem 0', flex: 1 }}>
                {item.description || item.subtext || ''}
              </p>

              {item.achievements && item.achievements.length > 0 && (
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                  {item.achievements.map((ach, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <CheckCircle2 size={14} style={{ color: '#C5A059', flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.78rem', color: '#334155' }}>{ach}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
