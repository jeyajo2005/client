import React from 'react';
import { workApproach } from '../data/portfolioData';

export default function WorkProcess() {
  return (
    <section 
      style={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <span>OUR WORKING APPROACH</span>
          </div>

          <h2 className="section-heading">
            A Disciplined Five-Stage <br />
            <span style={{ color: 'var(--color-primary-blue)' }}>Industrial Erection Workflow</span>
          </h2>

          <p className="section-subtext">
            Our proposed working approach reflects standard industry practice for heavy steel and mechanical plant erection, emphasizing careful pre-planning and tight coordination with client and EPC teams.
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.5rem',
            position: 'relative'
          }}
          className="process-grid"
        >
          {workApproach.map((step, idx) => (
            <div 
              key={idx}
              className="industrial-card"
              style={{
                padding: '1.75rem 1.5rem',
                backgroundColor: 'var(--bg-light-gray)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                
                {/* Step Number */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--color-primary-blue)',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>STAGE {step.step}</span>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary-blue)' }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.08rem',
                  fontWeight: 700,
                  color: 'var(--color-dark-navy)',
                  lineHeight: 1.35,
                  marginBottom: '0.65rem'
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {step.description}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
