import React, { useEffect } from 'react';
import { X, CheckCircle2, Calendar, UserCheck, Layers, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenConsultation }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0, overflow: 'hidden' }}
      >
        {/* Header Image */}
        <div style={{ position: 'relative', height: '320px', backgroundColor: 'var(--color-dark-navy)' }}>
          <img 
            src={project.image} 
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(20, 43, 74, 0.95) 0%, rgba(20, 43, 74, 0.3) 60%)'
          }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-dark-navy)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              zIndex: 10
            }}
          >
            <X size={18} />
          </button>

          {/* Title and Tags on Image */}
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: 'var(--color-primary-blue)',
                color: '#FFFFFF',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)'
              }}>
                {project.projectType}
              </span>

              {project.displayYear && (
                <span style={{
                  backgroundColor: '#FFFFFF',
                  color: 'var(--color-dark-navy)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)'
                }}>
                  {project.displayYear}
                </span>
              )}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.25,
              margin: 0
            }}>
              {project.title}
            </h3>
          </div>
        </div>

        {/* Modal Content Body */}
        <div style={{ padding: '2rem' }}>
          
          {/* Client & Scope Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            backgroundColor: 'var(--bg-light-gray)',
            borderRadius: '8px',
            padding: '1.25rem',
            marginBottom: '1.75rem',
            border: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                CLIENT / PROJECT ORGANIZATION
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginTop: '0.25rem' }}>
                {project.client || 'Client not specified publicly'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                PROJECT YEAR / PERIOD
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginTop: '0.25rem' }}>
                {project.displayYear ? project.displayYear : 'Year not specified publicly'}
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              PROJECT OVERVIEW
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.7, margin: 0 }}>
              {project.overview}
            </p>
          </div>

          {/* Scope of Work */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              SUPPLIED SCOPE OF WORK
            </div>
            <div style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-metallic)',
              borderLeft: '4px solid var(--color-primary-blue)',
              borderRadius: '4px',
              padding: '0.85rem 1.25rem',
              fontSize: '0.92rem',
              fontWeight: 600,
              color: 'var(--color-dark-navy)'
            }}>
              {project.scope}
            </div>
          </div>

          {/* Engineering Activities */}
          {project.activities && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary-blue)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                KEY ENGINEERING & ERECTION ACTIVITIES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {project.activities.map((act, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--color-primary-blue)', flexShrink: 0, marginTop: '3px' }} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                if (onOpenConsultation) onOpenConsultation();
              }}
              className="btn-primary"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}
            >
              <span>Discuss Similar Scope</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
