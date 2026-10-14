import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Shield, UserCog, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar({ onOpenConsultation }) {
  const { data } = usePortfolio();
  const settings = data.settings || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = settings.navLinks && settings.navLinks.length > 0
    ? settings.navLinks.filter(l => l.isVisible !== false)
    : [
      { label: 'Projects', href: '#projects' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Services', href: '#services' },
      { label: 'Track Record', href: '#track-record' },
      { label: 'Leadership', href: '#leadership' },
      { label: 'Contact', href: '#contact' }
    ];

  const primaryPhone = settings.phones && settings.phones[0] ? settings.phones[0].display : '+91 90432 88002';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        transition: 'all 0.25s ease',
        boxShadow: isScrolled ? '0 4px 20px rgba(15, 23, 42, 0.08)' : 'none'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

          {/* Brand Logo */}
          <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#0F172A',
              border: '2px solid #C5A059',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C5A059',
              fontWeight: 800,
              fontSize: '1.25rem',
              letterSpacing: '0.05em'
            }}>
              TE
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {settings.companyName || 'Thirupathi ENGINEERING'}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {settings.tagline || 'Mechanical Industrial Structures'}
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none' }} className="desktop-nav">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#334155',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      letterSpacing: '0.03em'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#C5A059'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#334155'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions: Phone CTA & Admin Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                padding: '0.625rem 1.25rem',
                fontSize: '0.8125rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                border: '1px solid #0F172A',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C5A059';
                e.currentTarget.style.borderColor = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0F172A';
                e.currentTarget.style.borderColor = '#0F172A';
              }}
            >
              Discuss Project
            </a>

            <a
              href="#admin"
              title="Admin Dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: '#F8FAFC',
                color: '#475569',
                padding: '0.625rem 0.875rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textDecoration: 'none',
                border: '1px solid #CBD5E1',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C5A059';
                e.currentTarget.style.color = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#CBD5E1';
                e.currentTarget.style.color = '#475569';
              }}
            >
              <UserCog size={14} />
              <span className="admin-btn-label">Admin</span>
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'transparent',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                color: '#0F172A'
              }}
              className="mobile-nav-toggle"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div style={{
            padding: '1rem 0 1.5rem',
            borderTop: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF'
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.5rem 0',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#1E293B',
                      textDecoration: 'none',
                      borderBottom: '1px dashed #F1F5F9'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li style={{ paddingTop: '0.5rem' }}>
                <a
                  href="#admin"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#C5A059',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <UserCog size={16} /> Admin Portal
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: block !important; }
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
