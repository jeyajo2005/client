import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle2, MessageSquare, Filter } from 'lucide-react';
import { portfolioAPI } from '../services/api';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await portfolioAPI.getInquiries();
      if (res.data.success) {
        setInquiries(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await portfolioAPI.updateInquiryStatus(id, newStatus);
      fetchInquiries();
    } catch (err) {
      alert('Error updating inquiry status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await portfolioAPI.deleteInquiry(id);
      fetchInquiries();
    } catch (err) {
      alert('Error deleting inquiry');
    }
  };

  const filtered = filter === 'All' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.25rem 0' }}>
            Consultation Inquiries ({inquiries.length})
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
            Live customer inquiries submitted through the website consultation form.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['All', 'New', 'Read', 'Replied'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: filter === st ? '#0F172A' : '#CBD5E1',
                backgroundColor: filter === st ? '#0F172A' : '#FFFFFF',
                color: filter === st ? '#FFFFFF' : '#475569',
                cursor: 'pointer'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '3rem', textAlign: 'center', color: '#94A3B8' }}>
          No consultation inquiries received yet. When users submit the contact form, submissions will appear here instantly.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                padding: '1.75rem',
                borderLeft: item.status === 'New' ? '4px solid #EF4444' : '4px solid #CBD5E1'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {item.name}
                    </h3>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      backgroundColor: item.status === 'New' ? '#FEF2F2' : '#F1F5F9',
                      color: item.status === 'New' ? '#EF4444' : '#64748B'
                    }}>
                      {item.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.8125rem', color: '#64748B' }}>
                    <a href={`mailto:${item.email}`} style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'none' }}>
                      ? {item.email}
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} style={{ color: '#0F172A', fontWeight: 600, textDecoration: 'none' }}>
                        ?? {item.phone}
                      </a>
                    )}
                    {item.projectType && (
                      <span style={{ color: '#C5A059', fontWeight: 700 }}>
                        ?? {item.projectType}
                      </span>
                    )}
                    <span>
                      ?? {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="New">Mark New</option>
                    <option value="Read">Mark Read</option>
                    <option value="Replied">Mark Replied</option>
                  </select>
                  <button
                    onClick={() => handleDelete(item._id)}
                    style={{ padding: '0.35rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', cursor: 'pointer' }}
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', border: '1px solid #F1F5F9', fontSize: '0.875rem', color: '#334155', lineHeight: 1.5 }}>
                {item.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}