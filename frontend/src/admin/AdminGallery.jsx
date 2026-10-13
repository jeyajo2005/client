import React, { useState } from 'react';
import { Plus, Trash2, Eye, Upload, X, CheckCircle2 } from 'lucide-react';
import { portfolioAPI, uploadAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminGallery() {
  const { data, refreshData } = usePortfolio();
  const gallery = data.gallery || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Erection',
    imageUrl: '',
    description: '',
    order: 0,
    isPublished: true
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'Erection',
      imageUrl: '',
      description: '',
      order: gallery.length + 1,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await uploadAPI.uploadImage(file);
      if (res.data.success) {
        setFormData({ ...formData, imageUrl: res.data.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('Please upload or provide an image URL');
      return;
    }
    try {
      await portfolioAPI.createGallery(formData);
      setMessage('Photo added to gallery successfully!');
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving to gallery: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      await portfolioAPI.deleteGallery(id);
      refreshData();
      setMessage('Photo deleted.');
    } catch (err) {
      alert('Error deleting photo');
    }
  };

  const handleToggle = async (id) => {
    try {
      await portfolioAPI.toggleGallery(id);
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
            Site Gallery Management ({gallery.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Curated 3 rows ? 4 columns photo archive (first 12 published images are showcased).
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
          <span>Upload New Photo</span>
        </button>
      </div>

      {message && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.75rem 1rem', color: '#065F46', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
          {message}
        </div>
      )}

      {/* Grid View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
        {gallery.map((g, idx) => (
          <div
            key={g._id || idx}
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '140px', backgroundColor: '#0F172A', position: 'relative' }}>
              <img 
                src={g.imageUrl} 
                alt={g.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = '/assets/about-engineering.jpg'; }}
              />
              <span style={{
                position: 'absolute',
                top: '0.5rem',
                left: '0.5rem',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: '#C5A059',
                padding: '0.2rem 0.5rem',
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}>
                {g.category}
              </span>
            </div>

            <div style={{ padding: '0.875rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {g.title}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #F1F5F9' }}>
                <button
                  onClick={() => handleToggle(g._id)}
                  style={{
                    padding: '0.2rem 0.5rem',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: g.isPublished ? '#ECFDF5' : '#FEF2F2',
                    color: g.isPublished ? '#065F46' : '#991B1B'
                  }}
                >
                  {g.isPublished ? 'Published' : 'Hidden'}
                </button>
                <button
                  onClick={() => handleDelete(g._id)}
                  style={{ padding: '0.25rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', cursor: 'pointer' }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C5A059', maxWidth: '500px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>Upload to Site Gallery</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Silo Top Penthouse Erection" style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Category</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="e.g. Cranes, Cement Plant, Power Plant" style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Photo File or URL</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="/assets/... or uploaded URL" style={{ flex: 1, padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                  <label style={{ backgroundColor: '#1E293B', color: '#FFFFFF', padding: '0.625rem 1rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Upload size={14} />
                    <span>{uploading ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
                {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Preview" style={{ height: '70px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Description</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief technical context" style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Save to Gallery</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}