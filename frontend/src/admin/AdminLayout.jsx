import React, { useState } from 'react';
import { 
  LayoutDashboard, Zap, FileText, Wrench, FolderKanban, 
  Clock, Award, Users, MessageSquareQuote, Images, Mail, 
  Settings, LogOut, ExternalLink, Menu, X, Check, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminLayout({ activeTab, onTabChange, children }) {
  const { user, logout } = useAuth();
  const { refreshData } = usePortfolio();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero Section', icon: Zap },
    { id: 'about', label: 'About Us', icon: FileText },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'experience', label: 'Track Record', icon: Clock },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'team', label: 'Leadership', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'gallery', label: 'Gallery (3x4)', icon: Images },
    { id: 'inquiries', label: 'Inquiries / Inbox', icon: Mail },
    { id: 'settings', label: 'Site & SEO Settings', icon: Settings },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#F8FAFC' }}>
      
      {/* Sidebar Desktop */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        borderRight: '1px solid #1E293B',
        overflowY: 'auto'
      }} className="admin-sidebar">
        
        {/* Brand */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#1E293B',
            border: '2px solid #C5A059',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C5A059',
            fontWeight: 800,
            fontSize: '1.1rem'
          }}>
            TE
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.02em' }}>Thirupathi</div>
            <div style={{ fontSize: '0.68rem', color: '#C5A059', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Admin Dashboard</div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.75rem 0.5rem' }}>
            CONTENT MANAGEMENT
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileSidebarOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.85rem',
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#FFFFFF' : '#94A3B8',
                      backgroundColor: isActive ? '#1E293B' : 'transparent',
                      border: 'none',
                      borderLeft: isActive ? '3px solid #C5A059' : '3px solid transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#94A3B8';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon size={16} style={{ color: isActive ? '#C5A059' : '#64748B' }} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User & Logout */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1E293B', backgroundColor: '#0B1120' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.15rem' }}>
            {user?.username || 'admin'}
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.75rem' }}>
            {user?.email || 'admin@thirupathiengineers.com'}
          </div>
          <button
            onClick={logout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#1E293B',
              color: '#EF4444',
              border: '1px solid #334155',
              padding: '0.5rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Panel Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0F172A'
              }}
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {menuItems.find(m => m.id === activeTab)?.label || 'Admin'}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a 
              href="#home"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#0F172A',
                textDecoration: 'none',
                backgroundColor: '#F8FAFC',
                border: '1px solid #CBD5E1',
                padding: '0.45rem 0.85rem'
              }}
            >
              <span>View Public Website</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </header>

        {/* Content Box */}
        <main style={{ padding: '2rem', flex: 1 }}>
          {children}
        </main>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            display: ${mobileSidebarOpen ? 'flex' : 'none'} !important;
            position: fixed !important;
            z-index: 999 !important;
          }
          .admin-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
