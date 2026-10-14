import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { portfolioAPI } from '../services/api';

export default function Contact() {
  const { data } = usePortfolio();
  const settings = data.settings || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Power Plant Structural',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await portfolioAPI.sendContactMessage(formData);
      if (res.data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: 'Power Plant Structural',
          message: ''
        });
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const phones = settings.phones && settings.phones.length > 0
    ? settings.phones
    : [{ display: '+91 90432 88002', value: '9043288002' }, { display: '+91 97905 20126', value: '9790520126' }];

  const emails = settings.emails && settings.emails.length > 0
    ? settings.emails
    : ['thirupathiengineerings@gmail.com', 'gopalkannan5@gmail.com'];

  return (
    <section id="contact" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3.5rem' }}>

          {/* Left Column: Direct Inquiries Info */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              DIRECT PARTNER CONSULTATION
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: '0 0 1.25rem 0' }}>
              Discuss Your Structural Engineering Scope
            </h2>
            <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              Have an upcoming tender, power plant boiler structure, ACC cooling tower, or clinker silo erection requirement? Reach out directly to our lead partners.
            </p>

            {/* Direct Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Call Partners Direct</div>
                  {phones.map((p, i) => (
                    <a key={i} href={`tel:${p.value}`} style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: '#0F172A', textDecoration: 'none', marginTop: '0.2rem' }}>
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Official Correspondence</div>
                  {emails.map((m, i) => (
                    <a key={i} href={`mailto:${m}`} style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', textDecoration: 'none', marginTop: '0.2rem' }}>
                      {m}
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C5A059', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Registered Office</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginTop: '0.2rem' }}>
                    {settings.officeAddress || 'Tamil Nadu, India'}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 1.5rem 0' }}>
              Submit Engineering Inquiry
            </h3>

            {submitSuccess && (
              <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', color: '#065F46', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <CheckCircle2 size={18} />
                <span>Thank you! Your inquiry has been stored in MongoDB. Our partner will call you shortly.</span>
              </div>
            )}

            {submitError && (
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '1rem', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                <AlertCircle size={18} />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Ramanathan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Scope / Project Category
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                >
                  <option value="Power Plant Structural">Power Plant Non-IBR Structural</option>
                  <option value="ACC Cooling Tower">Air Cooled Condenser (ACC) Erection</option>
                  <option value="Cement Plant Erection">Cement Plant / Silo Construction</option>
                  <option value="Conveyor Gallery">Conveyor Gallery & Transfer Towers</option>
                  <option value="Crusher / Equipment">Heavy Crusher / Machinery Rigging</option>
                  <option value="Other Scope">Other Structural Requirement</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Project Description & Specifications *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline your tonnage, elevation, timeline, and location specifications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  border: '1px solid #0F172A',
                  padding: '0.875rem',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease',
                  marginTop: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor = '#C5A059';
                    e.currentTarget.style.borderColor = '#C5A059';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.backgroundColor = '#0F172A';
                    e.currentTarget.style.borderColor = '#0F172A';
                  }
                }}
              >
                <Send size={16} />
                <span>{submitting ? 'Submitting...' : 'Send Consultation Inquiry'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
