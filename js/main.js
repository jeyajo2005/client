/**
 * THIRUPATHI ENGINEERS — Interactive Core Logic
 * High performance Vanilla JavaScript
 * Partnership Firm: M. Mohan & K. Gopalakrishnan
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroVideo();
  initCounters();
  initProjectModals();
  initGallery();
  initContactForm();
  initBackToTop();
  initMobileNav();
  initBlueprintDetails();
});

/* ==========================================================================
   1. HERO VIDEO CONTROLS
   ========================================================================== */
function initHeroVideo() {
  const video = document.getElementById('hero-video');
  const playBtn = document.getElementById('video-play-btn');
  const muteBtn = document.getElementById('video-mute-btn');
  const fullscreenBtn = document.getElementById('video-fs-btn');
  const statusBadge = document.getElementById('video-status');

  if (!video) return;

  video.muted = true;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      if (playBtn) updatePlayBtnIcon(false);
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        updatePlayBtnIcon(true);
      } else {
        video.pause();
        updatePlayBtnIcon(false);
      }
    });
  }

  function updatePlayBtnIcon(isPlaying) {
    if (!playBtn) return;
    if (isPlaying) {
      playBtn.innerHTML = `
        <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>`;
      playBtn.setAttribute('title', 'Pause Video');
      if (statusBadge) statusBadge.textContent = 'PLAYING';
    } else {
      playBtn.innerHTML = `
        <svg class="w-4 h-4 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>`;
      playBtn.setAttribute('title', 'Play Video');
      if (statusBadge) statusBadge.textContent = 'PAUSED';
    }
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteBtn.innerHTML = `
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
          </svg>`;
        muteBtn.setAttribute('title', 'Unmute Sound');
      } else {
        muteBtn.innerHTML = `
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
          </svg>`;
        muteBtn.setAttribute('title', 'Mute Sound');
      }
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    });
  }
}

/* ==========================================================================
   2. ANIMATED STATISTICS COUNTERS
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.stat-counter');
  let hasAnimated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';
          const prefix = counter.getAttribute('data-prefix') || '';
          const duration = 1800;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = prefix + target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = prefix + Math.floor(current) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('experience');
  if (statsSection) {
    countObserver.observe(statsSection);
  }
}

/* ==========================================================================
   3. VERIFIED PROJECTS MODAL DATA & HANDLER
   ========================================================================== */
