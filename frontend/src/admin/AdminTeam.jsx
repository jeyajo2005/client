import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminTeam() {
  const { data, refreshData } = usePortfolio();
  const team = data.team || [];

  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    shortRole: '',
    experienceDisplay: '',
    initials: 'TE',
    description: '',
    keyDisciplines: ['Industrial Steel Structures', 'Heavy Plant Erection'],
    order: 0,
    isPublished: true
  });
  const [discInput, setDiscInput] = useState('');

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: 'Partner',
      shortRole: 'Partner',
      experienceDisplay: '10+ Years Experience',
      initials: 'TE',
      description: '',
      keyDisciplines: ['Industrial Erection', 'Structural Engineering'],
      order: team.length + 1,
      isPublished: true
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      name: m.name,
      role: m.role,
      shortRole: m.shortRole || '',
      experienceDisplay: m.experienceDisplay || '',
      initials: m.initials || 'TE',
      description: m.description,
      keyDisciplines: m.keyDisciplines || [],
      order: m.order || 0,
      isPublished: m.isPublished
    });
    setModalOpen(true);
  };

  const handleAddDisc = () => {
    if (!discInput.trim()) return;
    setFormData({ ...formData, keyDisciplines: [...formData.keyDisciplines, discInput.trim()] });
    setDiscInput('');
  };

  const handleRemoveDisc = (index) => {
    setFormData({ ...formData, keyDisciplines: formData.keyDisciplines.filter((_, i) => i !== index) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingMember) {
        await portfolioAPI.updateTeam(editingMember._id, formData);
      } else {
        await portfolioAPI.createTeam(formData);
      }
      setModalOpen(false);
      refreshData();
    } catch (err) {
      alert('Error saving leader: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this partner profile?')) return;
    try {
      await portfolioAPI.deleteTeam(id);
      refreshData();
    } catch (err) {
      alert('Error deleting member');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
            Leadership & Partners ({team.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Profiles for senior partners M. Mohan & K. Gopalakrishnan and key project directors.
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
          <span>Add Leader</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {team.map((m) => (
          <div key={m._id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#0F172A', color: '#C5A059', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #C5A059' }}>
                  {m.initials || 'TE'}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>{m.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#C5A059', fontWeight: 700 }}>{m.shortRole || m.role}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{m.experienceDisplay}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button onClick={() => handleOpenEdit(m)} style={{ padding: '0.35rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(m._id)} style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.5, margin: '0 0 1rem 0', flex: 1 }}>{m.description}</p>

            {m.keyDisciplines && (
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                  {m.keyDisciplines.map((d, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', backgroundColor: '#F8FAFC', padding: '0.2rem 0.5rem', border: '1px solid #E2E8F0', color: '#475569' }}>{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#FFFFFF', border: '2px solid #C5A059', maxWidth: '550px', width: '100%', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                {editingMember ? 'Edit Partner Profile' : 'Add Partner'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Initials (e.g. MM)</label>
                  <input type="text" value={formData.initials} onChange={(e) => setFormData({ ...formData, initials: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Full Role Title</label>
                  <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Experience Banner Text</label>
                  <input type="text" value={formData.experienceDisplay} onChange={(e) => setFormData({ ...formData, experienceDisplay: e.target.value })} placeholder="e.g. 50+ Years Industrial Experience" style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Partner Biography *</label>
                <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '0.625rem', border: '1px solid #CBD5E1' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Key Disciplines</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <input type="text" value={discInput} onChange={(e) => setDiscInput(e.target.value)} placeholder="Add discipline..." style={{ flex: 1, padding: '0.5rem', border: '1px solid #CBD5E1' }} />
                  <button type="button" onClick={handleAddDisc} style={{ padding: '0.5rem 1rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {formData.keyDisciplines.map((d, idx) => (
                    <span key={idx} style={{ backgroundColor: '#F1F5F9', padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>{d}</span>
                      <button type="button" onClick={() => handleRemoveDisc(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}>?</button>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.625rem 1.25rem', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0F172A', color: '#FFFFFF', border: 'none', fontWeight: 800, cursor: 'pointer' }}>Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}