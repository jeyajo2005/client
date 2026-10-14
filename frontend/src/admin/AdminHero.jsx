import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminHero() {
  const { data, refreshData } = usePortfolio();
  const [formData, setFormData] = useState({
    name1: 'M. Mohan',
    name2: 'K. Gopala Krishnan',
    subtitle: 'MANAGING PARTNERS · THIRUPATHI ENGINEERING',
    description: 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
    badgeText: 'MECHANICAL & INDUSTRIAL STRUCTURES',
    badgeLoc: 'TAMIL NADU · INDIA',
    primaryCtaText: 'Discuss Your Next Structure',
    primaryCtaLink: '#contact',
    secondaryCtaText: 'View Project Record',
    secondaryCtaLink: '#projects',
    bgImageUrl: 'assets/images/hero.jpg'
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (data.hero) {
      setFormData({
        name1: data.hero.name1 || (data.hero.heading && data.hero.heading.includes(',') ? data.hero.heading.split(',')[0].trim() : 'M. Mohan'),
        name2: data.hero.name2 || (data.hero.heading && data.hero.heading.includes(',') ? data.hero.heading.split(',')[1].trim() : 'K. Gopala Krishnan'),
        subtitle: data.hero.subtitle || 'MANAGING PARTNERS · THIRUPATHI ENGINEERING',
        description: data.hero.description || 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.',
        badgeText: data.hero.badgeText || 'MECHANICAL & INDUSTRIAL STRUCTURES',
        badgeLoc: data.hero.badgeLoc || 'TAMIL NADU · INDIA',
        primaryCtaText: data.hero.primaryCtaText || 'Discuss Your Next Structure',
        primaryCtaLink: data.hero.primaryCtaLink || '#contact',
        secondaryCtaText: data.hero.secondaryCtaText || 'View Project Record',
        secondaryCtaLink: data.hero.secondaryCtaLink || '#projects',
        bgImageUrl: data.hero.bgImageUrl || 'assets/images/hero.jpg'
      });
    }
  }, [data.hero]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    try {
      // Also sync heading for fallback compatibility
      const payload = {
        ...formData,
        heading: `${formData.name1}, ${formData.name2}`
      };
      const res = await portfolioAPI.updateHero(payload);
      if (res.data.success) {
        setSaveSuccess(true);
        refreshData();
      }
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update Hero section');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
          Hero Section (Original Architectural Fullscreen Design)
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
          Manage the animated typing partner names, top status badge, subtitle, description, CTA buttons, and background image.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', color: '#065F46', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <CheckCircle2 size={18} />
          <span>Hero section saved to MongoDB and synchronized with public frontend!</span>
        </div>
      )}

      {saveError && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '1rem', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <AlertCircle size={18} />
          <span>{saveError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Animated Typing Names */}
        <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Sequential Typing Names (Large Architectural Title)
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Line 1 (First Name)
              </label>
              <input
                type="text"
                required
                value={formData.name1}
                onChange={(e) => setFormData({ ...formData, name1: e.target.value })}
                placeholder="M. Mohan"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Line 2 (Second Name)
              </label>
              <input
                type="text"
                required
                value={formData.name2}
                onChange={(e) => setFormData({ ...formData, name2: e.target.value })}
                placeholder="K. Gopala Krishnan"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontWeight: 600, outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Top Right Floating Badge */}
        <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Top Right Floating Badge
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Badge Primary Label
              </label>
              <input
                type="text"
                value={formData.badgeText}
                onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="MECHANICAL & INDUSTRIAL STRUCTURES"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                Badge Location / Secondary
              </label>
              <input
                type="text"
                value={formData.badgeLoc}
                onChange={(e) => setFormData({ ...formData, badgeLoc: e.target.value })}
                placeholder="TAMIL NADU · INDIA"
                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Subtitle & Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Subtitle Bar (Gold Lettering)
          </label>
          <input
            type="text"
            required
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="MANAGING PARTNERS · THIRUPATHI ENGINEERING"
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', fontWeight: 600, outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Hero Narrative / Description
          </label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical', lineHeight: 1.6 }}
          />
        </div>

        {/* CTAs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Primary CTA Text (Gold Button)
            </label>
            <input
              type="text"
              value={formData.primaryCtaText}
              onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Primary CTA Link
            </label>
            <input
              type="text"
              value={formData.primaryCtaLink}
              onChange={(e) => setFormData({ ...formData, primaryCtaLink: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Secondary CTA Text (Glass Button)
            </label>
            <input
              type="text"
              value={formData.secondaryCtaText}
              onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Secondary CTA Link
            </label>
            <input
              type="text"
              value={formData.secondaryCtaLink}
              onChange={(e) => setFormData({ ...formData, secondaryCtaLink: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Background Image */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Background Image URL / Asset Path
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={formData.bgImageUrl}
              onChange={(e) => setFormData({ ...formData, bgImageUrl: e.target.value })}
              placeholder="assets/images/hero.jpg"
              style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
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
            gap: '0.5rem',
            transition: 'background 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#C5A059'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
        >
          <Save size={16} />
          <span>{saving ? 'Saving to Database...' : 'Save Hero Section'}</span>
        </button>

      </form>
    </div>
  );
}