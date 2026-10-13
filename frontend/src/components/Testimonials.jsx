import React from 'react';
import { Star, Quote } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Testimonials() {
  const { data } = usePortfolio();
  const testimonials = data.testimonials || [];

  return (
    <section id="clients" style={{ padding: '5.5rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            CLIENT VERIFICATION & ENDORSEMENTS
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: '0 0 1rem 0' }}>
            Trusted by Industry Leaders
          </h2>
          <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
            Direct feedback from project directors at The Ramco Cements, ISGEC Heavy Engineering, and major EPC plant developers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t, idx) => (
            <div
              key={t._id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem', color: '#F59E0B' }}>
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" />
                ))}
              </div>

              {/* Feedback text */}
              <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: '0 0 1.5rem 0', flex: 1, fontStyle: 'italic' }}>
                "{t.feedback}"
              </p>

              {/* Client Info */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
                  {t.clientName}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C5A059' }}>
                  {t.company}
                </div>
                {t.project && (
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '0.25rem' }}>
                    Project: {t.project}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
