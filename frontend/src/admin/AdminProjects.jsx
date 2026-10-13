import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Upload, X } from 'lucide-react';
import { portfolioAPI, uploadAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminProjects() {
  const { data, refreshData } = usePortfolio();
  const projects = data.projects || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Cement Plant',
    location: 'Tamil Nadu, India',
    year: '2023 - 2024',
    capacity: '',
    scope: '',
    description: '',
    image: '/assets/project-power-plant.jpg',
    isPublished: true
  });
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      category: 'Cement Plant',
      location: 'Tamil Nadu, India',
      year: '2023 - 2024',
      capacity: '',
      scope: '',
      description: '',
      image: '/assets/project-power-plant.jpg',
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      client: p.client,
      category: p.category,
      location: p.location,
      year: p.year,
      capacity: p.capacity || '',
      scope: p.scope || '',
      description: p.description,
      image: p.image,
      isPublished: p.isPublished
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
        setFormData({ ...formData, image: res.data.fileUrl });
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await portfolioAPI.updateProject(editingProject._id, formData);
        setStatusMessage('Project updated successfully!');
      } else {
        await portfolioAPI.createProject(formData);
        setStatusMessage('New project created successfully!');
      }
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await portfolioAPI.deleteProject(id);
      refreshData();
      setStatusMessage('Project deleted.');
    } catch (err) {
      alert('Error deleting project');
    }
  };

  const handleToggle = async (id) => {
    try {
      await portfolioAPI.toggleProject(id);
      refreshData();
    } catch (err) {
      alert('Error toggling project status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
            Projects Management ({projects.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Add, modify, publish/unpublish, and upload images for all structural case studies.
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
          <span>Add Project</span>
        </button>
      </div>

      {statusMessage && (
        <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.75rem 1rem', color: '#065F46', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
          {statusMessage}
        </div>
      )}

      {/* Projects Table */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '1rem' }}>Image</th>
              <th style={{ padding: '1rem' }}>Project Title</th>
              <th style={{ padding: '1rem' }}>Client</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{ width: '60px', height: '40px', objectFit: 'cover', display: 'block', backgroundColor: '#0F172A' }} 
                    onError={(e) => { e.currentTarget.src = '/assets/about-engineering.jpg'; }}
                  />
                </td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0F172A' }}>
                  {p.title}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#C5A059', fontWeight: 600 }}>
                  {p.client}
                </td>
                <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>
                  {p.category}
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <button
                    onClick={() => handleToggle(p._id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      border: 'none',
                      backgroundColor: p.isPublished ? '#ECFDF5' : '#FEF2F2',
                      color: p.isPublished ? '#065F46' : '#991B1B'
                    }}
                  >
                    {p.isPublished ? 'Published' : 'Hidden'}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      style={{ padding: '0.35rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer', color: '#0F172A' }}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', cursor: 'pointer', color: '#EF4444' }}
                      title="Delete"
                    >
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
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #C5A059',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Project Title *
                </label>
                <input 
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Client Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Category
                  </label>
                  <input 
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Location
                  </label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Year / Timeline
                  </label>
                  <input 
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Project Description *
                </label>
                <textarea 
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Image URL or Upload File
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input 
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{ flex: 1, padding: '0.625rem', border: '1px solid #CBD5E1' }}
                  />
                  <label style={{
                    backgroundColor: '#1E293B',
                    color: '#FFFFFF',
                    padding: '0.625rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Upload size={14} />
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
                {formData.image && (
                  <img src={formData.image} alt="Preview" style={{ height: '70px', objectFit: 'cover', border: '1px solid #CBD5E1' }} />
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}
                >
                  Save Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}