const projectData = {
  "drymix": {
    title: "Dry Mix Unit, Packing Plant & Hopper Work",
    year: "2026 – Ongoing",
    clients: "The Ramco Cements Ltd.",
    location: "R.R. Nagar, Virudhunagar, Tamil Nadu",
    scope: "Structural steel erection, heavy storage hopper fabrication, elevated conveyor galleries, and turnkey packing plant facility assembly.",
    status: "Active Ongoing Contract",
    category: "Cement Plant Infrastructure",
    image: "assets/project-drymix-packing.jpg",
    specs: [
      { label: "Client", value: "The Ramco Cements Ltd." },
      { label: "Site Location", value: "R.R. Nagar, Virudhunagar" },
      { label: "Execution Timeline", value: "2026 – Ongoing Execution" },
      { label: "Core Scope", value: "Dry Mix Unit, Automated Packing Plant & Storage Hoppers" },
      { label: "Structural Work", value: "Heavy Steel Fabrication, Conveyor Galleries & Support Trusses" },
      { label: "Safety Benchmark", value: "Daily Toolbox Safety Audits, Certified High-Rise Rigging" }
    ],
    description: "Currently underway at The Ramco Cements Ltd. in R.R. Nagar, Virudhunagar, Thirupathi Engineers is executing the comprehensive structural erection of the new Dry Mix Unit, mechanized Packing Plant building, and heavy-duty industrial storage hoppers. The project requires precision alignment of bulk material feeding structures, multi-tier equipment platforms, and high-capacity conveyor galleries adhering strictly to Ramco's rigorous industrial safety standards."
  },
  "crusher": {
    title: "Sizer Crusher Work",
    year: "2026 – Completed",
    clients: "Ramco Mines",
    location: "Virudhunagar, Tamil Nadu",
    scope: "Heavy industrial structural erection, massive crusher machinery chutes, feed hopper supports, and high-impact structural framework.",
    status: "Completed & Commissioned",
    category: "Limestone Mining Installation",
    image: "assets/project-sizer-crusher.jpg",
    specs: [
      { label: "Client", value: "Ramco Mines (The Ramco Cements Ltd.)" },
      { label: "Site Location", value: "Virudhunagar Mining Quarry" },
      { label: "Status", value: "2026 Successfully Commissioned" },
      { label: "Machinery Installed", value: "High-Capacity Primary Sizer Crusher Complex" },
      { label: "Structural Weight", value: "Heavy-Gauge Steel Chutes & Dynamic Vibration Supports" },
      { label: "Engineering Scope", value: "Heavy Mobile Rigging, Torque Anchoring & Load Alignment" }
    ],
    description: "Successfully executed and commissioned for Ramco Mines at Virudhunagar. Thirupathi Engineers completed the heavy structural fabrication and erection of the Sizer Crusher plant. Built to withstand dynamic aggregate impact and rigorous crushing forces, our structural crew installed heavy plate chutes, discharge conveyor framing, and robust heavy-section foundation beams under strict mechanical tolerance guidelines."
  },
  "power": {
    title: "20 MW Power Plant – Non-IBR Structures & ACC Cooling Tower Work Erection",
    year: "2025",
    clients: "TECKSK Projects & ISGEC",
    location: "Thermal / Captive Power Facility",
    scope: "Turnkey structural steel erection for 20 MW generation unit, complete Non-IBR pipeline supports, duct framing, and multi-module Air Cooled Condenser (ACC) cooling tower erection.",
    status: "Verified Milestone Project",
    category: "Power Plant Construction",
    image: "assets/project-power-plant.jpg",
    specs: [
      { label: "Capacity", value: "20 MW Captive Power Generation" },
      { label: "Principal Clients", value: "TECKSK Projects and ISGEC" },
      { label: "Execution Year", value: "2025" },
      { label: "Key Components", value: "Non-IBR Steel Supports, ACC Modular Frame & Fan Deck" },
      { label: "Inspection Standards", value: "Ultrasonic NDT Weld Testing, High-Torque Bolt Inspection" },
      { label: "Execution Leadership", value: "M. Mohan & K. Gopalakrishnan Direct Supervision" }
    ],
    description: "Spearheaded by Thirupathi Engineers in collaboration with leading EPC contractors ISGEC and TECKSK Projects, this flagship 20 MW captive power plant project involved heavy structural frameworks, high-altitude pipe racks, and the intricate multi-tiered Air Cooled Condenser (ACC) cooling tower installation. Precision laser alignment ensured zero-deviation compliance across all structural junctions."
  },
  "silo": {
    title: "Clinker Silo Structures Work",
    year: "2025",
    clients: "The Ramco Cements Ltd.",
    location: "Major Cement Manufacturing Facility",
    scope: "Heavy industrial structural fabrication, high-elevation silo roof and shell erection, material conveyor galleries, and high-load anchorages.",
    status: "Verified Milestone Project",
    category: "Cement Plant Infrastructure",
    image: "assets/project-clinker-silo.jpg",
    specs: [
      { label: "Principal Client", value: "The Ramco Cements Ltd." },
      { label: "Execution Year", value: "2025" },
      { label: "Structure", value: "Tall Industrial Clinker Storage Silo & Penthouse" },
      { label: "Scope Highlights", value: "Heavy Crane Rigging, Roof Truss Assembly, Conveyor Galleries" },
      { label: "Safety Benchmarks", value: "100% Fall Protection Systems, Certified Crane Operators" },
      { label: "Engineering Quality", value: "Zero-Incident Rigging and IS Code Conformance" }
    ],
    description: "Commissioned by The Ramco Cements Ltd., Thirupathi Engineers delivered specialized high-elevation structural fabrication and erection for major clinker silo storage infrastructure. Operating at significant elevation with massive steel structural members demanded meticulous crane rigging engineering, dynamic wind load compensation, and flawless plumb alignment."
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('project-modal-content');
  const modalCloseBtn = document.getElementById('project-modal-close');
  const projectButtons = document.querySelectorAll('.view-project-btn');

  if (!modal || !modalContent) return;

  projectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      const data = projectData[projectId];
      if (!data) return;

      renderProjectModal(data);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  function renderProjectModal(data) {
    modalContent.innerHTML = `
      <div class="relative">
        <div class="h-64 sm:h-80 w-full overflow-hidden bg-[#142B45] relative">
          <img src="${data.image}" alt="${data.title}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-[#142B45] via-transparent to-transparent opacity-85"></div>
          <div class="absolute bottom-6 left-6 right-6">
            <span class="inline-block px-3 py-1 bg-[#3977A8] text-white text-xs font-mono tracking-wider uppercase mb-2">
              ${data.category} // ${data.year}
            </span>
            <h3 class="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
              ${data.title}
            </h3>
          </div>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E9EF]">
            <div>
              <p class="text-xs uppercase font-mono text-[#616E7D]">Principal Client</p>
              <p class="text-base font-semibold text-[#142B45]">${data.clients}</p>
            </div>
            <div>
              <p class="text-xs uppercase font-mono text-[#616E7D]">Project Location</p>
              <p class="text-base font-semibold text-[#142B45]">${data.location}</p>
            </div>
            <div>
              <p class="text-xs uppercase font-mono text-[#616E7D]">Contract Status</p>
              <span class="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ${data.status}
              </span>
            </div>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-[#142B45] font-semibold mb-2">Scope Overview & Execution Details</h4>
            <p class="text-sm text-[#252B33] leading-relaxed">${data.description}</p>
          </div>

          <div>
            <h4 class="text-xs font-mono uppercase tracking-wider text-[#142B45] font-semibold mb-3">Key Technical Specifications</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#F9FAFC] p-4 border border-[#E5E9EF] rounded">
              ${data.specs.map(spec => `
                <div class="border-b sm:border-b-0 pb-2 sm:pb-0 border-[#E5E9EF]">
                  <span class="block text-xs font-mono text-[#616E7D]">${spec.label}</span>
                  <span class="text-xs sm:text-sm font-medium text-[#142B45]">${spec.value}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#E5E9EF]">
            <a href="#contacts" onclick="closeProjectModal()" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-construction-yellow hover:bg-construction-yellowDark text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 transition">
              Inquire Similar Project
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
            <button onclick="closeProjectModal()" class="text-xs font-mono text-[#616E7D] hover:text-[#142B45] underline cursor-pointer">
              Close Window [ESC]
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.closeProjectModal = function() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   4. GALLERY FILTERING & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxClose = document.getElementById('lightbox-close');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#142B45]', 'text-white', 'border-[#142B45]');
        b.classList.add('bg-white', 'text-[#252B33]', 'border-[#E5E9EF]', 'hover:border-[#3977A8]');
      });
      btn.classList.remove('bg-white', 'text-[#252B33]', 'border-[#E5E9EF]', 'hover:border-[#3977A8]');
      btn.classList.add('bg-[#142B45]', 'text-white', 'border-[#142B45]');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-title') || 'Engineering Project Site';
      const tag = item.getAttribute('data-category-label') || 'Industrial Structural Work';

      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxTag) lightboxTag.textContent = tag;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

/* ==========================================================================
   5. CONTACT FORM & VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const submitBtn = document.getElementById('inquiry-submit-btn');
  const toast = document.getElementById('form-toast');
  const toastMessage = document.getElementById('form-toast-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
    const email = form.elements['email'] ? form.elements['email'].value.trim() : '';
    const requirements = form.elements['requirements'] ? form.elements['requirements'].value.trim() : '';

    if (!name || !email || !requirements) {
      showToast('Please fill in your name, email, and project scope details.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Transmitting RFQ Inquiry...`;
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Submit Project Inquiry</span>
          <svg class="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>`;
      }
      showToast('Inquiry Received! Thirupathi Engineers management will contact you promptly.', 'success');
    }, 1000);
  });

  function showToast(message, type) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    
    if (type === 'error') {
      toast.classList.remove('border-[#142B45]', 'bg-[#142B45]');
      toast.classList.add('border-red-600', 'bg-red-900');
    } else {
      toast.classList.remove('border-red-600', 'bg-red-900');
      toast.classList.add('border-[#3977A8]', 'bg-[#142B45]');
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 4500);
  }
}

/* ==========================================================================
   6. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      topBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      topBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      topBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
}

function initBlueprintDetails() {
  // Reserved for technical decorations
}
