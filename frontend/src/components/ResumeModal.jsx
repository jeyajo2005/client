import React, { useEffect } from 'react';
import { X, Download, Printer, CheckCircle2, GraduationCap, Briefcase, Award, Mail } from 'lucide-react';
import { personalInfo, experience, educationAndCertifications, skills } from '../data/portfolioData';

export default function ResumeModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px' }}
      >
        {/* Modal Top Bar */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid var(--slate-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-subtle)'
        }}>
          <div>
            <span className="badge-gold">CURRICULUM VITAE PREVIEW</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              {personalInfo.name} — Full Stack Engineer
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={handlePrint}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.45rem 0.85rem' }}
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--slate-200)',
                background: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} color="var(--navy-900)" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div style={{ padding: '2.5rem', maxHeight: '72vh', overflowY: 'auto' }}>
          
          {/* Header section */}
          <div style={{ borderBottom: '2px solid var(--slate-200)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {personalInfo.name}
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--gold-dark)', fontWeight: 600, marginTop: '2px' }}>
              {personalInfo.role} • {personalInfo.location}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--slate-600)' }}>
              <span>Email: {personalInfo.email}</span>
              <span>Phone: {personalInfo.phone}</span>
              <span>Status: {personalInfo.status}</span>
            </div>
          </div>

          {/* Executive Summary */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Professional Summary
            </h3>
            <p style={{ color: 'var(--slate-700)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {personalInfo.shortBio} Proven track record building enterprise web solutions, optimizing core web vitals to 98+, and delivering resilient cloud systems for thousands of active users.
            </p>
          </div>

          {/* Technical Skills Grid */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Core Competencies & Stack
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
              <div><strong>Frontend:</strong> React.js, JavaScript (ES6+), HTML5, Modern CSS3, Bootstrap</div>
              <div><strong>Backend:</strong> Node.js, Express.js, RESTful APIs, JWT Authentication</div>
              <div><strong>Databases:</strong> MongoDB (NoSQL), SQL (PostgreSQL / MySQL)</div>
              <div><strong>Tools & DevOps:</strong> Git, GitHub Actions, Vite, Postman, Agile CI/CD</div>
            </div>
          </div>

          {/* Work Experience */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Work & Internship Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.95rem' }}>
                      {exp.role} — <span style={{ color: 'var(--gold-dark)' }}>{exp.company}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--slate-500)' }}>
                      {exp.period}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '0.35rem' }}>
                    {exp.location} ({exp.type})
                  </div>
                  <p style={{ color: 'var(--slate-600)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--navy-900)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--slate-200)', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Education & Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {educationAndCertifications.map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)', fontSize: '0.9rem' }}>
                      {item.degree}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                      {item.year}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    {item.institution}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    {item.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
