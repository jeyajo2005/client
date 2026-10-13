import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminAchievements() {
  const { data, refreshData } = usePortfolio();
  const achievements = data.achievements || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    metric: '',
    title: '',
    category: 'Industrial',
    description: '',
    order: 0,
    isPublished: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      metric: '100+',
      title: '',
      category: 'Industrial',
      description: '',
      order: achievements.length + 1,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      metric: item.metric,
      title: item.title,
      category: item.category || 'Industrial',
      description: item.description,
      order: item.order || 0,
      isPublished: item.isPublished
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await portfolioAPI.updateAchievement(editingItem._id, formData);
      } else {
        await portfolioAPI.createAchievement(formData);
      }
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving achievement: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await portfolioAPI.deleteAchievement(id);
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
            Achievements & Metrics ({achievements.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Large numerical metrics and verified industrial records shown in the dark stats bar.
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
          <span>Add Metric</span>
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1rem' }}>Metric Value</th>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Description</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {achievements.map((item) => (
              <tr key={item._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem 1rem', fontSize: '1.25rem', fontWeight: 800, color: '#C5A059' }}>{item.metric}</td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0F172A' }}>{item.title}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>{item.category}</td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>{item.description}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(item)} style={{ padding: '0.35rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C5A059', maxWidth: '500px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {editingItem ? 'Edit Achievement' : 'Add Achievement'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Metric (e.g. 50+ Years, 20 MW) *</label>
                <input type="text" required value={formData.metric} onChange={(e) => setFormData({ ...formData, metric: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description *</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Save Metric</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}