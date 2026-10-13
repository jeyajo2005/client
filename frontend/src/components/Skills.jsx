import React, { useState } from 'react';
import { 
  Atom, 
  FileCode2, 
  Code, 
  Palette, 
  Server, 
  Cpu, 
  Database, 
  HardDrive, 
  Grid, 
  GitBranch, 
  GitPullRequest, 
  Network,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { skills } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Atom': return <Atom size={24} color="#0284C7" />;
      case 'FileCode2': return <FileCode2 size={24} color="#D97706" />;
      case 'Code': return <Code size={24} color="#EA580C" />;
      case 'Palette': return <Palette size={24} color="#2563EB" />;
      case 'Server': return <Server size={24} color="#16A34A" />;
      case 'Cpu': return <Cpu size={24} color="#0F172A" />;
      case 'Database': return <Database size={24} color="#15803D" />;
      case 'HardDrive': return <HardDrive size={24} color="#0284C7" />;
      case 'Grid': return <Grid size={24} color="#7C3AED" />;
      case 'GitBranch': return <GitBranch size={24} color="#EA580C" />;
      case 'GitPullRequest': return <GitPullRequest size={24} color="#0F172A" />;
      case 'Network': return <Network size={24} color="var(--gold-dark)" />;
      default: return <Sparkles size={24} color="var(--gold-primary)" />;
    }
  };

  return (
    <section id="skills" className="section bg-cream-section">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-eyebrow">
            // 03 TECHNICAL EXPERTISE
          </div>
          <h2 className="section-title">
            Engineered Tooling & <span className="text-gold-gradient">Technical Proficiency</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A curated stack of modern web technologies honed through rigorous production deployments, algorithmic problem-solving, and clean architectural design.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.6rem',
          marginBottom: '3rem'
        }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.35rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.825rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  backgroundColor: isActive ? 'var(--navy-900)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--slate-600)',
                  border: isActive ? '1px solid var(--navy-900)' : '1px solid var(--slate-200)',
                  boxShadow: isActive ? '0 4px 12px rgba(11, 19, 43, 0.15)' : 'none'
                }}
              >
                {cat === 'All' ? 'All Technologies' : cat}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: '1.75rem',
                backgroundColor: '#FFFFFF',
                borderRadius: '1.25rem',
                border: '1px solid var(--slate-200)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-border)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--slate-200)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <div>
                {/* Header: Icon + Category Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--slate-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {getSkillIcon(skill.iconName)}
                  </div>
                  <span className="badge-navy" style={{ fontSize: '0.7rem' }}>
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name & Highlights */}
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--navy-900)',
                  marginBottom: '0.35rem'
                }}>
                  {skill.name}
                </h3>

                <p style={{
                  fontSize: '0.825rem',
                  color: 'var(--slate-500)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.5
                }}>
                  {skill.highlight}
                </p>
              </div>

              {/* Progress Indicator */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.725rem', color: 'var(--slate-400)', textTransform: 'uppercase' }}>
                    Proficiency
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gold-dark)' }}>
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Meter Bar */}
                <div style={{
                  width: '100%',
                  height: '7px',
                  backgroundColor: 'var(--slate-100)',
                  borderRadius: '9999px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${skill.proficiency}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--gold-hover), var(--gold-primary))',
                    borderRadius: '9999px',
                    transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Competencies Footer Banner */}
        <div style={{
          marginTop: '3.5rem',
          padding: '1.75rem 2rem',
          borderRadius: '1.25rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--slate-200)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)' }}>
              Component-Driven React Architecture
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)' }}>
              Node & Express Microservices
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)' }}>
              Schema Design in MongoDB & SQL
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} color="var(--gold-primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy-800)' }}>
              Git & GitHub CI/CD Automation
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
