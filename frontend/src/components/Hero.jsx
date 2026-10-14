import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero({ onOpenConsultation }) {
  const { data } = usePortfolio();
  const hero = data.hero || {};

  // Names for sequential typing animation (from backend or default partners)
  const name1Target = hero.name1 || (hero.heading && hero.heading.includes(',') ? hero.heading.split(',')[0].trim() : 'M. Mohan');
  const name2Target = hero.name2 || (hero.heading && hero.heading.includes(',') ? hero.heading.split(',')[1].trim() : 'K. Gopala Krishnan');

  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [cursor1Visible, setCursor1Visible] = useState(true);
  const [cursor2Visible, setCursor2Visible] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    setName1('');
    setName2('');
    setCursor1Visible(true);
    setCursor2Visible(false);

    let i = 0;
    let j = 0;
    const typingSpeed = 80;
    const lineDelay = 350;

    function typeName1() {
      if (isCancelled) return;
      if (i < name1Target.length) {
        setName1(name1Target.slice(0, i + 1));
        i++;
        setTimeout(typeName1, typingSpeed);
      } else {
        if (isCancelled) return;
        setCursor1Visible(false);
        setCursor2Visible(true);
        setTimeout(typeName2, lineDelay);
      }
    }

    function typeName2() {
      if (isCancelled) return;
      if (j < name2Target.length) {
        setName2(name2Target.slice(0, j + 1));
        j++;
        setTimeout(typeName2, typingSpeed);
      } else {
        if (isCancelled) return;
        // Finished typing - keep cursor 2 hidden
        setCursor2Visible(false);
      }
    }

    const startTimer = setTimeout(typeName1, 300);

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
    };
  }, [name1Target, name2Target]);

  // Dynamic Background Image with fallback to original hero.jpg
  const bgImage = hero.bgImageUrl
    ? (hero.bgImageUrl.startsWith('http') || hero.bgImageUrl.startsWith('/') ? hero.bgImageUrl : `/${hero.bgImageUrl}`)
    : '/assets/images/hero.jpg';

  const subtitle = hero.subtitle || 'MANAGING PARTNERS · THIRUPATHI ENGINEERING';
  const description = hero.description || 'Premier mechanical industrial structural & equipment erection partnership firm. Proven execution in 20 MW thermal power plant non-IBR structures, ACC cooling towers, cement plant clinker silos, packing plants, sizer crushers, and bulk handling systems.';
  const badgeText = hero.badgeText || 'MECHANICAL & INDUSTRIAL STRUCTURES';
  const badgeLoc = hero.badgeLoc || 'TAMIL NADU · INDIA';
  const primaryCtaText = hero.primaryCtaText || 'Discuss Your Next Structure';
  const primaryCtaLink = hero.primaryCtaLink || '#contact';
  const secondaryCtaText = hero.secondaryCtaText || 'View Project Record';
  const secondaryCtaLink = hero.secondaryCtaLink || '#projects';

  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="hero-bg-overlay"></div>

      <div className="container hero-container">
        {/* Top Right Floating Badge */}
        <div className="hero-top-badge">
          <div className="badge-status-row">
            <span className="status-dot"></span>
            <span>{badgeText}</span>
          </div>
          <div className="badge-loc">{badgeLoc}</div>
        </div>

        {/* Hero Main Content */}
        <div className="hero-content">
          {/* Accent line */}
          <div className="hero-accent-line"></div>

          {/* The names 1 by 1 in large, thin white typography with typing animation */}
          <h1 className="hero-name-title" aria-label={`${name1Target}, ${name2Target}`}>
            <span className="hero-name-line">
              <span>{name1}</span>
              {cursor1Visible && <span className="typing-cursor"></span>}
            </span>
            <span className="hero-name-line">
              <span>{name2}</span>
              {cursor2Visible && <span className="typing-cursor"></span>}
            </span>
          </h1>

          {/* Subtitle bar */}
          <div className="hero-role-subtitle">
            {subtitle}
          </div>

          {/* Short description */}
          <p className="hero-description">
            {description}
          </p>

          {/* CTA Buttons side by side */}
          <div className="hero-actions">
            <a
              href={primaryCtaLink}
              className="btn btn-hero-primary"
              onClick={(e) => {
                if (primaryCtaLink === '#contact' && onOpenConsultation) {
                  // Allow smooth navigation or modal
                }
              }}
            >
              <span>{primaryCtaText}</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href={secondaryCtaLink} className="btn btn-hero-secondary">
              {secondaryCtaText}
            </a>
          </div>
        </div>

        {/* Bottom Right Vertical Scroll Marker */}
        <div className="hero-scroll-indicator">
          <span>SCROLL DOWN</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
}
