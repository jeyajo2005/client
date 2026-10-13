import React from 'react';
import { Sparkles, ShieldCheck, Activity, TrendingUp } from 'lucide-react';

export default function Principles() {
  const principles = [
    {
      number: '1',
      title: 'Bespoke Craftsmanship',
      description: 'Every interface and node is tailored from foundational wireframes to production release, rejecting generic templates in favor of bespoke architectural clarity.'
    },
    {
      number: '2',
      title: 'Zero-Failure Engineering',
      description: 'Built to withstand operational spikes with enterprise resilience, multi-tier automated failover, and strict sub-millisecond latency bounds.'
    },
    {
      number: '3',
      title: 'Monitored with Precision',
      description: 'Every operational surface incorporates rigorous telemetry, sub-second continuous metrics, and sovereign health verification.'
    },
    {
      number: '4',
      title: 'Measurable Business ROI',
      description: 'Digital systems designed directly to drive commercial enterprise valuation, institutional client retention, and market authority.'
    }
  ];

  return (
    <section id="principles" className="section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        
        {/* Centered Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-eyebrow">
            [ 05 // SYSTEM PRINCIPLES ]
          </div>
          <h2 className="serif-title" style={{
            fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)',
            marginBottom: '1.25rem'
          }}>
            Engineered for distinction. Built for longevity.
          </h2>
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            We reject the disposable and the fleeting. Every system we deploy is consciously sculpted for sovereign permanence and commercial power.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {principles.map((p) => (
            <div
              key={p.number}
              style={{
                padding: '2.5rem 2rem',
                backgroundColor: 'var(--bg-canvas)',
                borderRadius: '1.25rem',
                border: '1px solid var(--border-hairline)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-hairline)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = 'var(--bg-canvas)';
              }}
            >
              <div>
                {/* Numbered Pill badge */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-hairline)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--gold-primary)',
                  marginBottom: '1.75rem'
                }}>
                  {p.number}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '1rem'
                }}>
                  {p.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65
                }}>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
