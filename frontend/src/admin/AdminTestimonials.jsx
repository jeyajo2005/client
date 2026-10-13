import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, X } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminTestimonials() {
  const { data, refreshData } = usePortfolio();
  const testimonials = data.testimonials || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    company: '',
    role: 'Project Director',
    feedback: '',
    rating: 5,
    project: '',
    order: 0,
    isPublished: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      clientName: '',
      company: '',
      role: 'Project Director',
      feedback: '',
      rating: 5,
      project: '',
      order: testimonials.length + 1,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({
      clientName: t.clientName,
      company: t.company,
      role: t.role || '',
      feedback: t.feedback,
      rating: t.rating || 5,
      project: t.project || '',
      order: t.order || 0,
      isPublished: t.isPublished
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await portfolioAPI.updateTestimonial(editingItem._id, formData);
      } else {
        await portfolioAPI.createTestimonial(formData);
      }
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving testimonial: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await portfolioAPI.deleteTestimonial(id);
      refreshData();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
            Client Testimonials ({testimonials.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Client feedback, executive reviews, and star ratings from industrial project leaders.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.625rem 1.25rem',
            fontSize: '0.8125rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((t) => (
          <div key={t._id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>{t.clientName}</div>
                <div style={{ fontSize: '0.78rem', color: '#C5A059', fontWeight: 700 }}>{t.company}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button onClick={() => handleOpenEdit(t)} style={{ padding: '0.35rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(t._id)} style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.75rem', color: '#F59E0B' }}>
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} size={14} fill="#F59E0B" />
              ))}
            </div>

            <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1rem 0', flex: 1, fontStyle: 'italic' }}>
              "{t.feedback}"
            </p>

            {t.project && (
              <div style={{ fontSize: '0.72rem', color: '#94A3B8', borderTop: '1px solid #F1F5F9', paddingTop: '0.5rem' }}>
                Project: {t.project}
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C5A059', maxWidth: '500px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Client Name *</label>
                  <input type="text" required value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Company Name *</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Role</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Rating (1 - 5 Stars)</label>
                  <input type="number" min={1} max={5} value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Feedback Quote *</label>
                <textarea rows={3} required value={formData.feedback} onChange={(e) => setFormData({ ...formData, feedback: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Project Reference</label>
                <input type="text" value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} placeholder="e.g. 20 MW Boiler Structure" style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}