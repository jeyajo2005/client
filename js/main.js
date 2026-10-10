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
    'power-plant': {
      title: '20 MW Thermal Power Plant — Non-IBR & ACC Cooling Tower Erection',
      year: '2025 Completion',
      clients: 'Tecksk Projects & ISGEC Heavy Engineering',
      image: 'assets/images/power_plant_acc.jpg',
      specs: [
        { label: 'Plant Capacity', val: '20 MW Thermal Power Unit' },
        { label: 'Scope', val: 'Non-IBR Structures, Ducting & ACC Erection' },
        { label: 'Prime Clients', val: 'Tecksk Projects / ISGEC' },
        { label: 'Safety Record', val: 'Zero Lost-Time Incidents (LTI)' },
        { label: 'Erection Weight', val: '1,450+ Metric Tonnes Steel' },
        { label: 'Key Equipment', val: 'Air-Cooled Condenser Fan Decks' }
      ],
      description: `Executed structural steel erection for high-capacity 20 MW thermal power generation unit. Scope encompassed complete non-IBR structural framing, boiler support auxiliary steelwork, air-cooled condenser (ACC) towers, industrial ducting arrays, and elevated pipe racks. All structural alignment was verified with optical laser levels and calibrated torque wrenches in strict compliance with IS 800 and EPC partner criteria.`
    },
    'clinker-silo': {
      title: 'Cement Plant Clinker Silo Structures & Heavy Concrete Framing',
      year: '2025 Completion',
      clients: 'The Ramco Cements Ltd.',
      image: 'assets/images/clinker_silo.jpg',
      specs: [
        { label: 'Facility Type', val: 'Clinker Storage Silos & Transfer Towers' },
        { label: 'Client', val: 'The Ramco Cements Ltd.' },
        { label: 'Execution Year', val: '2025' },
        { label: 'Structural Method', val: 'Heavy Reinforced Concrete & Slipform' },
        { label: 'Elevation', val: 'Up to 54m Structure Apex' },
        { label: 'Safety Protocol', val: 'Strict Operational Plant HSE' }
      ],
      description: `Comprehensive structural civil execution for clinker storage silos and conveyor transfer galleries at The Ramco Cements Ltd. Delivered monolithic concrete silo frameworks, high-capacity hopper support beams, and structural overhead galleries. Engineered to withstand continuous dynamic vibration, high thermal differentials, and heavy abrasive bulk storage loads.`
    },
    'peb-framing': {
      title: 'Heavy Industrial PEB Framing & Overhead EOT Crane Gantry Assembly',
      year: 'Structural Engineering',
      clients: 'Industrial Manufacturing EPCs',
      image: 'assets/images/peb_erection.jpg',
      specs: [
        { label: 'Clear Span', val: '38m Column-Free Internal Bay' },
        { label: 'Crane Rating', val: 'Up to 50T Dual EOT Gantry Runways' },
        { label: 'Framing Type', val: 'Custom Built-Up Plate Portal Frames' },
        { label: 'Wind Load Standard', val: 'IS 875 Part 3 Engineered' },
        { label: 'QA/QC Check', val: '100% UT / MPI Weld Inspection' },
        { label: 'Fasteners', val: 'High-Strength Friction Grip (HSFG)' }
      ],
      description: `Design coordination and field erection of massive pre-engineered industrial plant buildings. Includes high-capacity crane runway girders, precision rail alignment for smooth crane movement, braced portal frames, and insulated wall/roof envelope systems.`
    },
    'civil-foundations': {
      title: 'Heavy Machine RCC Plinths, Deep Foundations & Retaining Systems',
      year: 'Heavy Civil Execution',
      clients: 'Core Infrastructure Clients',
      image: 'assets/images/civil_foundations.jpg',
      specs: [
        { label: 'Concrete Grade', val: 'M35 / M40 High-Strength Controlled Mix' },
        { label: 'Rebar Standard', val: 'Fe 550D High Ductility TMT Reinforcement' },
        { label: 'Foundation Scope', val: 'Turbine Plinths, Piling & Raft Works' },
        { label: 'Vibration Control', val: 'Dynamic Damping Embedded Plates' },
        { label: 'Quality Test', val: 'Cube Compression & Core Testing' },
        { label: 'Execution', val: 'Direct Supervision by K. Gopalakrishnan' }
      ],
      description: `Specialized heavy reinforced concrete foundations engineered for reciprocating and rotating machinery, heavy crushers, and multi-story structural columns. Featuring deep earthwork shoring, waterproofed basement rafts, and micron-accurate anchor bolt pocket installations.`
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
              Scope of Engineering & Execution
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
            Partnership Firm: Led by M. Mohan & K. Gopalakrishnan · Tamil Nadu, India
          </p>

          <div style="background: var(--bg-secondary); border: 1px solid var(--border-hairline); padding: 1.75rem; border-radius: var(--radius-sm); margin-bottom: 1.75rem;">
            <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">Core Competencies</h4>
            <ul style="padding-left: 1.25rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.8;">
              <li>Thermal & Captive Power Plant non-IBR structural fabrication and erection.</li>
              <li>Air Cooled Condenser (ACC) cooling towers structural erection & duct assembly.</li>
              <li>Cement plant clinker silo structures, raw material handling, and slipform works.</li>
              <li>Heavy industrial PEB factories, crane gantry framing, and machine foundations.</li>
              <li>IS Code compliance (IS 800, IS 456, IS 875) & certified industrial safety protocols.</li>
            </ul>
          </div>

          <div style="background: #FAFAFA; border: 1px dashed var(--accent-gold); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 700; font-size: 0.95rem;">Official Partnership Inquiries</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Direct Partner Lines: 9043288002 | 9790520126</div>
              <div style="font-size: 0.85rem; color: var(--text-muted);">Email: thirupathiengineerss@gmail.com | gopalkannan5@gmail.com</div>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-gold-dark); font-weight: 700; padding: 0.35rem 0.65rem; background: var(--accent-gold-bg); border-radius: 4px;">VERIFIED 2025</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--border-hairline);">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Document: TE-CAP-2025-V1.PDF (Ready for Procurement Review)</span>
            <button class="btn btn-primary" onclick="triggerMockDownload()">
              Download PDF Summary ↓
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
});
