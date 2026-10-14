import React from 'react';
import { UserCog, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const settings = data.settings || {};

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#0B1120', color: '#94A3B8', borderTop: '1px solid #1E293B', padding: '4.5rem 0 2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', marginBottom: '3.5rem' }}>

          {/* Col 1: Brand */}
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: '0.5rem' }}>
              {settings.companyName || 'Thirupathi ENGINEERING'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#C5A059', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              {settings.businessType || 'Partnership Firm'}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
              {settings.footerText || '50+ year cumulative lineage delivering power plant non-IBR structures, ACC cooling towers, clinker silos, and precision equipment erection.'}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Quick Navigation
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#home" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Home</a></li>
              <li><a href="#projects" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Projects</a></li>
              <li><a href="#gallery" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Site Gallery (3x4)</a></li>
              <li><a href="#services" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Services</a></li>
              <li><a href="#track-record" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Track Record</a></li>
              <li><a href="#contact" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a></li>
            </ul>
          </div>

          {/* Col 3: Key Competencies */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Key Focus Areas
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <li>20 MW Non-IBR Power Plants</li>
              <li>ACC Cooling Tower Modules</li>
              <li>Clinker Silos & Penthouse Framing</li>
              <li>Dry Mix Packing Plant Lines</li>
              <li>Primary Sizer Crusher Rigging</li>
            </ul>
          </div>

          {/* Col 4: Admin Portal Link */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
              Administration
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1rem' }}>
              Secure management dashboard for content updates, project additions, and live customer inquiries.
            </p>
            <a
              href="#admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#1E293B',
                color: '#C5A059',
                padding: '0.625rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid #334155'
              }}
            >
              <UserCog size={14} />
              <span>Admin Dashboard Portal</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '1.75rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
            {settings.copyrightText || '? 2026 Thirupathi ENGINEERING. All rights reserved.'}
          </div>
          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #334155',
              color: '#94A3B8',
              padding: '0.375rem 0.75rem',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer'
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
