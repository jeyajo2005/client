import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle, ExternalLink } from 'lucide-react';
import { experience, educationAndCertifications } from '../data/portfolioData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="section bg-cream-section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-eyebrow">
            // 05 CAREER TRAJECTORY & CREDENTIALS
          </div>
          <h2 className="section-title">
            Professional Experience & <span className="text-gold-gradient">Education</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A track record of software engineering roles, academic foundations in computer science, and recognized industry certifications.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3.5rem'
        }}>
          <button
            onClick={() => setActiveTab('experience')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backgroundColor: activeTab === 'experience' ? 'var(--navy-900)' : '#FFFFFF',
              color: activeTab === 'experience' ? '#FFFFFF' : 'var(--slate-600)',
              border: activeTab === 'experience' ? '1px solid var(--navy-900)' : '1px solid var(--slate-200)',
              boxShadow: activeTab === 'experience' ? '0 4px 14px rgba(11, 19, 43, 0.15)' : 'none'
            }}
          >
            <Briefcase size={16} color={activeTab === 'experience' ? 'var(--gold-primary)' : 'var(--slate-400)'} />
            <span>Professional & Internships</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.75rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              backgroundColor: activeTab === 'education' ? 'var(--navy-900)' : '#FFFFFF',
              color: activeTab === 'education' ? '#FFFFFF' : 'var(--slate-600)',
              border: activeTab === 'education' ? '1px solid var(--navy-900)' : '1px solid var(--slate-200)',
              boxShadow: activeTab === 'education' ? '0 4px 14px rgba(11, 19, 43, 0.15)' : 'none'
            }}
          >
            <GraduationCap size={16} color={activeTab === 'education' ? 'var(--gold-primary)' : 'var(--slate-400)'} />
            <span>Education & Certifications</span>
          </button>
        </div>

        {/* Tab 1: Experience Timeline */}
        {activeTab === 'experience' && (
          <div style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
            {/* Timeline center line */}
            <div style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              backgroundColor: 'var(--slate-200)',
              zIndex: 0
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {experience.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
                  
                  {/* Timeline Node Icon */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid var(--gold-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(197, 160, 89, 0.2)'
                  }}>
                    <Briefcase size={20} color="var(--gold-dark)" />
                  </div>

                  {/* Timeline Card */}
                  <div 
                    className="card"
                    style={{
                      flex: 1,
                      padding: '2rem',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '1.25rem',
                      border: '1px solid var(--slate-200)',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-border)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--slate-200)';
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                    }}
                  >
                    {/* Period & Type */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span className="badge-gold">
                        <Calendar size={13} />
                        {item.period}
                      </span>
                      <span className="badge-navy">
                        {item.type}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.35rem' }}>
                      {item.role}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--slate-600)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--navy-800)' }}>
                        {item.company}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--slate-500)' }}>
                        <MapPin size={14} />
                        {item.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p style={{ color: 'var(--slate-600)', fontSize: '0.925rem', lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Education & Certifications */}
        {activeTab === 'education' && (
          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {educationAndCertifications.map((item, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '2rem',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '1.25rem',
                  border: '1px solid var(--slate-200)',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: item.type === 'Education' ? 'var(--navy-800)' : 'var(--gold-light)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {item.type === 'Education' ? (
                    <GraduationCap size={24} color="var(--gold-primary)" />
                  ) : (
                    <Award size={24} color="var(--gold-dark)" />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className={item.type === 'Education' ? 'badge-navy' : 'badge-gold'}>
                      {item.type.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                      {item.year}
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.25rem' }}>
                    {item.degree}
                  </h3>

                  <div style={{ fontSize: '0.9rem', color: 'var(--gold-dark)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {item.institution}
                  </div>

                  <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {item.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
