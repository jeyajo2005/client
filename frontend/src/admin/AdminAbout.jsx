import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminAbout() {
  const { data, refreshData } = usePortfolio();
  const [formData, setFormData] = useState({
    tagline: '',
    heading: '',
    intro: '',
    history: '',
    mission: '',
    vision: '',
    experienceYears: '50+',
    image: '/assets/about-engineering.jpg'
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (data.about) {
      setFormData({
        tagline: data.about.tagline || '',
        heading: data.about.heading || '',
        intro: data.about.intro || '',
        history: data.about.history || '',
        mission: data.about.mission || '',
        vision: data.about.vision || '',
        experienceYears: data.about.experienceYears || '50+',
        image: data.about.image || '/assets/about-engineering.jpg'
      });
    }
  }, [data.about]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    try {
      const res = await portfolioAPI.updateAbout(formData);
      if (res.data.success) {
        setSaveSuccess(true);
        refreshData();
      }
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Failed to update About section');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
          About Us Section
        </h2>
        <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
          Manage company origin, partner history, mission, vision, and years of experience badge.
        </p>
      </div>

      {saveSuccess && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1rem', color: '#065F46', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <CheckCircle2 size={18} />
          <span>About section updated successfully!</span>
        </div>
      )}

      {saveError && (
        <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', padding: '1rem', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          <AlertCircle size={18} />
          <span>{saveError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Main Heading
            </label>
            <input 
              type="text"
              required
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Experience Display
            </label>
            <input 
              type="text"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
              placeholder="50+"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Company Introduction
          </label>
          <textarea 
            rows={3}
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            History & Lineage
          </label>
          <textarea 
            rows={3}
            value={formData.history}
            onChange={(e) => setFormData({ ...formData, history: e.target.value })}
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Mission Statement
            </label>
            <textarea 
              rows={3}
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Vision Statement
            </label>
            <textarea 
              rows={3}
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
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
          <span>{saving ? 'Saving...' : 'Save About Us'}</span>
        </button>

      </form>
    </div>
  );
}