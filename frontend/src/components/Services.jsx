import React, { useState, useEffect, useRef } from 'react';
import { Hammer, Factory, Zap, Boxes, Route, Flame, Layers, Cog, ChevronLeft, ChevronRight, Pause, Play, Grid, RotateCcw } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const iconMap = {
  Hammer,
  Factory,
  Zap,
  Boxes,
  Route,
  Flame,
  Layers,
  Cog
};

export default function Services({ onOpenConsultation }) {
  const { data } = usePortfolio();
  const services = data.services || [];

  const [viewMode, setViewMode] = useState('cylinder'); // 'cylinder' | 'grid'
  const [rotationAngle, setRotationAngle] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const totalCards = Math.max(1, services.length);
  const angleStep = 360 / totalCards;
  const autoplayRef = useRef(null);
  const trackRef = useRef(null);

  const [radius, setRadius] = useState(380);

  useEffect(() => {
    function updateRadius() {
      const w = window.innerWidth;
      if (w < 600) setRadius(250);
      else if (w < 900) setRadius(310);
      else setRadius(380);
    }
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Update active index based on rotation angle
  useEffect(() => {
    const normalized = Math.round(rotationAngle / angleStep);
    const idx = ((normalized % totalCards) + totalCards) % totalCards;
    setCurrentIndex(idx);
  }, [rotationAngle, angleStep, totalCards]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || viewMode !== 'cylinder' || isDragging || totalCards <= 1) {
      clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 4200);

    return () => clearInterval(autoplayRef.current);
  }, [isAutoplay, viewMode, isDragging, totalCards]);

  const stepNext = () => setCurrentIndex((prev) => (prev + 1) % totalCards);
  const stepPrev = () => setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  const rotateToCard = (index) => setCurrentIndex(index);

  // Pointer drag handling
  const handlePointerDown = (clientX) => {
    setIsDragging(true);
    setHasMoved(false);
    setDragStartX(clientX);
  };

  const handlePointerMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 10) setHasMoved(true);
  };

  const handlePointerUp = (clientX) => {
    if (!isDragging) return;
    setIsDragging(false);
    const deltaX = clientX - dragStartX;
    if (hasMoved && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        stepNext();
      } else {
        stepPrev();
      }
    }
  };

  const getCardStyle = (i) => {
    let offset = i - currentIndex;
    while (offset > totalCards / 2) offset -= totalCards;
    while (offset < -totalCards / 2) offset += totalCards;

    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    let step1 = 395, step2 = 740, scaleMain = 1.08, scale1 = 0.95, scale2 = 0.86, rot1 = 18, rot2 = 28;
    if (w < 600) {
      step1 = 180; step2 = 320; scaleMain = 1.0; scale1 = 0.84; scale2 = 0.72; rot1 = 14; rot2 = 22;
    } else if (w < 900) {
      step1 = 260; step2 = 480; scaleMain = 1.02; scale1 = 0.88; scale2 = 0.78; rot1 = 16; rot2 = 26;
    } else if (w < 1200) {
      step1 = 330; step2 = 630; scaleMain = 1.05; scale1 = 0.92; scale2 = 0.82; rot1 = 18; rot2 = 28;
    }

    if (offset === 0) {
      return {
        transform: `translateX(0px) translateZ(80px) rotateY(0deg) scale(${scaleMain})`,
        opacity: 1,
        zIndex: 14,
        filter: 'none',
        pointerEvents: 'auto'
      };
    } else if (offset === -1) {
      return {
        transform: `translateX(-${step1}px) translateZ(-40px) rotateY(-${rot1}deg) scale(${scale1})`,
        opacity: 0.96,
        zIndex: 10,
        filter: 'none',
        pointerEvents: 'auto'
      };
    } else if (offset === 1) {
      return {
        transform: `translateX(${step1}px) translateZ(-40px) rotateY(${rot1}deg) scale(${scale1})`,
        opacity: 0.96,
        zIndex: 10,
        filter: 'none',
        pointerEvents: 'auto'
      };
    } else if (offset === -2) {
      return {
        transform: `translateX(-${step2}px) translateZ(-110px) rotateY(-${rot2}deg) scale(${scale2})`,
        opacity: 0.86,
        zIndex: 6,
        filter: 'none',
        pointerEvents: 'auto'
      };
    } else if (offset === 2) {
      return {
        transform: `translateX(${step2}px) translateZ(-110px) rotateY(${rot2}deg) scale(${scale2})`,
        opacity: 0.86,
        zIndex: 6,
        filter: 'none',
        pointerEvents: 'auto'
      };
    } else {
      const sign = offset < 0 ? -1 : 1;
      return {
        transform: `translateX(${sign * (step2 + 180)}px) translateZ(-280px) rotateY(${sign * 42}deg) scale(0.68)`,
        opacity: 0,
        zIndex: 1,
        filter: 'none',
        pointerEvents: 'none'
      };
    }
  };

  return (
    <section id="services" style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ maxWidth: '750px' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700, color: '#C5A059', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              SCOPE OF PRACTICE // 3D CYLINDER CAROUSEL
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0F172A', lineHeight: 1.15, margin: '0 0 0.75rem 0' }}>
              What Thirupathi ENGINEERING Executes.
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
              Specialized mechanical structural erection and equipment installation capabilities overseen directly by managing partners M. Mohan and K. Gopalakrishnan on the job site.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'inline-flex', backgroundColor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '3px', gap: '3px' }}>
            <button
              onClick={() => setViewMode('cylinder')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                fontSize: '0.74rem',
                fontWeight: viewMode === 'cylinder' ? 700 : 500,
                color: viewMode === 'cylinder' ? '#0F172A' : '#64748B',
                backgroundColor: viewMode === 'cylinder' ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: viewMode === 'cylinder' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              <RotateCcw size={14} />
              <span>3D Cylinder Reel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                fontSize: '0.74rem',
                fontWeight: viewMode === 'grid' ? 700 : 500,
                color: viewMode === 'grid' ? '#0F172A' : '#64748B',
                backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                boxShadow: viewMode === 'grid' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              <Grid size={14} />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* 3D Cylindrical Carousel View */}
        {viewMode === 'cylinder' && (
          <div style={{ position: 'relative', width: '100%', padding: '1rem 0' }}>

            {/* Prev/Next Navigation Arrows */}
            <button
              onClick={stepPrev}
              style={{
                position: 'absolute',
                left: '0.5rem',
                top: 'calc(50% - 29px)',
                zIndex: 25,
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(15, 23, 42, 0.14)',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.16)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F172A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; }}
              aria-label="Previous Service"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={stepNext}
              style={{
                position: 'absolute',
                right: '0.5rem',
                top: 'calc(50% - 29px)',
                zIndex: 25,
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(15, 23, 42, 0.14)',
                color: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(15, 23, 42, 0.16)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#0F172A'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; e.currentTarget.style.color = '#0F172A'; }}
              aria-label="Next Service"
            >
              <ChevronRight size={24} />
            </button>

            {/* 3D Scene Viewport */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1560px',
                margin: '0 auto',
                height: '720px',
                perspective: '2200px',
                perspectiveOrigin: '50% 50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                userSelect: 'none',
                cursor: isDragging ? 'grabbing' : 'grab',
                touchAction: 'pan-y'
              }}
              onMouseDown={(e) => handlePointerDown(e.clientX)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={(e) => handlePointerUp(e.clientX)}
              onMouseLeave={() => { if (isDragging) handlePointerUp(dragStartX); }}
              onTouchStart={(e) => { if (e.touches[0]) handlePointerDown(e.touches[0].clientX); }}
              onTouchMove={(e) => { if (e.touches[0]) handlePointerMove(e.touches[0].clientX); }}
              onTouchEnd={(e) => { const clientX = e.changedTouches[0] ? e.changedTouches[0].clientX : dragStartX; handlePointerUp(clientX); }}
            >
              <div
                ref={trackRef}
                style={{
                  position: 'relative',
                  width: '450px',
                  height: '600px',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {services.map((service, i) => {
                  const cardStyle = getCardStyle(i);
                  const IconComponent = iconMap[service.icon] || Factory;
                  const isActive = i === currentIndex;
                  const serviceNum = (i + 1).toString().padStart(2, '0');

                  return (
                    <div
                      key={service._id || i}
                      onClick={() => { if (!hasMoved) rotateToCard(i); }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '450px',
                        height: '600px',
                        transformStyle: 'preserve-3d',
                        cursor: 'pointer',
                        transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, filter 0.65s ease',
                        ...cardStyle
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                          transformStyle: 'preserve-3d',
                          borderRadius: '26px',
                          boxShadow: isActive
                            ? '0 28px 65px -12px rgba(15, 23, 42, 0.22), 0 0 0 1.5px rgba(197, 160, 89, 0.55), 0 12px 36px rgba(197, 160, 89, 0.25)'
                            : '0 20px 48px -10px rgba(15, 23, 42, 0.14), 0 3px 12px rgba(15, 23, 42, 0.04)',
                          transition: 'box-shadow 0.35s ease, transform 0.35s ease'
                        }}
                      >
                        {/* Front Face */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '26px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '3rem 2.5rem 2.6rem',
                            backgroundColor: '#FFFFFF',
                            border: `1.5px solid ${isActive ? 'rgba(197, 160, 89, 0.7)' : 'rgba(15, 23, 42, 0.12)'}`,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            zIndex: 2,
                            transform: 'rotateY(0deg)',
                            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.04)'
                          }}
                        >
                          {/* Top Gradient Accent */}
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              height: '5px',
                              background: 'linear-gradient(90deg, #C5A059 0%, #0284C7 50%, #0D9488 100%)',
                              opacity: 0.95
                            }}
                          />

                          {/* Watermark Number */}
                          <div
                            style={{
                              position: 'absolute',
                              top: '1.35rem',
                              right: '1.8rem',
                              fontFamily: 'monospace',
                              fontSize: '4.2rem',
                              fontWeight: 800,
                              color: 'rgba(15, 23, 42, 0.08)',
                              lineHeight: 1,
                              letterSpacing: '-0.04em',
                              pointerEvents: 'none'
                            }}
                          >
                            {serviceNum}
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                              <div
                                style={{
                                  width: '68px',
                                  height: '68px',
                                  borderRadius: '18px',
                                  background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                                  border: '1.5px solid rgba(255, 255, 255, 0.14)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#FFFFFF',
                                  boxShadow: '0 10px 24px rgba(15, 23, 42, 0.18)'
                                }}
                              >
                                <IconComponent size={32} strokeWidth={2.2} />
                              </div>
                              <span
                                style={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.78rem',
                                  fontWeight: 800,
                                  color: '#855C08',
                                  backgroundColor: 'rgba(197, 160, 89, 0.14)',
                                  border: '1.5px solid rgba(197, 160, 89, 0.35)',
                                  padding: '0.35rem 0.85rem',
                                  borderRadius: '20px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.12em'
                                }}
                              >
                                {service.category || 'STRUCTURAL'}
                              </span>
                            </div>

                            <h3 style={{ fontSize: '1.48rem', fontWeight: 800, color: '#0A0F1D', lineHeight: 1.32, margin: '0 0 1rem 0', letterSpacing: '-0.02em' }}>
                              {service.title}
                            </h3>

                            <p style={{ fontSize: '1.04rem', color: '#1E293B', fontWeight: 500, lineHeight: 1.72, margin: 0, WebkitFontSmoothing: 'antialiased' }}>
                              {service.shortDesc}
                            </p>
                          </div>

                          {/* Tags */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem', marginTop: '1.75rem', paddingTop: '1.35rem', borderTop: '1.5px solid rgba(226, 232, 240, 0.9)' }}>
                            {service.tags && service.tags.map((t, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontFamily: 'monospace',
                                  fontSize: '0.82rem',
                                  fontWeight: 700,
                                  color: '#0F172A',
                                  backgroundColor: '#F1F5F9',
                                  border: '1.5px solid #CBD5E1',
                                  padding: '0.42rem 0.85rem',
                                  borderRadius: '8px',
                                  letterSpacing: '0.04em'
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Back Face (Cylinder reverse side) */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '26px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '2.5rem',
                            background: 'linear-gradient(145deg, #0F172A 0%, #1E293B 100%)',
                            border: '1px solid rgba(197, 160, 89, 0.4)',
                            color: '#FFFFFF',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                          }}
                        >
                          <div style={{ fontFamily: 'monospace', fontSize: '0.88rem', letterSpacing: '0.25em', color: '#DFBF77', marginBottom: '0.6rem', opacity: 0.9 }}>
                            TE // ERECTION
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '4.8rem', fontWeight: 800, color: '#C5A059', lineHeight: 1, marginBottom: '0.85rem', textShadow: '0 4px 18px rgba(197, 160, 89, 0.4)' }}>
                            {serviceNum}
                          </div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', maxWidth: '260px', lineHeight: 1.45, margin: '0 0 0.75rem 0' }}>
                            {service.title}
                          </h4>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: '#DFBF77', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {service.category || 'INDUSTRIAL'}
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Control Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1.5rem',
                padding: '0.85rem 1.25rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace', fontSize: '0.74rem', color: '#64748B' }}>
                <span style={{ color: '#C5A059', fontSize: '1rem' }}>⟷</span>
                <span>Drag horizontally or click cards to spin 3D cylinder</span>
              </div>

              {/* Numbered Pagination Chips */}
              <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                {services.map((s, i) => (
                  <button
                    key={s._id || i}
                    onClick={() => rotateToCard(i)}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      backgroundColor: i === currentIndex ? '#0F172A' : '#F8FAFC',
                      border: `1px solid ${i === currentIndex ? '#0F172A' : '#E2E8F0'}`,
                      color: i === currentIndex ? '#FFFFFF' : '#475569',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Autoplay Toggle */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                {isAutoplay ? <Pause size={13} /> : <Play size={13} />}
                <span>{isAutoplay ? 'Auto-Rotate Active' : 'Auto-Rotate Paused'}</span>
              </button>
            </div>

          </div>
        )}

        {/* Classic Grid View Fallback */}
        {viewMode === 'grid' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Factory;
              return (
                <div
                  key={service._id || idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '2.2rem 1.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C5A059';
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(15, 23, 42, 0.09)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.04)';
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #C5A059 0%, #0284C7 50%, #0D9488 100%)' }} />

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '14px',
                          backgroundColor: '#0F172A',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#C5A059'
                        }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '0.68rem',
                          fontWeight: 700,
                          color: '#926C15',
                          backgroundColor: 'rgba(197, 160, 89, 0.08)',
                          border: '1px solid rgba(197, 160, 89, 0.22)',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '20px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {service.category || 'STRUCTURAL'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', lineHeight: 1.3, margin: '0 0 0.85rem 0' }}>
                      {service.title}
                    </h3>

                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.65, margin: '0 0 1.5rem 0' }}>
                      {service.shortDesc}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {service.tags && service.tags.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F1F5F9',
                          border: '1px solid #E2E8F0',
                          padding: '0.35rem 0.7rem',
                          borderRadius: '6px'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
