import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';

// Public Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import ExperienceStats from './components/ExperienceStats';
import Leadership from './components/Leadership';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ConsultationModal from './components/ConsultationModal';

// Admin Components
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminOverview from './admin/AdminOverview';
import AdminHero from './admin/AdminHero';
import AdminAbout from './admin/AdminAbout';
import AdminServices from './admin/AdminServices';
import AdminProjects from './admin/AdminProjects';
import AdminExperience from './admin/AdminExperience';
import AdminAchievements from './admin/AdminAchievements';
import AdminTeam from './admin/AdminTeam';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminGallery from './admin/AdminGallery';
import AdminInquiries from './admin/AdminInquiries';
import AdminSettings from './admin/AdminSettings';

function MainApp() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { data, loading: dataLoading, error: dataError } = usePortfolio();

  const [currentRoute, setCurrentRoute] = useState(() => {
    return window.location.hash || window.location.pathname;
  });
  const [activeAdminTab, setActiveAdminTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash);
      if (hash.startsWith('#admin/')) {
        const tab = hash.replace('#admin/', '');
        if (tab) setActiveAdminTab(tab);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isAdminRoute = currentRoute.includes('admin');

  // Admin Route Handling
  if (isAdminRoute) {
    if (authLoading) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', color: '#C5A059', fontWeight: 700 }}>
          Verifying Admin Credentials...
        </div>
      );
    }

    if (!isAuthenticated) {
      return <AdminLogin onLoginSuccess={() => window.location.hash = '#admin'} />;
    }

    return (
      <AdminLayout activeTab={activeAdminTab} onTabChange={(tab) => {
        setActiveAdminTab(tab);
        window.location.hash = `#admin/${tab}`;
      }}>
        {activeAdminTab === 'overview' && <AdminOverview onNavigate={(t) => setActiveAdminTab(t)} />}
        {activeAdminTab === 'hero' && <AdminHero />}
        {activeAdminTab === 'about' && <AdminAbout />}
        {activeAdminTab === 'services' && <AdminServices />}
        {activeAdminTab === 'projects' && <AdminProjects />}
        {activeAdminTab === 'experience' && <AdminExperience />}
        {activeAdminTab === 'achievements' && <AdminAchievements />}
        {activeAdminTab === 'team' && <AdminTeam />}
        {activeAdminTab === 'testimonials' && <AdminTestimonials />}
        {activeAdminTab === 'gallery' && <AdminGallery />}
        {activeAdminTab === 'inquiries' && <AdminInquiries />}
        {activeAdminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Loading state for public site
  if (dataLoading && !data.hero) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', color: '#0F172A' }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #E2E8F0',
          borderTopColor: '#C5A059',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1rem'
        }} />
        <div style={{ fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0F172A' }}>
          Thirupathi Engineers
        </div>
        <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.25rem' }}>
          Connecting to MongoDB Database...
        </div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Public Architectural Website
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      
      {/* 1. Header Navbar */}
      <Navbar onOpenConsultation={() => setShowConsultationModal(true)} />

      {/* Main Architectural Content */}
      <main style={{ flex: 1 }}>
        
        {/* 2. Hero Section */}
        <Hero onOpenConsultation={() => setShowConsultationModal(true)} />

        {/* 3. About Us */}
        <About />

        {/* 4. Projects Portfolio */}
        <Projects onSelectProject={(p) => setSelectedProject(p)} />

        {/* 5. Services & Practice Matrix */}
        <Services onOpenConsultation={() => setShowConsultationModal(true)} />

        {/* 6. On-Site Visual Record Gallery (3 rows x 4 columns) */}
        <Gallery />

        {/* 7. Track Record & Milestones */}
        <Timeline />

        {/* 8. Numerical Metrics & Achievements Bar */}
        <ExperienceStats />

        {/* 9. Senior Leadership & Partners */}
        <Leadership />

        {/* 10. Client Testimonials */}
        <Testimonials />

        {/* 11. Consultation & Contact */}
        <Contact />

      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Interactive Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          onOpenConsultation={() => {
            setSelectedProject(null);
            setShowConsultationModal(true);
          }}
        />
      )}

      {/* Consultation Popup */}
      {showConsultationModal && (
        <ConsultationModal onClose={() => setShowConsultationModal(false)} />
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <MainApp />
      </PortfolioProvider>
    </AuthProvider>
  );
}