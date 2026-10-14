import React, { useState, useEffect } from 'react';
import { X, Send, Phone, Mail, AlertCircle, Building2, CheckCircle2 } from 'lucide-react';
import { companyInfo, partners } from '../data/portfolioData';

export default function ConsultationModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectScope: 'Industrial Steel Structure Erection',
    targetSchedule: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }
    setFormStatus('needs_backend');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2.5rem' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
            <span>PROJECT CONSULTATION</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.65rem',
            fontWeight: 800,
            color: 'var(--color-dark-navy)',
            marginBottom: '0.4rem'
          }}>
            Discuss Your Industrial Erection Project
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
            Connect with partners <strong>M. Mohan</strong> and <strong>K. Gopalakrishnan</strong> to review structural drawings, erection schedules, and plant shutdown requirements.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                CONTACT NAME *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                COMPANY / EPC FIRM *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company / Client Name"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                PHONE NUMBER *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 90432 88002"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                EMAIL ADDRESS *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="modal-row">
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                PROJECT CATEGORY
              </label>
              <select
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <option value="Industrial Steel Structure Erection">Industrial Steel Structure Erection</option>
                <option value="Cement Plant Construction & Erection">Cement Plant Construction & Erection</option>
                <option value="Power Plant Structural Erection">Power Plant Structural Erection</option>
                <option value="Clinker Silo Structural Work">Clinker Silo Structural Work</option>
                <option value="Conveyor Gallery Erection">Conveyor Gallery Erection</option>
                <option value="Kiln & Coal Mill Building">Kiln & Coal Mill Building</option>
                <option value="Washing & Packing Plant Erection">Washing & Packing Plant Erection</option>
                <option value="Plant Commissioning Support">Plant Commissioning Support</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                TARGET TIMELINE / SCHEDULE
              </label>
              <input
                type="text"
                value={formData.targetSchedule}
                onChange={(e) => setFormData({ ...formData, targetSchedule: e.target.value })}
                placeholder="e.g. Immediate / Q3 2026"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-metallic)',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-dark-navy)', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
              PROJECT BRIEF & SCOPE DETAILS *
            </label>
            <textarea
              rows={3}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Outline equipment or structural tonnage, site location, target commissioning dates..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
                border: '1px solid var(--border-metallic)',
                fontSize: '0.92rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          {formStatus === 'needs_backend' && (
            <div style={{
              backgroundColor: 'var(--color-blue-light)',
              border: '1px solid var(--border-metallic)',
              borderRadius: '6px',
              padding: '0.85rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.65rem'
            }}>
              <AlertCircle size={16} style={{ color: 'var(--color-primary-blue)', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.82rem', color: 'var(--color-dark-navy)', lineHeight: 1.5 }}>
                <strong>Direct Contact Recommended:</strong> This form requires a mail backend service. Please email our partners directly at <a href="mailto:thirupathiengineerings@gmail.com" style={{ color: 'var(--color-primary-blue)', fontWeight: 700 }}>thirupathiengineerings@gmail.com</a> or call <strong>+91 9043288002</strong>.
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0.85rem', width: '100%', fontSize: '0.95rem' }}
          >
            <Send size={15} />
            <span>Send Project Inquiry</span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Direct telephone hotline: {' '}
              <a href={`tel:${companyInfo.phones[0].value}`} style={{ color: 'var(--color-primary-blue)', fontWeight: 700, textDecoration: 'none' }}>
                {companyInfo.phones[0].display}
              </a>
            </span>
          </div>

        </form>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .modal-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
