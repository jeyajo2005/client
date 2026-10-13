import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Building2, MapPin, Calendar, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Projects({ onSelectProject }) {
  const { data } = usePortfolio();
  const projects = data.projects || [];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              PORTFOLIO OF EXECUTION
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: 0 }}>
              Flagship Industrial Projects
            </h2>
          </div>
          <p style={{ maxWidth: '500px', color: '#64748B', fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
            Proven record of structural precision across 20 MW power plants, ACC cooling towers, clinker storage silos, and primary crushing stations.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                backgroundColor: selectedCategory === cat ? '#0F172A' : '#F8FAFC',
                color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: selectedCategory === cat ? '#0F172A' : '#E2E8F0',
                padding: '0.5rem 1.25rem',
                fontSize: '0.8125rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
          {filteredProjects.map((project, idx) => (
            <div 
              key={project._id || idx}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(15, 23, 42, 0.08)';
                e.currentTarget.style.borderColor = '#C5A059';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* Image Container */}
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
                <img 
                  src={project.image || '/assets/project-power-plant.jpg'} 
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onError={(e) => { e.currentTarget.src = '/assets/about-engineering.jpg'; }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(197, 160, 89, 0.4)'
                }}>
                  {project.category}
                </div>
              </div>

              {/* Content Box */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#C5A059', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>
                  {project.client}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, margin: '0 0 1rem 0' }}>
                  {project.title}
                </h3>

                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.5, margin: '0 0 1.25rem 0', flex: 1 }}>
                  {project.description}
                </p>

                {/* Specs Pill Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', padding: '1rem 0', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Location</span>
                    <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 600 }}>{project.location || 'Tamil Nadu'}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>Timeline</span>
                    <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 600 }}>{project.year || '2023 - 2024'}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onSelectProject ? onSelectProject(project) : null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid #E2E8F0',
                    padding: '0.75rem 1rem',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0F172A';
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.borderColor = '#0F172A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#0F172A';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <span>View Specifications</span>
                  <ArrowUpRight size={16} />
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
