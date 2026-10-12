/**
 * Thirupathi Engineers - Portfolio Website Interactive Engine
 * Inspired by architectural minimalism and modern engineering aesthetics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Hero Names Sequential Typing Animation (M. Mohan -> K. Gopala Krishnan)
  const name1Text = "M. Mohan";
  const name2Text = "K. Gopala Krishnan";
  const el1 = document.getElementById('heroName1');
  const el2 = document.getElementById('heroName2');
  const cursor1 = document.getElementById('cursor1');
  const cursor2 = document.getElementById('cursor2');

  if (el1 && el2) {
    el1.textContent = '';
    el2.textContent = '';
    let i = 0;
    let j = 0;
    const typingSpeed = 80; // ms per char
    const lineDelay = 350;  // pause before typing second line

    function typeName1() {
      if (i < name1Text.length) {
        el1.textContent += name1Text.charAt(i);
        i++;
        setTimeout(typeName1, typingSpeed);
      } else {
        // Name 1 complete: switch cursor to name 2
        if (cursor1) cursor1.style.display = 'none';
        if (cursor2) cursor2.style.display = 'inline-block';
        setTimeout(typeName2, lineDelay);
      }
    }

    function typeName2() {
      if (j < name2Text.length) {
        el2.textContent += name2Text.charAt(j);
        j++;
        setTimeout(typeName2, typingSpeed);
      } else {
        // Complete: hide cursor and keep permanently visible
        if (cursor2) cursor2.style.display = 'none';
      }
    }

    // Begin typing on page load
    setTimeout(typeName1, 300);
  }

  // 1. Sticky Navbar & Active Navigation State
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for active menu items
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // 2. Project Filter Tabs
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-case-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Project Inquiry Form - Chip Selector & Submission
  const typeChips = document.querySelectorAll('.type-chip');
  const selectedTypeInput = document.getElementById('selectedProjectType');
  const inquiryForm = document.getElementById('inquiryForm');

  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      if (selectedTypeInput) {
        selectedTypeInput.value = chip.getAttribute('data-type');
      }
    });
  });

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firmName = document.getElementById('firmName').value.trim();
      const contactName = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const notes = document.getElementById('projectNotes').value.trim();
      const type = selectedTypeInput ? selectedTypeInput.value : 'General Inquiry';

      if (!firmName || !contactName || !email) {
        showToast('Please fill out the required firm name, contact person, and email.', 'error');
        return;
      }

      // Simulated instant dispatch
      showToast(`Thank you, ${contactName}! Your inquiry for ${firmName} (${type}) has been logged. M. Mohan and K. Gopalakrishnan will review your project parameters within 24 hours.`, 'success');

      inquiryForm.reset();
      typeChips.forEach(c => c.classList.remove('selected'));
      if (typeChips[0]) typeChips[0].classList.add('selected');
    });
  }

  // 4. Modal Engine for Project Deep-Dive & Capability Statement
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalContainer = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  const projectDetailsData = {
    'drymix-packing': {
      title: 'Dry Mix Unit: Packing Plant & Hopper Mechanical Erection Work',
      year: '2026 Ongoing Project',
      clients: 'The Ramco Cements Ltd. — RR Nagar, Virudhunagar',
      image: 'assets/images/drymix_packing.jpg',
      specs: [
        { label: 'Project Status', val: '2026 Active Execution' },
        { label: 'Facility Type', val: 'Dry Mix Unit & Packing Plant' },
        { label: 'Client / Site', val: 'The Ramco Cements Ltd. (RR Nagar)' },
        { label: 'Scope of Work', val: 'Heavy Mechanical Equipment & Hopper Erection' },
        { label: 'Key Structures', val: 'Storage Hoppers, Chutes, Packing Line Frames' },
        { label: 'Partner Supervision', val: 'Direct On-Site Lead: M. Mohan & K. Gopalakrishnan' }
      ],
      description: `Active mechanical industrial structural erection and equipment installation for the high-throughput Dry Mix Unit and Packing Plant at The Ramco Cements Ltd., RR Nagar, Virudhunagar. Scope encompasses heavy equipment framing, bulk material storage hoppers, mechanical feed chutes, bucket elevator casings, packing line machinery supports, and elevated operator galleries executed to rigorous cement industry mechanical tolerances.`
    },
    'sizer-crusher': {
      title: 'Sizer Crusher Mechanical & Equipment Structure Work',
      year: '2026 Completed Project',
      clients: 'The Ramco Cements Ltd. — Ramco Mines, Virudhunagar',
      image: 'assets/images/sizer_crusher.jpg',
      specs: [
        { label: 'Completion Year', val: '2026 Commissioned' },
        { label: 'Machinery Scope', val: 'High-Capacity Primary Sizer Crusher' },
        { label: 'Client / Location', val: 'Ramco Mines, Virudhunagar' },
        { label: 'Structural Type', val: 'Heavy Dynamic Equipment Support Towers' },
        { label: 'Fastener Spec', val: '100% Calibrated HSFG Torqued Bolting' },
        { label: 'Safety Record', val: 'Zero Lost-Time Incidents (LTI)' }
      ],
      description: `Complete mechanical structural erection and heavy equipment mounting for the mineral sizer crusher system at Ramco Mines, Virudhunagar. Scope included heavy steel supporting towers, vibration-isolated equipment chassis, high-impact rock transfer chutes, primary feed hoppers, and maintenance crane runway monorails engineered to endure continuous heavy dynamic limestone crushing stresses.`
    },
    'power-plant': {
      title: '20 MW Power Plant: Non-IBR Structures & ACC Cooling Tower Erection',
      year: '2025 Completion',
      clients: 'Tecksk Projects & ISGEC Heavy Engineering',
      image: 'assets/images/power_plant_acc.jpg',
      specs: [
        { label: 'Plant Capacity', val: '20 MW Thermal Power Unit' },
        { label: 'Scope', val: 'Non-IBR Structures, Ducting & ACC Erection' },
        { label: 'Prime Clients', val: 'Tecksk Projects / ISGEC' },
        { label: 'Safety Record', val: 'Zero Lost-Time Incidents (Zero LTI)' },
        { label: 'Erection Weight', val: '1,450+ Metric Tonnes Steel' },
        { label: 'Key Equipment', val: 'Air-Cooled Condenser (ACC) Fan Decks' }
      ],
      description: `Executed structural steel erection for high-capacity 20 MW thermal power generation unit. Scope encompassed complete non-IBR structural framing, boiler support auxiliary steelwork, air-cooled condenser (ACC) towers, industrial flue gas ducting arrays, and elevated pipe racks. All structural alignment was verified with optical laser levels and calibrated torque wrenches in strict compliance with IS 800 standards.`
    },
    'clinker-silo': {
      title: 'Clinker Silo Mechanical Structures & Conveyor Galleries',
      year: '2025 Completion',
      clients: 'The Ramco Cements Ltd.',
      image: 'assets/images/clinker_silo.jpg',
      specs: [
        { label: 'Facility Type', val: 'Clinker Storage Silos & Transfer Towers' },
        { label: 'Client', val: 'The Ramco Cements Ltd.' },
        { label: 'Execution Year', val: '2025 Handover' },
        { label: 'Structural Method', val: 'Heavy Structural Steel Framing & Galleries' },
        { label: 'Elevation', val: 'Up to 54m Structure Apex' },
        { label: 'Safety Protocol', val: 'Operational Cement Plant HSE Compliance' }
      ],
      description: `Heavy mechanical structural execution for clinker storage silo systems and high-elevation transfer galleries at The Ramco Cements Ltd. Scope encompassed structural column towers, conveyor bridge galleries, feeder support steel, hopper discharge interfaces, and access platforms executed inside an active operational plant environment with zero downtime.`
    }
  };

  // Attach modal trigger to buttons
  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-open-project');
      const data = projectDetailsData[projKey];
      if (!data) return;

      modalContainer.innerHTML = `
        <div class="modal-project-view">
          <div style="margin-bottom: 1.5rem;">
            <div class="mono-label">${data.year} · ${data.clients}</div>
            <h3 style="font-size: 1.7rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.25;">
              ${data.title}
            </h3>
          </div>
          <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 2rem; border: 1px solid var(--border-hairline);">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 360px; object-fit: cover;">
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4 style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold-dark); margin-bottom: 1rem;">
              Key Engineering Parameters
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border-hairline);">
              ${data.specs.map(s => `
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; color: var(--text-muted);">${s.label}</div>
                  <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-top: 0.2rem;">${s.val}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div>
            <h4 style="font-family: var(--font-mono); font-size: 0.8rem; text-transform: uppercase; color: var(--accent-gold-dark); margin-bottom: 0.75rem;">
              Scope of Engineering & Mechanical Erection
            </h4>
            <p style="font-size: 0.98rem; line-height: 1.75; color: var(--text-secondary); margin-bottom: 1.5rem;">
              ${data.description}
            </p>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-hairline);">
            <a href="#contact" class="btn btn-primary" onclick="closeAppModal()">Discuss Similar Scope →</a>
          </div>
        </div>
      `;

      openAppModal();
    });
  });

  // Capability Statement Preview Trigger
  document.querySelectorAll('[data-open-capability]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalContainer.innerHTML = `
        <div class="modal-capability-view">
          <div class="mono-label">FIRM CREDENTIALS & CAPABILITY BRIEF</div>
          <h3 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
            Thirupathi Engineers — Capability Statement
          </h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.75rem;">
            Registered Partnership Firm · Partners: M. Mohan & K. Gopalakrishnan · GST Registered
          </p>

          <div style="background: var(--bg-secondary); border: 1px solid var(--border-hairline); padding: 1.75rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">Specialized Mechanical & Structural Competencies</h4>
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.8;">
              <li>Mechanical Industrial Structural Fabrication coordination and heavy steel erection.</li>
              <li>Thermal & Captive Power Plant 20 MW non-IBR structures, boiler auxiliaries & pipe racks.</li>
              <li>Air-Cooled Condenser (ACC) cooling towers structural erection, fan decks & steam ducting.</li>
              <li>Cement plant clinker silos, kiln coal mill buildings, cement mills, and conveyor galleries.</li>
              <li>Dry Mix Units, packing plants, bulk storage hoppers, and bucket elevator structures.</li>
              <li>Heavy mining & quarry equipment structures including mineral sizer crushers and screens.</li>
              <li>Coal stacker & reclaimer structural assemblies and plant washing facility erections.</li>
              <li>Certified compliance with IS 800 (Structural Steel Design & Erection) & strict HSE zero-accident protocols.</li>
            </ul>
          </div>

          <div style="background: var(--bg-tertiary); border: 1px solid var(--border-hairline); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">GST Registered Office Addresses</h4>
            <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
              <div><strong>Corporate Office (GST):</strong> Chennai, Tamil Nadu</div>
              <div><strong>Registered Office (GST Paper):</strong> Kovilpatti, Thoothukudi District, Tamil Nadu</div>
            </div>
          </div>

          <div style="background: #FAFAFA; border: 1px dashed var(--accent-gold); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">Direct Managing Partner Lines</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">M. Mohan (50+ Yrs Exp): +91 9043288002 | thirupathiengineerss@gmail.com</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">K. Gopalakrishnan (~15 Yrs Exp): +91 9790520126 | gopalkannan5@gmail.com</div>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-gold-dark); font-weight: 700; padding: 0.35rem 0.65rem; background: var(--accent-gold-bg); border-radius: 4px;">VERIFIED 2026</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--border-hairline);">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Document: TE-CAP-2026-MECH.PDF</span>
            <button class="btn btn-primary" onclick="triggerMockDownload()">
              Download Dossier ↓
            </button>
          </div>
        </div>
      `;
      openAppModal();
    });
  });

  function openAppModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  window.closeAppModal = function() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeAppModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeAppModal();
      }
    });
  }

  window.triggerMockDownload = function() {
    showToast('Downloading Thirupathi Engineers Capability Statement (TE-CAP-2025.pdf)...', 'success');
    closeAppModal();
  };

  // 5. Toast Notification System
  function showToast(message, type = 'success') {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#C5A059' : '#EF4444'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
        </svg>
        <span style="font-size: 0.9rem; font-weight: 500;">${message}</span>
      </div>
    `;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // 6. Number Counter Animation on Scroll
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedStats) {
        animatedStats = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          if (isNaN(target)) return;
          let count = 0;
          const duration = 1200;
          const step = Math.max(1, Math.floor(target / (duration / 20)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              stat.textContent = target;
              clearInterval(timer);
            } else {
              stat.textContent = count;
            }
          }, 20);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 7. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 8. Live Project & Erection Gallery Engine (98+ Photos with HD Clarity & Lightbox)
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryLoadMoreBtn = document.getElementById('galleryLoadMoreBtn');
  const galleryShowAllBtn = document.getElementById('galleryShowAllBtn');

  // Lightbox Elements
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxClarityToggle = document.getElementById('lightboxClarityToggle');

  // Build complete gallery data list
  const totalGalleryCount = 98;
  const galleryItems = [
    {
      src: 'assets/images/washing_plant.jpg',
      tag: 'The Ramco Cements Ltd.',
      title: 'Washing Plant & Thickener Tank Structural Erection',
      category: 'mining'
    },
    {
      src: 'assets/images/flsmidth_crane_lift.jpg',
      tag: 'Heavy Rigging',
      title: 'FLSmidth Equipment High-Tonnage Crane Lift',
      category: 'cranes'
    },
    {
      src: 'assets/images/drymix_packing.jpg',
      tag: 'RR Nagar Site',
      title: 'Dry Mix Unit Drive Motors & Equipment Assembly',
      category: 'machinery'
    },
    {
      src: 'assets/images/sizer_crusher.jpg',
      tag: 'Ramco Mines',
      title: 'Primary Sizer Crusher Mechanical Support Tower',
      category: 'mining'
    },
    {
      src: 'assets/images/power_plant_acc.jpg',
      tag: 'Tecksk / ISGEC',
      title: '20 MW Thermal Power Plant ACC Cooling Tower Deck',
      category: 'cranes'
    },
    {
      src: 'assets/images/clinker_silo.jpg',
      tag: 'Cement Works',
      title: 'Clinker Storage Silo Structures & Elevated Galleries',
      category: 'hoppers'
    }
  ];

  // Dynamic titles and category rotation for the 98 live site photos
  const categoryPool = ['cranes', 'machinery', 'hoppers', 'mining'];
  const tagPool = [
    'Ramco Cements Site',
    'Heavy Mobile Crane',
    'Hopper Fabrication',
    'Plant Erection',
    'Dry Mix Unit',
    'Conveyor Gallery',
    'Mechanical Fit-Up',
    'Equipment Rigging'
  ];
  const titlePool = [
    'Heavy Structural Framing Assembly',
    'High-Elevation Truss Erection via Crane',
    'Steel Storage Hopper Plate Fit-Up & Welding',
    'Dry Mix Plant Mechanical Gallery Erection',
    'Transfer Chute & Flange Bolt Alignment',
    'Bucket Elevator Structural Support Tower',
    'Industrial Washing Plant Steel Framework',
    'Vibration-Damped Equipment Chassis Assembly',
    'Overhead Conveyor Gantry Placement',
    'Primary Feeder & Screening Station Steel',
    'Structural Joint Torque & Laser Check',
    'Live Plant Shutdown Mechanical Rigging'
  ];

  for (let idx = 1; idx <= totalGalleryCount; idx++) {
    const pad = idx.toString().padStart(3, '0');
    const cat = categoryPool[(idx - 1) % categoryPool.length];
    const tag = tagPool[(idx - 1) % tagPool.length];
    const title = `${titlePool[(idx - 1) % titlePool.length]} #${idx}`;
    galleryItems.push({
      src: `assets/images/gallery/site-img-${pad}.jpg`,
      tag: tag,
      title: title,
      category: cat
    });
  }

  let currentCategory = 'all';
  let displayedCount = 12;
  const batchSize = 12;
  let activeLightboxIndex = 0;
  let filteredItems = [...galleryItems];

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    filteredItems = galleryItems.filter(item => {
      return currentCategory === 'all' || item.category === currentCategory;
    });

    const itemsToDisplay = filteredItems.slice(0, displayedCount);

    itemsToDisplay.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('data-index', index);
      card.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/washing_plant.jpg';">
        <div class="gallery-card-overlay">
          <span class="gallery-card-tag">${item.tag}</span>
          <h4 class="gallery-card-title">${item.title}</h4>
        </div>
      `;

      card.addEventListener('click', () => {
        openLightbox(index);
      });

      galleryGrid.appendChild(card);
    });

    // Update Load More buttons
    if (galleryLoadMoreBtn) {
      if (displayedCount >= filteredItems.length) {
        galleryLoadMoreBtn.style.display = 'none';
      } else {
        galleryLoadMoreBtn.style.display = 'inline-flex';
        galleryLoadMoreBtn.querySelector('span').textContent = `Show More Photos (+12) [${displayedCount} of ${filteredItems.length}]`;
      }
    }

    if (galleryShowAllBtn) {
      if (displayedCount >= filteredItems.length) {
        galleryShowAllBtn.style.display = 'none';
      } else {
        galleryShowAllBtn.style.display = 'inline-flex';
        galleryShowAllBtn.querySelector('span').textContent = `Show All (${filteredItems.length} Photos)`;
      }
    }
  }

  // Filter Buttons
  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-gfilter');
      displayedCount = batchSize;
      renderGallery();
    });
  });

  // Load More Button
  if (galleryLoadMoreBtn) {
    galleryLoadMoreBtn.addEventListener('click', () => {
      displayedCount += batchSize;
      renderGallery();
    });
  }

  // Show All Button
  if (galleryShowAllBtn) {
    galleryShowAllBtn.addEventListener('click', () => {
      displayedCount = filteredItems.length;
      renderGallery();
    });
  }

  // Initial render
  renderGallery();

  // Lightbox Implementation
  function openLightbox(index) {
    if (!filteredItems[index] || !lightbox) return;
    activeLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = filteredItems[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.onerror = function() {
        this.onerror = null;
        this.src = 'assets/images/washing_plant.jpg';
      };
      lightboxImg.src = item.src;
      lightboxImg.alt = item.title;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = `${item.title} — ${item.tag}`;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `Photo ${activeLightboxIndex + 1} of ${filteredItems.length}`;
    }
  }

  function nextLightbox() {
    if (activeLightboxIndex < filteredItems.length - 1) {
      activeLightboxIndex++;
    } else {
      activeLightboxIndex = 0;
    }
    updateLightboxContent();
  }

  function prevLightbox() {
    if (activeLightboxIndex > 0) {
      activeLightboxIndex--;
    } else {
      activeLightboxIndex = filteredItems.length - 1;
    }
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });

  // Clarity boost toggle
  if (lightboxClarityToggle && lightboxImg) {
    lightboxClarityToggle.addEventListener('click', () => {
      lightboxImg.classList.toggle('enhanced');
      const isEnhanced = lightboxImg.classList.contains('enhanced');
      lightboxClarityToggle.classList.toggle('active', isEnhanced);
      lightboxClarityToggle.textContent = isEnhanced ? '✨ HD Clarity Boost: ON' : 'HD Clarity Boost: OFF';
    });
  }

  // 9. Serpentine Timeline Interaction & Scroll Reveal
  const serpentineRows = document.querySelectorAll('.serpentine-row');
  if (serpentineRows.length > 0) {
    const serpentineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    serpentineRows.forEach(row => {
      row.style.opacity = '0.9';
      row.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      serpentineObserver.observe(row);
    });
  }

  // 9. Serpentine Timeline Dynamic Path & Alignment
  function initSerpentineTimeline() {
    const wrap = document.querySelector('.serpentine-timeline-wrap');
    const svg = document.getElementById('serpentineSvg') || document.querySelector('.serpentine-svg-bg');
    if (!wrap || !svg) return;

    let path = document.getElementById('serpentinePath');
    let topDot = document.getElementById('serpentineTopDot');
    let bottomDot = document.getElementById('serpentineBottomDot');

    if (!path) {
      path = svg.querySelector('path');
      if (path) path.id = 'serpentinePath';
    }
    const circles = svg.querySelectorAll('circle');
    if (circles.length >= 2) {
      if (!topDot) { topDot = circles[0]; topDot.id = 'serpentineTopDot'; }
      if (!bottomDot) { bottomDot = circles[1]; bottomDot.id = 'serpentineBottomDot'; }
    }

    function calculateAndDraw() {
      const rings = wrap.querySelectorAll('.target-ring');
      if (rings.length === 0) return;

      const wrapRect = wrap.getBoundingClientRect();
      const wrapW = wrap.clientWidth || wrapRect.width;
      const wrapH = wrap.clientHeight || wrapRect.height;
      if (wrapW === 0 || wrapH === 0) return;

      svg.setAttribute('viewBox', `0 0 ${wrapW} ${wrapH}`);
      svg.setAttribute('width', wrapW);
      svg.setAttribute('height', wrapH);

      const isMobile = window.innerWidth <= 900;
      const coords = [];

      rings.forEach(ring => {
        const rRect = ring.getBoundingClientRect();
        const cx = rRect.left + rRect.width / 2 - wrapRect.left;
        const cy = rRect.top + rRect.height / 2 - wrapRect.top;
        coords.push({ x: cx, y: cy });
      });

      if (coords.length === 0) return;

      const first = coords[0];
      const last = coords[coords.length - 1];

      const topX = first.x;
      const topY = Math.max(8, first.y - (isMobile ? 36 : 60));

      const botX = last.x;
      const botY = Math.min(wrapH - 8, last.y + (isMobile ? 36 : 60));

      if (topDot) {
        topDot.setAttribute('cx', topX);
        topDot.setAttribute('cy', topY);
        topDot.setAttribute('r', isMobile ? '5' : '6');
      }
      if (bottomDot) {
        bottomDot.setAttribute('cx', botX);
        bottomDot.setAttribute('cy', botY);
        bottomDot.setAttribute('r', isMobile ? '5' : '6');
      }

      let d = `M ${topX} ${topY}`;

      // From top dot to first ring (Step 1)
      if (isMobile) {
        d += ` L ${first.x} ${first.y}`;
      } else {
        const bow1 = 38;
        const dy1 = first.y - topY;
        d += ` C ${topX + bow1} ${topY + dy1 * 0.35}, ${first.x + bow1} ${first.y - dy1 * 0.35}, ${first.x} ${first.y}`;
      }

      // Between consecutive rings: pass directly through each ring center
      for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const dy = p2.y - p1.y;

        if (isMobile) {
          // Direct dashed connecting line straight through the rings
          d += ` L ${p2.x} ${p2.y}`;
        } else {
          // Graceful S-curve alternating left & right
          // i=0 (step 1->2): bows to the left (-46)
          // i=1 (step 2->3): bows to the right (+46)
          const dir = (i % 2 === 0) ? -1 : 1;
          const bow = dir * 46;
          d += ` C ${p1.x + bow} ${p1.y + dy * 0.32}, ${p2.x + bow} ${p2.y - dy * 0.32}, ${p2.x} ${p2.y}`;
        }
      }

      // From last ring to bottom dot
      if (isMobile) {
        d += ` L ${botX} ${botY}`;
      } else {
        const lastDir = ((coords.length - 1) % 2 === 0) ? -1 : 1;
        const bowLast = lastDir * 32;
        const dyLast = botY - last.y;
        d += ` C ${last.x + bowLast} ${last.y + dyLast * 0.35}, ${botX + bowLast} ${botY - dyLast * 0.35}, ${botX} ${botY}`;
      }

      if (path) {
        path.setAttribute('d', d);
      }
    }

    calculateAndDraw();
    window.addEventListener('resize', calculateAndDraw, { passive: true });
    window.addEventListener('orientationchange', calculateAndDraw, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(calculateAndDraw);
    }
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => {
        calculateAndDraw();
      });
      ro.observe(wrap);
    }
  }

  initSerpentineTimeline();
});

