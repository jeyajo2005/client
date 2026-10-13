import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { data } = usePortfolio();
  const about = data.about || {};

  const highlights = about.highlights && about.highlights.length > 0 ? about.highlights : [
    'Specialized 20 MW Non-IBR Power Plant Structures',
    'ACC (Air-Cooled Condenser) Erection Expertise',
    'High-Elevation Clinker Silo & Packing Plants',
    'Rotary Kilns, Coal Mills & Crusher Stations'
  ];

  const coreValues = about.coreValues && about.coreValues.length > 0 ? about.coreValues : [
    'Rigorous Dimensional Tolerance',
    'Zero Compromise Safety Culture',
    'Experienced On-Site Leadership',
    'Proactive Client Coordination'
  ];

  return (
    <section id="about" style={{ padding: '5rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
          
          {/* Left Column: Narrative */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {about.tagline || 'About Thirupathi Engineers'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, margin: '0 0 1.5rem 0' }}>
              {about.heading || 'Founded on Integrity, Engineered for Heavy Industry'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {about.intro || 'Thirupathi Engineers is a premier mechanical industrial structural and equipment erection partnership firm based in Tamil Nadu, India.'}
            </p>
            <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.6, marginBottom: '2rem' }}>
              {about.history || 'Senior partner M. Mohan began his career in steel plant construction in 1985 and expanded into cement plant erection in 1990, bringing over five decades of deep lineage.'}
            </p>

            {/* Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#C5A059', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1E293B', lineHeight: 1.4 }}>{h}</span>
                </div>
              ))}
            </div>

            {/* Mission & Vision Callout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', paddingTop: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>Our Mission</h4>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>{about.mission || 'To execute complex heavy structural fabrication and equipment erection with unmatched safety standards.'}</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>Our Vision</h4>
                <p style={{ fontSize: '0.8125rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>{about.vision || 'To be recognized as India?s benchmark partner for heavy industrial structures.'}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Box */}
          <div style={{ position: 'relative' }}>
            <div style={{
              backgroundColor: '#0F172A',
              border: '2px solid #C5A059',
              padding: '0.5rem',
              boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)'
            }}>
              <img 
                src={about.image || '/assets/about-engineering.jpg'} 
                alt="Thirupathi Engineers Heavy Industrial Erection"
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', minHeight: '380px' }}
                onError={(e) => { e.currentTarget.src = '/assets/project-power-plant.jpg'; }}
              />
            </div>

            {/* Years of Experience Floating Card */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '-1rem',
              backgroundColor: '#FFFFFF',
              border: '2px solid #0F172A',
              padding: '1.25rem 1.75rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#C5A059', lineHeight: 1 }}>
                {about.experienceYears || '50+'}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>
                Years Lineage
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
