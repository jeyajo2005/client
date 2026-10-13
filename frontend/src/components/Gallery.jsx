import React, { useState } from 'react';
import { Camera, Eye, X, ZoomIn, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Gallery() {
  const { data } = usePortfolio();
  const galleryItems = data.gallery || [];
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeModalImage, setActiveModalImage] = useState(null);

  const categories = ['All', ...new Set(galleryItems.map(g => g.category).filter(Boolean))];

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(g => g.category === activeCategory);

  // Exactly 12 images arranged in 3 rows and 4 columns
  const displayItems = filteredItems.slice(0, 12);

  return (
    <section id="gallery" style={{ padding: '5.5rem 0', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C5A059', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ON-SITE VISUAL RECORD & ARCHIVE
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: 0 }}>
              Live Project & Erection Gallery
            </h2>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.5rem 1rem' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#10B981', borderRadius: '50%' }}></span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>HD Enhanced Clarity Mode Active</span>
          </div>
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                backgroundColor: activeCategory === cat ? '#0F172A' : '#F8FAFC',
                color: activeCategory === cat ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#0F172A' : '#E2E8F0',
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

        {/* 3 Rows x 4 Columns Responsive Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem'
          }}
          className="gallery-3x4-grid"
        >
          {displayItems.map((item, idx) => (
            <div
              key={item._id || idx}
              style={{
                position: 'relative',
                backgroundColor: '#0F172A',
                border: '1px solid #E2E8F0',
                overflow: 'hidden',
                aspectRatio: '4 / 3',
                cursor: 'pointer',
                group: 'gallery-item'
              }}
              onClick={() => setActiveModalImage(item)}
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onError={(e) => { e.currentTarget.src = '/assets/about-engineering.jpg'; }}
              />

              {/* Hover Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <div style={{ fontSize: '0.7rem', color: '#C5A059', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {item.category}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 700, marginTop: '0.25rem' }}>
                  {item.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#CBD5E1', fontSize: '0.7rem', marginTop: '0.5rem' }}>
                  <Eye size={12} />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeModalImage && (
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
            onClick={() => setActiveModalImage(null)}
          >
            <div 
              style={{
                maxWidth: '900px',
                width: '100%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #C5A059',
                overflow: 'hidden',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalImage(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <X size={18} />
              </button>

              <img 
                src={activeModalImage.imageUrl} 
                alt={activeModalImage.title}
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', backgroundColor: '#0F172A', display: 'block' }}
              />

              <div style={{ padding: '1.5rem', backgroundColor: '#FFFFFF' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C5A059', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {activeModalImage.category}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.25rem 0 0.5rem 0' }}>
                  {activeModalImage.title}
                </h3>
                {activeModalImage.description && (
                  <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                    {activeModalImage.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .gallery-3x4-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .gallery-3x4-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
