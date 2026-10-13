import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminServices() {
  const { data, refreshData } = usePortfolio();
  const services = data.services || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Steel Structures',
    shortDesc: '',
    icon: 'Factory',
    features: ['High-tensile bolting', 'Crane gantry girder alignment'],
    order: 0,
    isPublished: true
  });
  const [featureInput, setFeatureInput] = useState('');

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Steel Structures',
      shortDesc: '',
      icon: 'Factory',
      features: ['Precision erection standards', 'Zero-defect alignment'],
      order: services.length + 1,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      category: s.category,
      shortDesc: s.shortDesc,
      icon: s.icon || 'Factory',
      features: s.features || [],
      order: s.order || 0,
      isPublished: s.isPublished
    });
    setModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await portfolioAPI.updateService(editingService._id, formData);
      } else {
        await portfolioAPI.createService(formData);
      }
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving service: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await portfolioAPI.deleteService(id);
      refreshData();
    } catch (err) {
      alert('Error deleting service');
    }
  };

  const handleToggle = async (id) => {
    try {
      await portfolioAPI.toggleService(id);
      refreshData();
    } catch (err) {
      alert('Error toggling status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
            Services & Capabilities ({services.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Manage unlimited services, descriptions, categories, and feature bullet lists.
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
          <span>Add Service</span>
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1rem' }}>Title</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Description</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0F172A' }}>
                  {s.title}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#C5A059', fontWeight: 600 }}>
                  {s.category}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748B', maxWidth: '300px' }}>
                  {s.shortDesc}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <button
                    onClick={() => handleToggle(s._id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: s.isPublished ? '#ECFDF5' : '#FEF2F2',
                      color: s.isPublished ? '#065F46' : '#991B1B'
                    }}
                  >
                    {s.isPublished ? 'Published' : 'Hidden'}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenEdit(s)} style={{ padding: '0.35rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(s._id)} style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', cursor: 'pointer', color: '#EF4444' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C5A059', maxWidth: '600px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Category</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Short Description *</label>
                <textarea rows={3} required value={formData.shortDesc} onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              {/* Feature bullet editor */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Key Deliverables / Features</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Add feature item..." style={{ flex: 1, padding: '0.5rem', border: '1px solid #CBD5E1' }} />
                  <button type="button" onClick={handleAddFeature} style={{ padding: '0.5rem 1rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {formData.features.map((f, idx) => (
                    <span key={idx} style={{ backgroundColor: '#F1F5F9', padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>{f}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>?</button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}