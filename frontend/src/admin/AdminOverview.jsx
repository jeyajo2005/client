import React, { useEffect, useState } from 'react';
import {
  FolderKanban, Wrench, Images, Mail, TrendingUp, CheckCircle2,
  ArrowRight, Clock, PlusCircle, ExternalLink
} from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminOverview({ onNavigate }) {
  const { data } = usePortfolio();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalServices: 0,
    totalGallery: 0,
    totalMessages: 0,
    newMessages: 0
  });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [statsRes, inqRes] = await Promise.all([
          portfolioAPI.getDashboardStats(),
          portfolioAPI.getInquiries()
        ]);
        if (statsRes.data.success) setStats(statsRes.data.stats);
        if (inqRes.data.success) setInquiries(inqRes.data.data.slice(0, 5));
      } catch (err) {
        console.error('Failed to load dashboard overview stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        border: '1px solid #1E293B',
        padding: '2rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }}>
        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            CONTROL DASHBOARD
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.25rem 0 0.5rem 0' }}>
            Thirupathi ENGINEERING MERN Portfolio
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', margin: 0, maxWidth: '600px' }}>
            Connected directly to local MongoDB. All modifications made here immediately reflect on the public site without recompilation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => onNavigate('projects')}
            style={{
              backgroundColor: '#C5A059',
              color: '#0F172A',
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
            <PlusCircle size={14} />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            style={{
              backgroundColor: '#1E293B',
              color: '#FFFFFF',
              border: '1px solid #334155',
              padding: '0.625rem 1.25rem',
              fontSize: '0.8125rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>Upload Photo</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Total Projects</span>
            <FolderKanban size={18} style={{ color: '#C5A059' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
            {stats.totalProjects}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '0.25rem' }}>
            Active in MongoDB
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Active Services</span>
            <Wrench size={18} style={{ color: '#C5A059' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
            {stats.totalServices}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600, marginTop: '0.25rem' }}>
            Available to Clients
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Site Gallery</span>
            <Images size={18} style={{ color: '#C5A059' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
            {stats.totalGallery}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600, marginTop: '0.25rem' }}>
            3x4 Grid Active
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Inquiries</span>
            <Mail size={18} style={{ color: '#C5A059' }} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0F172A' }}>
            {stats.totalMessages}
          </div>
          <div style={{ fontSize: '0.75rem', color: stats.newMessages > 0 ? '#EF4444' : '#10B981', fontWeight: 700, marginTop: '0.25rem' }}>
            {stats.newMessages} New Inquiries
          </div>
        </div>

      </div>

      {/* Recent Inquiries List */}
      <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Recent Consultation Inquiries
          </h3>
          <button
            onClick={() => onNavigate('inquiries')}
            style={{
              background: 'none',
              border: 'none',
              color: '#C5A059',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <span>View All</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.875rem' }}>
            No inquiries received yet. Any messages sent from the public website contact form will appear here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #F1F5F9',
                  backgroundColor: '#F8FAFC'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{inq.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{inq.email} ? {inq.phone || 'No phone'}</div>
                  <div style={{ fontSize: '0.8rem', color: '#334155', marginTop: '0.35rem' }}>{inq.message}</div>
                </div>
                <div style={{
                  padding: '0.25rem 0.65rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  backgroundColor: inq.status === 'New' ? '#FEF2F2' : '#F1F5F9',
                  color: inq.status === 'New' ? '#EF4444' : '#475569',
                  border: inq.status === 'New' ? '1px solid #FECACA' : '1px solid #E2E8F0'
                }}>
                  {inq.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}