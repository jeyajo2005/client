import React from 'react';
import { Factory, ShieldCheck, Cog, CheckCircle2, Building2, Users } from 'lucide-react';
import { companyInfo, partners } from '../data/portfolioData';

export default function CompanyOverview() {
  const coreFocusAreas = [
    {
      title: "Industrial Steel Structure Erection",
      desc: "Assembly, plumb alignment, and torque bolting of heavy industrial frameworks, towers, and piperacks."
    },
    {
      title: "Cement Plant Construction & Erection",
      desc: "Mechanical and structural erection across preheaters, kilns, mills, clinker silos, and packing plants."
    },
    {
      title: "Power Plant Structural Work",
      desc: "Non-IBR structural steel erection, boiler house auxiliaries, and air-cooled condenser (ACC) cooling towers."
    },
    {
      title: "Coal Handling & Conveying Structures",
      desc: "Long-span conveyor bridges, junction towers, stockyard stacker-reclaimers, and tripper mechanisms."
    },
    {
      title: "Plant Installation & Commissioning Support",
      desc: "Drive train laser alignment, heavy equipment positioning, and mechanical handover support."
    }
  ];

  return (
    <section
      id="about"
      className="section"
      style={{
        backgroundColor: 'var(--bg-light-gray)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">

        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
          <div className="section-tag">
            <span>ABOUT THIRUPATHI ENGINEERING</span>
          </div>

          <h2 className="section-heading">
            Built on Experience. <br />
            <span style={{ color: 'var(--color-primary-blue)' }}>Driven by Engineering.</span>
          </h2>

          <p className="section-subtext">
            THIRUPATHI ENGINEERING is a partnership firm specializing in heavy industrial construction and mechanical erection.
            Led by experienced industrial professionals, the firm brings together deep practical knowledge, meticulous site coordination, and disciplined engineering execution across major manufacturing and power facilities.
          </p>
        </div>

        {/* Overview Grid: Left Narrative + Right Focus Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="overview-grid"
        >

          {/* Left Column: Narrative Card */}
          <div className="industrial-card" style={{ padding: '2.5rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: 'var(--color-dark-navy)',
              marginBottom: '1.25rem'
            }}>
              Partnership Leadership in Industrial Erection
            </h3>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Founded as an industrial partnership by <strong>M. Mohan</strong> and <strong>K. Gopalakrishnan</strong>, our operations are rooted in decades of hands-on fieldwork in steel manufacturing facilities, cement plant expansions, and power sector structural installations.
            </p>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-body)', lineHeight: 1.75, marginBottom: '2rem' }}>
              We understand that industrial construction requires absolute precision — where crane rigging, elevation tolerances, and bolt torque specifications directly dictate plant reliability and operational safety.
            </p>

            {/* Core Pillars */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--color-primary-blue)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark-navy)' }}>
                  Rigorous On-Site Safety Awareness & Hazard Management
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Cog size={18} style={{ color: 'var(--color-primary-blue)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark-navy)' }}>
                  Proven Project Coordination with Plant & EPC Teams
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-primary-blue)', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-dark-navy)' }}>
                  Workmanship Geared for High-Precision Mechanical Delivery
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: 5 Core Focus Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--color-dark-navy)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              marginBottom: '0.25rem'
            }}>
              PRIMARY AREAS OF EXECUTION
            </div>

            {coreFocusAreas.map((area, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-primary-blue)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--color-blue-light)',
                  color: 'var(--color-primary-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  flexShrink: 0
                }}>
                  0{idx + 1}
                </div>

                <div>
                  <h4 style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--color-dark-navy)',
                    marginBottom: '0.25rem'
                  }}>
                    {area.title}
                  </h4>
                  <p style={{
                    fontSize: '0.88rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.55,
                    margin: 0
                  }}>
                    {area.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 960px) {
          .overview-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
