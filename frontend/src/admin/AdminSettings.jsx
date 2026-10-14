import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminSettings() {
  const { data, refreshData } = usePortfolio();
  const [formData, setFormData] = useState({
    companyName: 'Thirupathi ENGINEERING',
    tagline: 'Mechanical Industrial Structures',
    businessType: 'Partnership Firm',
    siteTitle: '',
    metaDescription: '',
    metaKeywords: '',
    phones: [{ display: '+91 90432 88002', value: '9043288002' }, { display: '+91 97905 20126', value: '9790520126' }],
    emails: ['thirupathiENGINEERINGs@gmail.com', 'gopalkannan5@gmail.com'],
    officeAddress: 'Tamil Nadu, India',
    footerText: '',
    copyrightText: ''
  });
  const [phone1, setPhone1] = useState('+91 90432 88002');
  const [phone2, setPhone2] = useState('+91 97905 20126');
  const [email1, setEmail1] = useState('thirupathiENGINEERINGs@gmail.com');
  const [email2, setEmail2] = useState('gopalkannan5@gmail.com');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data.settings) {
      setFormData({
        companyName: data.settings.companyName || 'Thirupathi ENGINEERING',
        tagline: data.settings.tagline || 'Mechanical Industrial Structures',
        businessType: data.settings.businessType || 'Partnership Firm',
        siteTitle: data.settings.siteTitle || '',
        metaDescription: data.settings.metaDescription || '',
        metaKeywords: data.settings.metaKeywords || '',
        phones: data.settings.phones || [],
        emails: data.settings.emails || [],
        officeAddress: data.settings.officeAddress || 'Tamil Nadu, India',
        footerText: data.settings.footerText || '',
        copyrightText: data.settings.copyrightText || ''
      });
      if (data.settings.phones?.[0]) setPhone1(data.settings.phones[0].display);
      if (data.settings.phones?.[1]) setPhone2(data.settings.phones[1].display);
      if (data.settings.emails?.[0]) setEmail1(data.settings.emails[0]);
      if (data.settings.emails?.[1]) setEmail2(data.settings.emails[1]);
    }
  }, [data.settings]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const payload = {
        ...formData,
        phones: [
          { display: phone1, value: phone1.replace(/[^0-9]/g, '') },
          { display: phone2, value: phone2.replace(/[^0-9]/g, '') }
        ],
        emails: [email1, email2].filter(Boolean)
      };
      await portfolioAPI.updateSettings(payload);
      setSuccess(true);
      refreshData();
    } catch (err) {
      alert('Error updating settings: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
          Global Site Settings & SEO
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
          Manage page metadata, Google search description, company contact numbers, address, and legal text.
        </p>
      </div>

      {success && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', color: '#065F46', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <CheckCircle2 size={18} />
          <span>Site settings and SEO metadata saved and updated!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* SEO Metadata */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 1rem 0' }}>
            SEO & Page Header Meta
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Browser Title Tag (&lt;title&gt;)
              </label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Meta Description (Google Search Result Snippet)
              </label>
              <textarea
                rows={2}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Meta Keywords
              </label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>
        </div>

        {/* Company Info */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 1rem 0' }}>
            Company Credentials & Contacts
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Phone Number 1
              </label>
              <input
                type="text"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Phone Number 2
              </label>
              <input
                type="text"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Email 1
              </label>
              <input
                type="email"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Email 2
              </label>
              <input
                type="email"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Office Address
            </label>
            <input
              type="text"
              value={formData.officeAddress}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 1rem 0' }}>
            Footer Content
          </h3>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Footer Bio Statement
            </label>
            <textarea
              rows={2}
              value={formData.footerText}
              onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
              style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Copyright Notice
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            alignSelf: 'flex-start',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.875rem 2rem',
            fontSize: '0.875rem',
            fontWeight: 800,
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
        </button>

      </form>
    </div>
  );
}