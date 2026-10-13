import React from 'react';
import { Clock, Factory, Flame, Wrench, Users, ShieldCheck } from 'lucide-react';
import { whyChooseUs } from '../data/portfolioData';

export default function WhyChooseUs() {
  const icons = [Clock, Factory, Flame, Wrench, Users, ShieldCheck];

  return (
    <section 
      style={{ 
        backgroundColor: 'var(--bg-light-gray)', 
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '5rem',
        paddingBottom: '5rem'
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <span>VALUE & CAPABILITY</span>
          </div>

          <h2 className="section-heading">
            Why Choose <br />
            <span style={{ color: 'var(--color-primary-blue)' }}>THIRUPATHI ENGINEERS?</span>
          </h2>

          <p className="section-subtext">
            Key factors that distinguish our on-site execution, coordination with major EPC contractors, and dedication to heavy structural workmanship.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {whyChooseUs.map((item, idx) => {
            const Icon = icons[idx % icons.length];

            return (
              <div 
                key={idx}
                className="industrial-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-blue-light)',
                    color: 'var(--color-primary-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}>
                    <Icon size={22} />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.22rem',
                    fontWeight: 700,
                    color: 'var(--color-dark-navy)',
                    lineHeight: 1.3,
                    marginBottom: '0.75rem'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.65,
                    margin: 0
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
