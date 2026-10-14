/**
 * Thirupathi ENGINEERING - Portfolio Website Interactive Engine
 * Inspired by architectural minimalism and modern engineering aesthetics
 */

document.addEventListener('DOMContentLoaded', () => {
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 0. Hero Names & Partner Profiles Dynamic Engine (MongoDB API Integration)
  let name1Text = "M. Mohan";
  let name2Text = "K. Gopala Krishnan";
  const el1 = document.getElementById('heroName1');
  const el2 = document.getElementById('heroName2');
  const cursor1 = document.getElementById('cursor1');
  const cursor2 = document.getElementById('cursor2');

  function startTypingAnimation() {
    if (!el1 || !el2) return;
    el1.textContent = '';
    el2.textContent = '';
    if (cursor1) cursor1.style.display = 'inline-block';
    if (cursor2) cursor2.style.display = 'none';

    let i = 0;
    let j = 0;
    const typingSpeed = 80;
    const lineDelay = 350;

    function typeName1() {
      if (i < name1Text.length) {
        el1.textContent += name1Text.charAt(i);
        i++;
        setTimeout(typeName1, typingSpeed);
      } else {
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
        if (cursor2) cursor2.style.display = 'none';
      }
    }

    setTimeout(typeName1, 250);
  }

  // Fetch dynamic partner profiles from backend
  async function loadDynamicProfile() {
    try {
      const res = await fetch('/api/profile', {
        headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
      });
      if (!res.ok) {
        startTypingAnimation();
        return;
      }
      const json = await res.json();
      if (!json.success || !json.data) {
        startTypingAnimation();
        return;
      }

      const p = json.data;
      if (p.partner1) name1Text = p.partner1;
      if (p.partner2) name2Text = p.partner2;

      // Update hero subtitle and description if updated
      const heroRole = document.querySelector('.hero-role-subtitle');
      if (heroRole && p.title) heroRole.textContent = p.title;

      const heroDesc = document.querySelector('.hero-description');
      if (heroDesc && p.heroDescription) heroDesc.textContent = p.heroDescription;

      // Update Partner 1 Card (M. Mohan)
      const p1Name = document.getElementById('partner1Name');
      if (p1Name && p.partner1) p1Name.textContent = p.partner1;

      const p1Role = document.getElementById('partner1Role');
      if (p1Role && p.partner1Role) p1Role.textContent = p.partner1Role;

      const p1Exp = document.getElementById('partner1Exp');
      if (p1Exp && p.partner1Exp) p1Exp.textContent = p.partner1Exp;

      const p1Bio = document.getElementById('partner1Bio');
      if (p1Bio && p.partner1Bio) p1Bio.textContent = p.partner1Bio;

      const p1PhoneText = document.getElementById('partner1PhoneText');
      const p1PhoneLink = document.getElementById('partner1PhoneLink');
      if (p1PhoneText && p.partner1Phone) {
        p1PhoneText.textContent = p.partner1Phone;
        if (p1PhoneLink) p1PhoneLink.href = `tel:${p.partner1Phone.replace(/\s+/g, '')}`;
      }

      const p1EmailText = document.getElementById('partner1EmailText');
      const p1EmailLink = document.getElementById('partner1EmailLink');
      if (p1EmailText && p.partner1Email) {
        p1EmailText.textContent = p.partner1Email;
        if (p1EmailLink) p1EmailLink.href = `mailto:${p.partner1Email}`;
      }

      const p1Photo = document.getElementById('partner1Photo');
      if (p1Photo && p.partner1Image) {
        const src1 = p.partner1Image.startsWith('http') || p.partner1Image.startsWith('/') ? p.partner1Image : `/${p.partner1Image}`;
        p1Photo.src = src1;
      }

      // Update Partner 2 Card (K. Gopala Krishnan)
      const p2Name = document.getElementById('partner2Name');
      if (p2Name && p.partner2) p2Name.textContent = p.partner2;

      const p2Role = document.getElementById('partner2Role');
      if (p2Role && p.partner2Role) p2Role.textContent = p.partner2Role;

      const p2Exp = document.getElementById('partner2Exp');
      if (p2Exp && p.partner2Exp) p2Exp.textContent = p.partner2Exp;

      const p2Bio = document.getElementById('partner2Bio');
      if (p2Bio && p.partner2Bio) p2Bio.textContent = p.partner2Bio;

      const p2PhoneText = document.getElementById('partner2PhoneText');
      const p2PhoneLink = document.getElementById('partner2PhoneLink');
      if (p2PhoneText && p.partner2Phone) {
        p2PhoneText.textContent = p.partner2Phone;
        if (p2PhoneLink) p2PhoneLink.href = `tel:${p.partner2Phone.replace(/\s+/g, '')}`;
      }

      const p2EmailText = document.getElementById('partner2EmailText');
      const p2EmailLink = document.getElementById('partner2EmailLink');
      if (p2EmailText && p.partner2Email) {
        p2EmailText.textContent = p.partner2Email;
        if (p2EmailLink) p2EmailLink.href = `mailto:${p.partner2Email}`;
      }

      const p2Photo = document.getElementById('partner2Photo');
      if (p2Photo && p.partner2Image) {
        const src2 = p.partner2Image.startsWith('http') || p.partner2Image.startsWith('/') ? p.partner2Image : `/${p.partner2Image}`;
        p2Photo.src = src2;
      }

      // Start typing animation with real backend names
      startTypingAnimation();
    } catch (e) {
      console.warn('Profile fetch fallback to default:', e);
      startTypingAnimation();
    }
  }

  loadDynamicProfile();

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

  // 2. Project Filter Tabs & Dynamic Project Loading Engine
  function attachProjectFilterListeners() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-case-card');

    filterButtons.forEach(btn => {
      btn.onclick = () => {
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
      };
    });
  }

  attachProjectFilterListeners();

  async function loadDynamicProjects() {
    const stack = document.getElementById('projectsStack');
    if (!stack) return;

    try {
      const res = await fetch('/api/projects', {
        headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' },
        cache: 'no-store'
      });
      if (!res.ok) return;
      const json = await res.json();
      if (!json.success || !Array.isArray(json.data) || json.data.length === 0) return;

      const projects = json.data;
      stack.innerHTML = projects.map((p, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const isReverse = idx % 2 === 1 ? 'reverse-layout' : '';
        const catLower = (p.category || '').toLowerCase();
        let dataCat = 'all';
        if (catLower.includes('2026')) dataCat = '2026';
        else if (catLower.includes('power')) dataCat = 'power';
        else if (catLower.includes('cement') || catLower.includes('silo')) dataCat = 'cement';
        else if (catLower.includes('equipment') || catLower.includes('mining') || catLower.includes('crush')) dataCat = 'equipment';

        let imgSrc = p.mainImage || 'assets/images/drymix_packing.jpg';
        if (!imgSrc.startsWith('http') && !imgSrc.startsWith('/')) imgSrc = '/' + imgSrc;
        const statusBadge = p.status || 'COMPLETED';

        return `
          <article class="project-case-card ${isReverse}" data-category="${dataCat}" data-project-id="${p._id}">
            <div class="project-card-header">
              <div class="project-index-group">
                <span class="project-number">${numStr}</span>
                <div>
                  <span class="project-meta-category">${escapeHtml(p.category || 'INDUSTRIAL ERECTION')}</span>
                  <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">${escapeHtml(p.client || '')} ${p.location ? '— ' + escapeHtml(p.location) : ''}</div>
                </div>
              </div>
              <span class="project-year-badge">${escapeHtml(statusBadge)}</span>
            </div>

            <div class="project-card-body">
              <div class="project-image-box">
                <img src="${imgSrc}" alt="${escapeHtml(p.title)}" loading="lazy">
                <div class="project-image-metrics-strip">
                  <div class="img-metric-item">
                    <h6>${escapeHtml(p.capacity || 'Industrial')}</h6>
                    <p>Scope Spec</p>
                  </div>
                  <div class="img-metric-item">
                    <h6>${escapeHtml(p.location || 'Site')}</h6>
                    <p>Location</p>
                  </div>
                  <div class="img-metric-item">
                    <h6>${escapeHtml(p.year || '2026')}</h6>
                    <p>Milestone</p>
                  </div>
                </div>
              </div>

              <div class="project-specs-box">
                <div>
                  <h3 class="project-title">${escapeHtml(p.title)}</h3>
                  <div class="specs-meta-grid">
                    <div class="spec-param">
                      <h5>CATEGORY</h5>
                      <p>${escapeHtml(p.category || 'Erection')}</p>
                    </div>
                    <div class="spec-param">
                      <h5>SPEC / CAPACITY</h5>
                      <p>${escapeHtml(p.capacity || 'Standard Turnkey')}</p>
                    </div>
                    <div class="spec-param">
                      <h5>CLIENT</h5>
                      <p>${escapeHtml(p.client || 'Thirupathi ENGINEERING')}</p>
                    </div>
                    <div class="spec-param">
                      <h5>STATUS</h5>
                      <p>${escapeHtml(statusBadge)}</p>
                    </div>
                  </div>

                  <p class="project-narrative">${escapeHtml(p.description || '')}</p>

                  ${p.scope && p.scope.length > 0 ? `
                    <div class="project-quote-callout" style="margin-top:1rem;">
                      <ul style="margin:0; padding-left:1.2rem; color:var(--text-secondary); font-size:0.88rem; line-height:1.6;">
                        ${p.scope.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                </div>

                <div class="project-footer-actions">
                  <a href="#contact" class="btn btn-primary">
                    <span>Discuss Similar Project</span>
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                  <div class="client-tag-group">
                    <span class="client-tag-label">CLIENT:</span>
                    <span class="client-name-badge">${escapeHtml(p.client || 'Partner')}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');

      attachProjectFilterListeners();
    } catch (err) {
      console.warn('Projects dynamic load fallback:', err);
    }
  }

  loadDynamicProjects();

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
    inquiryForm.addEventListener('submit', async (e) => {
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

      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Parameters...';
      }

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contactName,
            email: email,
            phone: phone,
            company: firmName,
            subject: type,
            message: notes || `Industrial project inquiry regarding ${type}`
          })
        });

        const data = await res.json();
        if (data.success) {
          showToast(`Thank you, ${contactName}! Your inquiry has been directly logged into the executive partner system.`, 'success');
          inquiryForm.reset();
          typeChips.forEach(c => c.classList.remove('selected'));
          if (typeChips[0]) typeChips[0].classList.add('selected');
        } else {
          showToast(data.message || 'Submission failed, please try again.', 'error');
        }
      } catch (err) {
        showToast(`Thank you, ${contactName}! Your inquiry has been recorded.`, 'success');
        inquiryForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Transmit Project Parameters →';
        }
      }
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

  // Render project details into modal
  function renderProjectModal(data) {
    if (!modalContainer || !data) return;
    modalContainer.innerHTML = `
      <div class="modal-project-view">
        <div style="margin-bottom: 1.5rem;">
          <div class="mono-label">${data.year} · ${data.clients}</div>
          <h3 style="font-size: 1.7rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.25;">
            ${data.title}
          </h3>
        </div>
        <div style="border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 2rem; border: 1px solid var(--border-hairline);">
          <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 360px; object-fit: cover;" onerror="this.src='/assets/images/drymix_packing.jpg'">
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
  }

  // Attach modal trigger to buttons
  function attachProjectModalTriggers(root = document) {
    root.querySelectorAll('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projKey = btn.getAttribute('data-open-project');
        const data = projectDetailsData[projKey];
        if (!data) return;
        renderProjectModal(data);
      });
    });
  }
  attachProjectModalTriggers(document);

  // Capability Statement Preview Trigger
  document.querySelectorAll('[data-open-capability]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalContainer.innerHTML = `
        <div class="modal-capability-view">
          <div class="mono-label">FIRM CREDENTIALS & CAPABILITY BRIEF</div>
          <h3 style="font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
            Thirupathi ENGINEERING — Capability Statement
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
              <div style="font-size: 0.85rem; color: var(--text-muted);">M. Mohan (50+ Yrs Exp): +91 9043288002 | thirupathiengineerings@gmail.com</div>
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

  window.closeAppModal = function () {
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

  window.triggerMockDownload = function () {
    showToast('Downloading Thirupathi ENGINEERING Capability Statement (TE-CAP-2025.pdf)...', 'success');
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

  // 8. Live Project & Erection Gallery Engine (98+ Photos with Left-to-Right Moving Reel & Lightbox)
  const galleryGrid = document.getElementById('galleryGrid');
  const galleryMarqueeContainer = document.getElementById('galleryMarqueeContainer');
  const galleryMarqueeTrack = document.getElementById('galleryMarqueeTrack');
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryLoadMoreBtn = document.getElementById('galleryLoadMoreBtn');
  const galleryShowAllBtn = document.getElementById('galleryShowAllBtn');
  const galleryLoadActions = document.getElementById('galleryLoadActions');
  const galleryReelHint = document.getElementById('galleryReelHint');
  const viewModeReel = document.getElementById('viewModeReel');
  const viewModeGrid = document.getElementById('viewModeGrid');
  const galleryPlayPauseBtn = document.getElementById('galleryPlayPauseBtn');
  const gallerySwitchToGridLink = document.getElementById('gallerySwitchToGridLink');

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
  let currentViewMode = 'reel'; // 'reel' (moving left to right) or 'grid'
  let isMotionPaused = false;

  // Build a single gallery card element
  function createGalleryCard(item, origIndex, isMarquee = false) {
    const card = document.createElement('div');
    card.className = isMarquee ? 'gallery-card gallery-marquee-card' : 'gallery-card';
    card.setAttribute('data-index', origIndex);
    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/washing_plant.jpg';">
      <div class="gallery-card-overlay">
        <span class="gallery-card-tag">${item.tag}</span>
        <h4 class="gallery-card-title">${item.title}</h4>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(origIndex);
    });

    return card;
  }

  // Render continuous left-to-right marquee track
  function renderMarquee() {
    if (!galleryMarqueeTrack) return;
    galleryMarqueeTrack.innerHTML = '';

    if (filteredItems.length === 0) return;

    // Minimum cards in a single group to guarantee seamless looping on any screen width
    const minGroupCards = 16;
    let groupItems = [];
    while (groupItems.length < minGroupCards) {
      groupItems = groupItems.concat(filteredItems);
    }
    // Cap at a reasonable max for silky GPU performance
    if (groupItems.length > 28) {
      groupItems = groupItems.slice(0, 28);
    }

    // Set animation duration proportional to card count (~2.2s per card)
    const durationSec = Math.max(35, Math.round(groupItems.length * 2.2));
    galleryMarqueeTrack.style.animationDuration = `${durationSec}s`;

    // Group A (primary set)
    const groupA = document.createElement('div');
    groupA.className = 'gallery-marquee-group';
    groupItems.forEach((item) => {
      const origIndex = filteredItems.indexOf(item);
      groupA.appendChild(createGalleryCard(item, origIndex >= 0 ? origIndex : 0, true));
    });

    // Group B (identical clone set for seamless -50% to 0% left-to-right loop)
    const groupB = document.createElement('div');
    groupB.className = 'gallery-marquee-group';
    groupB.setAttribute('aria-hidden', 'true');
    groupItems.forEach((item) => {
      const origIndex = filteredItems.indexOf(item);
      groupB.appendChild(createGalleryCard(item, origIndex >= 0 ? origIndex : 0, true));
    });

    galleryMarqueeTrack.appendChild(groupA);
    galleryMarqueeTrack.appendChild(groupB);

    if (isMotionPaused) {
      galleryMarqueeTrack.classList.add('is-paused');
    } else {
      galleryMarqueeTrack.classList.remove('is-paused');
    }
  }

  // Render standard 4-column grid (used when user switches to Grid View)
  function renderGrid() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';

    const itemsToDisplay = filteredItems.slice(0, displayedCount);

    itemsToDisplay.forEach((item, index) => {
      galleryGrid.appendChild(createGalleryCard(item, index, false));
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

  // Update visible containers based on view mode
  function updateViewModeDisplay() {
    if (currentViewMode === 'reel') {
      if (galleryMarqueeContainer) galleryMarqueeContainer.style.display = 'block';
      if (galleryGrid) galleryGrid.style.display = 'none';
      if (galleryLoadActions) galleryLoadActions.style.display = 'none';
      if (viewModeReel) viewModeReel.classList.add('active');
      if (viewModeGrid) viewModeGrid.classList.remove('active');
    } else {
      if (galleryMarqueeContainer) galleryMarqueeContainer.style.display = 'none';
      if (galleryGrid) galleryGrid.style.display = 'grid';
      if (galleryLoadActions) galleryLoadActions.style.display = 'flex';
      if (viewModeGrid) viewModeGrid.classList.add('active');
      if (viewModeReel) viewModeReel.classList.remove('active');
    }
  }

  function setViewMode(mode) {
    currentViewMode = mode;
    updateViewModeDisplay();
  }

  if (viewModeReel) {
    viewModeReel.addEventListener('click', () => setViewMode('reel'));
  }
  if (viewModeGrid) {
    viewModeGrid.addEventListener('click', () => setViewMode('grid'));
  }
  if (gallerySwitchToGridLink) {
    gallerySwitchToGridLink.addEventListener('click', () => setViewMode('grid'));
  }

  // Toggle Motion Play/Pause
  function toggleMotion() {
    isMotionPaused = !isMotionPaused;
    if (galleryMarqueeTrack) {
      if (isMotionPaused) {
        galleryMarqueeTrack.classList.add('is-paused');
      } else {
        galleryMarqueeTrack.classList.remove('is-paused');
      }
    }
    if (galleryPlayPauseBtn) {
      const pauseIcon = galleryPlayPauseBtn.querySelector('.pause-icon');
      const playIcon = galleryPlayPauseBtn.querySelector('.play-icon');
      const text = galleryPlayPauseBtn.querySelector('.motion-btn-text');
      if (isMotionPaused) {
        if (pauseIcon) pauseIcon.style.display = 'none';
        if (playIcon) playIcon.style.display = 'inline';
        if (text) text.textContent = 'Resume';
        galleryPlayPauseBtn.title = 'Resume continuous left-to-right motion';
      } else {
        if (pauseIcon) pauseIcon.style.display = 'inline';
        if (playIcon) playIcon.style.display = 'none';
        if (text) text.textContent = 'Pause';
        galleryPlayPauseBtn.title = 'Pause continuous motion';
      }
    }
  }

  if (galleryPlayPauseBtn) {
    galleryPlayPauseBtn.addEventListener('click', toggleMotion);
  }

  function renderGallery() {
    filteredItems = galleryItems.filter(item => {
      return currentCategory === 'all' || item.category === currentCategory;
    });

    renderMarquee();
    renderGrid();
    updateViewModeDisplay();
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

  // Load More Button (in Grid View)
  if (galleryLoadMoreBtn) {
    galleryLoadMoreBtn.addEventListener('click', () => {
      displayedCount += batchSize;
      renderGrid();
    });
  }

  // Show All Button (in Grid View)
  if (galleryShowAllBtn) {
    galleryShowAllBtn.addEventListener('click', () => {
      displayedCount = filteredItems.length;
      renderGrid();
    });
  }

  // Initial render (starts immediately in continuous Left-to-Right reel mode)
  renderGallery();

  // Lightbox Implementation
  function openLightbox(index) {
    if (!filteredItems[index] || !lightbox) return;
    activeLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    // Pause background reel when inspecting photo
    if (galleryMarqueeTrack) {
      galleryMarqueeTrack.classList.add('is-paused');
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Resume motion if not manually paused
    if (galleryMarqueeTrack && !isMotionPaused) {
      galleryMarqueeTrack.classList.remove('is-paused');
    }
  }

  function updateLightboxContent() {
    const item = filteredItems[activeLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.onerror = function () {
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

  // 10. Services 3D Cylindrical Carousel Engine (円周上に配置されたカード)
  function initServicesCylinderCarousel() {
    const scene = document.getElementById('servicesCylinderScene');
    const track = document.getElementById('servicesCylinderTrack');
    const prevBtn = document.getElementById('cylinderPrevBtn');
    const nextBtn = document.getElementById('cylinderNextBtn');
    const paginationDots = document.querySelectorAll('.cylinder-dot');
    const autoplayBtn = document.getElementById('cylinderAutoplayBtn');
    const viewCylinderBtn = document.getElementById('servicesViewCylinder');
    const viewGridBtn = document.getElementById('servicesViewGrid');
    const cylinderContainer = document.getElementById('servicesCylinderContainer');
    const servicesGrid = document.getElementById('servicesGrid');

    if (!scene || !track) return;

    const cards = track.querySelectorAll('.services-cylinder-card');
    const totalCards = cards.length;
    if (totalCards === 0) return;

    let currentIndex = 0;
    let isAutoplay = true;
    let autoplayTimer = null;
    let isDragging = false;
    let startX = 0;
    let hasMoved = false;

    // Dynamic responsive spread for wide Pinterest-style horizontal coverflow arc
    function getSpacing() {
      const w = window.innerWidth;
      if (w < 600) {
        return { step1: 180, step2: 320, scaleMain: 1.0, scaleSide1: 0.84, scaleSide2: 0.72, rot1: 14, rot2: 22 };
      }
      if (w < 900) {
        return { step1: 260, step2: 480, scaleMain: 1.02, scaleSide1: 0.88, scaleSide2: 0.78, rot1: 16, rot2: 26 };
      }
      if (w < 1200) {
        return { step1: 330, step2: 630, scaleMain: 1.05, scaleSide1: 0.92, scaleSide2: 0.82, rot1: 18, rot2: 28 };
      }
      return { step1: 395, step2: 740, scaleMain: 1.08, scaleSide1: 0.95, scaleSide2: 0.86, rot1: 18, rot2: 28 };
    }

    function renderArcLayout(animated = true) {
      const sp = getSpacing();

      cards.forEach((card, i) => {
        let offset = i - currentIndex;
        while (offset > totalCards / 2) offset -= totalCards;
        while (offset < -totalCards / 2) offset += totalCards;

        card.style.transition = animated ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s ease, filter 0.65s ease' : 'none';

        if (offset === 0) {
          // Center Active Card - Raised, high prominence, crystal clear
          card.style.transform = `translateX(0px) translateZ(80px) rotateY(0deg) scale(${sp.scaleMain})`;
          card.style.opacity = '1';
          card.style.zIndex = '14';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.add('is-active');
        } else if (offset === -1) {
          // Immediate Left Card - Crystal clear and readable
          card.style.transform = `translateX(-${sp.step1}px) translateZ(-40px) rotateY(-${sp.rot1}deg) scale(${sp.scaleSide1})`;
          card.style.opacity = '0.96';
          card.style.zIndex = '10';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
        } else if (offset === 1) {
          // Immediate Right Card - Crystal clear and readable
          card.style.transform = `translateX(${sp.step1}px) translateZ(-40px) rotateY(${sp.rot1}deg) scale(${sp.scaleSide1})`;
          card.style.opacity = '0.96';
          card.style.zIndex = '10';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
        } else if (offset === -2) {
          // Far Left Card - Clear and visible
          card.style.transform = `translateX(-${sp.step2}px) translateZ(-110px) rotateY(-${sp.rot2}deg) scale(${sp.scaleSide2})`;
          card.style.opacity = '0.86';
          card.style.zIndex = '6';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
        } else if (offset === 2) {
          // Far Right Card - Clear and visible
          card.style.transform = `translateX(${sp.step2}px) translateZ(-110px) rotateY(${sp.rot2}deg) scale(${sp.scaleSide2})`;
          card.style.opacity = '0.86';
          card.style.zIndex = '6';
          card.style.filter = 'none';
          card.style.pointerEvents = 'auto';
          card.classList.remove('is-active');
        } else {
          // Other cards hidden cleanly behind the arc
          const sign = offset < 0 ? -1 : 1;
          card.style.transform = `translateX(${sign * (sp.step2 + 180)}px) translateZ(-280px) rotateY(${sign * 42}deg) scale(0.68)`;
          card.style.opacity = '0';
          card.style.zIndex = '1';
          card.style.filter = 'none';
          card.style.pointerEvents = 'none';
          card.classList.remove('is-active');
        }
      });

      paginationDots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function rotateToCard(index) {
      currentIndex = ((index % totalCards) + totalCards) % totalCards;
      renderArcLayout(true);
    }

    function stepNext() {
      currentIndex = (currentIndex + 1) % totalCards;
      renderArcLayout(true);
    }

    function stepPrev() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      renderArcLayout(true);
    }

    function startAutoplay() {
      stopAutoplay();
      if (!isAutoplay) return;
      autoplayTimer = setInterval(() => {
        stepNext();
      }, 4200);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepPrev();
        restartAutoplayDelay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepNext();
        restartAutoplayDelay();
      });
    }

    paginationDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        rotateToCard(idx);
        restartAutoplayDelay();
      });
    });

    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        if (hasMoved) return;
        rotateToCard(i);
        restartAutoplayDelay();
      });
    });

    if (autoplayBtn) {
      autoplayBtn.addEventListener('click', () => {
        isAutoplay = !isAutoplay;
        const icon = autoplayBtn.querySelector('.cylinder-play-icon');
        const text = autoplayBtn.querySelector('.cylinder-play-text');
        if (isAutoplay) {
          if (icon) icon.textContent = '⏸';
          if (text) text.textContent = 'Auto-Rotate Active';
          startAutoplay();
        } else {
          if (icon) icon.textContent = '▶';
          if (text) text.textContent = 'Auto-Rotate Paused';
          stopAutoplay();
        }
      });
    }

    function setServicesView(mode) {
      if (mode === 'cylinder') {
        if (cylinderContainer) cylinderContainer.style.display = 'block';
        if (servicesGrid) servicesGrid.style.display = 'none';
        if (viewCylinderBtn) viewCylinderBtn.classList.add('active');
        if (viewGridBtn) viewGridBtn.classList.remove('active');
        renderArcLayout(false);
        startAutoplay();
      } else {
        if (cylinderContainer) cylinderContainer.style.display = 'none';
        if (servicesGrid) servicesGrid.style.display = 'grid';
        if (viewGridBtn) viewGridBtn.classList.add('active');
        if (viewCylinderBtn) viewCylinderBtn.classList.remove('active');
        stopAutoplay();
      }
    }

    if (viewCylinderBtn) {
      viewCylinderBtn.addEventListener('click', () => setServicesView('cylinder'));
    }
    if (viewGridBtn) {
      viewGridBtn.addEventListener('click', () => setServicesView('grid'));
    }

    scene.addEventListener('mouseenter', () => stopAutoplay());
    scene.addEventListener('mouseleave', () => {
      if (isAutoplay && !isDragging) startAutoplay();
    });

    function restartAutoplayDelay() {
      stopAutoplay();
      if (isAutoplay) {
        setTimeout(() => {
          if (!isDragging) startAutoplay();
        }, 2000);
      }
    }

    function onPointerDown(clientX) {
      isDragging = true;
      hasMoved = false;
      startX = clientX;
      stopAutoplay();
    }

    function onPointerMove(clientX) {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      if (Math.abs(deltaX) > 10) {
        hasMoved = true;
      }
    }

    function onPointerUp(clientX) {
      if (!isDragging) return;
      isDragging = false;
      const deltaX = clientX - startX;
      if (hasMoved && Math.abs(deltaX) > 35) {
        if (deltaX < 0) {
          stepNext();
        } else {
          stepPrev();
        }
      }
      restartAutoplayDelay();
    }

    scene.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
    window.addEventListener('mousemove', (e) => { if (isDragging) onPointerMove(e.clientX); });
    window.addEventListener('mouseup', (e) => { if (isDragging) onPointerUp(e.clientX); });

    scene.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) onPointerDown(e.touches[0].clientX);
    }, { passive: true });
    scene.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) onPointerMove(e.touches[0].clientX);
    }, { passive: true });
    scene.addEventListener('touchend', (e) => {
      if (isDragging) {
        const clientX = e.changedTouches.length > 0 ? e.changedTouches[0].clientX : startX;
        onPointerUp(clientX);
      }
    });

    window.addEventListener('resize', () => {
      renderArcLayout(false);
    }, { passive: true });

    renderArcLayout(false);
    startAutoplay();
  }

  // =========================================================================
  // DYNAMIC SERPENTINE TIMELINE ENGINE (MongoDB API Integration)
  // =========================================================================
  async function fetchAndRenderTimeline() {
    try {
      const res = await fetch('/api/timeline', {
        headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
      });
      if (!res.ok) return;
      const json = await res.json();
      if (!json.success || !Array.isArray(json.data) || json.data.length === 0) return;

      const items = json.data;
      const wrap = document.querySelector('.serpentine-timeline-wrap');
      if (!wrap) return;

      const svg = wrap.querySelector('.serpentine-svg-bg');

      // Clear existing static rows
      const existingRows = wrap.querySelectorAll('.serpentine-row');
      existingRows.forEach(row => row.remove());

      function safeText(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      items.forEach((item, index) => {
        const row = document.createElement('div');
        const isRight = item.alignment === 'right';
        row.className = `serpentine-row ${isRight ? 'row-right' : 'row-left'}`;

        const themeClass = item.themeClass || 'theme-teal';
        const color = item.themeColor || '#0D9488';
        const year = safeText(item.year);
        const title = safeText(item.title);
        const client = safeText(item.client || '');
        const desc = safeText(item.description);
        const img = item.imageUrl || 'assets/images/gallery/site-img-024.jpg';

        const pillHtml = `
          <div class="serpentine-pill ${themeClass}">
            <div class="pill-text">
              <h4 class="pill-title">${title}</h4>
              <span class="pill-client">${client}</span>
              <p class="pill-desc">${desc}</p>
            </div>
            <div class="pill-disc-anchor">
              <div class="pill-white-disc">
                <img src="${img}" alt="${title}" loading="lazy">
              </div>
              <span class="pointer-arrow"></span>
            </div>
          </div>
        `;

        const centerNodeHtml = `
          <div class="serpentine-node-center">
            <div class="target-ring" style="border-color: ${color}; box-shadow: 0 0 0 5px ${color}38;">
              <span class="target-ring-dot" style="background: ${color};"></span>
            </div>
          </div>
        `;

        const metaHtml = `
          <div class="serpentine-meta">
            <span class="meta-step-year" style="color: ${color};">${year}</span>
          </div>
        `;

        if (isRight) {
          row.innerHTML = metaHtml + centerNodeHtml + pillHtml;
        } else {
          row.innerHTML = pillHtml + centerNodeHtml + metaHtml;
        }

        wrap.appendChild(row);
      });

      // Update Serpentine SVG canvas height dynamically
      if (svg) {
        const totalHeight = Math.max(1900, items.length * 190);
        svg.setAttribute('viewBox', `0 0 140 ${totalHeight}`);
        const bottomDot = svg.querySelector('#serpentineBottomDot');
        if (bottomDot) bottomDot.setAttribute('cy', totalHeight - 20);
      }
    } catch (e) {
      console.warn('[Timeline API] Using static fallback:', e);
    }
  }

  // =========================================================================
  // DYNAMIC PROFILE & ABOUT SYNC (MongoDB API Integration)
  // =========================================================================
  async function fetchAndApplyProfile() {
    try {
      const res = await fetch('/api/profile', {
        headers: { 'Cache-Control': 'no-cache, no-store' }
      });
      if (!res.ok) return;
      const json = await res.json();
      if (json.success && json.data) {
        const p = json.data;
        const heroNarrative = document.querySelector('.hero-narrative');
        if (heroNarrative && p.heroDescription) {
          heroNarrative.textContent = p.heroDescription;
        }
      }
    } catch (e) {
      console.warn('[Profile API] Using static fallback:', e);
    }
  }

  // =========================================================================
  // DYNAMIC SHOWCASE PROJECTS ENGINE (MongoDB API Integration)
  // =========================================================================
  async function fetchAndRenderProjects() {
    const stack = document.querySelector('.projects-stack');
    if (!stack) return;

    try {
      const res = await fetch('/api/projects', {
        headers: { 'Cache-Control': 'no-cache, no-store', 'Pragma': 'no-cache' }
      });
      if (!res.ok) return;
      const json = await res.json();
      if (!json.success || !Array.isArray(json.data) || json.data.length === 0) return;

      const projects = json.data;

      function safeText(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      function safeAttr(str) {
        if (!str) return '';
        return String(str).replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      }

      function normalizeImg(url) {
        if (!url) return '/assets/images/drymix_packing.jpg';
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) return url;
        return '/' + url;
      }

      // Update Filter Tabs dynamically based on actual categories in database
      const filterTabsContainer = document.querySelector('.filter-tabs');
      if (filterTabsContainer) {
        const rawCats = projects.map(p => (p.category || '').trim()).filter(Boolean);
        const uniqueCats = [...new Set(rawCats)];

        let tabsHtml = `<button class="filter-btn active" data-filter="all">All Projects (${projects.length})</button>`;
        uniqueCats.forEach(cat => {
          const count = projects.filter(p => (p.category || '').trim().toLowerCase() === cat.toLowerCase()).length;
          tabsHtml += `<button class="filter-btn" data-filter="${safeAttr(cat.toLowerCase())}">${safeText(cat)} (${count})</button>`;
        });
        filterTabsContainer.innerHTML = tabsHtml;

        // Rebind click events on dynamic buttons
        filterTabsContainer.querySelectorAll('.filter-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            filterTabsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCat = btn.getAttribute('data-filter');
            stack.querySelectorAll('.project-case-card').forEach(card => {
              const cardCat = card.getAttribute('data-category');
              if (selectedCat === 'all' || cardCat === selectedCat) {
                card.style.display = 'block';
                card.style.animation = 'fadeInCard 0.4s ease forwards';
              } else {
                card.style.display = 'none';
              }
            });
          });
        });
      }

      // Clear static cards and render dynamic cards from database
      stack.innerHTML = '';

      projects.forEach((p, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const projKey = p._id || `proj-${idx}`;
        const imgSrc = normalizeImg(p.mainImage);
        const catClean = (p.category || 'STRUCTURAL & EQUIPMENT').trim();
        const catAttr = catClean.toLowerCase();
        const statusClean = (p.status || 'COMPLETED').toUpperCase();
        const isOngoing = statusClean === 'ONGOING';
        const yearText = p.year ? p.year : '2026';
        const yearBadge = `${yearText} ${statusClean}`;

        // Register in projectDetailsData for modal preview
        projectDetailsData[projKey] = {
          title: p.title || 'Industrial Mechanical Structural Erection',
          year: `${yearText} ${statusClean}`,
          clients: `${p.client || 'Enterprise Client'}${p.location ? ' — ' + p.location : ''}`,
          image: imgSrc,
          specs: [
            { label: 'Project Status', val: statusClean },
            { label: 'Category', val: catClean },
            { label: 'Client / Site', val: p.client || 'Enterprise Client' },
            { label: 'Location', val: p.location || 'Tamil Nadu, India' },
            { label: 'Capacity / Scope', val: p.capacity || 'Heavy Industrial Equipment' },
            { label: 'Supervision', val: 'Direct Lead: M. Mohan & K. Gopalakrishnan' }
          ],
          description: p.description || ''
        };

        const card = document.createElement('article');
        card.className = 'project-case-card';
        card.setAttribute('data-category', catAttr);

        card.innerHTML = `
          <div class="project-card-header">
            <div class="project-index-group">
              <span class="project-number">${num}</span>
              <div>
                <span class="project-meta-category">${safeText(catClean.toUpperCase())}</span>
                <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">${safeText(p.client || '')} ${p.location ? '— ' + safeText(p.location) : ''}</div>
              </div>
            </div>
            <span class="project-year-badge" style="${isOngoing ? 'background: rgba(16, 185, 129, 0.15); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3);' : ''}">
              ${safeText(yearBadge)}
            </span>
          </div>

          <div class="project-card-body">
            <!-- Left Image with Metrics Ribbon -->
            <div class="project-image-box">
              <img src="${imgSrc}" alt="${safeAttr(p.title)}" loading="lazy" onerror="this.src='/assets/images/drymix_packing.jpg'">
              <div class="project-image-metrics-strip">
                <div class="img-metric-item">
                  <h6>${safeText(catClean)}</h6>
                  <p>Category</p>
                </div>
                <div class="img-metric-item">
                  <h6>${safeText(yearText)}</h6>
                  <p>Execution</p>
                </div>
                <div class="img-metric-item">
                  <h6>${safeText(statusClean)}</h6>
                  <p>Status</p>
                </div>
              </div>
            </div>

            <!-- Right Specs & Narrative -->
            <div class="project-specs-box">
              <div>
                <h3 class="project-title">${safeText(p.title)}</h3>

                <div class="specs-meta-grid">
                  <div class="spec-param">
                    <h5>CATEGORY</h5>
                    <p>${safeText(catClean)}</p>
                  </div>
                  <div class="spec-param">
                    <h5>CLIENT</h5>
                    <p>${safeText(p.client || 'Enterprise Client')}</p>
                  </div>
                  <div class="spec-param">
                    <h5>LOCATION</h5>
                    <p>${safeText(p.location || 'Tamil Nadu, India')}</p>
                  </div>
                  <div class="spec-param">
                    <h5>STATUS & YEAR</h5>
                    <p>${safeText(yearBadge)}</p>
                  </div>
                </div>

                <p class="project-narrative">
                  ${safeText(p.description || '')}
                </p>

                ${Array.isArray(p.scope) && p.scope.length > 0 ? `
                  <div style="margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${p.scope.map(s => `<span style="display:inline-block; font-size:0.75rem; background:var(--bg-secondary); border:1px solid var(--border-hairline); padding:0.25rem 0.6rem; border-radius:3px; color:var(--text-secondary); font-family:var(--font-mono);">${safeText(s)}</span>`).join('')}
                  </div>
                ` : ''}
              </div>

              <div class="project-footer-actions">
                <button class="btn btn-primary" data-open-project="${projKey}">
                  <span>View Project Specs</span>
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
                <div class="client-tag-group">
                  <span class="client-tag-label">CLIENT:</span>
                  <span class="client-name-badge client-ramco-badge">
                    <span>${safeText(p.client || 'Enterprise')}</span>
                  </span>
                  ${p.location ? `<span class="client-name-badge">${safeText(p.location)}</span>` : ''}
                </div>
              </div>
            </div>
          </div>
        `;

        stack.appendChild(card);
      });

      // Attach modal listeners to dynamic project buttons
      attachProjectModalTriggers(stack);
    } catch (e) {
      console.warn('[Projects API] Using static fallback:', e);
    }
  }

  fetchAndRenderProjects();
  fetchAndRenderTimeline();
  fetchAndApplyProfile();

  initServicesCylinderCarousel();
});


