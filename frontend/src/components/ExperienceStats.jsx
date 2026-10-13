import React from 'react';
import { Award, Shield, CheckCircle, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function ExperienceStats() {
  const { data } = usePortfolio();
  const achievements = data.achievements || [];

  return (
    <section id="stats" style={{ padding: '4.5rem 0', backgroundColor: '#0F172A', color: '#FFFFFF', borderBottom: '1px solid #1E293B' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}>
          {achievements.map((item, idx) => (
            <div key={item._id || idx} style={{ borderLeft: '2px solid #C5A059', paddingLeft: '1.25rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#C5A059', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '0.5rem' }}>
                {item.metric}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.35rem' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.5 }}>
                {item.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
